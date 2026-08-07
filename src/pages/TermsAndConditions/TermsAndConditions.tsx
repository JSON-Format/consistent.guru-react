import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Search, 
  Mail, 
  Headphones, 
  FileText, 
  Shield, 
  User, 
  Lock, 
  Server,
  AlertCircle, 
  CheckCircle, 
  ChevronDown,
  Sparkles,

  Clock,
  Scale,
  BookOpen,
  AlertTriangle,
  Send,
 
  MessageCircle,
  Globe,
  Users,
  Edit,
 
  Database,
  Code,

  Home,
  
} from "lucide-react";

const TermsAndConditions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = [
    { id: "all", label: "All", icon: Home },
    { id: "general", label: "General", icon: FileText },
    { id: "account", label: "Account", icon: User },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "legal", label: "Legal", icon: Scale },
    { id: "service", label: "Service", icon: Server },
  ];

  const sections = [
    {
      category: "general",
      num: "1",
      title: "About the Service",
      icon: Server,
      content: "Consistent.Guru is a habit-tracking and personal productivity application designed to help users create, track, and maintain habits and routines.\n\nThe Service may allow you to:\n• Create and manage personal habits\n• Track your daily or periodic habit progress\n• Set personal goals and reminders\n• View your habit history and progress\n• Manage your account and preferences\n• Receive notifications related to your habits\n\nThe features available may change, be updated, or be discontinued at any time."
    },
    {
      category: "general",
      num: "2",
      title: "Eligibility",
      icon: Users,
      content: "You must be legally capable of entering into these Terms to use the Service.\n\nIf you are using the Service on behalf of another person or organization, you confirm that you have the authority to accept these Terms on their behalf.\n\nIf you are under the applicable legal age in your country, you may only use the Service with the involvement and consent of a parent or legal guardian where required by law."
    },
    {
      category: "account",
      num: "3",
      title: "Creating an Account",
      icon: Lock,
      content: "Some features may require you to create an account.\n\nWhen creating an account, you may be required to provide information such as your email address and other account details.\n\nYou agree to:\n• Provide accurate and current information\n• Keep your account information up to date\n• Keep your login credentials secure\n• Not share your account with others\n• Notify us if you believe your account has been accessed without authorization\n\nYou are responsible for activity that occurs through your account unless caused by circumstances outside your reasonable control."
    },
    {
      category: "privacy",
      num: "4",
      title: "Habit and Personal Information",
      icon: Database,
      content: "The Service allows you to enter information about your habits, goals, routines, activities, and progress.\n\nYou retain ownership of the information and content you submit to the Service (\"User Content\").\n\nBy using the Service, you grant Lore-More Pvt. Ltd a limited, non-exclusive right to process and store your User Content solely as necessary to provide, maintain, secure, and improve the Service.\n\nYou should avoid entering highly sensitive personal information unless the Service specifically requests or supports such information."
    },
    {
      category: "general",
      num: "5",
      title: "Email Communications",
      icon: Mail,
      content: "By creating an account, you agree that we may send you service-related emails, such as:\n\n• Account verification emails\n• Password or login-related communications\n• Security notifications\n• Important service updates\n• Account-related notices\n\nWhere permitted by applicable law, we may also send promotional or marketing communications. You can unsubscribe from marketing emails at any time using the unsubscribe option provided in those communications.\n\nUnsubscribing from marketing communications will not prevent us from sending essential service or account-related communications."
    },
    {
      category: "privacy",
      num: "6",
      title: "Privacy",
      icon: Shield,
      content: "Your privacy is important to us.\n\nOur collection, use, storage, and protection of your personal information, including your email address and habit-related information, is described in our Privacy Policy.\n\nBy using the Service, you acknowledge that your information may be collected and processed in accordance with our Privacy Policy."
    },
    {
      category: "legal",
      num: "7",
      title: "User Responsibilities",
      icon: AlertCircle,
      content: "You agree to use the Service only for lawful purposes.\n\nYou must not:\n\n• Use the Service for unlawful, fraudulent, or harmful activities\n• Attempt to gain unauthorized access to the Service or another user's account\n• Interfere with or disrupt the operation of the Service\n• Introduce malware, viruses, or other harmful code\n• Reverse engineer or attempt to extract the source code of the Service, except where permitted by law\n• Copy, reproduce, distribute, or commercially exploit the Service without permission\n• Use automated systems to access the Service in a manner that could harm or overload our systems\n• Impersonate another person or entity\n• Use the Service to violate the rights of others\n\nWe reserve the right to restrict or terminate access if we reasonably believe a user has violated these Terms."
    },
    {
      category: "general",
      num: "8",
      title: "User Content",
      icon: Edit,
      content: "You are responsible for the information and content you enter into the Service.\n\nYou represent that you have the necessary rights to provide such content and that your use of the Service does not violate applicable laws or the rights of another person.\n\nWe do not claim ownership of your personal habit information merely because you store it through the Service.\n\nHowever, we may process your information as necessary to operate, maintain, secure, and improve the Service, subject to our Privacy Policy."
    },
    {
      category: "legal",
      num: "9",
      title: "Habit Tracking Disclaimer",
      icon: AlertTriangle,
      content: "Consistent.Guru is intended as a productivity and habit-tracking tool.\n\nThe Service is not a medical, psychological, therapeutic, financial, or professional advice service.\n\nHabit suggestions, reminders, progress information, statistics, or other content provided through the Service are for general informational and productivity purposes only.\n\nYou should not rely on the Service as a substitute for professional advice or treatment.\n\nYou are responsible for deciding which habits, goals, routines, or activities are appropriate for you."
    },
    {
      category: "service",
      num: "10",
      title: "Service Availability",
      icon: Server,
      content: "We aim to keep the Service available and reliable, but we do not guarantee that it will always be available, uninterrupted, secure, or error-free.\n\nThe Service may occasionally be unavailable because of:\n\n• Maintenance\n• Updates\n• Technical problems\n• Security incidents\n• Network or infrastructure failures\n• Events outside our reasonable control\n\nWe may modify, suspend, or discontinue any part of the Service at any time."
    },
    {
      category: "service",
      num: "11",
      title: "Third-Party Services",
      icon: Globe,
      content: "The Service may use or integrate with third-party services, including hosting providers, analytics providers, authentication services, payment processors, email providers, or other technology providers.\n\nThird-party services may have their own terms and privacy policies. We are not responsible for the policies or practices of third-party services that we do not control."
    },
    {
      category: "legal",
      num: "12",
      title: "Intellectual Property",
      icon: Code,
      content: "All rights, title, and interest in the Service, including its software, design, branding, logos, graphics, text, features, and other materials provided by Lore-More Pvt. Ltd, belong to Lore-More Pvt. Ltd or its licensors unless otherwise stated.\n\nThese Terms do not grant you ownership of any intellectual property belonging to Lore-More Pvt. Ltd.\n\nYou may use the Service only as permitted by these Terms."
    },
    {
      category: "general",
      num: "13",
      title: "Feedback",
      icon: Sparkles,
      content: "If you provide suggestions, ideas, feedback, or recommendations regarding the Service, you agree that we may use such feedback to improve or develop the Service without owing you compensation, unless otherwise agreed in writing."
    },
    {
      category: "account",
      num: "14",
      title: "Account Cancellation",
      icon: User,
      content: "You may stop using the Service at any time.\n\nIf the Service provides an account deletion feature, you may request deletion of your account through the available account settings.\n\nWe may suspend or terminate your account if:\n\n• You violate these Terms\n• You engage in fraudulent or abusive activity\n• Your use of the Service creates a security or legal risk\n• We are required to do so by law\n• We discontinue the Service\n\nUpon termination, your right to access the Service may immediately end.\n\nCertain provisions of these Terms may continue to apply after termination, including provisions relating to intellectual property, disclaimers, limitations of liability, and dispute resolution."
    },
    {
      category: "privacy",
      num: "15",
      title: "Data Deletion",
      icon: Database,
      content: "You may request deletion of your account and associated personal information, subject to applicable legal and regulatory requirements.\n\nSome information may need to be retained for legitimate purposes, such as complying with legal obligations, preventing fraud, resolving disputes, or maintaining necessary business records.\n\nFor more information about how we handle and delete personal information, please refer to our Privacy Policy."
    },
    {
      category: "legal",
      num: "16",
      title: "Disclaimer of Warranties",
      icon: AlertCircle,
      content: "To the maximum extent permitted by applicable law, the Service is provided on an 'as is' and 'as available' basis.\n\nWe make no warranties or representations that:\n\n• The Service will always be available\n• The Service will be completely accurate or error-free\n• The Service will meet all of your requirements\n• Any particular habit or productivity result will be achieved\n• The Service will always be secure or free from harmful components\n\nYour use of the Service is at your own risk."
    },
    {
      category: "legal",
      num: "17",
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: "To the maximum extent permitted by applicable law, Lore-More Pvt. Ltd and its directors, employees, contractors, affiliates, and service providers will not be liable for indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Service.\n\nThis may include loss of data, loss of profits, loss of productivity, business interruption, or other indirect losses.\n\nNothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by applicable law."
    },
    {
      category: "legal",
      num: "18",
      title: "Indemnification",
      icon: Shield,
      content: "To the extent permitted by applicable law, you agree to defend, indemnify, and hold harmless Lore-More Pvt. Ltd and its directors, employees, contractors, affiliates, and service providers from claims, liabilities, damages, losses, and expenses arising from:\n\n• Your violation of these Terms\n• Your misuse of the Service\n• Your User Content\n• Your violation of applicable laws or third-party rights"
    },
    {
      category: "legal",
      num: "19",
      title: "Changes to These Terms",
      icon: Edit,
      content: "We may update these Terms from time to time.\n\nWhen we make material changes, we may provide notice through the Service, email, or another reasonable method.\n\nThe updated Terms will become effective on the date stated in the updated Terms.\n\nYour continued use of the Service after the updated Terms become effective means that you accept the revised Terms."
    },
    {
      category: "legal",
      num: "20",
      title: "Governing Law",
      icon: Scale,
      content: "These Terms will be governed by and interpreted in accordance with the laws of India, without regard to conflict-of-law principles.\n\nAny disputes arising from these Terms or your use of the Service will be subject to the courts of Chennai, India, unless otherwise required by applicable law."
    },
    {
      category: "legal",
      num: "21",
      title: "Severability",
      icon: Scale,
      content: "If any provision of these Terms is determined to be invalid or unenforceable, the remaining provisions will continue to remain in effect."
    },
    {
      category: "legal",
      num: "22",
      title: "Entire Agreement",
      icon: BookOpen,
      content: "These Terms, together with our Privacy Policy and any other policies expressly incorporated into these Terms, constitute the entire agreement between you and Lore-More Pvt. Ltd regarding your use of the Service."
    },
    {
      category: "general",
      num: "23",
      title: "Contact Us",
      icon: Headphones,
      content: "If you have questions about these Terms, please contact us:\n\nLore-More Pvt. Ltd\nEmail: info@lore-more.com\nWebsite: https://consistent.guru/\nAddress: Sunnyvale, CA, USA"
    }
  ];

  const filteredSections = searchQuery
    ? sections.filter(section => 
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeCategory === "all"
    ? sections
    : sections.filter(section => section.category === activeCategory);

  return (
    <div className="min-h-screen w-full bg-[#0a0f0e] text-white overflow-x-hidden">
      
      {/* Background Glow - Green Theme */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] md:w-[800px] h-[300px] sm:h-[500px] md:h-[800px] bg-green-500/5 blur-[100px] sm:blur-[150px] md:blur-[200px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] md:w-[600px] h-[250px] sm:h-[400px] md:h-[600px] bg-emerald-500/5 blur-[80px] sm:blur-[120px] md:blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] bg-green-400/5 blur-[80px] sm:blur-[100px] md:blur-[180px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="w-full pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-green-400/10 border border-green-400/20 text-green-400 text-[10px] sm:text-xs md:text-sm mb-4 sm:mb-6"
            >
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Legal</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold leading-[1.1] sm:leading-[1.05] font-serif">
              <span className="text-white">
                Terms and
              </span>{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent mt-1 sm:mt-0">
                Conditions
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/50 max-w-3xl mx-auto mt-3 sm:mt-4 md:mt-6 px-2 leading-relaxed">
              Welcome to Consistent.Guru. These Terms and Conditions govern your access to and use of our Service.
            </p>
            
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-white/30">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                Last Updated: August 5, 2026
              </span>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 sm:mt-8 md:mt-10 max-w-3xl mx-auto px-2 sm:px-0"
            >
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/30" />
                <input
                  type="text"
                  placeholder="Search terms and conditions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl sm:rounded-2xl py-3 sm:py-4 md:py-5 pl-10 sm:pl-12 md:pl-14 lg:pl-16 pr-4 sm:pr-5 md:pr-6 text-sm sm:text-base md:text-lg text-white placeholder-white/30 focus:outline-none focus:border-green-400/50 focus:ring-2 focus:ring-green-400/10 transition-all"
                />
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10"
            >
              {[
                { icon: FileText, label: isMobile ? "23" : "23 Sections", color: "text-green-400" },
                { icon: Shield, label: isMobile ? "Protected" : "Protected", color: "text-emerald-400" },
                { icon: CheckCircle, label: isMobile ? "Valid" : "Valid Agreement", color: "text-green-400" },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-3">
                  <div className={`p-1.5 sm:p-2 rounded-full bg-white/5 border border-white/5`}>
                    <stat.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${stat.color}`} />
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm text-white/50">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <div className="w-full px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-6 sm:pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/[0.02] rounded-2xl p-4 sm:p-6 md:p-8 border border-white/5"
          >
            <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
              By creating an account, accessing, or using our Service, you agree to be bound by these Terms. 
              If you do not agree with any part of these Terms, please do not use the Service.
            </p>
            <div className="mt-3 sm:mt-4 flex items-start gap-2 sm:gap-3 p-3 bg-green-400/5 rounded-xl border border-green-400/10">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-white/40 text-xs sm:text-sm md:text-base">
                By using Consistent.Guru, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="w-full px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-6 sm:pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Grid Layout */}
          <div className="block md:hidden">
            <div className="grid grid-cols-3 gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? "bg-green-400/20 text-green-400 border border-green-400/30 shadow-lg shadow-green-400/5"
                        : "bg-white/[0.03] text-white/50 border border-white/5 hover:bg-white/[0.06]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-green-400" : ""}`} />
                    <span className="text-[9px] font-medium text-center leading-tight">{category.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Desktop: Scrollable Row */}
          <div className="hidden md:block">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-start lg:justify-center">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm whitespace-nowrap transition-all flex-shrink-0 ${
                      isActive
                        ? "bg-green-400/20 text-green-400 border border-green-400/30 shadow-lg shadow-green-400/5"
                        : "bg-white/[0.03] text-white/50 border border-white/5 hover:bg-white/[0.06]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-green-400" : ""}`} />
                    <span>{category.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="w-full px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto">
          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-3 sm:mb-4 md:mb-6 text-[10px] sm:text-xs md:text-sm text-white/30 px-1"
          >
            {filteredSections.length} {filteredSections.length === 1 ? "section" : "sections"} found
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-2.5 sm:space-y-3 md:space-y-4"
            >
              {filteredSections.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-20">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🔍</div>
                  <p className="text-white/40 text-base sm:text-lg md:text-xl">No sections found</p>
                  <p className="text-white/20 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Try adjusting your search terms</p>
                </div>
              ) : (
                filteredSections.map((section, index) => {
                  const isOpen = openSection === index;
                  const Icon = section.icon;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`bg-white/[0.03] rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                        isOpen 
                          ? "border-green-400/30 shadow-lg shadow-green-400/5" 
                          : "border-white/5 hover:border-white/10"
                      }`}
                    >
                      <button
                        onClick={() => setOpenSection(isOpen ? null : index)}
                        className="w-full text-left px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 lg:py-6 flex items-center justify-between gap-2 sm:gap-3 md:gap-4"
                      >
                        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 min-w-0">
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isOpen 
                              ? "bg-green-400/20 text-green-400" 
                              : "bg-white/5 text-white/30"
                          }`}>
                            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] sm:text-xs text-green-400/60 font-mono">{section.num}.</span>
                              <span className={`text-sm sm:text-base md:text-lg lg:text-xl transition-colors truncate ${
                                isOpen ? "text-white" : "text-white/80"
                              }`}>
                                {section.title}
                              </span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`p-0.5 sm:p-1 rounded-full transition-all flex-shrink-0 ${
                            isOpen ? "text-green-400" : "text-white/30"
                          }`}
                        >
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-3 sm:pb-4 md:pb-5 lg:pb-6 text-white/50 text-sm sm:text-base md:text-lg leading-relaxed border-t border-white/5 pt-3 sm:pt-4 md:pt-5 lg:pt-6">
                              <div className="flex items-start gap-2 sm:gap-3">
                                <div className="w-0.5 h-full min-h-[16px] sm:min-h-[20px] rounded-full bg-gradient-to-b from-green-400 to-emerald-400 opacity-30 flex-shrink-0" />
                                <div className="whitespace-pre-wrap">{section.content}</div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 sm:mt-16 md:mt-20"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-green-400/10 via-emerald-400/5 to-green-400/10 rounded-2xl sm:rounded-3xl border border-green-400/20 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-green-400/10 blur-3xl rounded-full hidden sm:block" />
              <div className="absolute bottom-0 left-0 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 bg-emerald-400/10 blur-3xl rounded-full hidden sm:block" />
              
              <div className="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-400/20 border border-green-400/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-green-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90">
                    Questions about these Terms?
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-white/50 mt-0.5 sm:mt-1">
                    We're here to help clarify our Terms and Conditions.
                  </p>
                  
                  <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                    <a 
                      href="mailto:info@lore-more.com"
                      className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-green-400 to-emerald-400 text-[#0a0f0e] font-semibold rounded-xl text-sm sm:text-base md:text-lg hover:shadow-lg hover:shadow-green-400/20 transition-all transform hover:scale-105 w-full sm:w-auto justify-center sm:justify-start"
                    >
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      Contact Us
                      <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                    <span className="text-white/20 text-xs sm:text-sm md:text-base flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
                      Response within 24 hours
                    </span>
                  </div>

                  <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-white/5">
                    <p className="text-white/30 text-xs sm:text-sm md:text-base">
                      <span className="font-medium text-white/40">Lore-More Pvt. Ltd</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 mt-2">
                      {[
                        { label: "Email", value: "info@lore-more.com" },
                        { label: "Website", value: "consistent.guru" },
                        { label: "Address", value: "Sunnyvale, CA, USA" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 sm:gap-2 text-white/30 text-[10px] sm:text-xs md:text-sm">
                          <span className="text-white/20">{item.label}:</span>
                          <span className="text-white/40 truncate">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 sm:mt-16 md:mt-20 text-center"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 text-white/20 text-xs sm:text-sm md:text-base">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-400/30" />
              <span>By using Consistent.Guru, you agree to these Terms.</span>
            </div>
            <p className="text-white/20 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 max-w-2xl mx-auto px-2">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Lore-More Pvt. Ltd.
            </p>
            
            <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-[8px] sm:text-[10px] md:text-xs text-white/20">
              <span>© 2026 Consistent.Guru</span>
              <span className="w-px h-3 bg-white/5" />
              <span>LoreMore Pvt.Ltd</span>
              <span className="w-px h-3 bg-white/5" />
              <a href="mailto:info@lore-more.com" className="hover:text-green-400/40 transition-colors">
                info@lore-more.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrollbar hide CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;