import { motion } from "framer-motion";
import { MessageSquare, Shield, Users, Target, CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "../Components/Navbar.jsx";
import { Link } from "react-router-dom";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 text-sm font-medium mb-6">
                <MessageSquare className="h-4 w-4" />
                <span>About Our Platform</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
                About <span className="text-blue-400">Anonymous Messaging</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We're building the future of anonymous communication, where privacy meets authentic connection in a professional, secure environment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 bg-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                To create a secure platform where authentic communication thrives through anonymity, 
                fostering genuine feedback and meaningful connections.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp} className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Privacy First</h3>
                    <p className="text-gray-400">
                      We prioritize user privacy and data security, ensuring complete anonymity for all interactions on our platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Secure Communication</h3>
                    <p className="text-gray-400">
                      Advanced encryption and security measures protect all messages and user data from unauthorized access.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Authentic Connections</h3>
                    <p className="text-gray-400">
                      Enable honest feedback and genuine communication without the barriers of identity disclosure.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="bg-gray-800 border border-gray-700 p-8 rounded-xl"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Our platform stands out by combining enterprise-grade security with user-friendly design, 
                  creating an environment where authentic communication can flourish while maintaining complete privacy.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">End-to-end encryption</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Zero data tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300">Professional-grade infrastructure</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">What We Offer</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Comprehensive features designed for seamless anonymous communication
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-gray-800 border border-gray-700 p-8 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6">
                  <MessageSquare className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Easy Setup</h3>
                <p className="text-gray-400 leading-relaxed">
                  Create your profile and generate your unique link in under a minute. Start receiving messages immediately with our streamlined onboarding process.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gray-800 border border-gray-700 p-8 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Anonymous Interaction</h3>
                <p className="text-gray-400 leading-relaxed">
                  Complete anonymity for message senders ensures honest, unfiltered communication while maintaining a safe and respectful environment.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gray-800 border border-gray-700 p-8 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Professional Design</h3>
                <p className="text-gray-400 leading-relaxed">
                  Clean, intuitive interface designed for professional use cases, from workplace feedback to personal development insights.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Connect?</h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join our community and start building authentic connections through anonymous communication.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;