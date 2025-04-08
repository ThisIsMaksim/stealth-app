import {Button} from "keep-react"

export const Landing = () => {
  return (
    <div className="h-[100vh] w-[calc(100vw+8px)] mr-[-4px] ml-[-16px] text-start bg-white from-slate-50 to-white overflow-y-auto">
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg z-50 border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Button variant="link" className="p-0">
              <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Elvyn</a>
            </Button>
            <div className="space-x-6">
              <Button variant="link" className="p-0">
                <a href="#home" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</a>
              </Button>
              <Button variant="link" className="p-0">
                <a href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a>
              </Button>
              <Button variant="link" className="p-0">
                <a href="#mission" className="text-gray-600 hover:text-indigo-600 transition-colors">Mission</a>
              </Button>
              <Button variant="link" className="p-0">
                <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">How It Works</a>
              </Button>
              <Button variant="link" className="p-0">
                <a href="#benefits" className="text-gray-600 hover:text-indigo-600 transition-colors">Benefits</a>
              </Button>
              <Button variant="link" className="p-0">
                <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
              </Button>
              <Button 
                onClick={() => window.location.href = '/app'}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          </div>
        </nav>
      </header>
      <main className="space-y-4 pt-24 overflow-x-hidden">
        <section id="home" className="container mx-auto px-4 py-16 text-center relative">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl opacity-50 border-gray-900"

          ></div>
          <div className="relative">
            <h1 className="text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Elvyn - Boost Your Social Media
              </span>
              <br/>
              <span className="text-gray-900">Engagement with AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Effortlessly build relationships, scale outreach, and grow your network on Social Media with our AI-powered
              automation.
            </p>
            <div className="flex justify-center space-x-6">
              <Button 
                className="px-8 py-4 rounded-full text-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                size="xl"
                onClick={() => window.location.href = '/app'}
              >
                Start Your Free Trial
              </Button>
            </div>
          </div>
        </section>
        <section id="about" className="container mx-auto px-4 py-16 relative">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl opacity-10"
          ></div>
          <div className="max-w-4xl mx-auto relative">
            <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">What is Our Platform?</h2>
            <p className="text-xl text-gray-600 mb-16 text-center">
              Our AI-powered SaaS platform is designed to automate and optimize your Social Media interactions.
              Whether you're building connections, managing outreach campaigns, or generating leads,
              we help you achieve your goals faster and smarter.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl mb-6 inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       data-lucide="zap" className="lucide lucide-zap text-white h-10 w-10">
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">AI-Powered Engagement</h3>
                <p className="text-gray-600">Generate suggestions of personalized comments and messages for impactful interactions.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl mb-6 inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       data-lucide="bar-chart-2" className="lucide lucide-bar-chart-2 text-white h-10 w-10">
                    <line x1="18" x2="18" y1="20" y2="10"></line>
                    <line x1="12" x2="12" y1="20" y2="4"></line>
                    <line x1="6" x2="6" y1="20" y2="14"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Advanced Analytics</h3>
                <p className="text-gray-600">Track campaign performance and optimize your strategy in real-time.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl mb-6 inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       data-lucide="rocket" className="lucide lucide-rocket text-white h-10 w-10">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Seamless Automation</h3>
                <p className="text-gray-600">Schedule and manage Social Media outreach effortlessly.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="mission" className="container mx-auto px-4 py-16 relative">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl opacity-30"
          ></div>
          <div className="max-w-4xl mx-auto relative">
            <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Our Mission</h2>
            <p className="text-xl text-gray-600 mb-16 text-center">
              At Elvyn, we aim to empower professionals and businesses to thrive on Social Media by leveraging AI to
              make meaningful connections, scale efforts, and achieve measurable results. We're here to transform the
              way you engage online.
            </p>
            <div className="bg-white p-12 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       data-lucide="target" className="lucide lucide-target text-white h-10 w-10">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-center text-gray-900">Transforming Social Media Engagement</h3>
                <p className="text-xl text-gray-600 text-center">
                  Our goal is to revolutionize how professionals interact on Social Media, making
                  every connection count and every interaction meaningful.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="container mx-auto px-4 py-16 relative">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl opacity-20"
          ></div>
          <div className="max-w-4xl mx-auto relative">
            <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">How It Works</h2>
            <p className="text-xl text-gray-600 mb-16 text-center">
              Our streamlined process helps you automate and optimize your Social Media engagement effectively.
            </p>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-200 to-purple-200"></div>
              <div className="space-y-24">
                <div className="relative flex items-center group">
                  <div className="w-1/2 pr-16 text-right">
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Select Your Target Audience</h3>
                      <p className="text-gray-600">Upload Social Media profiles or define specific criteria for your outreach campaigns.</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="target" className="lucide lucide-target w-8 h-8 text-white">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                  <div className="w-1/2 pl-16"></div>
                </div>

                <div className="relative flex items-center group">
                  <div className="w-1/2 pr-16"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="zap" className="lucide lucide-zap w-8 h-8 text-white">
                      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                    </svg>
                  </div>
                  <div className="w-1/2 pl-16 text-left">
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Customize Interactions</h3>
                      <p className="text-gray-600">Use AI to craft personalized comments and messages that resonate with your audience.</p>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center group">
                  <div className="w-1/2 pr-16 text-right">
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Launch Campaigns</h3>
                      <p className="text-gray-600">Schedule posts, monitor activity, and let Elvyn automate your engagement strategy.</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="rocket" className="lucide lucide-rocket w-8 h-8 text-white">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                    </svg>
                  </div>
                  <div className="w-1/2 pl-16"></div>
                </div>

                <div className="relative flex items-center group">
                  <div className="w-1/2 pr-16"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="bar-chart-2" className="lucide lucide-bar-chart-2 w-8 h-8 text-white">
                      <line x1="18" x2="18" y1="20" y2="10"></line>
                      <line x1="12" x2="12" y1="20" y2="4"></line>
                      <line x1="6" x2="6" y1="20" y2="14"></line>
                    </svg>
                  </div>
                  <div className="w-1/2 pl-16 text-left">
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Track Results</h3>
                      <p className="text-gray-600">Gain insights through detailed analytics to refine your strategy and improve results.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="benefits" className="container mx-auto px-4 py-16 relative">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl opacity-20"
          ></div>
          <div className="max-w-6xl mx-auto relative">
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Who Can Benefit from Our Platform?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="briefcase" className="lucide lucide-briefcase text-white h-8 w-8">
                      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Entrepreneurs</h3>
                  <p className="text-gray-600">Expand your professional network and find new opportunities.</p>
                </div>
              </div>

              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="user-plus" className="lucide lucide-user-plus text-white h-8 w-8">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <line x1="19" x2="19" y1="8" y2="14"></line>
                      <line x1="22" x2="16" y1="11" y2="11"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">HR Professionals</h3>
                  <p className="text-gray-600">Streamline talent acquisition and foster meaningful relationships.</p>
                </div>
              </div>

              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="trending-up" className="lucide lucide-trending-up text-white h-8 w-8">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Sales Managers</h3>
                  <p className="text-gray-600">Scale outreach efforts and close more deals.</p>
                </div>
              </div>

              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         data-lucide="users" className="lucide lucide-users text-white h-8 w-8">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Career Development Professionals</h3>
                  <p className="text-gray-600">Build your personal brand and grow your connections.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="container mx-auto px-4 py-16 relative">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-sky-50 rounded-3xl opacity-20"
          ></div>
          <div className="max-w-6xl mx-auto relative">
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-10"></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           data-lucide="bot" className="lucide lucide-bot text-white h-8 w-8">
                        <path d="M12 8V4H8"></path>
                        <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                        <path d="M2 14h2"></path>
                        <path d="M20 14h2"></path>
                        <path d="M15 13v2"></path>
                        <path d="M9 13v2"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">AI-Powered Suggestions</h3>
                    <p className="text-gray-600">Smart suggestions messaging that maintains your authentic voice</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-10"></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           data-lucide="network" className="lucide lucide-network text-white h-8 w-8">
                        <rect x="16" y="16" width="6" height="6" rx="1"></rect>
                        <rect x="2" y="16" width="6" height="6" rx="1"></rect>
                        <rect x="9" y="2" width="6" height="6" rx="1"></rect>
                        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path>
                        <path d="M12 12V8"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Network Analysis</h3>
                    <p className="text-gray-600">Identify and connect with key professionals in your industry</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-10"></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           data-lucide="message-square" className="lucide lucide-message-square text-white h-8 w-8">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Smart Engagement</h3>
                    <p className="text-gray-600">Automated responses that feel personal and meaningful</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-10"></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           data-lucide="shield" className="lucide lucide-shield text-white h-8 w-8">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Safe & Secure</h3>
                    <p className="text-gray-600">Enterprise-grade security for your Social Media automation</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-10"></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           data-lucide="settings" className="lucide lucide-settings text-white h-8 w-8">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Custom Workflows</h3>
                    <p className="text-gray-600">Create and optimize your engagement strategies</p>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-10"></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           data-lucide="sparkles" className="lucide lucide-sparkles text-white h-8 w-8">
                        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                        <path d="M20 3v4"></path>
                        <path d="M22 5h-4"></path>
                        <path d="M4 17v2"></path>
                        <path d="M5 18H3"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Smart Analytics</h3>
                    <p className="text-gray-600">Deep insights into your networking effectiveness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-16 relative">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-3xl opacity-10"
          ></div>
          <div className="max-w-4xl mx-auto relative text-center">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Ready to Transform Your Social Media Strategy?</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join thousands of professionals who are already leveraging our AI-powered platform to boost their Social
              Media engagement.
            </p>
            <div className="flex justify-center space-x-6">
              <Button 
                size="xl" 
                className="px-8 py-4 rounded-full text-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                onClick={() => window.location.href = '/app'}
              >
                Start Your Free Trial Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-20 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Elvyn</h3>
              <a href="/terms-of-use" className="text-gray-400 hover:text-indigo-400 transition-colors block">Terms of use</a>
              <p className="text-gray-400">
                <a href="https://ycula.com" className="hover:text-indigo-400 transition-colors">powered by Elvyn</a>
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/104867789" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-indigo-400 transition-colors">
                  <svg className="h-8 w-8" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-400 hover:text-indigo-400 transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-indigo-400 transition-colors">About</a></li>
                <li><a href="#mission" className="text-gray-400 hover:text-indigo-400 transition-colors">Mission</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-indigo-400 transition-colors">How It Works</a></li>
                <li><a href="#benefits" className="text-gray-400 hover:text-indigo-400 transition-colors">Benefits</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-indigo-400 transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Contact Us</h3>
              <div className="space-y-4">
                <p className="flex items-start space-x-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       data-lucide="mail" className="lucide lucide-mail h-5 w-5 mt-1 flex-shrink-0">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <a href="mailto:support@elvyn.ai" className="hover:text-indigo-400 transition-colors">support@elvyn.ai</a>
                </p>
                <p className="flex items-start space-x-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       data-lucide="map-pin" className="lucide lucide-map-pin h-5 w-5 mt-1 flex-shrink-0">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
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
              <h3 className="text-xl font-semibold mb-6 text-white">Working Hours</h3>
              <div className="space-y-3 text-gray-400">
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
              <Button 
                size="lg" 
                className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                onClick={() => window.open("https://t.me/elvyn_ai", "_blank")}
              >
                Contact Us
              </Button>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800">
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