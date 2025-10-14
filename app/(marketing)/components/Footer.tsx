import { Linkedin, Twitter } from "lucide-react";

const footerLinks = [
  { name: "About", href: "#about" },
  { name: "Privacy", href: "#privacy" },
  { name: "Terms", href: "#terms" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "X/Twitter", href: "#", icon: Twitter },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          {/* Logo and tagline */}
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold mb-2">Calex</div>
            <div className="text-gray-400 text-sm">
              Founders Save Time. Lawyers Earn More.
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-8">
            <nav className="flex space-x-6">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <div>
              © {currentYear} Calex, Inc. All Rights Reserved.
            </div>
            <div className="mt-4 md:mt-0">
              Built by{" "}
              <span className="text-accent font-semibold">Zaz Labs ⚡</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}