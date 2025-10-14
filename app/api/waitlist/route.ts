import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

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

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  company?: string;
  firm?: string;
  role: "founder" | "lawyer";
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

interface WaitlistData {
  entries: WaitlistEntry[];
  stats: {
    total: number;
    founders: number;
    lawyers: number;
    lastUpdated: string;
  };
}

// Helper function to get or create waitlist file
async function getWaitlistData(): Promise<WaitlistData> {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "waitlist.json");

  try {
    // Ensure data directory exists
    await fs.mkdir(dataDir, { recursive: true });

    // Try to read existing file
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    // File doesn't exist or is invalid, create new structure
    const initialData: WaitlistData = {
      entries: [],
      stats: {
        total: 0,
        founders: 0,
        lawyers: 0,
        lastUpdated: new Date().toISOString(),
      },
    };
    
    await fs.writeFile(filePath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
}

// Helper function to save waitlist data
async function saveWaitlistData(data: WaitlistData): Promise<void> {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "waitlist.json");
  
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Helper function to check if email already exists
function emailExists(entries: WaitlistEntry[], email: string): boolean {
  return entries.some(entry => entry.email.toLowerCase() === email.toLowerCase());
}

// Helper function to generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = waitlistSchema.parse(body);

    // Get current waitlist data
    const waitlistData = await getWaitlistData();

    // Check if email already exists
    if (emailExists(waitlistData.entries, validatedData.email)) {
      return NextResponse.json(
        { error: "Email already registered on waitlist" },
        { status: 400 }
      );
    }

    // Create new entry
    const newEntry: WaitlistEntry = {
      id: generateId(),
      name: validatedData.name,
      email: validatedData.email,
      ...(validatedData.role === "founder" && { company: validatedData.company }),
      ...(validatedData.role === "lawyer" && { firm: validatedData.firm }),
      role: validatedData.role,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // Add entry and update stats
    waitlistData.entries.push(newEntry);
    waitlistData.stats.total = waitlistData.entries.length;
    waitlistData.stats.founders = waitlistData.entries.filter(e => e.role === "founder").length;
    waitlistData.stats.lawyers = waitlistData.entries.filter(e => e.role === "lawyer").length;
    waitlistData.stats.lastUpdated = new Date().toISOString();

    // Save updated data
    await saveWaitlistData(waitlistData);

    // Log success (in production, you might want to use a proper logger)
    console.log(`[WAITLIST] New ${validatedData.role} signup:`, {
      name: validatedData.name,
      email: validatedData.email,
      timestamp: newEntry.timestamp,
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist",
      id: newEntry.id,
      stats: {
        total: waitlistData.stats.total,
        position: waitlistData.stats.total,
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

    // Handle other errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const waitlistData = await getWaitlistData();
    
    // Return public stats only (no personal data)
    return NextResponse.json({
      stats: waitlistData.stats,
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
    const waitlistData = await getWaitlistData();
    const initialCount = waitlistData.entries.length;
    
    waitlistData.entries = waitlistData.entries.filter(
      entry => entry.email.toLowerCase() !== email.toLowerCase()
    );
    
    if (waitlistData.entries.length === initialCount) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 404 }
      );
    }

    // Update stats
    waitlistData.stats.total = waitlistData.entries.length;
    waitlistData.stats.founders = waitlistData.entries.filter(e => e.role === "founder").length;
    waitlistData.stats.lawyers = waitlistData.entries.filter(e => e.role === "lawyer").length;
    waitlistData.stats.lastUpdated = new Date().toISOString();

    await saveWaitlistData(waitlistData);

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