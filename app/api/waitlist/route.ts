import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { Database, WaitlistStats } from "@/types/supabase";

// Validation schemas
const founderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  role: z.literal("founder"),
});

const lawyerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  firm: z.string().min(2, "Firm name must be at least 2 characters"),
  role: z.literal("lawyer"),
});

const waitlistSchema = z.union([founderSchema, lawyerSchema]);


// Helper function to get waitlist entries from Supabase
async function getWaitlistEntries() {
  const { data, error } = await supabase
    .from('waitlist_entries')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch waitlist entries: ${error.message}`);
  }

  return data || [];
}

// Helper function to get waitlist statistics
async function getWaitlistStats(): Promise<WaitlistStats> {
  const entries = await getWaitlistEntries();
  
  return {
    total: entries.length,
    founders: entries.filter(entry => entry.role === 'founder').length,
    lawyers: entries.filter(entry => entry.role === 'lawyer').length,
    lastUpdated: new Date().toISOString(),
  };
}

// Helper function to check if email already exists
async function emailExists(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('waitlist_entries')
    .select('id')
    .eq('email', email.toLowerCase())
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    throw new Error(`Failed to check email existence: ${error.message}`);
  }

  return !!data;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = waitlistSchema.parse(body);

    // Check if email already exists
    if (await emailExists(validatedData.email)) {
      return NextResponse.json(
        { error: "Email already registered on waitlist" },
        { status: 400 }
      );
    }

    // Prepare data for Supabase
    const insertData = {
      name: validatedData.name,
      email: validatedData.email.toLowerCase(),
      ...(validatedData.role === "founder" && { company: validatedData.company }),
      ...(validatedData.role === "lawyer" && { firm: validatedData.firm }),
      role: validatedData.role,
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      user_agent: request.headers.get("user-agent") || "unknown",
    };

    // Insert new entry into Supabase
    const { data: newEntry, error: insertError } = await supabase
      .from('waitlist_entries')
      .insert(insertData)
      .select()
      .single();

    if (insertError) {
      throw new Error(`Failed to insert waitlist entry: ${insertError.message}`);
    }

    // Get updated stats
    const stats = await getWaitlistStats();

    // Log success
    console.log(`[WAITLIST] New ${validatedData.role} signup:`, {
      name: validatedData.name,
      email: validatedData.email,
      timestamp: newEntry.created_at,
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist",
      id: newEntry.id,
      stats: {
        total: stats.total,
        position: stats.total,
      },
    });

  } catch (error) {
    console.error("[WAITLIST] Error:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation failed",
          details: error.errors.map((e: any) => ({
            field: e.path.join("."),
            message: e.message,
          }))
        },
        { status: 400 }
      );
    }

    // Handle database errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stats = await getWaitlistStats();
    
    // Return public stats only (no personal data)
    return NextResponse.json({
      stats,
    });
  } catch (error) {
    console.error("[WAITLIST] Error fetching stats:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch waitlist stats" },
      { status: 500 }
    );
  }
}

// Optional: Add DELETE endpoint for admin use
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const adminKey = searchParams.get("adminKey");

  // Simple admin protection (in production, use proper authentication)
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!email) {
    return NextResponse.json(
      { error: "Email parameter required" },
      { status: 400 }
    );
  }

  try {
    // Delete entry from Supabase
    const { data, error } = await supabaseAdmin
      .from('waitlist_entries')
      .delete()
      .eq('email', email.toLowerCase())
      .select();

    if (error) {
      throw new Error(`Failed to delete waitlist entry: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Entry removed from waitlist",
    });

  } catch (error) {
    console.error("[WAITLIST] Error removing entry:", error);
    
    return NextResponse.json(
      { error: "Failed to remove entry" },
      { status: 500 }
    );
  }
}