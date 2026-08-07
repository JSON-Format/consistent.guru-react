import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Search, 
  Mail, 
  Headphones, 
  HelpCircle, 
  BookOpen, 
  User, 
  Settings, 
  Shield, 
  AlertCircle, 
  Check,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Clock,
  Send,
  Zap,
  Target
} from "lucide-react";

const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
    { id: "all", label: "All", icon: HelpCircle },
    { id: "getting-started", label: "Getting Started", icon: BookOpen },
    { id: "managing-habits", label: "Habits", icon: Settings },
    { id: "account", label: "Account", icon: User },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "technical", label: "Technical", icon: AlertCircle },
  ];

  const faqs = [
    {
      category: "getting-started",
      question: "How do I create an account?",
      answer: "Create your account using your email address and follow the instructions provided. Once your account is set up, you can start creating and tracking your habits."
    },
    {
      category: "getting-started",
      question: "How do I create a habit?",
      answer: "Go to your habit dashboard and select Add Habit. Enter the habit you want to build, choose your preferred schedule, and save it."
    },
    {
      category: "getting-started",
      question: "How do I track a habit?",
      answer: "Open your habit list and mark the habit as completed whenever you finish it. Your progress will automatically be recorded."
    },
    {
      category: "getting-started",
      question: "Can I create multiple habits?",
      answer: "Yes. You can create and track multiple habits based on your personal goals and routine."
    },
    {
      category: "managing-habits",
      question: "Can I edit a habit?",
      answer: "Yes. You can update your habit name, schedule, reminders, or other available settings from the habit management section."
    },
    {
      category: "managing-habits",
      question: "Can I delete a habit?",
      answer: "Yes. Select the habit you want to remove and use the delete option. Please note that deleting a habit may also remove its associated tracking history, depending on how the feature works."
    },
    {
      category: "managing-habits",
      question: "Can I change my habit schedule?",
      answer: "Yes. You can modify your habit schedule from the habit settings."
    },
    {
      category: "managing-habits",
      question: "Can I set reminders?",
      answer: "If reminders are available in your version of the app, you can enable them from your habit settings or notification preferences."
    },
    {
      category: "account",
      question: "I can't log in. What should I do?",
      answer: "Make sure you are using the email address associated with your account. If you are still unable to access your account, contact us at info@lore-more.com and include the email address associated with your account."
    },
    {
      category: "account",
      question: "Can I change my email address?",
      answer: "If this feature is available, you can change your email address from your account settings. Otherwise, contact our support team for assistance."
    },
    {
      category: "account",
      question: "How do I delete my account?",
      answer: "You can delete your account from your account settings if the option is available. You can also contact info@lore-more.com and request account deletion."
    },
    {
      category: "privacy",
      question: "What information do you collect?",
      answer: "We may collect information such as your email address, account information, habits, habit progress, and technical information needed to operate and improve the Service. For more information, please read our Privacy Policy."
    },
    {
      category: "privacy",
      question: "Is my habit information private?",
      answer: "We take reasonable measures to protect your information and do not sell your personal habit information. Please review our Privacy Policy to learn more about how your information is collected, used, stored, and protected."
    },
    {
      category: "privacy",
      question: "Can I request deletion of my data?",
      answer: "Yes. You can request deletion of your account and associated personal information by using the available account deletion feature or contacting info@lore-more.com."
    },
    {
      category: "technical",
      question: "The app isn't working correctly. What should I do?",
      answer: "Try refreshing or restarting the app, check your internet connection, make sure you are using the latest version, or sign out and sign back in. If the problem continues, contact our support team with a description and screenshot of the issue."
    },
    {
      category: "technical",
      question: "My habit progress isn't showing correctly.",
      answer: "First, refresh the app and check that you are signed into the correct account. If your progress is still incorrect, contact info@lore-more.com with details about the habit and the issue you're experiencing."
    }
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeCategory === "all"
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="min-h-screen w-full bg-[#0a0f0e] text-white overflow-x-hidden">
      
      {/* Background Glow */}
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
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>24/7 Support</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-9xl font-bold leading-[1.1] sm:leading-[1.05] mb-5 font-serif">
              <span className="block text-white">
                How can we
              </span>
              <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent mt-1 sm:mt-0">
                help you?
              </span>
            </h1>
            
         <div className=" bg-white/5 border border-white/5 pb-8 pt-8 rounded-2xl">
               <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/50 max-w-3xl mx-auto mt-3 sm:mt-4 md:mt-6 px-2 leading-relaxed">
              Welcome to Consistent.Guru Support! We're here to help you get the most out of your habit-tracking journey.
            </p>

             <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/50 max-w-3xl mx-auto mt-3 sm:mt-4 md:mt-6 px-2 leading-relaxed">
                Whether you're having trouble with your account, tracking a habit, or simply have a question about how something works, we're happy to help.
            </p>
            
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-white/30">
              <span>Need help?</span>
              <a href="mailto:info@lore-more.com" className="text-green-400 font-medium hover:text-green-300 transition-colors inline-flex items-center gap-1">
                info@lore-more.com
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>
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
                  placeholder="Search for help..."
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
                { icon: BookOpen, label: isMobile ? "16" : "16 Articles", color: "text-blue-400" },
                { icon: Clock, label: isMobile ? "24/7" : "24/7 Support", color: "text-green-400" },
                { icon: Zap, label: isMobile ? "Fast" : "Fast Response", color: "text-yellow-400" },
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

      {/* Category Filter - Grid on Mobile, Scroll on Desktop */}
      <div className="w-full px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-4 sm:pb-6 md:pb-8">
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

      {/* FAQ Section */}
      <div className="w-full px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
        <div className="max-w-6xl mx-auto">
          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-3 sm:mb-4 md:mb-6 text-[10px] sm:text-xs md:text-sm text-white/30 px-1"
          >
            {filteredFaqs.length} {filteredFaqs.length === 1 ? "result" : "results"} found
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
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-20">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🔍</div>
                  <p className="text-white/40 text-base sm:text-lg md:text-xl">No results found</p>
                  <p className="text-white/20 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Try adjusting your search terms</p>
                </div>
              ) : (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`bg-white/[0.03] rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                        isOpen 
                          ? "border-green-400/30 shadow-lg shadow-green-400/5" 
                          : "border-white/5 hover:border-white/10"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 lg:py-6 flex items-center justify-between gap-2 sm:gap-3 md:gap-4"
                      >
                        <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                          <div className={`w-1 h-1 rounded-full mt-1.5 sm:mt-2 transition-all flex-shrink-0 ${
                            isOpen ? "bg-green-400" : "bg-white/20"
                          }`} />
                          <span className={`text-sm sm:text-base md:text-lg lg:text-xl transition-colors ${
                            isOpen ? "text-white" : "text-white/80"
                          }`}>
                            {faq.question}
                          </span>
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
                                <div>{faq.answer}</div>
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
                  <Headphones className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-green-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/90">
                    Still need help?
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-white/50 mt-0.5 sm:mt-1">
                    We're here to assist you with any questions or concerns.
                  </p>
                  
                  <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                    <a 
                      href="mailto:info@lore-more.com"
                      className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-green-400 to-emerald-400 text-[#0a0f0e] font-semibold rounded-xl text-sm sm:text-base md:text-lg hover:shadow-lg hover:shadow-green-400/20 transition-all transform hover:scale-105 w-full sm:w-auto justify-center sm:justify-start"
                    >
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                      Contact Support
                      <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                    <span className="text-white/20 text-xs sm:text-sm md:text-base flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
                      Response within 24 hours
                    </span>
                  </div>

                  <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-white/5">
                    <p className="text-white/30 text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3">
                      When contacting support, please include:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">
                      {[
                        "Email address",
                        "Issue description",
                        "What you were doing",
                        "Error message",
                        "Screenshot"
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 sm:gap-2 text-white/30 text-[10px] sm:text-xs md:text-sm">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400/50 flex-shrink-0" />
                          <span className="truncate">{item}</span>
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
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-400/30" />
              <span>We're here to help you stay consistent.</span>
            </div>
            <p className="text-white/20 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 max-w-2xl mx-auto px-2">
              Building better habits takes time. If something isn't working, let us know—we'll do our best to help you get back on track.
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

export default Support;