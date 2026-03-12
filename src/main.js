import './style.css'

document.querySelector('#app').innerHTML = `
  <!-- Sidebar Navigation -->
  <aside id="sidebar" class="w-64 border-r flex flex-col h-full z-50 shadow-sm fixed md:static transform -translate-x-full md:translate-x-0 transition-all duration-300 ease-in-out">
    <div class="h-16 flex items-center px-6 border-b transition-colors duration-300">
      <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center mr-3 text-white font-bold shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
      </div>
      <h1 class="text-lg font-bold tracking-tight transition-colors duration-300">HealthEDI Analyzer</h1>
    </div>
    
    <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
      <a href="#" data-view="dashboard" class="nav-btn flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 transition-colors duration-300">
        <svg class="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        Dashboard
      </a>
      <a href="#" data-view="upload" class="nav-btn flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-300">
        <svg class="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
        Upload File
      </a>
      <a href="#" data-view="parsed" class="nav-btn flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-300">
        <svg class="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        Parsed Data
      </a>
      <a href="#" data-view="validation" class="nav-btn flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-300">
        <svg class="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        Validation Report
      </a>
      <a href="#" data-view="summary" class="nav-btn flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-300">
        <svg class="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        Summary
      </a>
      <a href="#" data-view="assistant" class="nav-btn flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-300 mt-8">
        <svg class="w-5 h-5 mr-3 text-teal-500 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        AI Assistant
      </a>
    </nav>
    <div class="p-4 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div class="flex items-center">
        <div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-sm transition-colors duration-300">
          JD
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-slate-700 dark:text-slate-200">John Doe</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Analyst</p>
        </div>
      </div>
    </div>
  </aside>

  <!-- Main Content Area -->
  <main class="flex-1 flex flex-col h-full overflow-y-auto relative transition-colors duration-300">
    <!-- Top Header -->
    <header class="h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700/70 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0 shadow-sm transition-colors duration-300">
      <div class="flex items-center">
        <button id="menuToggle" class="md:hidden p-2 mr-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <h2 id="topbar-title" class="text-xl font-bold transition-colors duration-300">Dashboard</h2>
      </div>
      
      <div class="flex items-center space-x-3 md:space-x-4">
        <!-- Search -->
        <div class="relative hidden sm:block">
          <svg class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" placeholder="Search claims, IDs..." class="pl-10 pr-4 py-2 w-48 md:w-64 bg-slate-100 dark:bg-slate-800 border-transparent rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/50 transition-all outline-none">
        </div>
        <!-- Theme Toggle -->
        <button id="themeToggle" class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300" aria-label="Toggle Dark Mode">
          <span class="dark:hidden">🌙</span>
          <span class="hidden dark:inline">☀️</span>
        </button>
      </div>
    </header>

    <!-- Scrollable Workspace -->
    <div id="workspace" class="flex-1 overflow-y-auto p-4 md:p-8 relative">
       <!-- Dashboard View -->
       <section id="view-dashboard" class="view-section animate-fade-in block">
          
          <div class="flex justify-between items-end mb-8">
            <div>
              <p class="text-slate-500 dark:text-slate-400 text-sm mb-1">Overview</p>
              <h3 class="text-2xl font-bold">EDI Performance</h3>
            </div>
            <button class="btn-primary flex items-center shadow-md shadow-blue-500/30" onclick="window.exportReport()">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              Export Report
            </button>
          </div>

          <!-- Stats Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="card animate-fade-in hover:shadow-md transition-shadow relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg class="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" /></svg>
              </div>
              <div class="flex items-center text-slate-500 dark:text-slate-400 mb-4 transition-colors duration-300">
                <div class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                </div>
                <h3 class="font-medium text-slate-500 dark:text-slate-400">Total Claims</h3>
              </div>
              <h2 id="claimsCount" class="text-3xl font-bold">0</h2>
              <p class="text-sm text-blue-600 dark:text-blue-500 mt-2 flex items-center font-medium">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                Parsed from CLP
              </p>
            </div>

            <div class="card animate-fade-in animate-delay-100 hover:shadow-md transition-shadow relative overflow-hidden group">
               <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg class="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" /></svg>
              </div>
              <div class="flex items-center text-slate-500 dark:text-slate-400 mb-4 transition-colors duration-300">
                <div class="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/40 flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16V15"></path></svg>
                </div>
                <h3 class="font-medium text-slate-500 dark:text-slate-400">Total Billed</h3>
              </div>
              <h2 id="totalBilled" class="text-3xl font-bold">$0.00</h2>
              <p class="text-sm text-red-500 dark:text-red-400 mt-2 flex items-center font-medium">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Gross Amount
              </p>
            </div>

            <div class="card animate-fade-in animate-delay-200 hover:shadow-md transition-shadow relative overflow-hidden group">
               <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg class="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>
              </div>
              <div class="flex items-center text-slate-500 dark:text-slate-400 mb-4 transition-colors duration-300">
                <div class="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/40 flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="font-medium text-slate-500 dark:text-slate-400">Total Paid</h3>
              </div>
              <h2 id="totalPaid" class="text-3xl font-bold">$0.00</h2>
              <p class="text-sm text-green-600 dark:text-green-500 mt-2 flex items-center font-medium">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Net Payment
              </p>
            </div>

            <div class="card animate-fade-in animate-delay-300 hover:shadow-md transition-shadow relative overflow-hidden group">
               <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg class="w-16 h-16 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
              </div>
              <div class="flex items-center text-slate-500 dark:text-slate-400 mb-4 transition-colors duration-300">
                <div class="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/40 flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-amber-500 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <h3 class="font-medium text-slate-500 dark:text-slate-400">Patient Resp.</h3>
              </div>
              <h2 id="patientResp" class="text-3xl font-bold">$0.00</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center font-medium">
                <svg class="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                Out of Pocket
              </p>
            </div>
          </div>

          <!-- Table -->
          <div class="card p-0 overflow-hidden animate-fade-in animate-delay-400">
            <div class="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center transition-colors duration-300">
              <h3 class="font-bold text-lg transition-colors duration-300">Recent Files</h3>
              <button class="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">View All</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[700px] text-left text-sm whitespace-nowrap">
                <thead class="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">
                  <tr>
                    <th class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">File Name</th>
                    <th class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Transaction Type</th>
                    <th class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Upload Time</th>
                    <th class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Status</th>
                    <th class="px-6 py-4 border-b border-slate-200 dark:border-slate-700 text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800 group/list transition-colors duration-300">
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td class="px-6 py-4 flex items-center">
                      <svg class="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <span class="font-medium text-slate-700 dark:text-slate-200">claim_batch_005.edi</span>
                    </td>
                    <td class="px-6 py-4 text-slate-600 dark:text-slate-300">837 Professional</td>
                    <td class="px-6 py-4 text-slate-500 dark:text-slate-400">2 mins ago</td>
                    <td class="px-6 py-4"><span class="badge-error">3 Errors</span></td>
                    <td class="px-6 py-4 text-right">
                      <button class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition font-medium text-sm" onclick="switchView('validation')">View Report</button>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td class="px-6 py-4 flex items-center">
                      <svg class="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <span class="font-medium text-slate-700 dark:text-slate-200">remittance_502.edi</span>
                    </td>
                    <td class="px-6 py-4 text-slate-600 dark:text-slate-300">835 Payment</td>
                    <td class="px-6 py-4 text-slate-500 dark:text-slate-400">45 mins ago</td>
                    <td class="px-6 py-4"><span class="badge-success">Valid</span></td>
                    <td class="px-6 py-4 text-right">
                      <button class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition font-medium text-sm" onclick="switchView('parsed')">Inspect</button>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td class="px-6 py-4 flex items-center">
                      <svg class="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      <span class="font-medium text-slate-700 dark:text-slate-200">enrollment_feb.edi</span>
                    </td>
                    <td class="px-6 py-4 text-slate-600 dark:text-slate-300">834 Enrollment</td>
                    <td class="px-6 py-4 text-slate-500 dark:text-slate-400">2 hours ago</td>
                    <td class="px-6 py-4"><span class="badge-warning">1 Warning</span></td>
                    <td class="px-6 py-4 text-right">
                      <button class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition font-medium text-sm" onclick="switchView('validation')">View Report</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
       </section>

       <section id="view-upload" class="view-section hidden animate-fade-in text-center h-full flex flex-col justify-center max-w-2xl mx-auto py-12">
          <h2 class="text-3xl font-bold mb-2 transition-colors duration-300">Upload EDI File</h2>
          <p class="text-slate-500 dark:text-slate-400 mb-8 transition-colors duration-300">Drop your 837, 835, or 834 file to parse and validate automatically.</p>
          
          <div id="drop-zone" class="border-2 border-dashed border-blue-300 dark:border-blue-700/50 rounded-2xl bg-blue-50/50 dark:bg-slate-800/80 p-12 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all cursor-pointer group flex flex-col items-center justify-center relative shadow-sm h-80">
            <div id="upload-content" class="flex flex-col items-center">
              <div class="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/60 transition-all shadow-sm">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              </div>
              <h3 class="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Drag & Drop your file here</h3>
              <p class="text-sm text-slate-500 dark:text-slate-500 mb-6">or</p>
              <button class="btn-primary shadow-lg shadow-blue-500/30">Browse Files</button>
              <input type="file" id="file-input" accept=".edi,.txt,.dat,.x12" class="hidden">
              <p class="text-xs text-slate-400 dark:text-slate-500 mt-6 font-medium">Supports .edi, .txt up to 10MB</p>
            </div>
            
            <div id="loading-content" class="hidden flex flex-col items-center justify-center w-full h-full absolute inset-0 bg-blue-50/90 dark:bg-slate-900/90 rounded-2xl backdrop-blur-sm z-10 transition-all animate-fade-in">
               <div class="loader-spinner w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 mb-4"></div>
               <h3 class="text-lg font-bold text-slate-700 dark:text-slate-200 animate-pulse">Parsing EDI Structure...</h3>
               <p id="loading-file-name" class="text-sm font-bold text-blue-700 dark:text-blue-400 mt-1"></p>
               <p id="loading-file-size" class="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-2"></p>
               <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">Running X12 validation checks</p>
            </div>
          </div>
       </section>

        <section id="view-parsed" class="view-section hidden animate-fade-in max-w-7xl mx-auto py-8">
          <div class="flex justify-between items-end mb-6">
             <div>
               <h2 class="text-2xl font-bold transition-colors duration-300">Parsed EDI Structure</h2>
               <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors duration-300">Showing hierarchical view of 837 Claim data</p>
             </div>
            <div class="flex space-x-3">
               <button class="btn-secondary text-sm">Expand All</button>
               <button class="btn-primary flex items-center shadow-sm text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download JSON
               </button>
            </div>
         </div>
         
         <div class="flex flex-col lg:flex-row gap-6">
            <div class="flex-1 card p-6 shadow-sm overflow-hidden bg-white dark:bg-slate-800 dark:border-slate-700 transition-colors duration-300">
               <ul class="space-y-2 text-sm font-mono tree-root">
                 <li>
                    <div class="flex items-center group cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg border border-transparent hover:border-slate-100 dark:hover:border-slate-600 transition-colors" onclick="window.showSegmentDetails('ISA')">
                       <svg class="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                       <span class="font-bold text-blue-700 dark:text-blue-400 mr-2 bg-blue-50 dark:bg-blue-900/30 px-1.5 rounded">ISA</span>
                       <span class="text-slate-600 dark:text-slate-300">Interchange Control Header</span>
                       
                       <div class="relative group/tooltip inline-block ml-2" onclick="event.stopPropagation(); window.showSegmentDetails('ISA')">
                          <svg class="w-4 h-4 text-slate-300 dark:text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 dark:bg-slate-700 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none text-center transform translate-y-2 group-hover/tooltip:translate-y-0 text-sans border dark:border-slate-600">
                             Interchange Control Header. Contains sender and receiver information.
                          </div>
                       </div>
                    </div>
                    <ul class="pl-8 mt-2 space-y-2 tree-vertical relative before:content-[''] before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-slate-200 dark:before:bg-slate-700">
                       <li class="relative before:content-[''] before:absolute before:-left-4 before:top-4 before:w-4 before:h-px before:bg-slate-200 dark:before:bg-slate-700">
                          <div class="flex items-center group cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors" onclick="window.showSegmentDetails('GS')">
                             <svg class="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                             <span class="font-bold text-teal-600 dark:text-teal-400 mr-2 bg-teal-50 dark:bg-teal-900/30 px-1.5 rounded">GS</span>
                             <span class="text-slate-600 dark:text-slate-300">Functional Group Header</span>
                             
                             <div class="relative group/tooltip inline-block ml-2" onclick="event.stopPropagation(); window.showSegmentDetails('GS')">
                               <svg class="w-4 h-4 text-slate-300 dark:text-slate-600 hover:text-teal-500 dark:hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                               <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 dark:bg-slate-700 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none text-center transform translate-y-2 group-hover/tooltip:translate-y-0 text-sans border dark:border-slate-600">
                                  Functional Group Header. Groups related transaction sets.
                               </div>
                             </div>
                          </div>
                          <ul class="pl-8 mt-2 space-y-2 tree-vertical relative before:content-[''] before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-slate-200 dark:before:bg-slate-700">
                             <li class="relative before:content-[''] before:absolute before:-left-4 before:top-4 before:w-4 before:h-px before:bg-slate-200 dark:before:bg-slate-700">
                                <div class="flex items-center group cursor-pointer p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg" onclick="window.showSegmentDetails('ST')">
                                   <svg class="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                                   <span class="font-bold text-indigo-600 dark:text-indigo-400 mr-2 bg-indigo-50 dark:bg-indigo-900/30 px-1.5 rounded">ST</span>
                                   <span class="text-slate-600 dark:text-slate-300">Transaction Set Header <span class="text-xs text-slate-400 dark:text-slate-500 ml-2">(837)</span></span>
                                   
                                   <div class="relative group/tooltip inline-block ml-2" onclick="event.stopPropagation(); window.showSegmentDetails('ST')">
                                     <svg class="w-4 h-4 text-slate-300 dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                     <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 dark:bg-slate-700 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none text-center transform translate-y-2 group-hover/tooltip:translate-y-0 text-sans border dark:border-slate-600">
                                        Transaction Set Header. Identifies the transaction type.
                                     </div>
                                   </div>
                                </div>
                                <ul class="pl-8 mt-2 space-y-2 tree-vertical relative before:content-[''] before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-slate-200 dark:before:bg-slate-700">
                                   <li class="relative before:content-[''] before:absolute before:-left-4 before:top-4 before:w-4 before:h-px before:bg-slate-200 dark:before:bg-slate-700">
                                      <div class="flex items-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800">
                                         <span class="font-bold text-slate-700 dark:text-slate-200 mr-2">Loop 2000A</span>
                                         <span class="text-slate-600 dark:text-slate-400">Billing Provider Hierarchical Level</span>
                                      </div>
                                   </li>
                                   <li class="relative before:content-[''] before:absolute before:-left-4 before:top-4 before:w-4 before:h-px before:bg-slate-200 dark:before:bg-slate-700">
                                      <div class="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                                         <span class="font-bold text-slate-700 dark:text-slate-200 mr-2">Loop 2000B</span>
                                         <span class="text-slate-600 dark:text-slate-400">Subscriber Hierarchical Level</span>
                                      </div>
                                      <ul class="pl-8 mt-2 space-y-1 tree-vertical relative before:content-[''] before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-slate-200 dark:before:bg-slate-700">
                                        <li class="relative before:content-[''] before:absolute before:-left-4 before:top-3 before:w-4 before:h-px before:bg-slate-200 dark:before:bg-slate-700">
                                          <div class="flex items-center p-1.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded text-xs cursor-pointer group/line" onclick="window.showSegmentDetails('NM1')">
                                            <span class="font-bold text-slate-600 dark:text-slate-400 w-12 mr-2">NM1*</span><span class="text-slate-500 dark:text-slate-500">IL*1*SMITH*JOHN*M***MI*123456789~</span>
                                            
                                            <div class="relative group/tooltip inline-block ml-2 hidden group-hover/line:inline-block" onclick="event.stopPropagation(); window.showSegmentDetails('NM1')">
                                              <svg class="w-4 h-4 text-slate-300 dark:text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 dark:bg-slate-700 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none text-center transform translate-y-2 group-hover/tooltip:translate-y-0 text-sans font-normal border dark:border-slate-600">
                                                 Individual or Organization Name.
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li class="relative before:content-[''] before:absolute before:-left-4 before:top-3 before:w-4 before:h-px before:bg-slate-200 dark:before:bg-slate-700">
                                          <div class="flex items-center p-1.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded text-xs cursor-pointer group/line" onclick="window.showSegmentDetails('N3')">
                                            <span class="font-bold text-slate-600 dark:text-slate-400 w-12 mr-2">N3*</span><span class="text-slate-500 dark:text-slate-500">123 MAIN ST~</span>
                                            
                                            <div class="relative group/tooltip inline-block ml-2 hidden group-hover/line:inline-block" onclick="event.stopPropagation(); window.showSegmentDetails('N3')">
                                              <svg class="w-4 h-4 text-slate-300 dark:text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 dark:bg-slate-700 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none text-center transform translate-y-2 group-hover/tooltip:translate-y-0 text-sans font-normal border dark:border-slate-600">
                                                 Address Information.
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li class="relative before:content-[''] before:absolute before:-left-4 before:top-3 before:w-4 before:h-px before:bg-slate-200 dark:before:bg-slate-700">
                                          <div class="flex items-center p-1.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded text-xs bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 relative cursor-pointer group/line" onclick="window.showSegmentDetails('N4')">
                                            <span class="absolute -left-1 hidden group-hover/line:block w-1 h-full bg-red-500 rounded-l"></span>
                                            <span class="font-bold text-red-600 dark:text-red-400 w-12 mr-2">N4*</span><span class="text-slate-500 dark:text-slate-500">CHICAGO*IL*60601~</span>
                                            <span class="badge-error ml-auto">Missing Element</span>
                                            
                                            <div class="relative group/tooltip inline-block ml-2 hidden group-hover/line:inline-block" onclick="event.stopPropagation(); window.showSegmentDetails('N4')">
                                              <svg class="w-4 h-4 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                              <div class="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 dark:bg-slate-700 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none text-center transform translate-y-2 group-hover/tooltip:translate-y-0 text-sans font-normal border dark:border-slate-600">
                                                 City, State, ZIP Code information.
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li class="relative before:content-[''] before:absolute before:-left-4 before:top-3 before:w-4 before:h-px before:bg-slate-200 dark:before:bg-slate-700">
                                          <div class="flex items-center p-1.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded text-xs cursor-pointer group/line" onclick="window.showSegmentDetails('CLM')">
                                            <span class="font-bold text-slate-600 dark:text-slate-400 w-12 mr-2">CLM*</span><span class="text-slate-500 dark:text-slate-500">2238475*42590.25***11:B:1*Y*A*Y*I~</span>
                                            
                                            <div class="relative group/tooltip inline-block ml-2 hidden group-hover/line:inline-block" onclick="event.stopPropagation(); window.showSegmentDetails('CLM')">
                                              <svg class="w-4 h-4 text-slate-300 dark:text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                              <div class="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 dark:bg-slate-700 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none text-center transform translate-y-2 group-hover/tooltip:translate-y-0 text-sans font-normal border dark:border-slate-600">
                                                 Claim Information segment.
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                   </li>
                                </ul>
                             </li>
                          </ul>
                       </li>
                    </ul>
                 </li>
              </ul>
           </div>
           
           <!-- Right: Segment Details Panel -->
           <div id="segment-details-panel" class="w-full lg:w-96 card p-0 shadow-lg hidden flex-col animate-slide-up sticky top-24 self-start">
             <div class="p-4 border-b bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center transition-colors duration-300">
               <h3 class="font-bold text-slate-800 dark:text-slate-100 flex items-center">
                 <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 Segment Details
               </h3>
               <button onclick="window.closeSegmentDetails()" class="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
             </div>
             <div class="p-6 transition-colors duration-300">
               <div class="flex items-center mb-4">
                 <span id="detail-badge" class="font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded text-lg mr-3 border border-blue-200 dark:border-blue-800 shadow-sm">ISA</span>
                 <h4 id="detail-title" class="font-bold text-slate-800 dark:text-slate-100 text-lg leading-tight">Interchange Control Header</h4>
               </div>
               <p id="detail-desc" class="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">Contains sender and receiver information for the EDI transmission.</p>
               
               <h5 class="font-bold text-slate-700 dark:text-slate-200 text-sm mb-2 flex items-center mt-2">
                 <svg class="w-4 h-4 mr-1 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 Purpose in EDI
               </h5>
               <p id="detail-purpose" class="text-sm text-slate-600 dark:text-slate-300 mb-6 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-100 dark:border-slate-600">To start and identify an interchange of zero or more functional groups and interchange-related control segments.</p>
               
               <h5 class="font-bold text-slate-700 dark:text-slate-200 text-sm mb-2 flex items-center">
                 <svg class="w-4 h-4 mr-1 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                 Example Elements
               </h5>
               <div id="detail-elements" class="bg-slate-800 dark:bg-slate-900 text-blue-300 p-4 rounded-lg font-mono text-xs overflow-x-auto shadow-inner leading-relaxed whitespace-pre-wrap border dark:border-slate-700">ISA*00*          *00*          *ZZ*SENDERID       *ZZ*RECEIVERID     *030101*1253*U*00501*000000905*1*T*:~</div>
             </div>
           </div>
         </div>
       </section>

       <section id="view-validation" class="view-section hidden animate-fade-in w-full px-4 sm:px-6 lg:px-8 py-8">
         <div class="flex justify-between items-end mb-6">
            <div>
              <h2 class="text-2xl font-bold">Validation Report</h2>
              <p class="text-slate-500 text-sm mt-1">Detected 3 issues in claim_batch_005.edi</p>
            </div>
             <div class="flex space-x-3">
                <button id="download-btn" onclick="window.downloadFixedFile()" class="btn-secondary hidden flex items-center shadow-sm text-sm">
                   <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                   Download EDI
                </button>
                <button id="revalidate-btn" onclick="window.revalidateFile()" class="btn-primary flex items-center shadow-sm text-sm">
                   <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                   Revalidate
                </button>
             </div>
         </div>

         <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
             <div id="validationTable" class="lg:col-span-3 transition-all duration-300 card p-0 overflow-hidden shadow-sm rounded-xl">
                <div class="w-full overflow-x-auto">
                   <table class="validation-table min-w-[700px]">
                      <thead>
                      <tr>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Severity</th>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Line</th>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Segment</th>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Loop</th>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Description</th>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Suggestion</th>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Action</th>
                      </tr>
                  </thead>
               <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-300 group cursor-pointer relative">
                     <td class="px-6 py-4 whitespace-nowrap"><span class="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Error</span></td>
                     <td class="px-6 py-4 font-mono font-medium whitespace-nowrap">N4</td>
                     <td class="px-6 py-4 whitespace-nowrap">2000B</td>
                     <td class="px-6 py-4 font-medium whitespace-nowrap">Missing N403 (Zip Code) when N401 is present.</td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <button onclick="window.viewFix('N4', 'Missing N403 (Zip Code) when N401 is present.', '2000B', 'Error', this)" class="viewFixBtn text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-300">View Problem</button>
                     </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-300 group cursor-pointer relative">
                     <td class="px-6 py-4 whitespace-nowrap"><span class="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Error</span></td>
                     <td class="px-6 py-4 font-mono font-medium whitespace-nowrap">SBR</td>
                     <td class="px-6 py-4 whitespace-nowrap">2000B</td>
                     <td class="px-6 py-4 font-medium whitespace-nowrap">Invalid value for SBR01 (Payer Responsibility Sequence Code).</td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <button onclick="window.viewFix('SBR', 'Invalid value for SBR01 (Payer Responsibility Sequence Code).', '2000B', 'Error', this)" class="viewFixBtn text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-300">View Problem</button>
                     </td>
                  </tr>
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-300 group cursor-pointer relative">
                     <td class="px-6 py-4 whitespace-nowrap"><span class="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Warning</span></td>
                     <td class="px-6 py-4 font-mono font-medium whitespace-nowrap">DMG</td>
                     <td class="px-6 py-4 whitespace-nowrap">2010BA</td>
                     <td class="px-6 py-4 font-medium whitespace-nowrap">Subscriber birth date format is valid but older than 120 years.</td>
                     <td class="px-6 py-4 whitespace-nowrap">
                        <button onclick="window.viewFix('DMG', 'Subscriber birth date format is valid but older than 120 years.', '2010BA', 'Warning', this)" class="viewFixBtn text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-300">View Problem</button>
                     </td>
                  </tr>
               </tbody>
                </table>
                </div>
             </div>

             <!-- Right: Fix Details Panel -->
             <div id="fixDetails" class="hidden lg:col-span-2 card p-0 shadow-lg flex-col animate-fade-in transition-all duration-300 ease-in-out lg:sticky lg:top-6 self-start max-h-[90vh] overflow-y-auto">
               <div class="p-4 border-b bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                 <h3 class="font-bold text-slate-800 dark:text-slate-200 flex items-center">
                   <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   Fix Details
                 </h3>
                 <button onclick="window.closeFixDetails()" class="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                 </button>
               </div>
               <div class="p-6 space-y-4">
                 <div class="flex items-center mb-4">
                   <span class="fix-badge-text font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded text-lg mr-3 border border-blue-200 dark:border-blue-800/50 shadow-sm"></span>
                   <h4 class="fix-title-text font-bold text-slate-800 dark:text-slate-200 text-lg leading-tight"></h4>
                 </div>
                 <p class="fix-desc-text text-sm text-slate-800 dark:text-slate-300 font-medium mb-2 leading-relaxed"></p>
                 <p class="fix-explanation-text text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed"></p>
                 
                 <h5 class="font-bold text-slate-700 dark:text-slate-300 text-sm mb-2 flex items-center mt-2">
                   <svg class="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   Suggested Fix
                 </h5>
                 <p class="fix-suggested-text text-sm text-slate-600 dark:text-slate-400 mb-6 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800/50"></p>
                 
                 <h5 class="font-bold text-slate-700 dark:text-slate-300 text-sm mb-2 flex items-center">
                   <svg class="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                   Example Correct Format
                 </h5>
                 <div class="fix-example-text bg-slate-800 text-green-300 p-4 rounded-lg font-mono text-xs overflow-x-auto shadow-inner leading-relaxed whitespace-pre-wrap mb-4"></div>
                 
                 <button id="askAIButton" onclick="window.askAIAssistant()" class="apply-fix-btn w-full btn-primary bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center shadow-sm text-sm py-2 rounded-lg">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Ask AI Assistant
                 </button>
               </div>
             </div>
          </div>
          
          <!-- Fix Modal (Mobile) -->
          <div id="fixModal" class="hidden fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-40 transition-opacity">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-fade-in">
              <div class="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                 <h3 class="font-bold text-slate-800 flex items-center">
                   <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   Fix Details
                 </h3>
                 <button onclick="window.closeFixDetails()" class="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                 </button>
               </div>
               <div class="p-6 overflow-y-auto">
                 <div class="flex items-center mb-4">
                   <span class="fix-badge-text font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded text-lg mr-3 border border-blue-200 dark:border-blue-800/50 shadow-sm"></span>
                   <h4 class="fix-title-text font-bold text-slate-800 dark:text-slate-200 text-lg leading-tight"></h4>
                 </div>
                 <p class="fix-desc-text text-sm text-slate-800 dark:text-slate-300 font-medium mb-2 leading-relaxed"></p>
                 <p class="fix-explanation-text text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed"></p>
                 
                 <h5 class="font-bold text-slate-700 dark:text-slate-300 text-sm mb-2 flex items-center mt-2">
                   <svg class="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   Suggested Fix
                 </h5>
                 <p class="fix-suggested-text text-sm text-slate-600 dark:text-slate-400 mb-6 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800/50"></p>
                 
                 <h5 class="font-bold text-slate-700 dark:text-slate-300 text-sm mb-2 flex items-center">
                   <svg class="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                   Example Correct Format
                 </h5>
                 <div class="fix-example-text bg-slate-800 text-green-300 p-4 rounded-lg font-mono text-xs overflow-x-auto shadow-inner leading-relaxed whitespace-pre-wrap mb-4"></div>
                 
                 <button id="askAIButton" onclick="window.askAIAssistant()" class="apply-fix-btn w-full btn-primary bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center shadow-sm text-sm py-2 rounded-lg">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Ask AI Assistant
                 </button>
               </div>
            </div>
          </div>
       </section>
       
       <section id="view-summary" class="view-section hidden animate-fade-in max-w-5xl mx-auto py-8">
         <div class="flex justify-between items-end mb-6">
            <div>
              <h2 class="text-2xl font-bold transition-colors">837 Claims Summary</h2>
              <p class="text-slate-500 text-sm mt-1">Aggregated insights for Claim Batch 005</p>
            </div>
         </div>
         <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="card bg-blue-600 text-white shadow-lg shadow-blue-500/30">
               <p class="text-blue-100 font-medium mb-1">Total Claim Amount</p>
               <h3 class="text-3xl font-bold">$42,590.25</h3>
            </div>
            <div class="card shadow-sm border-l-4 border-l-green-500">
               <p class="text-slate-500 dark:text-slate-400 font-medium mb-1 text-sm">Total Claims</p>
               <h3 class="text-3xl font-bold">124</h3>
            </div>
            <div class="card shadow-sm border-l-4 border-l-teal-500">
               <p class="text-slate-500 dark:text-slate-400 font-medium mb-1 text-sm">Unique Providers</p>
               <h3 class="text-3xl font-bold">12</h3>
            </div>
         </div>
         <div class="card p-0 shadow-sm overflow-hidden">
            <h3 class="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b font-bold transition-colors">Top Providers by Volume</h3>
            <div class="p-6">
               <div class="space-y-4">
                  <div>
                     <div class="flex justify-between text-sm mb-1">
                        <span class="font-semibold">General Hospital Medical Center</span>
                        <span class="font-mono text-blue-600 dark:text-blue-400">$18,450.00</span>
                     </div>
                     <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3">
                        <div class="bg-blue-600 h-3 rounded-full" style="width: 45%"></div>
                     </div>
                  </div>
                  <div>
                     <div class="flex justify-between text-sm mb-1">
                        <span class="font-semibold">Dr. Smith Clinic</span>
                        <span class="font-mono text-teal-600 dark:text-teal-400">$12,120.50</span>
                     </div>
                     <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3">
                        <div class="bg-teal-500 h-3 rounded-full" style="width: 32%"></div>
                     </div>
                  </div>
                  <div>
                     <div class="flex justify-between text-sm mb-1">
                        <span class="font-semibold">Westside Cardiology</span>
                        <span class="font-mono text-indigo-600 dark:text-indigo-400">$8,200.75</span>
                     </div>
                     <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3">
                        <div class="bg-indigo-500 h-3 rounded-full" style="width: 20%"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
       </section>

        <section id="view-assistant" class="view-section hidden animate-fade-in max-w-4xl mx-auto py-4 h-[calc(100vh-8rem)] flex flex-col">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mr-4 shadow-sm">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold">HealthEDI AI Assistant</h2>
              <p class="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Analyze EDI files, explain X12 segments, detect errors, and get fix suggestions.</p>
            </div>
          </div>
          
          <div class="card flex-1 flex flex-col overflow-hidden p-0">
            <!-- Chat messages -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6" id="chat-messages">
               <!-- AI Msg -->
               <div class="flex items-start">
                  <div class="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white mr-3 shadow-sm shrink-0">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div class="bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-2xl p-4 text-sm text-slate-700 dark:text-slate-200 shadow-sm rounded-tl-none max-w-[80%] inline-block">
                     Hello! I'm your HealthEDI AI Assistant. I can help analyze EDI files, explain X12 segments, detect errors, and suggest fixes.
                     <br><br>
                     Try asking:
                     <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                        <li>"Explain the validation error on segment N4"</li>
                        <li>"What does the NM1 segment stand for?"</li>
                        <li>"Why was claim #12345 rejected?"</li>
                     </ul>
                  </div>
               </div>

               <!-- User Msg -->
               <div class="flex items-start flex-row-reverse animate-fade-in animate-delay-200">
                  <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white ml-3 shadow-sm shrink-0 font-bold text-xs">
                     JD
                  </div>
                  <div class="bg-blue-600 rounded-2xl p-4 text-sm text-white shadow-sm rounded-tr-none max-w-[80%] inline-block">
                     Explain the validation error on segment N4 in the 2000B loop.
                  </div>
               </div>

               <!-- AI Msg -->
               <div class="flex items-start animate-fade-in animate-delay-400">
                  <div class="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white mr-3 shadow-sm shrink-0">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div class="bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-2xl p-4 text-sm text-slate-700 dark:text-slate-200 shadow-sm rounded-tl-none max-w-[80%] inline-block">
                     <p class="mb-2"><strong>Segment N4</strong> represents City, State/Province, Zip Code, and Country Info.</p>
                     <p>In your file, you have the following line:</p>
                     <code class="block bg-slate-900 text-teal-400 p-3 rounded-lg my-3 font-mono text-xs border border-slate-700 shadow-inner">N4*CHICAGO*IL*~</code>
                     <p><strong>The Error:</strong> The N403 element (Zip Code) is missing. According to X12 standards, if N401 (City) is present, N403 (Zip Code) is required for domestic US addresses.</p>
                     <p class="mt-2 text-teal-600 dark:text-teal-400 font-bold">Suggested Fix: Add the proper 5 or 9 digit zip code, e.g., N4*CHICAGO*IL*60601~</p>
                  </div>
               </div>
            </div>

           <!-- Chat input -->
            <div class="p-4 bg-slate-50 border-t border-slate-100">
               <div class="relative">
                  <input id="aiInput" type="text" placeholder="Type your message..." class="w-full pl-5 pr-14 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm">
                  <button class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </button>
              </div>
           </div>
         </div>
      </section>

    </div>
  </main>
`

// Simple Router implementation
window.switchView = function (viewId) {
  // Update view visibility
  document.querySelectorAll('.view-section').forEach(el => {
    el.classList.add('hidden')
    el.classList.remove('block')
  })

  // Close sidebar on mobile after navigation
  const sidebar = document.getElementById("sidebar");
  if (sidebar && window.innerWidth < 768) {
    sidebar.classList.add("-translate-x-full");
    sidebar.classList.remove("translate-x-0");
  }

  const activeView = document.getElementById('view-' + viewId)
  if (activeView) {
    activeView.classList.remove('hidden')
    activeView.classList.add('block')

    if (viewId === 'assistant') {
      const savedPrompt = localStorage.getItem('aiPrompt');
      if (savedPrompt) {
        const aiInput = document.getElementById('aiInput');
        if (aiInput) {
          aiInput.value = savedPrompt;
        }
      }
    }
  }

  // Update nav UI
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('text-blue-700', 'bg-blue-50', 'dark:bg-blue-900/30', 'dark:text-blue-400')
    btn.classList.add('text-slate-600', 'dark:text-slate-400')
    btn.querySelector('svg').classList.remove('text-blue-600', 'dark:text-blue-400')
    btn.querySelector('svg').classList.add('text-slate-400', 'dark:text-slate-500')
  })

  // set active class
  const activeBtn = document.querySelector(`.nav-btn[data-view="${viewId}"]`)
  if (activeBtn) {
    activeBtn.classList.add('text-blue-700', 'bg-blue-50', 'dark:bg-blue-900/30', 'dark:text-blue-400')
    activeBtn.classList.remove('text-slate-600', 'dark:text-slate-400')
    activeBtn.querySelector('svg').classList.add('text-blue-600', 'dark:text-blue-400')
    activeBtn.querySelector('svg').classList.remove('text-slate-400', 'dark:text-slate-500')

    // Update Title
    document.getElementById('topbar-title').innerText = activeBtn.innerText.trim()
  }

  // Trigger animations if switching to dashboard
  if (viewId === 'dashboard') {
    window.runDashboardAnimations();
  }
}

// Add event listeners
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    const view = btn.getAttribute('data-view')
    window.switchView(view)
  })
})

// Hamburger Menu Logic
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("translate-x-0");
    sidebar.classList.toggle("-translate-x-full");
  });
}

// Drag and drop logic
const dropZone = document.getElementById('drop-zone');
const uploadContent = document.getElementById('upload-content');
const loadingContent = document.getElementById('loading-content');

if (dropZone) {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.add('border-blue-500', 'bg-blue-100/50');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.remove('border-blue-500', 'bg-blue-100/50');
    }, false);
  });

  dropZone.addEventListener('drop', (e) => {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
  });

  const fileInput = document.getElementById('file-input');

  // Click dropzone to upload
  dropZone.addEventListener('click', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
      fileInput.click();
    }
  });

  // Click button to upload
  dropZone.querySelector('button').addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  });

  window.getSegmentsWithLines = function (ediContent) {
    // Remove potential leading/trailing quotes or extra characters
    const cleanContent = ediContent.replace(/^["'\s]+|["'\s]+$/g, '').trim();
    const rawLines = cleanContent.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    const result = [];
    rawLines.forEach((line, index) => {
      // Split by tilde and handle any leftover whitespace or empty segments
      const subSegments = line.split('~').map(s => s.trim()).filter(s => s.length > 0);
      subSegments.forEach(seg => {
        result.push({ content: seg, line: index + 1 });
      });
    });
    return result;
  }

  function handleFiles(files) {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Update UI with file details
    const fileNameEl = document.getElementById('loading-file-name');
    const fileSizeEl = document.getElementById('loading-file-size');
    if (fileNameEl) fileNameEl.innerText = file.name;
    if (fileSizeEl) fileSizeEl.innerText = (file.size / 1024).toFixed(2) + ' KB';

    uploadContent.classList.add('hidden');
    loadingContent.classList.remove('hidden');
    loadingContent.classList.add('flex');

    const reader = new FileReader();
    reader.onload = function (e) {
      const ediContent = e.target.result;
      window.currentUploadedFileContent = ediContent;
      window.currentUploadedFileName = file.name;

      const segmentsWithLines = window.getSegmentsWithLines(ediContent);
      const segments = segmentsWithLines.map(s => s.content);

      const transType = detectTransactionType(segments);
      const errors = validateEDI(segmentsWithLines, transType);

      window.updateValidationReportUI(errors, file.name, transType, segmentsWithLines.length);
      window.updateParsedDataUI(segmentsWithLines, transType, file.name, errors);

      window.calculateCLPSummary(ediContent);
      window.updateDashboardSummaryUI();

      setTimeout(() => {
        loadingContent.classList.add('hidden');
        loadingContent.classList.remove('flex');
        uploadContent.classList.remove('hidden');

        window.switchView('validation');
        fileInput.value = '';
      }, 1500);
    };
    reader.readAsText(file);
  }
}

// EDI Segment Definitions
const EDI_SEGMENTS = {
  'ISA': {
    title: 'Interchange Control Header',
    description: 'Contains sender and receiver information for the EDI transmission.',
    purpose: 'To start and identify an interchange of zero or more functional groups and interchange-related control segments.',
    example: 'ISA*00*          *00*          *ZZ*SENDERID       *ZZ*RECEIVERID     *030101*1253*U*00501*000000905*1*T*:'
  },
  'GS': {
    title: 'Functional Group Header',
    description: 'Groups related transaction sets.',
    purpose: 'To indicate the beginning of a functional group and to provide control information.',
    example: 'GS*HC*SENDERID*RECEIVERID*20231015*1330*1*X*005010X222A1'
  },
  'ST': {
    title: 'Transaction Set Header',
    description: 'Identifies the transaction type such as 837 (Claim), 835 (Remittance), or 834 (Enrollment).',
    purpose: 'To indicate the start of a transaction set and to assign a control number.',
    example: 'ST*837*0001*005010X222A1'
  },
  'NM1': {
    title: 'Individual or Organization Name',
    description: 'Used for patient, provider, or payer information.',
    purpose: 'To supply the full name of an individual or organizational entity.',
    example: 'NM1*IL*1*SMITH*JOHN*M***MI*123456789'
  },
  'N3': {
    title: 'Address Information',
    description: 'Street address for the entity specified in the associated NM1 segment.',
    purpose: 'To specify the location address.',
    example: 'N3*123 MAIN ST*APT 4B'
  },
  'N4': {
    title: 'City, State, ZIP Code',
    description: 'Geographic information including city, state, and postal code.',
    purpose: 'To specify the geographic place, code, and country.',
    example: 'N4*CHICAGO*IL*60601'
  },
  'CLM': {
    title: 'Claim Information',
    description: 'Contains claim ID and claim amount.',
    purpose: 'To specify basic data about the claim.',
    example: 'CLM*2238475*42590.25***11:B:1*Y*A*Y*I'
  },
  'SV1': {
    title: 'Professional Service',
    description: 'Service Line Information describing procedures or services billed.',
    purpose: 'To specify the service line item detail for a health care professional bill.',
    example: 'SV1*HC:99213*150*UN*1***1'
  },
  'DTP': {
    title: 'Date or Time or Period',
    description: 'Date or time information related to services.',
    purpose: 'To specify any or all of a date, a time, or a time period.',
    example: 'DTP*472*D8*20231015'
  },
  'BPR': { title: 'Financial Information', description: 'Financial details including payment method and amount.', purpose: 'To specify the payment method, format, and amount.', example: 'BPR*I*150.00*C*ACH*CTX*01*999999999*DA*123456*1512345678**01*999999999*DA*123456*20231015' },
  'TRN': { title: 'Trace Number', description: 'Trace number for payment matching.', purpose: 'To uniquely identify a transaction.', example: 'TRN*1*12345*1999999999' },
  'N1': { title: 'Name', description: 'Entity Name and ID.', purpose: 'To identify a party by type of organization, name, and code.', example: 'N1*PR*INSURANCE COMPANY*PI*99999' },
  'CLP': { title: 'Claim Payment', description: 'Claim payment information.', purpose: 'To supply information common to all services of a claim.', example: 'CLP*12345*1*150.00*100.00**12' },
  'CAS': { title: 'Claim Adjustment', description: 'Reason for claim adjustment.', purpose: 'To supply adjustment reason codes and amounts.', example: 'CAS*PR*1*50.00' },
  'INS': { title: 'Member Level Detail', description: 'Subscriber/Member enrollment info.', purpose: 'To provide benefit plan, employment, and member details.', example: 'INS*Y*18*030*20*A' },
  'HD': { title: 'Health Coverage', description: 'Health coverage level.', purpose: 'To provide information on health coverage and benefits.', example: 'HD*030**HLD' },
  'SE': { title: 'Transaction Set Trailer', description: 'Ends the transaction set.', purpose: 'To indicate the end of the transaction set.', example: 'SE*45*0001' },
  'GE': { title: 'Functional Group Trailer', description: 'Ends the functional group.', purpose: 'To indicate the end of a functional group.', example: 'GE*1*1' },
  'IEA': { title: 'Interchange Control Trailer', description: 'Ends the ISA interchange.', purpose: 'To define the end of an interchange.', example: 'IEA*1*000000905' }
};

window.updateParsedDataUI = function (segmentsWithLines, transType, fileName, errors = []) {
  const reportSection = document.getElementById('view-parsed');
  if (!reportSection) return;

  const titleP = reportSection.querySelector('p.text-slate-500');
  if (titleP) {
    let typeName = "Unknown";
    if (transType === '837') typeName = "837 Claim";
    if (transType === '835') typeName = "835 Remittance";
    if (transType === '834') typeName = "834 Enrollment";
    titleP.innerText = `Showing hierarchical view of ${typeName} data for ${fileName}`;
  }

  const treeContainer = reportSection.querySelector('.tree-root');
  if (!treeContainer) return;

  function getDef(segId) {
    return EDI_SEGMENTS[segId] || { title: 'Segment ' + segId, description: 'EDI Segment ' + segId };
  }

  function makeElement(segData, lineNum, isWrapper = false) {
    const segId = segData.split('*')[0];
    const def = getDef(segId);
    const hasError = errors.some(e => e.line === lineNum && (e.segment === segId || e.segment === 'ALL'));

    let colorClass = 'text-blue-600 bg-blue-50';
    if (['ISA', 'GS', 'ST', 'SE', 'GE', 'IEA'].includes(segId)) colorClass = 'text-indigo-600 bg-indigo-50';
    else if (['NM1', 'N1', 'N3', 'N4'].includes(segId)) colorClass = 'text-teal-600 bg-teal-50';
    else if (['CLM', 'CLP', 'BPR'].includes(segId)) colorClass = 'text-amber-600 bg-amber-50';

    const errorClass = hasError ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'border-transparent';

    if (isWrapper) {
      return `
                <div class="flex items-center group cursor-pointer p-2 hover:bg-slate-50 rounded-lg border ${errorClass} transition-colors" onclick="window.showSegmentDetails('${segId}')">
                    <svg class="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-500 transition-colors transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                    <span class="font-bold mr-2 px-1.5 rounded ${colorClass}">${segId}</span>
                    <span class="text-slate-600">${def.title}</span>
                    <span class="ml-auto text-[10px] text-slate-400 font-mono">L${lineNum}</span>
                    ${hasError ? '<span class="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>' : ''}
                </div>
            `;
    }

    return `
            <div class="flex items-center p-1.5 hover:bg-slate-50 rounded text-xs cursor-pointer group/line border ${errorClass}" onclick="window.showSegmentDetails('${segId}')">
                <span class="font-bold w-12 mr-2 ${colorClass} px-1 rounded">${segId}*</span>
                <span class="text-slate-500 truncate max-w-lg">${segData.substring(0, 80)}${segData.length > 80 ? '...' : ''}</span>
                <span class="ml-auto text-[10px] text-slate-400 font-mono">L${lineNum}</span>
                ${hasError ? '<span class="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>' : ''}
            </div>
        `;
  }

  let innerHtml = '';
  segmentsWithLines.forEach(({ content, line }) => {
    let segId = content.split('*')[0];

    if (segId === 'HL' && transType === '837') {
      const parts = content.split('*');
      const hlLevelCode = parts[3];
      let loopName = '';
      let loopDesc = '';
      if (hlLevelCode === '20') { loopName = 'Loop 2000A'; loopDesc = 'Billing Provider Hierarchical Level'; }
      else if (hlLevelCode === '22') { loopName = 'Loop 2000B'; loopDesc = 'Subscriber Hierarchical Level'; }
      else if (hlLevelCode === '23') { loopName = 'Loop 2000C'; loopDesc = 'Patient Hierarchical Level'; }

      if (loopName) {
        innerHtml += `<li class="relative before:content-[''] before:absolute before:-left-4 before:top-3 before:w-4 before:h-px before:bg-slate-200 mt-4 mb-2">
                    <div class="flex items-center p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                        <span class="font-bold text-slate-700 mr-2">${loopName}</span>
                        <span class="text-slate-600">${loopDesc}</span>
                    </div>
                </li>`;
      }
    }

    if (!['ISA', 'GS', 'ST'].includes(segId)) {
      innerHtml += `<li class="relative before:content-[''] before:absolute before:-left-4 before:top-3 before:w-4 before:h-px before:bg-slate-200">
                ${makeElement(content, line, false)}
            </li>`;
    }
  });

  const isaEntry = segmentsWithLines.find(s => s.content.startsWith('ISA')) || { content: 'ISA*', line: 1 };
  const gsEntry = segmentsWithLines.find(s => s.content.startsWith('GS')) || { content: 'GS*', line: 2 };
  const stEntry = segmentsWithLines.find(s => s.content.startsWith('ST')) || { content: 'ST*', line: 3 };

  treeContainer.innerHTML = `
        <li>
            ${makeElement(isaEntry.content, isaEntry.line, true)}
            <ul class="pl-8 mt-2 space-y-2 tree-vertical relative before:content-[''] before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-slate-200">
                <li class="relative before:content-[''] before:absolute before:-left-4 before:top-4 before:w-4 before:h-px before:bg-slate-200">
                    ${makeElement(gsEntry.content, gsEntry.line, true)}
                    <ul class="pl-8 mt-2 space-y-2 tree-vertical relative before:content-[''] before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-slate-200">
                        <li class="relative before:content-[''] before:absolute before:-left-4 before:top-4 before:w-4 before:h-px before:bg-slate-200">
                            ${makeElement(stEntry.content, stEntry.line, true)}
                            <ul class="pl-8 mt-2 space-y-1 tree-vertical relative before:content-[''] before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-slate-200">
                                ${innerHtml}
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    `;

  if (segmentsWithLines.length > 0) {
    window.showSegmentDetails(segmentsWithLines[0].content.split('*')[0] || 'ISA');
  }
}

window.showSegmentDetails = function (segment) {
  const data = EDI_SEGMENTS[segment];
  const panel = document.getElementById('segment-details-panel');
  if (!data || !panel) return;

  document.getElementById('detail-badge').innerText = segment;
  document.getElementById('detail-title').innerText = data.title;
  document.getElementById('detail-desc').innerText = data.description;
  document.getElementById('detail-purpose').innerText = data.purpose;
  document.getElementById('detail-elements').innerText = data.example;

  panel.classList.remove('hidden');
  panel.classList.add('flex');
}

window.closeSegmentDetails = function () {
  const panel = document.getElementById('segment-details-panel');
  if (panel) {
    panel.classList.add('hidden');
    panel.classList.remove('flex');
  }
}

// --- Dynamic Validation Logic ---

function detectTransactionType(segments) {
  const st = segments.find(s => s.startsWith("ST*"));
  if (!st) return "unknown";
  const parts = st.split('*');
  const code = parts[1];
  if (code === "837") return "837";
  if (code === "835") return "835";
  if (code === "834") return "834";
  return "unknown";
}

function validateEDI(segmentsWithLines, type) {
  const errors = [];
  const segments = segmentsWithLines.map(s => s.content);
  const totalSegments = segmentsWithLines.length;

  console.log("Starting Advanced Healthcare validation for type:", type);

  // Healthcare Segment Allowlist (Common segments for 834, 835, 837)
  const knownSegments = new Set([
    "ISA", "GS", "GE", "IEA", "ST", "SE", "BPR", "TRN", "CUR", "REF", "DTM",
    "N1", "N3", "N4", "PER", "CLP", "SVC", "CAS", "NM1", "MIA", "MOA", "LQ",
    "AMT", "QTY", "ENT", "HL", "LIN", "SN1", "SLN", "PRV", "SBR", "PAT",
    "DMG", "OI", "TS3", "TS2", "LX", "PLB", "N2", "SVC", "ADX", "HCP"
  ]);

  // Helper for date validation
  const isValidDate = (dateStr) => /^\d{8}$/.test(dateStr);
  const isValidDateISA = (dateStr) => /^\d{6}$/.test(dateStr);

  // Tracking
  const foundSegments = new Set();
  let foundISA = false, foundIEA = false;
  let foundGS = false, foundGE = false;
  let foundST = false, foundSE = false;

  // Control Numbers for Consistency
  let isaControl = null;
  let gsControls = [];
  let stStack = [];

  let allISAControls = new Set();
  let allGSControls = new Set();
  let allSTControls = new Set();

  // Loop Tracking
  let currentLoop = "N/A";
  let lastMajorSeg = null;

  // 1. Order Check: ISA must be first
  if (totalSegments > 0 && !segments[0].startsWith("ISA")) {
    errors.push({
      line: segmentsWithLines[0].line,
      severity: "Error",
      segment: segments[0].split('*')[0],
      loop: "Header",
      description: "Segment order violation: File must start with ISA segment.",
      suggestion: "Move the ISA header to the very beginning of the file."
    });
  }

  // 2. Main Validation Loop
  segmentsWithLines.forEach(({ content, line }) => {
    // Stage 1: Root Syntax Validation (Missing Delimiters)
    const hasDelimiter = content.includes('*');
    if (!hasDelimiter && content.length > 3) {
      errors.push({
        line: line,
        severity: "Error",
        segment: content.substring(0, 3).trim(),
        loop: currentLoop,
        description: "Malformed segment – missing element delimiter '*'",
        suggestion: `Use format ${content.substring(0, 3)}*...~`
      });
      return; // EARLY EXIT: Skip deeper validation for this malformed segment
    }

    const parts = content.split('*');
    const segId = parts[0];
    foundSegments.add(segId);

    // Stage 2: Segment ID Validation
    if (segId.length > 4 || (segId.length > 2 && !/^[A-Z0-9]+$/.test(segId))) {
      errors.push({
        line: line,
        severity: "Error",
        segment: segId.substring(0, 3),
        loop: currentLoop,
        description: "Malformed segment – missing element separators or invalid ID",
        suggestion: `Ensure '*' separators follow segment ID: ${segId.substring(0, 2)}*...`
      });
      return; // EARLY EXIT: Skip deeper validation for this malformed segment
    }

    // Stage 3: Unknown Segment Detection
    if (!knownSegments.has(segId)) {
      errors.push({
        line: line,
        severity: "Warning",
        segment: segId,
        loop: currentLoop,
        description: `Unknown segment detected: ${segId}.`,
        suggestion: "Verify if this segment is part of the standard X12 transaction guide."
      });
    }

    // Stage 4: Empty Element Validation (Checking for ***** pattern in required segments)
    if (segId === "BPR") {
      // BPR01, BPR02, BPR03, BPR04 are typically mandatory
      const mandatoryFields = [1, 2, 3, 4];
      const missing = mandatoryFields.filter(i => !parts[i] || parts[i].trim() === "");
      if (missing.length > 0) {
        errors.push({
          line: line,
          severity: "Error",
          segment: "BPR",
          loop: currentLoop,
          description: "Missing required elements in BPR segment (Potential empty element chain).",
          suggestion: "Provide valid payment account details (BPR01-BPR04) in the segment."
        });
      }
    }

    // --- FROM HERE: Basic syntax and ID are valid ---

    // Update segments count for ST loops
    stStack.forEach(st => st.count++);

    // --- Envelope & Structural Validation ---

    if (segId === "ISA") {
      foundISA = true;
      lastMajorSeg = "ISA";
      if (parts.length !== 17) {
        errors.push({ line, severity: "Error", segment: "ISA", loop: "Header", description: "Invalid element count in segment ISA. Expected 16 elements.", suggestion: "Ensure ISA has exactly 16 data elements split by '*'" });
      }
      isaControl = parts[13];
      if (allISAControls.has(isaControl)) {
        errors.push({ line, severity: "Warning", segment: "ISA", loop: "Header", description: `Duplicate ISA Control Number: ${isaControl}`, suggestion: "Use unique control numbers for each interchange." });
      }
      allISAControls.add(isaControl);

      // Date check (YYMMDD)
      if (parts[9] && !isValidDateISA(parts[9])) {
        errors.push({ line, severity: "Error", segment: "ISA", loop: "Header", description: "Invalid date format in ISA09. Expected YYMMDD.", suggestion: "Correct the interchange date to YYMMDD format." });
      }
    }

    if (segId === "GS") {
      foundGS = true;
      if (lastMajorSeg !== "ISA" && lastMajorSeg !== "GE") {
        errors.push({ line, severity: "Error", segment: "GS", loop: "Header", description: "Segment order violation: GS must follow ISA or GE.", suggestion: "Ensure proper nesting: ISA -> GS -> ST..." });
      }
      lastMajorSeg = "GS";
      if (parts.length < 9) {
        errors.push({ line, severity: "Error", segment: "GS", loop: "Header", description: "Invalid element count in segment GS. Expected 8 elements.", suggestion: "GS segment requires 8 data elements." });
      }
      const gsc = parts[6];
      gsControls.push(gsc);
      if (allGSControls.has(gsc)) {
        errors.push({ line, severity: "Warning", segment: "GS", loop: "Header", description: `Duplicate Group Control Number: ${gsc}`, suggestion: "Use unique group control numbers." });
      }
      allGSControls.add(gsc);

      // GS Date check
      if (parts[4] && !isValidDate(parts[4])) {
        errors.push({ line, severity: "Error", segment: "GS", loop: "Header", description: "Invalid date format in GS04. Expected YYYYMMDD.", suggestion: "Use YYYYMMDD for the functional group date." });
      }
    }

    if (segId === "ST") {
      foundST = true;
      if (lastMajorSeg !== "GS" && lastMajorSeg !== "SE") {
        errors.push({ line, severity: "Error", segment: "ST", loop: "Header", description: "Segment order violation: ST must follow GS or SE.", suggestion: "Ensure ST segments are within a GS/GE group." });
      }
      lastMajorSeg = "ST";
      if (parts.length < 3) {
        errors.push({ line, severity: "Error", segment: "ST", loop: "Header", description: "Invalid element count in segment ST. Expected 2 elements.", suggestion: "ST requires format: ST*Code*Control#~" });
      }
      const stc = parts[2];
      stStack.push({ id: stc, count: 1 });
      if (allSTControls.has(stc)) {
        errors.push({ line, severity: "Warning", segment: "ST", loop: "Header", description: `Duplicate Transaction Set Control Number: ${stc}`, suggestion: "Each transaction set (ST-SE) should have a unique control number." });
      }
      allSTControls.add(stc);
    }

    // --- Loop Detection ---
    if (type === "837") {
      if (segId === "NM1" && parts[1] === "41") currentLoop = "2000A (Submitter)";
      if (segId === "NM1" && parts[1] === "40") currentLoop = "2000B (Receiver)";
      if (segId === "CLM") currentLoop = "2300 (Claim)";
    } else if (type === "835") {
      if (segId === "CLP") currentLoop = "2100 (Claim Loop)";
      if (segId === "SVC") currentLoop = "2110 (Service Loop)";
    } else if (type === "834") {
      if (segId === "INS") currentLoop = "Member Loop";
    }

    // --- Specific Field Validation ---

    // DTM Date check
    if (segId === "DTM") {
      if (parts[2] && !isValidDate(parts[2])) {
        errors.push({ line, severity: "Error", segment: "DTM", loop: currentLoop, description: "Invalid date format. Expected YYYYMMDD.", suggestion: "Correct DTM02 to match YYYYMMDD format." });
      }
    }

    // BPR Numeric & Date checks
    if (segId === "BPR") {
      if (parts[2] && isNaN(parseFloat(parts[2]))) {
        errors.push({ line, severity: "Error", segment: "BPR", loop: currentLoop, description: "Invalid numeric value for payment amount.", suggestion: "Ensure BPR02 is a valid number." });
      }
      if (parts[16] && !isValidDate(parts[16])) {
        errors.push({ line, severity: "Error", segment: "BPR", loop: currentLoop, description: "Invalid date format in BPR16. Expected YYYYMMDD.", suggestion: "Fix the payment date format." });
      }
    }

    // CLP Numeric check (835)
    if (segId === "CLP") {
      if (parts[3] && isNaN(parseFloat(parts[3]))) {
        errors.push({ line, severity: "Error", segment: "CLP", loop: currentLoop, description: "Invalid numeric value in CLP segment (Claim Amount).", suggestion: "Update CLP03 to a numeric value." });
      }
    }

    // --- Trailer & Consistency Validation ---

    if (segId === "SE") {
      foundSE = true;
      lastMajorSeg = "SE";
      const stInfo = stStack.pop();
      if (!stInfo) {
        errors.push({ line, severity: "Error", segment: "SE", loop: "Trailer", description: "Orphaned SE segment (no matching ST).", suggestion: "Every SE must be preceded by an ST segment." });
      } else {
        if (parts[2] !== stInfo.id) {
          errors.push({ line, severity: "Error", segment: "SE", loop: "Trailer", description: `Transaction Set Control Number mismatch. Expected ${stInfo.id}, found ${parts[2]}.`, suggestion: "Update SE02 to match the ST02 control number." });
        }
        if (parseInt(parts[1]) !== stInfo.count) {
          errors.push({ line, severity: "Warning", segment: "SE", loop: "Trailer", description: `Transaction Segment Count mismatch. Reported ${parts[1]}, counted ${stInfo.count}.`, suggestion: `Update SE01 to ${stInfo.count} to reflect actual count.` });
        }
      }
      if (parts.length < 3) {
        errors.push({ line, severity: "Error", segment: "SE", loop: "Trailer", description: "Invalid element count in segment SE.", suggestion: "SE requires format: SE*Count*Control#~" });
      }
    }

    if (segId === "GE") {
      foundGE = true;
      lastMajorSeg = "GE";
      const expected = gsControls.pop();
      if (!expected) {
        errors.push({ line, severity: "Error", segment: "GE", loop: "Trailer", description: "Orphaned GE segment (no matching GS).", suggestion: "Every GE must be preceded by a GS segment." });
      } else if (parts[2] !== expected) {
        errors.push({ line, severity: "Error", segment: "GE", loop: "Trailer", description: `Group Control Number mismatch. Expected ${expected}, found ${parts[2]}.`, suggestion: "Update GE02 to match GS06." });
      }
      if (parts.length < 3) {
        errors.push({ line, severity: "Error", segment: "GE", loop: "Trailer", description: "Invalid element count in segment GE.", suggestion: "GE requires format: GE*Count*Control#~" });
      }
    }

    if (segId === "IEA") {
      foundIEA = true;
      lastMajorSeg = "IEA";
      if (parts[2] !== isaControl) {
        errors.push({ line, severity: "Error", segment: "IEA", loop: "Footer", description: `Interchange Control Number mismatch. Expected ${isaControl}, found ${parts[2]}.`, suggestion: "Update IEA02 to match ISA13." });
      }
      if (parts.length < 3) {
        errors.push({ line, severity: "Error", segment: "IEA", loop: "Footer", description: "Invalid element count in segment IEA.", suggestion: "IEA requires format: IEA*Count*Control#~" });
      }
    }
  });

  // 3. Mandatory Presence Checks
  if (!foundISA) errors.push({ line: 1, severity: "Error", segment: "ISA", loop: "Header", description: "Missing Interchange Control Header (ISA)", suggestion: "Add a valid ISA segment at the start of original file." });
  if (!foundGS) errors.push({ line: 1, severity: "Error", segment: "GS", loop: "Header", description: "Missing Functional Group Header (GS)", suggestion: "Add a GS segment after ISA." });
  if (!foundST) errors.push({ line: 1, severity: "Error", segment: "ST", loop: "Header", description: "Missing Transaction Set Start (ST)", suggestion: "Add an ST segment to begin the transaction." });

  // 835 Specific Mandatory segments
  if (type === "835") {
    if (!foundSegments.has("BPR")) errors.push({ line: 1, severity: "Error", segment: "BPR", loop: "Header", description: "Missing required segment: BPR (Financial Information)", suggestion: "Add BPR segment for payment details." });
    if (!foundSegments.has("TRN")) errors.push({ line: 1, severity: "Error", segment: "TRN", loop: "Header", description: "Missing required segment: TRN (Reassociation Key)", suggestion: "Add TRN segment for reassociation." });

    // Recommended segments (Warnings)
    if (!foundSegments.has("CLP")) errors.push({ line: 1, severity: "Warning", segment: "CLP", loop: "N/A", description: "Recommended segment missing: CLP (Claim Payment)", suggestion: "Add CLP segment for individual claim details." });
    if (!foundSegments.has("NM1")) errors.push({ line: 1, severity: "Warning", segment: "NM1", loop: "N/A", description: "Recommended segment missing: NM1 (Entity Name)", suggestion: "Add NM1 segments for Payer/Payee details." });
    if (!foundSegments.has("DTM")) errors.push({ line: 1, severity: "Info", segment: "DTM", loop: "N/A", description: "Optional segment missing: DTM (Date/Time Reference)", suggestion: "Add DTM segments for claim processing dates." });
  }

  if (!foundSE) errors.push({ line: totalSegments, severity: "Error", segment: "SE", loop: "Trailer", description: "Missing Transaction Set End (SE)", suggestion: "Add an SE segment before the group trailer." });
  if (!foundGE) errors.push({ line: totalSegments, severity: "Error", segment: "GE", loop: "Trailer", description: "Missing Functional Group Trailer (GE)", suggestion: "Add a GE segment before the interchange trailer." });
  if (!foundIEA) errors.push({ line: totalSegments, severity: "Error", segment: "IEA", loop: "Footer", description: "Missing Interchange Control Trailer (IEA)", suggestion: "Add an IEA segment at the very end." });

  // Order Check: IEA must be last
  if (totalSegments > 0 && !segments[totalSegments - 1].startsWith("IEA")) {
    errors.push({
      line: segmentsWithLines[totalSegments - 1].line,
      severity: "Error",
      segment: segments[totalSegments - 1].split('*')[0],
      loop: "Footer",
      description: "Segment order violation: File must end with IEA segment.",
      suggestion: "Ensure IEA is the absolute final segment."
    });
  }

  if (errors.length === 0) {
    errors.push({ line: 0, severity: "Success", segment: "ALL", loop: "N/A", description: "No validation errors found! File is compliant with X12 Gold Standard.", suggestion: "Congratulations! Your file passed all strict validation rules." });
  }

  return errors;
}

window.updateValidationReportUI = function (errors, fileName, transType = 'unknown', totalSegments = 0) {
  const reportSection = document.getElementById('view-validation');
  if (!reportSection) return;

  const titleP = reportSection.querySelector('p.text-slate-500');
  if (titleP) {
    const errCount = errors.filter(e => e.severity === "Error").length;
    const warnCount = errors.filter(e => e.severity === "Warning").length;
    const successCount = errors.filter(e => e.severity === "Success").length;

    let transName = "Unknown Format";
    if (transType === '835') transName = "835 Payment / Remittance";
    if (transType === '837') transName = "837 Healthcare Claim";
    if (transType === '834') transName = "834 Enrollment";

    const summaryText = `
      <div class="flex flex-wrap gap-x-6 gap-y-2 mt-2">
        <span>Transaction Type: <b class="text-blue-600">${transName}</b></span>
        <span>Total Segments: <b>${totalSegments}</b></span>
        <span class="text-red-500">Total Errors: <b>${errCount}</b></span>
        <span class="text-yellow-600">Total Warnings: <b>${warnCount}</b></span>
        <span class="text-green-600">Valid Segments: <b>${totalSegments - errCount}</b></span>
      </div>
    `;

    if (errCount > 0 || warnCount > 0) {
      titleP.innerHTML = `Identified issues in <b>${fileName}</b>. ${summaryText}`;
    } else {
      titleP.innerHTML = `File <b>${fileName}</b> is fully compliant. ${summaryText}`;
    }
  }

  const tbody = reportSection.querySelector('tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  errors.forEach(err => {
    let badgeClass = 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider';
    if (err.severity === 'Error') badgeClass = 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider';
    if (err.severity === 'Warning') badgeClass = 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider';
    if (err.severity === 'Info') badgeClass = 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider';
    if (err.severity === 'Success') badgeClass = 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider';

    const tr = document.createElement('tr');
    let rowHighlight = 'hover:bg-gray-50 dark:hover:bg-gray-700';
    if (err.severity === 'Error') rowHighlight = 'bg-red-50/50 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20';
    if (err.severity === 'Warning') rowHighlight = 'bg-yellow-50/50 dark:bg-yellow-900/10 hover:bg-yellow-50 dark:hover:bg-yellow-900/20';

    tr.className = `border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 group cursor-pointer relative ${rowHighlight}`;
    tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap"><span class="${badgeClass}">${err.severity}</span></td>
            <td class="px-6 py-4 font-mono font-medium whitespace-nowrap">${err.line > 0 ? 'Line ' + err.line : 'Global'}</td>
            <td class="px-6 py-4 font-mono font-medium whitespace-nowrap">${err.segment}</td>
            <td class="px-6 py-4 whitespace-nowrap">${err.loop}</td>
            <td class="px-6 py-4 font-medium">${err.description}</td>
            <td class="px-6 py-4 text-slate-500 italic text-xs">${err.suggestion || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${err.severity !== 'Success' ? `<button onclick="window.viewFix('${err.segment}', '${err.description.replace(/'/g, "\\'")}', '${err.loop}', '${err.severity}', this)" class="viewFixBtn text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-300">View Problem</button>` : ''}
            </td>
        `;
    tbody.appendChild(tr);
  });

  // Show/Hide Download button if there's content to download
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    if (window.currentUploadedFileContent) {
      downloadBtn.classList.remove('hidden');
    } else {
      downloadBtn.classList.add('hidden');
    }
  }
}

let currentFixSegment = null;
let currentFixExample = null;

// --- Fix Details and Revalidation ---

window.closeFixDetails = function () {
  const panel = document.getElementById('fixDetails');
  const modal = document.getElementById('fixModal');
  const table = document.getElementById('validationTable');

  if (panel) {
    panel.classList.add('hidden');
    panel.classList.remove('flex');
  }
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  if (table) {
    table.classList.replace('lg:col-span-3', 'lg:col-span-5');
  }

  // Remove all highlights
  document.querySelectorAll('#validationTable tbody tr').forEach(row => {
    row.classList.remove('bg-blue-50', 'dark:bg-blue-900/40');
  });
}

window.viewFix = function (segment, description, loop, severity, buttonEl) {
  const panel = document.getElementById('fixDetails');
  const modal = document.getElementById('fixModal');
  const table = document.getElementById('validationTable');

  const data = EDI_SEGMENTS[segment] || { title: segment, description: 'Unknown segment', purpose: '', example: `${segment}*...` };
  if (!panel || !modal) return;

  const selectedError = {
    segment: segment,
    loop: loop,
    description: description,
    severity: severity
  };
  localStorage.setItem("selectedEDIError", JSON.stringify(selectedError));

  currentFixSegment = segment;
  currentFixExample = data.example + '~';

  // Update Content Across ALL Fix views (Panel and Modal)
  document.querySelectorAll('.fix-badge-text').forEach(el => el.innerText = segment);
  document.querySelectorAll('.fix-title-text').forEach(el => el.innerText = data.title);
  document.querySelectorAll('.fix-desc-text').forEach(el => el.innerText = description);
  document.querySelectorAll('.fix-explanation-text').forEach(el => el.innerText = data.purpose);
  document.querySelectorAll('.fix-suggested-text').forEach(el => el.innerText = `Add a valid ${segment} segment to the document to resolve the missing element or formatting issue.`);
  document.querySelectorAll('.fix-example-text').forEach(el => el.innerText = data.example + '~');

  // Remove existing row highlights and apply highlight to active row
  document.querySelectorAll('#validationTable tbody tr').forEach(row => {
    row.classList.remove('bg-blue-50', 'dark:bg-blue-900/40');
  });
  if (buttonEl) {
    const activeRow = buttonEl.closest('tr');
    if (activeRow) activeRow.classList.add('bg-blue-50', 'dark:bg-blue-900/40');
  }

  // Display Mode Context
  if (window.innerWidth >= 1024) {
    // Desktop View
    table.classList.replace('lg:col-span-5', 'lg:col-span-3');
    panel.classList.remove('hidden');
    panel.classList.add('flex');
  } else {
    // Mobile/Tablet View
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  // Attempt to highlight the segment in the parser tree if it exists
  const treeItems = document.querySelectorAll('#view-parsed .font-bold');
  let highlighted = false;
  treeItems.forEach(el => {
    if (el.innerText.replace('*', '').trim() === segment) {
      el.closest('div').classList.add('bg-amber-100', 'border-amber-300');
      if (!highlighted) {
        setTimeout(() => el.closest('div').scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
        highlighted = true;
      }
      setTimeout(() => el.closest('div').classList.remove('bg-amber-100', 'border-amber-300'), 3000);
    }
  });
}

window.askAIAssistant = function () {
  const errorJson = localStorage.getItem("selectedEDIError");
  if (!errorJson) return;

  const error = JSON.parse(errorJson);
  const prompt = `I am validating a Healthcare EDI file.

Error detected:
Segment: ${error.segment}
Loop: ${error.loop}

Problem:
${error.description}

Please explain why this error occurs and how to fix it.
Also provide the correct EDI segment format.`;

  localStorage.setItem("aiPrompt", prompt);
  window.switchView('assistant');
}

window.executeFix = function (buttonEl) {
  window.applyFix(currentFixSegment, currentFixExample, buttonEl);
}

window.applyFix = function (segment, exampleData, buttonEl) {
  if (!window.currentUploadedFileContent) return;

  // Simple auto-fix: append the missing segment before the trailing SE/GE/IEA or at the end
  let content = window.currentUploadedFileContent.trim();
  if (content.endsWith('~')) content = content.slice(0, -1);

  const segments = content.split('~');

  // Find where to insert (before SE if exists, else at end)
  let insertIdx = segments.length;
  for (let i = segments.length - 1; i >= 0; i--) {
    if (segments[i].startsWith('SE*') || segments[i].startsWith('GE*') || segments[i].startsWith('IEA*')) {
      insertIdx = i;
    } else {
      break;
    }
  }

  segments.splice(insertIdx, 0, exampleData.replace('~', ''));

  window.currentUploadedFileContent = segments.join('~') + '~';

  // Show success message inside the specific button clicked
  const originalText = buttonEl.innerHTML;
  buttonEl.innerHTML = `<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${segment} added successfully. Revalidating file...`;
  buttonEl.classList.add('bg-green-600', 'hover:bg-green-700');
  buttonEl.classList.remove('btn-primary');

  setTimeout(() => {
    buttonEl.innerHTML = originalText;
    buttonEl.classList.add('btn-primary');
    buttonEl.classList.remove('bg-green-600', 'hover:bg-green-700');
    window.closeFixDetails();
    window.revalidateFile();
  }, 2000);
}

window.revalidateFile = function () {
  if (!window.currentUploadedFileContent) return;

  const btn = document.getElementById('revalidate-btn');
  const originalHTML = btn ? btn.innerHTML : '';
  if (btn) {
    btn.innerHTML = `<svg class="animate-spin w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Revalidating...`;
  }

  // Hide fix panel
  window.closeFixDetails();

  setTimeout(() => {
    const segmentsWithLines = window.getSegmentsWithLines(window.currentUploadedFileContent);
    const segments = segmentsWithLines.map(s => s.content);
    const transType = detectTransactionType(segments);
    const errors = validateEDI(segmentsWithLines, transType);

    const fileName = window.currentUploadedFileName || 'Edited File';
    window.updateValidationReportUI(errors, fileName, transType, segmentsWithLines.length);
    window.updateParsedDataUI(segmentsWithLines, transType, fileName, errors);

    // Update Claim Summary as well
    window.calculateCLPSummary(window.currentUploadedFileContent);
    window.updateDashboardSummaryUI();

    if (btn) {
      btn.innerHTML = originalHTML;
    }
  }, 800);
}

// Dashboard Animations
window.animateValue = function (id, start, end, duration, isCurrency = false) {
  const element = document.getElementById(id);
  if (!element) return;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = progress * (end - start) + start;

    if (isCurrency) {
      element.textContent = "$" + value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      element.textContent = Math.floor(value).toLocaleString();
    }

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

window.calculateCLPSummary = function (ediText) {
  const segments = ediText.split("~").map(s => s.trim()).filter(Boolean);
  let totalClaims = 0;
  let totalBilled = 0;
  let totalPaid = 0;
  let totalPatientResponsibility = 0;

  segments.forEach(segment => {
    if (segment.startsWith("CLP*")) {
      const parts = segment.split("*");
      totalClaims++;
      totalBilled += parseFloat(parts[3] || 0);
      totalPaid += parseFloat(parts[4] || 0);
      totalPatientResponsibility += parseFloat(parts[5] || 0);
    }
  });

  const summary = {
    totalClaims,
    totalBilled,
    totalPaid,
    totalPatientResponsibility
  };

  localStorage.setItem("claimSummary", JSON.stringify(summary));
  return summary;
}

window.updateDashboardSummaryUI = function () {
  const summaryStr = localStorage.getItem("claimSummary");
  if (!summaryStr) return;

  const summary = JSON.parse(summaryStr);

  window.animateValue("claimsCount", 0, summary.totalClaims, 1500, false);
  window.animateValue("totalBilled", 0, summary.totalBilled, 1500, true);
  window.animateValue("totalPaid", 0, summary.totalPaid, 1500, true);
  window.animateValue("patientResp", 0, summary.totalPatientResponsibility, 1500, true);
}

window.runDashboardAnimations = function () {
  // Only animate if the view is visible
  const viewDashboard = document.getElementById('view-dashboard');
  if (viewDashboard && !viewDashboard.classList.contains('hidden')) {
    // Remove and re-add animation classes to re-trigger fade-in
    const cards = viewDashboard.querySelectorAll('.card.animate-fade-in');
    cards.forEach(card => {
      card.classList.remove('animate-fade-in');
      // small delay to force reflow
      void card.offsetWidth;
      card.classList.add('animate-fade-in');
    });

    // Parse existing values to number (removing commas) to know the end value
    // Update: Now we use the Claim Summary stored in localStorage for the dashboard cards
    window.updateDashboardSummaryUI();
  }
}

// Export Report functionality
window.exportReport = function () {
  const rows = [
    ["File Name", "Transaction Type", "Errors", "Warnings", "Status"],
    ["claim_batch_005.edi", "837 Professional", "3", "0", "Error"],
    ["remittance_502.edi", "835 Payment", "0", "0", "Valid"],
    ["enrollment_feb.edi", "834 Enrollment", "0", "1", "Warning"]
  ];

  let csvContent = "data:text/csv;charset=utf-8,"
    + rows.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "edi_validation_report.csv");

  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
}

// Custom Theme Toggling Logic
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  });
}

// AI Assistant Chat Logic
window.addChatMessage = function(text, isUser = false) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  if (isUser) {
    msgDiv.className = 'flex items-start flex-row-reverse animate-fade-in';
    msgDiv.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white ml-3 shadow-sm shrink-0 font-bold text-xs">
        JD
      </div>
      <div class="bg-blue-600 rounded-2xl p-4 text-sm text-white shadow-sm rounded-tr-none max-w-[80%] inline-block">
        ${text}
      </div>
    `;
  } else {
    msgDiv.className = 'flex items-start animate-fade-in';
    msgDiv.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white mr-3 shadow-sm shrink-0">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      </div>
      <div class="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm text-slate-700 shadow-sm rounded-tl-none max-w-[80%] inline-block">
        ${text}
      </div>
    `;
  }
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

window.handleAISend = function() {
  const input = document.getElementById('aiInput');
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  window.addChatMessage(text, true);
  input.value = '';

  // Simulated AI Response
  setTimeout(() => {
    let response = "I'm analyzing your request regarding EDI structures. Based on the context, it seems you're working with X12 protocols. How can I specifically help with your segment data?";
    
    if (text.toLowerCase().includes('n4')) {
      response = "The N4 segment specifies the city, state, and zip code. If you're missing the zip (N403), the claim might be rejected by the clearinghouse. Always ensure N4*CITY*ST*ZIP~ format.";
    } else if (text.toLowerCase().includes('isa')) {
      response = "The ISA segment is the Interchange Control Header. It's the very first segment in any X12 file and defines the separators used (like * for elements and ~ for segments).";
    }

    window.addChatMessage(response, false);
  }, 1000);
}

window.downloadFixedFile = function() {
  if (!window.currentUploadedFileContent) return;
  
  const content = window.currentUploadedFileContent;
  const fileName = (window.currentUploadedFileName || 'corrected').replace(/\.(edi|txt)$/i, '') + '_fixed.edi';
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// Initialize on first load
document.addEventListener('DOMContentLoaded', () => {
  window.runDashboardAnimations();
});
