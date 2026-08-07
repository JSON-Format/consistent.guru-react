import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import guru from "../../assets/guru-consistency.png";

const PrivacyPolicy: React.FC = () => {
  const [, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionIds = ['intro', 'who', 'collect', 'use', 'legal', 'habit', 'share', 'third', 'international', 'retention', 'security', 'rights', 'california', 'eea', 'children', 'marketing', 'deletion', 'accuracy', 'dnt', 'changes', 'contact', 'consent'];
    
    sectionIds.forEach(id => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      
      const element = sectionRefs.current[id];
      if (element) {
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0f0e] text-white overflow-x-hidden">
      
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-green-400/5 blur-[100px] rounded-full" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[180px] rounded-full" />
      </div>

      {/* Hero Section - No Navbar */}
      <section className="pt-8 md:pt-16 pb-8 px-4 sm:px-6 md:px-12 lg:px-20 md:pb-12  min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-green-400/50 mb-3">
                  Privacy Policy
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-9xl font-serif  leading-[1.05]">
                  Privacy
                 {" "}<span className="text-green-400 font-medium">Policy</span>
                </h1>
                <p className="text-white/30 text-sm mt-3">
                  Last Updated: August 5, 2026
                </p>
              </div>
              
              <p className="text-white/50 text-sm md:text-base max-w-lg leading-relaxed">
                We respect your privacy and are committed to protecting your personal information.
              </p>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex justify-center items-center overflow-hidden"
            >
<div
  className="
    relative
    w-[220px] h-[220px]
    sm:w-[280px] sm:h-[280px]
    md:w-[380px] md:h-[380px]
    lg:w-[420px] lg:h-[420px]
    mx-auto
    rounded-full
    overflow-hidden
  "
>
                {/* Rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-green-400/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-3 rounded-full border border-green-400/15"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-6 rounded-full border border-green-400/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Accent Rings */}
                <motion.div
                  className="absolute inset-1 rounded-full border-2 border-transparent"
                  style={{
                    borderTopColor: "rgba(34,197,94,0.3)",
                    borderRightColor: "rgba(34,197,94,0.05)",
                    borderBottomColor: "rgba(34,197,94,0.05)",
                    borderLeftColor: "rgba(34,197,94,0.05)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border-2 border-transparent"
                  style={{
                    borderTopColor: "rgba(16,185,129,0.05)",
                    borderRightColor: "rgba(16,185,129,0.3)",
                    borderBottomColor: "rgba(16,185,129,0.05)",
                    borderLeftColor: "rgba(16,185,129,0.05)",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />

                {/* Glow */}
                <motion.div
                  className="absolute inset-10 rounded-full bg-green-400/20 blur-[100px]"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Image */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute inset-0 flex items-center justify-center z-20"
                >
                 <img
  src={guru}
  alt="guru"
 className="
w-[130px]
sm:w-[170px]
md:w-[220px]
lg:w-[260px]
object-contain
relative
z-20
"
  style={{
    filter: "drop-shadow(0 0 60px rgba(34,197,94,.35))",
  }}
/>
                </motion.div>

            
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        
        {/* Intro */}
        <motion.div
          ref={(el) => {
  sectionRefs.current["intro"] = el;
}}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="bg-white/[0.02] rounded-2xl p-5 md:p-8 border border-white/5">
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              At <span className="text-green-400 font-medium">Consistent.Guru</span>, we respect your privacy and are committed to protecting the personal information you provide when using our website, mobile application, and related services (collectively, the "Service"). This Privacy Policy explains what information we collect, how we use it, how we protect it, when we share it, and the choices and rights available to you.
            </p>
            <div className="mt-4 p-3 bg-green-400/5 rounded-xl border border-green-400/10">
              <p className="text-white/40 text-xs md:text-sm flex items-center gap-2">
                <span className="text-green-400">✦</span>
                By using the Service, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 01. Who We Are */}
        <motion.div
         ref={(el) => {
  sectionRefs.current["who"] = el;
}}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-green-400/40">01.</span>
            <h2 className="text-sm md:text-base font-light text-white/90">Who We Are</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="pl-6 md:pl-8">
            <div className="bg-white/[0.02] rounded-xl p-4 md:p-6 border border-white/5">
              <p className="text-white/70 text-sm md:text-base">
                The Service is operated by <span className="text-green-400 font-medium">LoreMore Pvt.Ltd</span>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Email</span>
                  <p className="text-xs text-white/60 font-medium mt-1 break-all">info@lore-more.com</p>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Website</span>
                  <p className="text-xs text-white/60 font-medium mt-1 break-all">https://consistent.guru/</p>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Address</span>
                  <p className="text-xs text-white/60 font-medium mt-1">Sunnyvale, CA, USA</p>
                </div>
              </div>
              <p className="text-white/40 text-xs md:text-sm mt-4 pt-3 border-t border-white/5">
                For privacy-related questions or requests, you can contact us at <span className="text-green-400 font-medium">info@lore-more.com</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 02. Information We Collect */}
        <motion.div
          ref={(el) => {
  sectionRefs.current["collect"] = el;
}}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-green-400/40">02.</span>
            <h2 className="text-sm md:text-base font-light text-white/90">Information We Collect</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="pl-6 md:pl-8">
            <p className="text-white/60 text-sm md:text-base mb-4 leading-relaxed">
              We collect information that you provide directly to us, information generated when you use the Service, and, where applicable, information collected automatically through technologies such as cookies.
            </p>
            <div className="space-y-3">
              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <h3 className="font-medium text-white/80 text-xs md:text-sm flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full" />
                  2.1 Information You Provide
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Depending on how you use the Service, we may collect your email address, account information, login or authentication information, habit names and descriptions, completion or tracking information, goals and routines, habit history and progress, reminders and preferences, and information you voluntarily provide through support requests or communications with us.
                </p>
                <p className="text-white/30 text-xs md:text-sm mt-2 pt-2 border-t border-white/5">
                  <span className="text-green-400/50">✦</span> You are not required to provide more information than is necessary to use the features of the Service.
                </p>
              </div>

              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <h3 className="font-medium text-white/80 text-xs md:text-sm flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full" />
                  2.2 Habit Information
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  Our core purpose is to help you create and track habits. This may include exercise habits, reading habits, sleep routines, meditation or mindfulness habits, productivity habits, study habits, work routines, personal goals, daily activities, and habit completion history.
                </p>
                <p className="text-white/30 text-xs md:text-sm mt-2 pt-2 border-t border-white/5">
                  <span className="text-green-400/50">✦</span> Some habits may potentially reveal information that could be considered sensitive or specially protected under certain privacy laws. Please do not enter sensitive personal information into the Service unless it is necessary for the feature you are using. We do not intentionally require sensitive personal information to create or track ordinary habits.
                </p>
              </div>

              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <h3 className="font-medium text-white/80 text-xs md:text-sm flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full" />
                  2.3 Automatically Collected Information
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  When you access or use the Service, we may automatically collect technical information such as your IP address, browser type, device type, operating system, app version, language and general location information, date and time of access, pages or features used, device identifiers, crash and diagnostic information, and general usage and interaction information. We use this information primarily to operate, secure, maintain, and improve the Service.
                </p>
              </div>

              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <h3 className="font-medium text-white/80 text-xs md:text-sm flex items-center gap-2 mb-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full" />
                  2.4 Cookies and Similar Technologies
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  We may use cookies, local storage, pixels, SDKs, and similar technologies to keep you signed in, remember preferences, maintain security, understand how the Service is used, improve performance, measure the effectiveness of our communications, and provide analytics where applicable. Some cookies or similar technologies may be provided by third-party service providers.
                </p>
                <p className="text-white/30 text-xs md:text-sm mt-2 pt-2 border-t border-white/5">
                  <span className="text-green-400/50">✦</span> Where required by applicable law, we will request your consent before using non-essential cookies or similar technologies. You may be able to manage cookies through your browser or device settings.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 03. How We Use Your Information */}
        <motion.div
         ref={(el) => {
  sectionRefs.current["use"] = el;
}}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-green-400/40">03.</span>
            <h2 className="text-sm md:text-base font-light text-white/90">How We Use Your Information</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="pl-6 md:pl-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <h3 className="font-medium text-white/80 text-xs md:text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Providing the Service
                </h3>
                <p className="text-white/40 text-xs md:text-sm mt-2 leading-relaxed">
                  We use your information to create and manage your account, store and display your habits, track your habit progress, provide reminders and notifications, synchronize your information across supported devices, provide features you request, and respond to customer support requests.
                </p>
              </div>
              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <h3 className="font-medium text-white/80 text-xs md:text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Improving the Service
                </h3>
                <p className="text-white/40 text-xs md:text-sm mt-2 leading-relaxed">
                  We may use information to understand how users interact with the Service, identify bugs and technical problems, improve features and functionality, develop new features, monitor performance, and conduct internal research and analysis.
                </p>
              </div>
              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <h3 className="font-medium text-white/80 text-xs md:text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Security and Fraud Prevention
                </h3>
                <p className="text-white/40 text-xs md:text-sm mt-2 leading-relaxed">
                  We may use information to protect accounts, detect suspicious activity, prevent fraud and abuse, protect our systems and infrastructure, investigate security incidents, and enforce our Terms and Conditions.
                </p>
              </div>
              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <h3 className="font-medium text-white/80 text-xs md:text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Communications
                </h3>
                <p className="text-white/40 text-xs md:text-sm mt-2 leading-relaxed">
                  We may use your email address to send account verification emails, login and authentication messages, password or security notifications, service announcements, important changes to the Service, and customer support communications. Where permitted by law, we may also send promotional communications. You can unsubscribe from marketing emails at any time.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 04. Legal Bases */}
        <motion.div
          ref={(el) => {
  sectionRefs.current["legal"] = el;
}}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-green-400/40">04.</span>
            <h2 className="text-sm md:text-base font-light text-white/90">Legal Bases for Processing</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="pl-6 md:pl-8">
            <p className="text-white/60 text-sm md:text-base mb-4 leading-relaxed">
              If you are located in a jurisdiction where a legal basis is required, we process personal information based on one or more of the following legal grounds:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                <span className="text-green-400 text-sm mt-0.5">✦</span>
                <div>
                  <span className="text-white/80 text-xs md:text-sm font-medium">Performance of a Contract</span>
                  <p className="text-white/40 text-xs md:text-sm mt-0.5">Processing necessary to provide the Service you requested, such as creating your account and storing your habits.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                <span className="text-green-400 text-sm mt-0.5">✦</span>
                <div>
                  <span className="text-white/80 text-xs md:text-sm font-medium">Consent</span>
                  <p className="text-white/40 text-xs md:text-sm mt-0.5">Processing based on your consent where required, such as certain marketing communications or non-essential cookies. You may withdraw consent where applicable.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                <span className="text-green-400 text-sm mt-0.5">✦</span>
                <div>
                  <span className="text-white/80 text-xs md:text-sm font-medium">Legitimate Interests</span>
                  <p className="text-white/40 text-xs md:text-sm mt-0.5">Processing reasonably necessary for legitimate business purposes, such as improving the Service, maintaining security, preventing fraud, and communicating with users. Where we rely on legitimate interests, we consider your privacy rights and interests.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                <span className="text-green-400 text-sm mt-0.5">✦</span>
                <div>
                  <span className="text-white/80 text-xs md:text-sm font-medium">Legal Obligations</span>
                  <p className="text-white/40 text-xs md:text-sm mt-0.5">Processing or retaining information when necessary to comply with applicable laws, regulations, legal processes, or lawful requests.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 05. How We Use Your Habit Data */}
        <motion.div
         ref={(el) => {
  sectionRefs.current["habit"] = el;
}}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-green-400/40">05.</span>
            <h2 className="text-sm md:text-base font-light text-white/90">How We Use Your Habit Data</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="pl-6 md:pl-8">
            <div className="bg-white/[0.02] rounded-xl p-4 md:p-6 border border-white/5">
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                Your habit information is primarily used to provide the habit-tracking functionality of the Service. We may use aggregated or de-identified information to understand general usage patterns and improve our product.
              </p>
              <div className="mt-4 p-3 bg-green-400/5 rounded-xl border border-green-400/10">
                <p className="text-white/50 text-xs md:text-sm flex items-start gap-2">
                  <span className="text-green-400 font-medium">✓</span>
                  <span><span className="text-green-400 font-medium">We do not sell your personal habit information.</span> We will not use your individual habit information for purposes unrelated to providing or improving the Service unless you have provided appropriate consent, the use is otherwise permitted by applicable law, or we are legally required to do so.</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 06. How We Share Your Information */}
        <motion.div
         ref={(el) => {
  sectionRefs.current["share"] = el;
}}

          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-green-400/40">06.</span>
            <h2 className="text-sm md:text-base font-light text-white/90">How We Share Your Information</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="pl-6 md:pl-8">
            <div className="space-y-3">
              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <h3 className="font-medium text-white/80 text-xs md:text-sm flex items-center gap-2 mb-2">
                  <span className="w-1 h-3 bg-green-400 rounded-full" />
                  Service Providers
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  We do not sell your personal information. We may share information with trusted third-party service providers when necessary to operate our business and provide the Service. These providers may include cloud hosting providers, database providers, authentication providers, email delivery providers, analytics providers, error monitoring providers, customer support providers, payment processors if applicable, and security and fraud-prevention providers.
                </p>
                <p className="text-white/30 text-xs md:text-sm mt-2 pt-2 border-t border-white/5">
                  These service providers are authorized to process information only as necessary to provide services to us and are expected to protect your information.
                </p>
              </div>
              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <h3 className="font-medium text-white/80 text-xs md:text-sm flex items-center gap-2 mb-2">
                  <span className="w-1 h-3 bg-green-400 rounded-full" />
                  Legal Requirements
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  We may disclose information if we reasonably believe disclosure is necessary to comply with a legal obligation, respond to a valid legal request, protect our rights or property, protect users or the public, detect or prevent fraud or security issues, or investigate violations of our Terms.
                </p>
              </div>
              <div className="bg-white/[0.02] rounded-xl p-4 border border-white/5">
                <h3 className="font-medium text-white/80 text-xs md:text-sm flex items-center gap-2 mb-2">
                  <span className="w-1 h-3 bg-green-400 rounded-full" />
                  Business Transfers
                </h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">
                  If LoreMore Pvt.Ltd is involved in a merger, acquisition, restructuring, financing, sale of assets, or similar transaction, personal information may be transferred as part of that transaction. We will take reasonable steps to ensure that your information remains protected.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 07-19 Compact */}
        {[
          { id: 'third', num: '07', title: 'Third-Party Services', content: 'The Service may use third-party services to help us operate and improve the platform. Examples may include services for authentication, hosting, databases, analytics, email, payments, notifications, security, and customer support. These third parties may process information according to their own privacy policies. Where appropriate, we encourage you to review the privacy policies of third-party services you interact with.' },
          { id: 'international', num: '08', title: 'International Data Transfers', content: 'Because our Service is available worldwide, your information may be processed or stored in countries other than the country where you live. These countries may have privacy laws that differ from those in your country. Where applicable law requires safeguards for international data transfers, we will use appropriate legal mechanisms and safeguards designed to protect your personal information.' },
          { id: 'retention', num: '09', title: 'Data Retention', content: 'We retain personal information only for as long as reasonably necessary to provide the Service, maintain your account, provide customer support, meet our legal and regulatory obligations, resolve disputes, prevent fraud and abuse, enforce our agreements, and maintain necessary business records. When personal information is no longer reasonably required, we will delete it or anonymize it, subject to applicable legal requirements. If you delete your account, we will take reasonable steps to delete or anonymize your account information and associated habit data, subject to information we are legally required or permitted to retain.' },
          { id: 'security', num: '10', title: 'Data Security', content: 'We take reasonable technical and organizational measures designed to protect your personal information against unauthorized access, unauthorized disclosure, accidental loss, destruction, alteration, and misuse. However, no internet transmission, electronic storage system, or online service can be guaranteed to be completely secure. You are also responsible for maintaining the security of your account credentials and devices.' },
          { id: 'rights', num: '11', title: 'Your Privacy Rights', content: 'Depending on where you live and the laws that apply to you, you may have rights regarding your personal information. These may include the right to access your personal information, request correction of inaccurate information, request deletion of your information, request restriction of certain processing, object to certain processing, request portability of certain information, withdraw consent where processing is based on consent, opt out of certain marketing communications, object to certain automated decision-making or profiling where applicable, and lodge a complaint with the relevant data protection authority. These rights are not absolute and may be subject to applicable legal exceptions. To exercise your rights, contact us at info@lore-more.com. We may need to verify your identity before completing certain requests.' },
          { id: 'california', num: '12', title: 'California Privacy Rights', content: 'If you are a California resident, you may have additional rights under applicable California privacy laws, including rights relating to knowing what personal information we collect, accessing personal information, requesting deletion of personal information, requesting correction of inaccurate personal information, obtaining information about how personal information is used and disclosed, opting out of certain sales or sharing of personal information where applicable, limiting certain uses of sensitive personal information where applicable, and non-discrimination for exercising applicable privacy rights. We do not sell personal information. To submit a California privacy request, contact info@lore-more.com.' },
          { id: 'eea', num: '13', title: 'European Economic Area and United Kingdom Users', content: 'If you are located in the European Economic Area or United Kingdom, you may have additional rights under applicable data protection laws. These may include rights to access, correction, deletion, restriction, objection, portability, and withdrawal of consent, subject to applicable legal requirements. Where applicable, you may also have the right to lodge a complaint with the data protection authority in your country. Our processing of personal information is intended to follow applicable data protection principles, including lawfulness, fairness, transparency, purpose limitation, data minimization, accuracy, storage limitation, and security.' },
          { id: 'children', num: '14', title: "Children's Privacy", content: 'The Service is not intended for children who are below the minimum age required to use the Service under applicable law. We do not knowingly collect personal information from children in violation of applicable laws. If you believe that a child has provided us with personal information without appropriate authorization, please contact us at info@lore-more.com. If we learn that we have collected personal information from a child in circumstances where collection is not permitted, we will take reasonable steps to delete the information.' },
          { id: 'marketing', num: '15', title: 'Marketing Communications', content: 'We may send you service-related communications that are necessary to operate your account. Where permitted by law, we may also send promotional emails about our products, features, updates, or offers. You can unsubscribe from promotional emails by clicking the unsubscribe link in the email or contacting us at info@lore-more.com. Even if you opt out of marketing communications, we may continue sending important service-related messages.' },
          { id: 'deletion', num: '16', title: 'Account Deletion', content: 'You may request deletion of your account and associated personal information. If an account deletion option is available within the Service, you can use that option to initiate deletion. Alternatively, you may contact info@lore-more.com. After receiving a valid deletion request, we will take reasonable steps to delete or anonymize your personal information, subject to applicable legal, security, and business requirements. Some information may remain temporarily in backups before being securely deleted or overwritten.' },
          { id: 'accuracy', num: '17', title: 'Data Accuracy', content: 'We aim to keep personal information accurate and up to date. You may update certain account information through the Service. If you believe that information we hold about you is inaccurate, you may contact us and request a correction.' },
          { id: 'dnt', num: '18', title: 'Do Not Track', content: 'Some browsers and devices provide "Do Not Track" signals or similar mechanisms. Because there is currently no universally accepted standard for interpreting such signals, our Service may not respond to all Do Not Track signals. Where required by applicable law, we will honor legally recognized privacy preference signals.' },
          { id: 'changes', num: '19', title: 'Changes to This Privacy Policy', content: 'We may update this Privacy Policy from time to time to reflect changes to our Service, data practices, technology, applicable laws, or business operations. When we make material changes, we may provide notice through the Service, email, or another appropriate method. The "Last Updated" date at the top of this Privacy Policy indicates when it was most recently updated. We encourage you to review this Privacy Policy periodically.' }
        ].map((item, idx) => (
          <motion.div
            key={idx}
           ref={(el) => {
  sectionRefs.current[item.id] = el;
}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.03 }}
            className="mb-6"
          >
            <div className="flex items-start gap-3 pl-6 md:pl-8 py-3 border-b border-white/5 last:border-0">
              <span className="text-[10px] tracking-[0.3em] uppercase text-green-400/40 font-mono whitespace-nowrap mt-0.5">
                {item.num}.
              </span>
              <div className="flex-1">
                <h3 className="text-xs md:text-sm font-light text-white/70">{item.title}</h3>
                <p className="text-white/40 text-xs md:text-sm mt-1 leading-relaxed">{item.content}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* 20. Contact Us */}
        <motion.div
          ref={(el) => {
  sectionRefs.current["contact"] = el;
}}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-green-400/40">20.</span>
            <h2 className="text-sm md:text-base font-light text-white/90">Contact Us</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="pl-6 md:pl-8">
            <div className="bg-white/[0.02] rounded-xl p-4 md:p-6 border border-white/5">
              <p className="text-white/60 text-sm md:text-base mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Company</span>
                  <p className="text-xs text-white/60 font-medium mt-1">LoreMore Pvt.Ltd</p>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-3 border border-green-400/20">
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Privacy Email</span>
                  <p className="text-xs text-green-400 font-medium mt-1">info@lore-more.com</p>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Website</span>
                  <p className="text-xs text-white/60 font-medium mt-1 break-all">https://consistent.guru/</p>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-3 border border-white/5">
                  <span className="text-[8px] uppercase tracking-wider text-white/30">Address</span>
                  <p className="text-xs text-white/60 font-medium mt-1">Sunnyvale, CA, USA</p>
                </div>
              </div>
              <p className="text-white/30 text-xs md:text-sm mt-4 pt-3 border-t border-white/5">
                We will make reasonable efforts to respond to privacy requests within the timeframe required by applicable law.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 21. Your Consent */}
        <motion.div
         ref={(el) => {
  sectionRefs.current["consent"] = el;
}}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-green-400/40">21.</span>
            <h2 className="text-sm md:text-base font-light text-white/90">Your Consent</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="pl-6 md:pl-8">
            <div className="relative overflow-hidden bg-gradient-to-br from-green-400/10 to-emerald-400/5 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-green-400/20">
              <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-green-400/10 blur-2xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-emerald-400/10 blur-2xl rounded-full" />
              <div className="relative">
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  By using the Service, you acknowledge that you have read this Privacy Policy. Where applicable law requires consent for a particular processing activity, we will obtain that consent separately. Your continued use of the Service does not override any consent requirements imposed by applicable law.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/30">
                  <span className="text-green-400">✦</span>
                  <span>We value your privacy and trust</span>
                 
                </div>
              </div>
            </div>
          </div>
        </motion.div>

    
    
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-white/5 px-4 sm:px-6 md:px-12 lg:px-20 py-6 md:py-10 bg-[#0a0f0e]/50"
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3 text-[8px] md:text-[9px] tracking-[0.15em] uppercase text-white/20">
            <span className="text-green-300">© 2026 Consistent.Guru</span>
            <span className="w-px h-3 bg-white/5" />
            <span className="text-gray-300">LoreMore Pvt.Ltd</span>
          </div>
          <div className="flex items-center gap-3 text-[7px] md:text-[8px] tracking-[0.2em] uppercase text-white/20">
            <span className="flex items-center gap-1.5">
              <motion.span
                className="w-1 h-1 rounded-full bg-green-400"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-green-300">stay consistent</span>
            </span>
            <span className="w-px h-3 bg-white/5" />
            <span className="text-gray-300">show up today</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default PrivacyPolicy;