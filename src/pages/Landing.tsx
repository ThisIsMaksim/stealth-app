import {Button} from "keep-react"
import {StripeProducts} from "../components/Stripe"

export const Landing = () => {
  return (
    <div className="light h-full overflow-y-auto ml-[-16px] mr-[-16px]">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Button variant="link" className="p-0">
              <a href="#home" className="text-2xl font-bold">Elvyn</a>
            </Button>
            <div className="space-x-6">
              <Button variant="link" className="p-0">
                <a href="#home">Home</a>
              </Button>
              <Button variant="link" className="p-0">
                <a href="#about">About</a>
              </Button>
              <Button variant="link" className="p-0">
                <a href="#mission">Mission</a>
              </Button>
              <Button variant="link" className="p-0">
                <a href="#how-it-works">How It Works</a>
              </Button>
              <Button variant="link" className="p-0">
                <a href="#benefits">Benefits</a>
              </Button>
              <Button variant="link" className="p-0">
                <a href="#features">Features</a>
              </Button>
              <Button variant="link" className="p-0">
                <a href="#prices">Prices</a>
              </Button>
              <Button onClick={() => window.location.href = '/'}>Get Started</Button>
            </div>
          </div>
        </nav>
      </header>
      <main className="pt-20">
        <section id="home" className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl font-bold mb-6 text-primary-400 leading-tight">
            Elvyn - Boost Your Social Media <br/>
            <span className="gradient-text">Engagement with AI</span>
          </h1>
          <p className="text-xl text-primary-600 mb-10 max-w-2xl mx-auto">
            Effortlessly build relationships, scale outreach, and grow your network on Social Media with our AI-powered
            automation.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="px-6 py-3 rounded-lg text-lg font-medium" size="xl"
                    onClick={() => window.location.href = '/'}>
              Start Your Free Trial
            </Button>
            <Button variant="outline" size="xl">
              Request a Demo for B2B
            </Button>
          </div>
        </section>
        <section id="about"
                 className="container mx-auto px-4 py-20 bg-gradient-to-br from--primary-50 to--primary-200 rounded-3xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center text-white">What is Our Platform?</h2>
            <p className="text-xl text-white mb-12 text-center">
              Our AI-powered SaaS platform is designed to automate and optimize your Social Media interactions.
              Whether you're building connections, managing outreach campaigns, or generating leads,
              we help you achieve your goals faster and smarter.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
              <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-lucide="zap" className="lucide lucide-zap text-primary-600 mb-4 h-10 w-10">
                  <path
                    d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                </svg>
                <h3 className="text-xl font-semibold mb-3 text-primary-600">AI-Powered Engagement</h3>
                <p className="text-primary-400">Generate suggestions of personalized comments and messages for impactful
                  interactions.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-lucide="bar-chart-2" className="lucide lucide-bar-chart-2 text-primary-600 mb-4 h-10 w-10">
                  <line x1="18" x2="18" y1="20" y2="10"></line>
                  <line x1="12" x2="12" y1="20" y2="4"></line>
                  <line x1="6" x2="6" y1="20" y2="14"></line>
                </svg>
                <h3 className="text-xl font-semibold mb-3 text-primary-600">Advanced Analytics</h3>
                <p className="text-primary-400">Track campaign performance and optimize your strategy in real-time.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-lucide="rocket" className="lucide lucide-rocket text-primary-600 mb-4 h-10 w-10">
                  <path
                    d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                  <path
                    d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                </svg>
                <h3 className="text-xl font-semibold mb-3 text-primary-600">Seamless Automation</h3>
                <p className="text-primary-400">Schedule and manage Social Media outreach effortlessly.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="mission" className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-primary-600">Our Mission</h2>
            <p className="text-xl text-primary-400 mb-10">
              At Elvyn, we aim to empower professionals and businesses to thrive on Social Media by leveraging AI to
              make meaningful connections, scale efforts, and achieve measurable results. We're here to transform the
              way you engage online.
            </p>
            <div className="bg-gradient-to-r from--primary-50 to--primary-200 p-8 rounded-lg shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   data-lucide="target" className="lucide lucide-target text-white h-16 w-16 mx-auto mb-4">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
              <h3 className="text-2xl font-semibold mb-3 text-white">Transforming Social Media Engagement</h3>
              <p className="text-white">Our goal is to revolutionize how professionals interact on Social Media, making
                every connection count and every interaction meaningful.</p>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center gradient-text">How It Works</h2>
            <p className="text-xl text-primary-400 mb-16 text-center">
              Our streamlined process helps you automate and optimize your Social Media engagement effectively.
            </p>

            <div className="relative">
              <div
                className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from--primary-50 to-primary-400"></div>
              <div className="space-y-24">
                <div className="relative flex items-center">
                  <div className="w-1/2 pr-16 text-right">
                    <h3 className="text-2xl font-bold text-primary-600 mb-2">Select Your Target Audience</h3>
                    <p className="text-primary-400">Upload Social Media profiles or define specific criteria for your
                      outreach campaigns.</p>
                  </div>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from--primary-50 to-primary-400 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="target" className="lucide lucide-target w-6 h-6 text-white">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                  <div className="w-1/2 pl-16"></div>
                </div>
                <div className="relative flex items-center">
                  <div className="w-1/2 pr-16"></div>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from--primary-50 to-primary-400 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="zap" className="lucide lucide-zap w-6 h-6 text-white">
                      <path
                        d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                    </svg>
                  </div>
                  <div className="w-1/2 pl-16 text-start">
                    <h3 className="text-2xl font-bold text-primary-600 mb-2">Customize Interactions</h3>
                    <p className="text-primary-400">Use AI to craft personalized comments and messages that resonate
                      with
                      your audience.</p>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <div className="w-1/2 pr-16 text-right">
                    <h3 className="text-2xl font-bold text-primary-600 mb-2">Launch Campaigns</h3>
                    <p className="text-primary-400">Schedule posts, monitor activity, and let Elvyn automate your
                      engagement strategy.</p>
                  </div>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from--primary-50 to-primary-400 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="rocket" className="lucide lucide-rocket w-6 h-6 text-white">
                      <path
                        d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                      <path
                        d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                    </svg>
                  </div>
                  <div className="w-1/2 pl-16"></div>
                </div>
                <div className="relative flex items-center">
                  <div className="w-1/2 pr-16"></div>
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from--primary-50 to-primary-400 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="bar-chart-2" className="lucide lucide-bar-chart-2 w-6 h-6 text-white">
                      <line x1="18" x2="18" y1="20" y2="10"></line>
                      <line x1="12" x2="12" y1="20" y2="4"></line>
                      <line x1="6" x2="6" y1="20" y2="14"></line>
                    </svg>
                  </div>
                  <div className="w-1/2 pl-16 text-start">
                    <h3 className="text-2xl font-bold text-primary-600 mb-2">Track Results</h3>
                    <p className="text-primary-400">Gain insights through detailed analytics to refine your strategy and
                      improve results.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="benefits" className="container mx-auto px-4 py-20 text-start">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary-600">Who Can Benefit from Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="bg-gradient-to-br from--primary-50 to--primary-200 p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   data-lucide="briefcase" className="lucide lucide-briefcase text-white mb-4 h-10 w-10">
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                <rect width="20" height="14" x="2" y="6" rx="2"></rect>
              </svg>
              <h3 className="text-xl font-semibold mb-3 text-white">Entrepreneurs</h3>
              <p className="text-white">Expand your professional network and find new opportunities.</p>
            </div>
            <div
              className="bg-gradient-to-br from--primary-50 to--primary-200 p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   data-lucide="user-plus" className="lucide lucide-user-plus text-white mb-4 h-10 w-10">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <line x1="19" x2="19" y1="8" y2="14"></line>
                <line x1="22" x2="16" y1="11" y2="11"></line>
              </svg>
              <h3 className="text-xl font-semibold mb-3 text-white">HR Professionals</h3>

              <p className="text-white">Streamline talent acquisition and foster meaningful relationships.</p>
            </div>
            <div
              className="bg-gradient-to-br from--primary-50 to--primary-200 p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   data-lucide="trending-up" className="lucide lucide-trending-up text-white mb-4 h-10 w-10">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              <h3 className="text-xl font-semibold mb-3 text-white">Sales Managers</h3>
              <p className="text-white">Scale outreach efforts and close more deals.</p>
            </div>
            <div
              className="bg-gradient-to-br from--primary-50 to--primary-200 p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   data-lucide="users" className="lucide lucide-users text-white mb-4 h-10 w-10">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <h3 className="text-xl font-semibold mb-3 text-white">Career Development Professionals</h3>
              <p className="text-white">Build your personal brand and grow your connections.</p>
            </div>
          </div>
        </section>
        <section id="features" className="container mx-auto px-4 py-20 text-start">
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-r from--primary-50 to--primary-200 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-lucide="bot" className="lucide lucide-bot text-primary-600 mb-4 h-8 w-8">
                  <path d="M12 8V4H8"></path>
                  <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                  <path d="M2 14h2"></path>
                  <path d="M20 14h2"></path>
                  <path d="M15 13v2"></path>
                  <path d="M9 13v2"></path>
                </svg>
                <h3 className="text-xl font-semibold mb-3 text-primary-600">AI-Powered Suggestions</h3>
                <p className="text-primary-400">Smart suggestions messaging that maintains your authentic voice</p>
              </div>
            </div>
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-r from--primary-50 to--primary-200 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-lucide="network" className="lucide lucide-network text-primary-600 mb-4 h-8 w-8">
                  <rect x="16" y="16" width="6" height="6" rx="1"></rect>
                  <rect x="2" y="16" width="6" height="6" rx="1"></rect>
                  <rect x="9" y="2" width="6" height="6" rx="1"></rect>
                  <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path>
                  <path d="M12 12V8"></path>
                </svg>
                <h3 className="text-xl font-semibold mb-3 text-primary-600">Network Analysis</h3>
                <p className="text-primary-400">Identify and connect with key professionals in your industry</p>
              </div>
            </div>
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-r from--primary-50 to--primary-200 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-lucide="message-square"
                     className="lucide lucide-message-square text-primary-600 mb-4 h-8 w-8">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <h3 className="text-xl font-semibold mb-3 text-primary-600">Smart Engagement</h3>
                <p className="text-primary-400">Automated responses that feel personal and meaningful</p>
              </div>
            </div>
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-r from--primary-50 to--primary-200 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-lucide="shield" className="lucide lucide-shield text-primary-600 mb-4 h-8 w-8">
                  <path
                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
                <h3 className="text-xl font-semibold mb-3 text-primary-600">Safe & Secure</h3>
                <p className="text-primary-400">Enterprise-grade security for your Social Media automation</p>
              </div>
            </div>
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-r from--primary-50 to--primary-200 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-lucide="settings" className="lucide lucide-settings text-primary-600 mb-4 h-8 w-8">
                  <path
                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <h3 className="text-xl font-semibold mb-3 text-primary-600">Custom Workflows</h3>
                <p className="text-primary-400">Create and optimize your engagement strategies</p>
              </div>
            </div>
            <div className="relative group">
              <div
                className="absolute inset-0 bg-gradient-to-r from--primary-50 to--primary-200 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-lucide="sparkles" className="lucide lucide-sparkles text-primary-600 mb-4 h-8 w-8">
                  <path
                    d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                <h3 className="text-xl font-semibold mb-3 text-primary-600">Smart Analytics</h3>
                <p className="text-primary-400">Deep insights into your networking effectiveness</p>
              </div>
            </div>
          </div>
        </section>
        <section id="prices" className="px-4 py-20">
          <StripeProducts isPrimaryColor />
        </section>
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary-600">Ready to Transform Your Social Media Strategy?</h2>
          <p className="text-xl text-primary-400 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who are already leveraging our AI-powered platform to boost their Social
            Media engagement.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="xl" onClick={() => window.location.href = '/'}>
              Start Your Free Trial Now
            </Button>
            <Button size="xl">
              Request a Demo
            </Button>
          </div>
        </section>
      </main>
      <footer className="bg-[#0F172A] text-white py-16 text-start">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold mb-4">Elvyn</h3>
              <a href="/terms-of-use" className="text-gray-400 hover:text--primary-50">Terms of use</a>
              <p className="text-gray-400 mb-4">
                <a href="https://ycula.com" className="hover:text--primary-50">powered by Ycula</a>
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/104867789" target="_blank" rel="noopener noreferrer"
                   className="text-white hover:text--primary-50">
                  <svg className="h-8 w-8" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text--primary-50">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text--primary-50">About</a></li>
                <li><a href="#mission" className="text-gray-400 hover:text--primary-50">Mission</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text--primary-50">How It Works</a></li>
                <li><a href="#benefits" className="text-gray-400 hover:text--primary-50">Benefits</a></li>
                <li><a href="#features" className="text-gray-400 hover:text--primary-50">Features</a></li>
                <li><a href="#prices" className="text-gray-400 hover:text--primary-50">Prices</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <div className="space-y-4">
                <p className="flex items-start space-x-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       data-lucide="mail" className="lucide lucide-mail h-5 w-5 mt-1 flex-shrink-0">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <a href="mailto:team@ycula.com" className="hover:text--primary-50">team@ycula.com</a>
                </p>
                <p className="flex items-start space-x-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       data-lucide="map-pin" className="lucide lucide-map-pin h-5 w-5 mt-1 flex-shrink-0">
                    <path
                      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>
                                FDBC2542, Compass Building,<br/>
                                Al Shohada Road, AL Hamra Industrial Zone-FZ,<br/>
                                Ras Al Khaimah, United Arab Emirates
                            </span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Working Hours</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       data-lucide="clock" className="lucide lucide-clock h-5 w-5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
                </p>
                <p className="ml-8">Saturday - Sunday: Closed</p>
              </div>
              <Button size="lg" className="mt-4" onClick={() => window.open("https://t.me/elvyn_ai", "_blank")}>
                Contact Us
              </Button>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2024 LEGAL TB Advisory FZ-LLC. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                LICENCE NO 47014786
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}