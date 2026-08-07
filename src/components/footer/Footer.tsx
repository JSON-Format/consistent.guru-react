import { motion } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  ArrowUp,
  Shield,
  HelpCircle,
  Scale,
  Phone,
  ChevronRight,
  Heart
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../assets/gurus.png"; 
import { 
  FaInstagram, 
  FaYoutube,  
} from "react-icons/fa";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { icon: FaXTwitter , label: "Twitter", href: "#" },
    { icon: FaInstagram, label: "Instagram", href: "#" },
    { icon: FaYoutube, label: "YouTube", href: "#" },
  ];

  return (
    <footer className="w-full bg-[#061319] border-t border-[#1a2a33] overflow-hidden relative">
      
      {/* Premium Gradient Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[200px] bg-primary/3 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-primary/3 blur-[120px] rounded-full" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16 md:py-20 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 pb-12 border-b border-[#1a2a33]">
          
          {/* Brand Column - Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3">
             <div className="w-11 h-11 rounded-2xl overflow-hidden border border-primary/30 bg-white/5 flex items-center justify-center">
  <img
    src={Logo}
    alt="Consistent Guru"
    className="w-full h-full object-cover"
  />
</div>
              <span className="text-xl md:text-2xl font-display font-bold tracking-tight">
                Consistent.<span className="text-primary">Guru</span>
              </span>
            </div>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-body">
              Track your habits, analyze your progress, and stay consistent with powerful insights and real-time analytics.
            </p>
            
            <div className="space-y-2.5">
              <a
                href="mailto:info@lore-more.com"
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <Mail className="w-4 h-4 text-primary group-hover:text-primary transition-colors" />
                <span>info@lore-more.com</span>
              </a>
              <a
                href="#"
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-primary group-hover:text-primary transition-colors" />
                <span>+1 (510) 306-1517</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Sunnyvale, CA, USA</span>
              </div>
            </div>
          </motion.div>

          {/* Company Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="text-[11px] font-display font-semibold uppercase tracking-[0.25em]  text-primary">
              Other Product
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Json-Format", href: "https://json-format.com/" },
                 { label: "Sample Json", href: "https://sample.json-format.com/" },
                 { label: "My Keyword Rank", href: "https://mykeywordrank.com/" },
                
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 text-primary" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="text-[11px] font-display font-semibold uppercase tracking-[0.25em] text-primary">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Create-Habit", href: "/create-habit" },
                 { label: "Tracker", href: "/tracker" },
                { label: "Why We Built This", href: "/why-we-built-this" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 text-primary" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal & Social Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-5"
          >
            <h3 className="text-[11px] font-display font-semibold uppercase tracking-[0.25em] text-primary">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "/privacy-Policy", icon: Shield },
                { label: "Terms & Conditions", href: "/terms-and-conditions", icon: Scale },
                { label: "Support Center", href: "/support", icon: HelpCircle },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    <item.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-[11px] font-display font-semibold uppercase tracking-[0.25em]  mb-3 text-primary">
                Connect
              </p>
              <div className="flex flex-wrap gap-2">
                {socialIcons.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#0a1a22] border border-[#1a2a33] hover:bg-primary/10 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Premium */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 md:pt-8">
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground font-body">
                Trusted by 100+ users
              </span>
            </div>
            <span className="w-px h-4 bg-[#1a2a33]" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[10px] text-primary">★</span>
              ))}
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-body"
          >
            <span>© {currentYear} Consistent.Guru</span>
            <span className="w-px h-3 bg-[#1a2a33]" />
            <span>LoreMore Pvt.Ltd</span>
            <span className="w-px h-3 bg-[#1a2a33] hidden sm:block" />
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="text-primary">✦</span>
              <span>All rights reserved</span>
            </span>
          </motion.div>

          {/* Scroll to Top */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-xl bg-[#0a1a22] border border-[#1a2a33] hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-primary group-hover:text-primary transition-colors" />
          </motion.button>
        </div>
      </div>

      {/* Premium Decorative Bottom Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </footer>
  );
};

export default Footer;