
// --- Premium Loading State ---
window.showLoadingState = function(message) {
  let loader = document.getElementById('global-loader');
  if(!loader) {
    loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.className = 'fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white transition-opacity duration-300';
    loader.innerHTML = `
      <div class="glass-card p-8 flex flex-col items-center gap-5 animate-fade-in shadow-2xl rounded-2xl transform" style="transform: perspective(1000px) rotateX(2deg) scale(1.02);">
        <div class="loader-spinner w-12 h-12 border-4 border-t-blue-500 border-white/20 rounded-full"></div>
        <p class="font-bold text-lg tracking-wide" id="loader-msg">${message}</p>
      </div>
    `;
    document.body.appendChild(loader);
  } else {
    document.getElementById('loader-msg').innerText = message;
    loader.classList.remove('opacity-0', 'pointer-events-none');
  }
}

window.hideLoadingState = function() {
  const loader = document.getElementById('global-loader');
  if(loader) {
    loader.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => loader.remove(), 300);
  }
}

import './style.css'

// ── Demo Mode State ────────────────────────────────────────────────────────────
let isDemoMode = false; // never true by default — only set on "Try Demo Data" click

function updateDemoBanner() {
  const banner = document.getElementById('demoBanner');
  if (!banner) return;
  if (isDemoMode) {
    banner.style.display = 'flex';
    // Re-trigger slide animation each time it appears
    banner.classList.remove('banner-in');
    void banner.offsetWidth; // force reflow
    banner.classList.add('banner-in');
  } else {
    banner.style.display = 'none';
  }
}

window.goToUpload = function () {
  // Navigate to the upload view within the SPA
  if (typeof window.switchView === 'function') {
    window.switchView('upload');
  }
};

// Global EDI Store for shared state management
window.ediStore = {
  uploadedFiles: JSON.parse(localStorage.getItem('edi_files') || '[]'),
  currentFile: null,
  parsedData: null,
  validationResults: []
};

document.querySelector('#app').innerHTML = `
  <!-- Sidebar Navigation -->
  <aside id="sidebar" class="w-64 border-r flex flex-col h-full z-50 shadow-sm fixed md:static transform -translate-x-full md:translate-x-0 transition-all duration-300 ease-in-out">
    <div class="h-16 flex items-center px-6 border-b transition-colors duration-300">
      <div class="logo-container flex items-center">
        <img src="/logo.png" alt="HealthEDI Analyzer Logo" class="w-9 h-9 rounded-[10px] object-cover mr-[10px] shadow-sm">
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

    <!-- Demo Mode Banner -->
    <div id="demoBanner" style="display:none" class="demo-banner">
      <span>⚡ Demo Mode Active — Upload your file to analyze real data</span>
      <button onclick="goToUpload()" class="demo-banner-btn">Upload File</button>
    </div>

    <!-- Scrollable Workspace -->
    <div id="workspace" class="flex-1 overflow-y-auto p-4 md:p-8 relative">
       <!-- Dashboard View -->
       <section id="view-dashboard" class="view-section animate-fade-in block">
           
           <div class="flex justify-between items-end mb-6">
             <div>
               <p class="text-slate-500 dark:text-slate-400 text-sm mb-1">Overview</p>
               <h3 class="text-2xl font-bold flex items-center">
                 EDI Performance
                 <span id="dashboard-type-badge" class="ml-3 hidden"></span>
               </h3>
             </div>
             <button class="btn-primary flex items-center shadow-md shadow-blue-500/30" onclick="window.exportReport()">
               <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
               Export Report
             </button>
           </div>

            <!-- Enhanced Empty State -->
             <div id="dashboard-empty-state" class="flex flex-col items-center justify-center py-8 bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg mb-8 animate-fade-in px-6 min-h-[300px]">
               <div class="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 shadow-sm ring-1 ring-blue-500/20">
                 <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
               </div>
               <h2 class="text-2xl md:text-3xl font-black mb-2 text-slate-800 dark:text-white text-center tracking-tight">Welcome to HealthEDI Analyzer</h2>
               <p class="text-slate-500 dark:text-slate-400 text-center max-w-lg mb-6 text-base leading-relaxed">Analyze healthcare EDI claims instantly. Validate errors, explore hierarchical structures, and get AI-powered insights in one place.</p>
               
               <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 w-full max-w-2xl">
                 <div class="flex items-center p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:shadow-md hover:border-green-500/30 transition-all duration-300 group">
                   <div class="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                     <svg class="w-4 h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.5 1 6 2a1 1 0 0 1 1 1v7z"/><path d="m9 12 2 2 4-4"/></svg>
                   </div>
                   <span class="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300">Detect validation errors</span>
                 </div>
                 <div class="flex items-center p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:shadow-md hover:border-blue-500/30 transition-all duration-300 group">
                   <div class="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                     <svg class="w-4 h-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
                   </div>
                   <span class="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300">View smart analytics</span>
                 </div>
                 <div class="flex items-center p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:shadow-md hover:border-purple-500/30 transition-all duration-300 group">
                   <div class="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                     <svg class="w-4 h-4 text-purple-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                   </div>
                   <span class="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300">Get AI explanations</span>
                 </div>
                 <div class="flex items-center p-4 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:shadow-md hover:border-teal-500/30 transition-all duration-300 group">
                   <div class="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                     <svg class="w-4 h-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                   </div>
                   <span class="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300">Generate reports</span>
                 </div>
               </div>

               <div class="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-2 w-full">
                 <button class="btn-primary py-3 px-8 text-base flex items-center shadow-md shadow-blue-500/30 animate-bounce-subtle rounded-xl hover:scale-105 transition-transform duration-200 w-full sm:w-auto justify-center" onclick="switchView('upload')">
                   <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                   Start Analyzing Now
                 </button>
                 <button class="px-8 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 active:scale-95 text-slate-700 dark:text-slate-300 text-base shadow-sm hover:scale-105 transition-transform duration-200 w-full sm:w-auto justify-center" onclick="window.tryDemoFile()">
                   Try with Demo Data
                 </button>
               </div>
               <p class="text-[11px] text-slate-400 dark:text-slate-500 mb-8 mt-2">Start by uploading your first EDI file or try demo data.</p>

               <div class="w-full max-w-4xl border-t border-slate-100 dark:border-slate-800 pt-6">
                 <div class="flex items-center justify-between relative px-4 md:px-10">
                   <div class="absolute top-4 left-[10%] w-[80%] h-[4px] bg-slate-400 dark:bg-slate-500 rounded-full shadow-sm -translate-y-1/2 -z-0"></div>
                   <div class="flex flex-col items-center gap-2 relative z-10 transition-all duration-300 group">
                     <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30 text-sm ring-4 ring-white dark:ring-slate-900 group-hover:scale-110 transition-transform">1</div>
                     <span class="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Upload</span>
                   </div>
                   <div class="flex flex-col items-center gap-2 relative z-10 transition-all duration-300 group">
                     <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-sm ring-4 ring-white dark:ring-slate-900 group-hover:scale-110 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-transform">2</div>
                     <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Parse</span>
                   </div>
                   <div class="flex flex-col items-center gap-2 relative z-10 transition-all duration-300 group">
                     <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-sm ring-4 ring-white dark:ring-slate-900 group-hover:scale-110 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-transform">3</div>
                     <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Validate</span>
                   </div>
                   <div class="flex flex-col items-center gap-2 relative z-10 transition-all duration-300 group">
                     <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-sm ring-4 ring-white dark:ring-slate-900 group-hover:scale-110 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-transform">4</div>
                     <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Summary</span>
                   </div>
                 </div>
               </div>
             </div>

           <!-- Improved Dashboard Content (hidden by default) -->
            <div id="dashboard-content" class="hidden animate-fade-in">
              <!-- Top Metrics & Quick Actions -->
              <div id="dashboard-overview-header" class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="card bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl shadow-blue-500/20 overflow-hidden relative group">
                    <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <p class="text-blue-100 text-sm font-medium mb-1">Total Files Processed</p>
                    <h3 id="stat-total-files" class="text-4xl font-black">--</h3>
                    <div class="mt-4 flex items-center text-xs text-blue-200">
                      <span class="bg-blue-500/30 px-2 py-0.5 rounded-full mr-2">Lifetime</span>
                      <span>Updated just now</span>
                    </div>
                  </div>
                  <div class="card bg-white dark:bg-slate-800/80 flex flex-col justify-between border-slate-100 dark:border-slate-700">
                    <div class="flex justify-between items-start">
                      <p class="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Last File Status</p>
                      <span id="stat-last-status-badge">--</span>
                    </div>
                    <h3 id="stat-last-status" class="text-2xl font-black mt-2 text-slate-800 dark:text-white">--</h3>
                    <p class="text-xs text-slate-400 mt-2">Based on X12-5010 standards</p>
                  </div>
                  <div class="card bg-white dark:bg-slate-800/80 flex flex-col justify-between border-l-4 border-l-red-500 border-slate-100 dark:border-slate-700">
                    <p class="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">Validation Issues</p>
                    <div class="flex items-baseline gap-2 mt-2">
                      <h3 id="stat-error-count" class="text-4xl font-black text-red-500">--</h3>
                      <span class="text-sm text-slate-400 font-bold uppercase">Errors</span>
                    </div>
                    <p class="text-xs text-slate-400 mt-2">Critical issues detected</p>
                  </div>
                </div>
                <div class="card bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50 flex flex-col justify-center gap-3 p-5">
                  <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Quick Actions</p>
                  <div class="flex flex-col gap-2">
                    <button class="w-full text-left p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 text-sm font-bold flex items-center transition-all group shadow-sm hover:shadow-md border border-transparent hover:border-slate-100 dark:hover:border-slate-600" onclick="switchView('upload')">
                      <span class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mr-3 text-xs group-hover:scale-110 transition-transform">↑</span>
                      Upload New
                    </button>
                    <button class="w-full text-left p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 text-sm font-bold flex items-center transition-all group shadow-sm hover:shadow-md border border-transparent hover:border-slate-100 dark:hover:border-slate-600" onclick="switchView('validation')">
                      <span class="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center mr-3 text-xs group-hover:scale-110 transition-transform">!</span>
                      View Errors
                    </button>
                    <button class="w-full text-left p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-700 text-sm font-bold flex items-center transition-all group shadow-sm hover:shadow-md border border-transparent hover:border-slate-100 dark:hover:border-slate-600" onclick="switchView('assistant')">
                      <span class="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg flex items-center justify-center mr-3 text-xs group-hover:scale-110 transition-transform">AI</span>
                      AI Assistant
                    </button>
                  </div>
                </div>
              </div>

              <!-- File Metadata Card -->
              <div id="dashboard-file-info" class="card mb-8 bg-blue-50/30 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20 ring-1 ring-blue-500/5">
                <div class="flex flex-wrap items-center justify-between gap-6">
                  <div class="flex items-center">
                    <div id="transaction-icon-container" class="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mr-5 shadow-lg shadow-blue-500/30 ring-4 ring-blue-500/10">
                      <!-- Icon injected via JS -->
                    </div>
                    <div>
                      <p class="text-[10px] uppercase tracking-widest font-black text-blue-600 dark:text-blue-400 mb-1">Current File</p>
                      <h4 id="info-filename" class="text-xl font-black text-slate-800 dark:text-white leading-tight">--</h4>
                    </div>
                  </div>
                  
                  <div class="flex flex-wrap gap-10 items-center">
                    <div>
                      <p class="text-[10px] uppercase tracking-wider font-black text-slate-400 dark:text-slate-500 mb-1">Type</p>
                      <p id="info-type" class="text-sm font-bold">--</p>
                    </div>
                    <div>
                      <p class="text-[10px] uppercase tracking-wider font-black text-slate-400 dark:text-slate-500 mb-1">Uploaded At</p>
                      <p id="info-time" class="text-sm font-bold">--</p>
                    </div>
                    <div>
                      <p class="text-[10px] uppercase tracking-wider font-black text-slate-400 dark:text-slate-500 mb-1">Health Score</p>
                      <div id="info-status">--</div>
                    </div>
                  </div>
                </div>
              </div>

             <!-- Dynamic Stats Grid -->
             <div id="dashboard-cards-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <!-- Dynamic Cards injected via JS -->
             </div>
           </div>
          <!-- Table -->
          <div class="card p-0 overflow-hidden animate-fade-in animate-delay-400 mt-8">
            <div class="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center transition-colors duration-300">
              <h3 class="font-bold text-lg transition-colors duration-300">Recent Files</h3>
              <button class="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">View All</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[700px] text-left text-sm whitespace-nowrap">
                <thead class="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">
                  <tr>
                      <th class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">File Name</th>
                      <th class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Transaction</th>
                      <th class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Upload Time</th>
                      <th class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Status</th>
                      <th class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">Issues</th>
                    </tr>
                </thead>
                <tbody id="recent-files-tbody" class="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800 group/list transition-colors duration-300">
                  <!-- Dynamically populated from store -->
                  <tr><td colspan="6" class="px-6 py-10 text-center text-slate-500 italic">No files uploaded yet</td></tr>
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
              <p id="upload-hint" class="text-xs text-slate-400 dark:text-slate-500 mt-6 font-medium">Supported formats: .edi, .txt, .dat, .x12</p>
              <div id="upload-error" class="hidden mt-4 p-3 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium animate-fade-in"></div>
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
          <div class="flex justify-between items-end mb-6 px-4">
             <div>
               <h2 class="text-2xl font-bold transition-colors duration-300">Parsed EDI Structure</h2>
               <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors duration-300">Showing hierarchical view of 837 Claim data</p>
             </div>
             <div class="flex items-center space-x-3">
                <div class="relative">
                  <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <input id="searchInput" type="text" placeholder="Search segments..." class="pl-9 pr-4 py-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 shadow-sm outline-none">
                </div>
                <button class="btn-secondary text-sm">Expand All</button>
                <button class="btn-primary flex items-center shadow-sm text-sm">
                   <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                   Download JSON
                </button>
             </div>
          </div>
          
          <div class="parsed-wrapper">
            <div class="edi-left">
              <div class="edi-tree card p-6 shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700 transition-colors duration-300">
                <ul class="space-y-2 text-sm font-mono tree-root">
                  <li class="p-8 text-center text-slate-500 italic">No EDI data to display. Please upload a file first.</li>
                </ul>
              </div>
            </div>
            
            <!-- EMPTY STATE Panel -->
            <div id="parsedEmptyState" class="edi-right flex flex-col items-center justify-center p-8 text-slate-400 dark:text-slate-500 text-center animate-fade-in">
              <svg class="w-16 h-16 mb-4 opacity-40 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
              <p class="text-sm font-semibold">Click any segment to view details and AI explanations.</p>
            </div>
            <!-- Details Panel -->
            <div id="detailsPanel" class="edi-right hidden"></div>
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
         <div class="validation-container">
             <div class="table-section"><div id="validationTable" class="card p-0 overflow-hidden shadow-sm rounded-xl">
                <div class="w-full overflow-x-auto scrollbar-thin">
                   <table class="validation-table w-full min-w-full table-auto">
                      <thead>
                      <tr>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Severity</th>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Line</th>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Segment</th>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Loop</th>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">Description</th>
                         <th class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap text-left text-gray-600 dark:text-gray-300">AI Suggestion</th>
                      </tr>
                  </thead>
               <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800"><tr><td colspan="6" class="px-6 py-10 text-center text-slate-500 italic">No validation issues to report.</td></tr></tbody>
                </table>
                </div>
             </div>

             </div>

             <!-- Right: Fix Details Panel -->
             <div id="fixDetails" class="card p-0 shadow-lg flex-col lg:sticky lg:top-6 self-start max-h-[90vh]">
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
                 
                  <!-- AI Actions -->
                  <div class="flex flex-col gap-3">
                    <button id="askAIButton" onclick="window.askAIAssistant()" class="w-full bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center shadow-sm text-sm py-2.5 rounded-lg font-bold transition-all">
                       <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                       Ask AI Assistant
                    </button>
                    
                    <button id="fixAIBtn_Validation" onclick="window.askAIFix()" class="w-full bg-red-600 hover:bg-red-700 text-white flex justify-center items-center shadow-sm text-sm py-2.5 rounded-lg font-bold transition-all">
                       <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                       Fix with AI
                    </button>

                    <button id="copyFormatBtn" onclick="window.copyFormatFromValidation()" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 flex justify-center items-center shadow-sm text-sm py-2.5 rounded-lg font-bold transition-all">
                       <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                       Copy Correct Format
                    </button>
                  </div>
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
                 
                  <!-- AI Actions -->
                  <div class="flex flex-col gap-3">
                    <button id="askAIButtonModal" onclick="window.askAIAssistant()" class="w-full bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center shadow-sm text-sm py-2.5 rounded-lg font-bold transition-all">
                       <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                       Ask AI Assistant
                    </button>
                    
                    <button id="fixAIBtn_ValidationModal" onclick="window.askAIFix()" class="w-full bg-red-600 hover:bg-red-700 text-white flex justify-center items-center shadow-sm text-sm py-2.5 rounded-lg font-bold transition-all">
                       <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                       Fix with AI
                    </button>

                    <button id="copyFormatBtnModal" onclick="window.copyFormatFromValidation()" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 flex justify-center items-center shadow-sm text-sm py-2.5 rounded-lg font-bold transition-all">
                       <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                       Copy Correct Format
                    </button>
                  </div>
               </div>
            </div>
          </div>
       </section>
       
       <section id="view-summary" class="view-section hidden animate-fade-in max-w-5xl mx-auto py-8">

         <!-- Header with dynamic file info -->
         <div class="flex justify-between items-start mb-6 flex-wrap gap-4">
           <div>
             <p class="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest font-black mb-1">Summary Report</p>
             <h2 id="summary-title" class="text-2xl font-bold transition-colors">EDI Claims Summary</h2>
             <p id="summary-subtitle" class="text-slate-500 dark:text-slate-400 text-sm mt-1">No file loaded yet. Upload a file to see detailed insights.</p>
             <p id="summary-empty-msg" class="text-sm text-gray-500 dark:text-gray-400 mt-2 text-left hidden">No data available. Upload a file or <a href="#" onclick="window.tryDemoFile(); return false;" class="text-blue-500 hover:underline transition-colors">use demo data</a> to explore insights.</p>
           </div>
           <div id="summary-file-meta" class="flex flex-wrap gap-4 items-center text-sm hidden">
             <div class="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-mono text-xs">
               📄 <span id="summary-filename">--</span>
             </div>
             <div class="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-400 font-bold text-xs">
               🏷️ <span id="summary-filetype">--</span>
             </div>
             <div class="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 text-xs">
               🕐 <span id="summary-filetime">--</span>
             </div>
           </div>
         </div>

         <!-- Current File Insights Section Header -->
         <h3 class="text-lg font-semibold mt-4 mb-2">
           Current File Insights
         </h3>
         <p class="text-xs text-gray-500 mb-3">
           Based on selected EDI file
         </p>

         <!-- Dynamic Metric Cards -->
         <div id="summary-cards" class="grid grid-cols-1 md:grid-cols-4 gap-5 mb-3">
           <div class="card bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/30 border-none col-span-1 md:col-span-1">
             <p class="text-blue-100 font-medium text-sm mb-1">Total Issues</p>
             <h3 id="summary-total-errors" class="text-3xl font-black">--</h3>
             <p class="text-blue-200 text-xs mt-2">Errors + Warnings + Info</p>
           </div>
           <div class="card shadow-sm border-l-4 border-l-red-500">
             <p class="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Errors</p>
             <h3 id="summary-critical-count" class="text-3xl font-black text-red-500">--</h3>
             <p class="text-slate-400 dark:text-slate-500 text-xs mt-1">Critical / High</p>
           </div>
           <div class="card shadow-sm border-l-4 border-l-yellow-400">
             <p class="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Warnings</p>
             <h3 id="summary-warn-count" class="text-3xl font-black text-yellow-500">--</h3>
             <p class="text-slate-400 dark:text-slate-500 text-xs mt-1">Medium severity</p>
           </div>
           <div class="card shadow-sm border-l-4 border-l-blue-400">
             <p class="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Info</p>
             <h3 id="summary-segments-count" class="text-3xl font-black text-blue-500">--</h3>
             <p class="text-slate-400 dark:text-slate-500 text-xs mt-1">Low severity</p>
           </div>
         </div>
         <p class="text-xs text-slate-400 dark:text-slate-500 mb-6 italic">✓ Summary data is synchronized with validation report</p>

         <!-- Type-specific insights block -->
         <div id="summary-type-insights" class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 hidden">
           <!-- Injected via JS based on file type -->
         </div>

         <!-- Two-column bottom section -->
         <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

           <!-- Validation Summary -->
           <div class="card p-0 shadow-sm overflow-hidden">
             <h3 class="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 font-bold text-sm uppercase tracking-wider transition-colors">Validation Summary</h3>
             <div class="p-5 space-y-3" id="summary-validation-list">
               <div class="flex items-center justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-700">
                 <span class="flex items-center gap-2 text-slate-500">
                   <span class="w-4 h-4 inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs">✔</span>
                   Valid Segments
                 </span>
                 <span id="summary-valid-segments" class="font-bold text-green-600 dark:text-green-400">--</span>
               </div>
               <div class="flex items-center justify-between text-sm py-2 border-b border-slate-100 dark:border-slate-700">
                 <span class="flex items-center gap-2 text-slate-500">
                   <span class="w-4 h-4 inline-flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-xs">✕</span>
                   Invalid Segments
                 </span>
                 <span id="summary-invalid-segments" class="font-bold text-red-500">--</span>
               </div>
               <div class="flex items-center justify-between text-sm py-2">
                 <span class="flex items-center gap-2 text-slate-500">
                   <span class="w-4 h-4 inline-flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-xs">!</span>
                   Missing Fields
                 </span>
                 <span id="summary-missing-fields" class="font-bold text-yellow-600 dark:text-yellow-400">--</span>
               </div>
             </div>
           </div>

           <!-- Top Error Breakdown -->
           <div class="card p-0 shadow-sm overflow-hidden">
             <h3 class="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 font-bold text-sm uppercase tracking-wider transition-colors">Top Errors</h3>
             <div id="summary-error-list" class="p-5 space-y-3">
               <p class="text-slate-400 text-sm italic">No errors found</p>
             </div>
           </div>
         </div>

         <!-- AI Insight Block -->
         <div id="summary-ai-insight-block" class="card border-l-4 border-l-teal-500 bg-teal-50/40 dark:bg-teal-900/10 shadow-sm">
           <div class="flex items-start gap-4">
             <div class="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 shadow-sm">
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             </div>
             <div>
               <p class="text-[10px] uppercase tracking-widest font-black text-teal-600 dark:text-teal-400 mb-1">AI Insight</p>
               <p id="ai-insight-text" class="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                 Analyzing validation data...
               </p>
             </div>
           </div>
         </div>

         <!-- Overall Analytics Section -->
         <div class="mt-8 mb-4">
           <h3 class="text-lg font-semibold mt-6 mb-2">
             Overall Analytics
           </h3>
           <p class="text-xs text-gray-500 mb-3">
             Cumulative (till date) across all uploaded files
           </p>

           <!-- globalStats Cards -->
           <div id="summary-global-cards" class="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
             <div class="card shadow-sm border-l-4 border-l-indigo-500">
               <p class="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Total Files</p>
               <h3 id="global-total-files" class="text-3xl font-black text-indigo-600">--</h3>
               <p class="text-xs text-slate-400 mt-1">Processed</p>
             </div>
             <div class="card shadow-sm border-l-4 border-l-red-400">
               <p class="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Total Issues</p>
               <h3 id="global-total-errors" class="text-3xl font-black text-red-500">--</h3>
               <p class="text-xs text-slate-400 mt-1">Cumulative errors</p>
             </div>
             <div class="card shadow-sm border-l-4 border-l-teal-400">
               <p class="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Total Segments</p>
               <h3 id="global-total-segments" class="text-3xl font-black text-teal-600">--</h3>
               <p class="text-xs text-slate-400 mt-1">Cumulative parsed</p>
             </div>
             <div class="card shadow-sm border-l-4 border-l-emerald-500">
               <p class="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Total Claim Amount</p>
               <h3 id="global-total-amount" class="text-3xl font-black text-emerald-600">--</h3>
               <p class="text-xs text-slate-400 mt-1">From BPR segments</p>
             </div>
           </div>

           <!-- Charts -->
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div class="card p-5 shadow-sm">
               <p class="text-xs uppercase tracking-wider font-black text-slate-400 dark:text-slate-500 mb-4">File Type Distribution</p>
               <div class="h-52 flex items-center justify-center">
                 <canvas id="fileTypeChart"></canvas>
               </div>
             </div>
             <div class="card p-5 shadow-sm">
               <p class="text-xs uppercase tracking-wider font-black text-slate-400 dark:text-slate-500 mb-4">Valid vs Error Segments</p>
               <div class="h-52 flex items-center justify-center">
                 <canvas id="errorChart"></canvas>
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

// Demo banner: never show on initial page load — only after clicking "Try Demo Data" this session
// (no localStorage persistence, so refresh always starts clean)
localStorage.removeItem('demoMode'); // clear any stale flag from previous sessions

// Simple Router implementation
window.switchView = function (viewId) {
  // Sync UI with store before switching
  window.updateUIFromStore();

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
      const savedPrompt = localStorage.getItem('aiPrompt') || localStorage.getItem('ai_query');
      if (savedPrompt) {
        const aiInput = document.getElementById('aiInput');
        if (aiInput) {
          aiInput.value = savedPrompt;
          // Clean up
          localStorage.removeItem('aiPrompt');
          localStorage.removeItem('ai_query');
        }
      }
    }
  }

  // Update nav UI
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('text-blue-700', 'bg-blue-50', 'dark:bg-blue-900/30', 'dark:text-blue-400')
    btn.classList.remove('nav-active')
    btn.classList.add('text-slate-600', 'dark:text-slate-400')
    btn.querySelector('svg').classList.remove('text-blue-600', 'dark:text-blue-400')
    btn.querySelector('svg').classList.add('text-slate-400', 'dark:text-slate-500')
  })

  // set active class
  const activeBtn = document.querySelector(`.nav-btn[data-view="${viewId}"]`)
  if (activeBtn) {
    activeBtn.classList.add('nav-active')
    activeBtn.classList.remove('text-slate-600', 'dark:text-slate-400', 'text-blue-700', 'bg-blue-50', 'dark:bg-blue-900/30', 'dark:text-blue-400')
    // svg color is handled entirely by .nav-active svg in CSS
    activeBtn.querySelector('svg').classList.remove('text-slate-400', 'dark:text-slate-500', 'text-blue-600', 'dark:text-blue-400')

    // Update Title
    document.getElementById('topbar-title').innerText = activeBtn.innerText.trim()
  }

  // Trigger animations if switching to dashboard
  if (viewId === 'dashboard') {
    window.runDashboardAnimations();
  }

  // Populate summary page when navigating to it
  if (viewId === 'summary') {
    window.updateSummaryUI();
  }

  // Navigation Fix: Reset scroll position to top
  setTimeout(() => {
    window.scrollTo(0, 0);
    console.log(`[Navigation] Scrolled to top for view: ${viewId}`);
  }, 0);
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

    // Validate file type
    const allowedExtensions = ['.edi', '.txt', '.dat', '.x12'];
    const fileName = file.name.toLowerCase();
    const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!isValidExtension) {
      const errorEl = document.getElementById('upload-error');
      if (errorEl) {
        errorEl.innerText = "Invalid file type. Please upload a valid EDI file (.edi, .txt, .dat, .x12).";
        errorEl.classList.remove('hidden');
        // Vibrate/Shake effect if supported, otherwise just show
        errorEl.classList.add('animate-pulse');
        setTimeout(() => {
          errorEl.classList.add('hidden');
          errorEl.classList.remove('animate-pulse');
        }, 5000);
      }
      // Reset file input so same file can be picked again
      const fileInput = document.getElementById('file-input');
      if (fileInput) fileInput.value = '';
      return;
    }

    // Hide any previous error
    const errorEl = document.getElementById('upload-error');
    if (errorEl) errorEl.classList.add('hidden');

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

      // Basic "Security" Validation (Content Sanity Check)
      const firstSegment = ediContent.trim().substring(0, 3).toUpperCase();
      const validHeaders = ['ISA', 'GS', 'ST'];

      if (!validHeaders.includes(firstSegment)) {
        const errorEl = document.getElementById('upload-error');
        if (errorEl) {
          errorEl.innerText = "Invalid file content. Please upload a valid EDI file.";
          errorEl.classList.remove('hidden');
          errorEl.classList.add('animate-pulse');
        }
        loadingContent.classList.add('hidden');
        uploadContent.classList.remove('hidden');
        fileInput.value = '';
        return;
      }

      // Populate Global Store
      const segmentsWithLines = window.getSegmentsWithLines(ediContent);
      const segments = segmentsWithLines.map(s => s.content);
      const transType = detectTransactionType(segments);
      const errors = validateEDI(segmentsWithLines, transType);

      const newFileEntry = {
        name: file.name,
        type: transType,
        time: new Date().toLocaleTimeString(),
        status: errors.length > 0 ? `${errors.length} Errors` : 'Valid',
        raw: ediContent,
        segments: segmentsWithLines,
        errors: errors
      };

      // Set current file and add to history
      window.ediStore.currentFile = newFileEntry;
      window.ediStore.uploadedFiles = [newFileEntry, ...window.ediStore.uploadedFiles.slice(0, 4)];

      // Persist history
      localStorage.setItem('edi_files', JSON.stringify(window.ediStore.uploadedFiles));

      // Dismiss Demo Mode on real file upload
      isDemoMode = false;
      updateDemoBanner();

      // Trigger Centralized UI Update
      window.updateUIFromStore();

      setTimeout(() => {
        loadingContent.classList.add('hidden');
        loadingContent.classList.remove('flex');
        uploadContent.classList.remove('hidden');

        window.switchView('dashboard');
        fileInput.value = '';
      }, 1500);
    };
    reader.readAsText(file);
  }

  // Centralized UI Update Function
  window.updateUIFromStore = function () {
    const { currentFile, uploadedFiles } = window.ediStore;

    // Toggle Visibility based on file count
    const emptyState = document.getElementById('dashboard-empty-state');
    const contentArea = document.getElementById('dashboard-content');

    if (uploadedFiles.length === 0) {
      if (emptyState) emptyState.classList.remove('hidden');
      if (contentArea) contentArea.classList.add('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      if (contentArea) contentArea.classList.remove('hidden');
    }

    // Update Global Stats
    const totalFilesEl = document.getElementById('stat-total-files');
    if (totalFilesEl) totalFilesEl.innerText = uploadedFiles.length;

    if (currentFile) {
      // Last File Status Stats
      const lastStatusEl = document.getElementById('stat-last-status');
      const lastStatusBadgeEl = document.getElementById('stat-last-status-badge');
      const errorCountEl = document.getElementById('stat-error-count');

      if (lastStatusEl) lastStatusEl.innerText = currentFile.status === 'Valid' ? 'Healthy' : 'Needs Repair';
      if (lastStatusBadgeEl) {
        lastStatusBadgeEl.className = currentFile.status === 'Valid' ? 'badge-success' : 'badge-error';
        lastStatusBadgeEl.innerText = currentFile.status === 'Valid' ? '✔' : '✘';
      }
      if (errorCountEl) errorCountEl.innerText = currentFile.errors ? currentFile.errors.length : 0;
    }

    // Update Dashboard (if we have a current file)
    window.updateDashboardSummaryUI(currentFile?.raw, currentFile?.name, currentFile?.type, currentFile?.errors || []);

    // Update Detailed Views (always sync with current file or empty)
    window.updateValidationReportUI(currentFile?.errors || [], currentFile?.name || "No File", currentFile?.type || "N/A", currentFile?.segments?.length || 0);
    window.updateParsedDataUI(currentFile?.segments || [], currentFile?.type || "N/A", currentFile?.name || "No File", currentFile?.errors || []);

    // Update Recent Files Table (always from store)
    window.updateRecentFilesUI_FromStore(uploadedFiles);
  };

  // Demo Data Injection
  window.tryDemoFile = function () {
    window.showLoadingState("Analyzing EDI file...");
    setTimeout(() => {
    const mockData = {
      name: "sample_837_claims_batch.edi",
      type: "837P",
      time: "Just Now",
      status: "12 Errors",
      raw: "ISA*00*...ST*837*...",
      segments: [
        { content: "ISA*00*          *00*          *ZZ*SENDERID       *ZZ*RECEIVERID     *230318*1458*^*00501*000000905*1*T*:", line: 1 },
        { content: "GS*HC*SENDERID*RECEIVERID*20230318*1458*1*X*005010X222A1", line: 2 },
        { content: "ST*837*0001*005010X222A1", line: 3 },
        { content: "BHT*0019*00*0123*20230318*1458*CH", line: 4 },
        { content: "NM1*41*2*PAYER NAME*****46*PAYERID", line: 5 },
        { content: "NM1*85*2*PROVIDER ORG*****XX*1234567890", line: 6 },
        { content: "N3*123 MAIN ST", line: 7 },
        { content: "N4*CHICAGO*IL*60601", line: 8 }
      ],
      errors: [
        { severity: "High", line: 4, segment: "BHT", loop: "Header", description: "Missing required reference identification mapping (BHT03)", suggestion: "Ensure BHT03 contains the unique reference ID", action: "Fix" },
        { severity: "Medium", line: 7, segment: "N3", loop: "2010AA", description: "Address line exceeds standard length for some payers", suggestion: "Truncate or split address", action: "Analyze" },
        { severity: "Critical", line: 6, segment: "NM1", loop: "2010AA", description: "Invalid NPI checksum for element NM109", suggestion: "Verify the 10-digit NPI number", action: "Fix" }
      ]
    };

    window.ediStore.currentFile = mockData;
    window.ediStore.uploadedFiles = [mockData, ...window.ediStore.uploadedFiles.filter(f => f.name !== mockData.name).slice(0, 4)];
    localStorage.setItem('edi_files', JSON.stringify(window.ediStore.uploadedFiles));

    // Activate Demo Mode
    isDemoMode = true;
    updateDemoBanner();

    // Animate transition
    const emptyState = document.getElementById('dashboard-empty-state');
    if (emptyState) emptyState.classList.add('opacity-0', 'scale-95');
    
    window.updateUIFromStore();
    window.hideLoadingState();
    // window.switchView('parsed'); // Keep on Dashboard page
    
    }, 1200);
  };
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
                <div class="segment flex items-center group cursor-pointer p-2 hover:bg-slate-50 rounded-lg border ${errorClass} transition-colors" data-type="${segId}">
                    <svg class="w-4 h-4 mr-2 text-slate-400 group-hover:text-blue-500 transition-colors transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                    <span class="font-bold mr-2 px-1.5 rounded ${colorClass}">${segId}</span>
                    <span class="text-slate-600 font-medium">${def.title}</span>
                    <span class="ml-auto text-[10px] text-slate-400 font-mono">L${lineNum}</span>
                    ${hasError ? '<span class="ml-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>' : ''}
                </div>
            `;
    }

    return `
            <div class="segment flex items-center p-1.5 hover:bg-slate-50 rounded text-xs cursor-pointer group/line border ${errorClass}" data-type="${segId}">
                <span class="font-bold w-12 mr-2 ${colorClass} px-1 rounded">${segId}*</span>
                <span class="text-slate-500 truncate max-w-lg font-mono">${segData.substring(0, 80)}${segData.length > 80 ? '...' : ''}</span>
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

  if (segmentsWithLines.length === 0) {
    treeContainer.innerHTML = `<li class="p-8 text-center text-slate-500 italic">No EDI data to display. Please upload a file first.</li>`;
    const panel = document.getElementById('detailsPanel');
    if (panel) panel.classList.add('hidden');
    return;
  }

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
    const severityUpper = (err.severity || '').toUpperCase();
    if (severityUpper === 'ERROR' || severityUpper === 'HIGH') badgeClass = 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider';
    if (severityUpper === 'CRITICAL') badgeClass = 'bg-red-200 text-red-800 dark:bg-red-950 dark:text-red-200 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ring-1 ring-red-300';
    if (severityUpper === 'WARNING' || severityUpper === 'MEDIUM') badgeClass = 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider';
    if (severityUpper === 'INFO') badgeClass = 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider';
    if (severityUpper === 'SUCCESS') badgeClass = 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider';

    let rowHighlight = 'hover:bg-gray-50 dark:hover:bg-gray-700';
    if (severityUpper === 'ERROR' || severityUpper === 'HIGH' || severityUpper === 'CRITICAL') rowHighlight = 'bg-red-50/50 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20';
    if (severityUpper === 'WARNING' || severityUpper === 'MEDIUM') rowHighlight = 'bg-yellow-50/50 dark:bg-yellow-900/10 hover:bg-yellow-50 dark:hover:bg-yellow-900/20';
    const tr = document.createElement('tr');
    tr.className = `border-b border-gray-200 dark:border-gray-700 transition-all duration-200 group cursor-pointer relative validation-row ${rowHighlight}`;
    tr.dataset.segment = err.segment;
    tr.dataset.description = err.description.replace(/'/g, "\\'");
    tr.dataset.loop = err.loop;
    tr.dataset.severity = err.severity;

    tr.innerHTML = `
            <td class="px-4 py-3 whitespace-nowrap"><span class="${badgeClass}">${err.severity}</span></td>
            <td class="px-4 py-3 font-mono font-medium whitespace-nowrap text-sm">${err.line > 0 ? 'L' + err.line : 'Glbl'}</td>
            <td class="px-4 py-3 font-mono font-bold whitespace-nowrap text-blue-700 dark:text-blue-400">${err.segment}</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm">${err.loop}</td>
            <td class="px-4 py-3 text-sm leading-snug">${err.description}</td>
            <td class="px-4 py-3 text-xs">
              <div class="flex flex-col gap-1.5">
                <span class="text-slate-500 dark:text-slate-400 italic leading-snug">${err.suggestion || 'N/A'}</span>
                ${err.severity !== 'Success' ? `
                <button class="view-row-btn mt-[6px] px-[10px] py-[4px] text-[12px] bg-[#2563eb] text-white rounded-[6px] hover:bg-blue-700 transition-colors relative z-10 inline-block self-start w-fit max-w-min">View &rarr;</button>` : ''}
              </div>
            </td>
        `;

    // Row click opens fix panel
    if (err.severity !== 'Success') {
      tr.addEventListener('click', () => {
        window.viewFix(tr.dataset.segment, tr.dataset.description, tr.dataset.loop, tr.dataset.severity, tr);
      });

      // Button click should not double-fire the row click
      const viewBtn = tr.querySelector('.view-row-btn');
      if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.viewFix(tr.dataset.segment, tr.dataset.description, tr.dataset.loop, tr.dataset.severity, tr);
        });
      }
    }

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
    panel.classList.remove("show");
    setTimeout(() => {
      panel.style.display = "none";
    }, 300);
  }
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
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
  document.querySelectorAll('#validationTable tbody tr.validation-row').forEach(row => {
    row.classList.remove('bg-blue-50', 'dark:bg-blue-900/40', 'border-l-4', 'border-blue-600');
  });

  // buttonEl is now the TR itself or an element within it
  const activeRow = (buttonEl instanceof HTMLTableRowElement) ? buttonEl : buttonEl?.closest('tr');
  if (activeRow) {
    activeRow.classList.add('bg-blue-50', 'dark:bg-blue-900/40', 'border-l-4', 'border-blue-600');
  }

  // Display Mode Context
  if (window.innerWidth >= 1024) {
    // Desktop View
    panel.style.display = "block";
    setTimeout(() => {
      panel.classList.add("show");
    }, 10);

    // Smooth scroll and layout recalculation
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
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

window.updateDashboardSummaryUI = function (ediText, fileName, transType, errors = []) {
  // Use store data if arguments are missing
  if (!ediText && window.ediStore && window.ediStore.currentFile) {
    const f = window.ediStore.currentFile;
    ediText = f.raw;
    fileName = f.name;
    transType = f.type;
    errors = f.errors;
  }

  const emptyState = document.getElementById('dashboard-empty-state');
  const dashboardContent = document.getElementById('dashboard-content');
  const badge = document.getElementById('dashboard-type-badge');

  if (!ediText) {
    if (emptyState) emptyState.classList.remove('hidden');
    if (dashboardContent) dashboardContent.classList.add('hidden');
    if (badge) badge.classList.add('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (dashboardContent) dashboardContent.classList.remove('hidden');

  // Update File Info Section
  document.getElementById('info-filename').innerText = fileName || "--";

  let typeLabel = transType ? transType : "837P";
  let badgeClass = "badge-neutral";
  let iconHtml = "";

  let detectType = String(transType || '');
  if (!detectType && fileName) {
    if (fileName.includes('837')) detectType = '837';
    else if (fileName.includes('835')) detectType = '835';
    else if (fileName.includes('834')) detectType = '834';
  }

  if (detectType.includes('837')) {
    typeLabel = "837 Professional";
    badgeClass = "badge-blue";
    iconHtml = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`;
  } else if (detectType.includes('835')) {
    typeLabel = "835 Payment";
    badgeClass = "badge-success";
    iconHtml = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  } else if (detectType.includes('834')) {
    typeLabel = "834 Enrollment";
    badgeClass = "badge-purple";
    iconHtml = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`;
  }

  document.getElementById('info-type').innerText = typeLabel;
  document.getElementById('info-time').innerText = "Just now";

  const errCount = errors.filter(e => e.severity === 'Error').length;
  const statusEl = document.getElementById('info-status');
  if (errCount > 0) {
    statusEl.innerHTML = `<span class="badge-error">${errCount} Errors</span>`;
  } else {
    statusEl.innerHTML = `<span class="badge-success">Valid</span>`;
  }

  if (badge) {
    badge.innerText = typeLabel;
    badge.className = `ml-3 px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeClass}`;
    badge.classList.remove('hidden');
  }

  const iconContainer = document.getElementById('transaction-icon-container');
  if (iconContainer) {
    iconContainer.innerHTML = iconHtml;
    // Set icon background color based on type
    if (transType === '837') iconContainer.className = "w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center mr-4 shadow-lg shadow-blue-500/20";
    if (transType === '835') iconContainer.className = "w-12 h-12 rounded-xl bg-green-500 text-white flex items-center justify-center mr-4 shadow-lg shadow-green-500/20";
    if (transType === '834') iconContainer.className = "w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center mr-4 shadow-lg shadow-purple-500/20";
  }

  // Render Transaction-Specific Cards
  const cardsContainer = document.getElementById('dashboard-cards-container');
  if (!cardsContainer) return;

  const segments = ediText.split("~").map(s => s.trim()).filter(Boolean);

  if (transType === '837') {
    render837Dashboard(segments, cardsContainer);
  } else if (transType === '835') {
    render835Dashboard(segments, cardsContainer);
  } else if (transType === '834') {
    render834Dashboard(segments, cardsContainer);
  }
}

function render837Dashboard(segments, container) {
  let totalClaims = 0;
  let totalBilled = 0;
  let totalServiceLines = 0;
  let providers = new Set();

  segments.forEach(seg => {
    if (seg.startsWith("CLM*")) {
      totalClaims++;
      const parts = seg.split("*");
      totalBilled += parseFloat(parts[2] || 0);
    }
    if (seg.startsWith("SV1*")) {
      totalServiceLines++;
    }
    if (seg.startsWith("NM1*")) {
      const parts = seg.split("*");
      // 85 = Billing Provider, 71 = Attending Provider
      if (parts[1] === "85" || parts[1] === "71" || parts[1] === "FA") {
        providers.add(parts[3]);
      }
    }
  });

  container.innerHTML = `
    ${createStatCard("Total Claims", totalClaims, "claimsCount", false, "blue")}
    ${createStatCard("Billed Amount", totalBilled, "totalBilled", true, "blue")}
    ${createStatCard("Service Lines", totalServiceLines, "svcLines", false, "teal")}
    ${createStatCard("Providers", providers.size, "provCount", false, "indigo")}
  `;

  setTimeout(() => {
    window.animateValue("claimsCount", 0, totalClaims, 1000, false);
    window.animateValue("totalBilled", 0, totalBilled, 1000, true);
    window.animateValue("svcLines", 0, totalServiceLines, 1000, false);
    window.animateValue("provCount", 0, providers.size, 1000, false);
  }, 100);
}

function render835Dashboard(segments, container) {
  let totalClaims = 0;
  let totalBilled = 0;
  let totalPaid = 0;
  let patientResp = 0;

  segments.forEach(seg => {
    if (seg.startsWith("CLP*")) {
      totalClaims++;
      const parts = seg.split("*");
      totalBilled += parseFloat(parts[3] || 0);
      totalPaid += parseFloat(parts[4] || 0);
      patientResp += parseFloat(parts[5] || 0);
    }
  });

  container.innerHTML = `
    ${createStatCard("Claims Paid", totalClaims, "paidCount", false, "green")}
    ${createStatCard("Billed Amount", totalBilled, "totalBilled", true, "slate")}
    ${createStatCard("Paid Amount", totalPaid, "totalPaid", true, "green")}
    ${createStatCard("Patient Resp.", patientResp, "patientResp", true, "amber")}
  `;

  setTimeout(() => {
    window.animateValue("paidCount", 0, totalClaims, 1000, false);
    window.animateValue("totalBilled", 0, totalBilled, 1000, true);
    window.animateValue("totalPaid", 0, totalPaid, 1000, true);
    window.animateValue("patientResp", 0, patientResp, 1000, true);
  }, 100);
}

function render834Dashboard(segments, container) {
  let totalMembers = 0;
  let newEnrollments = 0;
  let terminations = 0;
  let dependents = 0;

  segments.forEach(seg => {
    if (seg.startsWith("INS*")) {
      totalMembers++;
      const parts = seg.split("*");
      // INS03: 021 = Addition, 024 = Terminate/De-enrollment
      if (parts[3] === "021") newEnrollments++;
      if (parts[3] === "024" || parts[3] === "025") terminations++;
      // INS02: 18 = Self, 19 = Child, etc.
      if (parts[2] !== "18") dependents++;
    }
  });

  container.innerHTML = `
    ${createStatCard("Total Members", totalMembers, "memberCount", false, "purple")}
    ${createStatCard("New Enrollments", newEnrollments, "newEnrol", false, "green")}
    ${createStatCard("Terminations", terminations, "termCount", false, "red")}
    ${createStatCard("Dependents", dependents, "depCount", false, "indigo")}
  `;

  setTimeout(() => {
    window.animateValue("memberCount", 0, totalMembers, 1000, false);
    window.animateValue("newEnrol", 0, newEnrollments, 1000, false);
    window.animateValue("termCount", 0, terminations, 1000, false);
    window.animateValue("depCount", 0, dependents, 1000, false);
  }, 100);
}

function createStatCard(label, value, id, isCurrency, color) {
  let colorClass = "text-blue-600";
  let borderClass = "border-l-blue-500";

  if (color === "green") { colorClass = "text-green-600"; borderClass = "border-l-green-500"; }
  if (color === "purple") { colorClass = "text-purple-600"; borderClass = "border-l-purple-500"; }
  if (color === "amber") { colorClass = "text-amber-600"; borderClass = "border-l-amber-500"; }
  if (color === "red") { colorClass = "text-red-600"; borderClass = "border-l-red-500"; }
  if (color === "teal") { colorClass = "text-teal-600"; borderClass = "border-l-teal-500"; }
  if (color === "indigo") { colorClass = "text-indigo-600"; borderClass = "border-l-indigo-500"; }

  return `
    <div class="card shadow-sm border-l-4 ${borderClass} animate-fade-in">
       <p class="text-slate-500 dark:text-slate-400 font-medium mb-1 text-sm">${label}</p>
       <h3 id="${id}" class="text-2xl font-bold transition-all duration-300">
         ${isCurrency ? '$0.00' : '0'}
       </h3>
    </div>
  `;
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
window.addChatMessage = function (text, isUser = false) {
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

window.handleAISend = function () {
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

window.downloadFixedFile = function () {
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

window.updateRecentFilesUI_FromStore = function (files) {
  const tbody = document.getElementById('recent-files-tbody');
  if (!tbody) return;

  // Clear existing rows
  tbody.innerHTML = '';

  if (files.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-10 text-center text-slate-500 italic">No files uploaded yet. Click "Upload File" to get started.</td></tr>`;
    return;
  }

  files.forEach(file => {
    const errCount = file.errors ? file.errors.filter(e => e.severity === 'Error').length : 0;
    const warnCount = file.errors ? file.errors.filter(e => e.severity === 'Warning').length : 0;

    let statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
      Healthy
    </span>`;

    if (errCount > 0) {
      statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
        Critical
      </span>`;
    } else if (warnCount > 0) {
      statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        Warning
      </span>`;
    }

    let typeBadgeClass = "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    let typeLabel = file.type ? file.type : "Unknown";

    let detectType = String(file.type || "");
    if (!detectType && file.name) {
      if (file.name.includes("837")) detectType = "837";
      else if (file.name.includes("835")) detectType = "835";
      else if (file.name.includes("834")) detectType = "834";
    }

    if (detectType.includes('837')) { typeBadgeClass = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"; typeLabel = "837 Professional"; }
    else if (detectType.includes('835')) { typeBadgeClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"; typeLabel = "835 Payment"; }
    else if (detectType.includes('834')) { typeBadgeClass = "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"; typeLabel = "834 Enrollment"; }

    const row = document.createElement('tr');
    row.className = "hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors animate-fade-in group";
    row.innerHTML = `
      <td class="px-6 py-4">
        <div class="flex items-center">
            <div class="w-8 h-8 rounded bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-3 text-blue-600 dark:text-blue-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <span class="font-medium text-slate-700 dark:text-slate-200">${file.name}</span>
        </div>
      </td>
      <td class="px-6 py-4"><span class="${typeBadgeClass} px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">${typeLabel}</span></td>
      <td class="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm italic">${file.time}</td>
      <td class="px-6 py-4">${statusBadge}</td>
      <td class="px-6 py-4">
        <div class="flex items-center space-x-2">
            <span class="text-sm font-semibold ${errCount > 0 ? 'text-red-500' : 'text-slate-400'}">${errCount}</span>
            <span class="text-[10px] text-slate-400 uppercase">Errors</span>
        </div>
      </td>
      <td class="px-6 py-4 text-right">
        <div class="flex items-center justify-end space-x-3">
            <button class="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition" title="View Summary" onclick="window.switchViewToStoredFile('${file.name}')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </button>
            <button class="btn-primary opacity-100 transition hover:scale-105 px-4 py-1.5 text-xs font-bold rounded-lg shadow-sm" onclick="window.handleInspectClick('${file.name}')">
                Inspect
            </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Helper to switch to a historically uploaded file
window.switchViewToStoredFile = function (fileName) {
  const file = window.ediStore.uploadedFiles.find(f => f.name === fileName);
  if (file) {
    window.ediStore.currentFile = file;
    window.updateUIFromStore();
    window.switchView('dashboard');
  }
}

window.handleInspectClick = function (fileName) {
  console.log("Inspect clicked:", fileName);

  // Find file in store to get raw data
  const file = window.ediStore.uploadedFiles.find(f => f.name === fileName);
  const ediText = file ? file.raw : "";

  // store selected file
  localStorage.setItem("selectedFileName", fileName);
  localStorage.setItem("selectedFileData", ediText || "");

  // SWITCH VIEW (IMPORTANT)
  window.switchView("validation");

  // LOAD DATA INTO UI
  if (window.updateDashboardSummaryUI) {
    window.updateDashboardSummaryUI(ediText, fileName);
  }

  // AUTO SCROLL (small delay for smooth UX)
  setTimeout(() => {
    const reportSection = document.querySelector("#view-validation");
    if (reportSection) {
      reportSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 200);

  // HIGHLIGHT selected file
  window.highlightSelectedFile(fileName);
};

window.highlightSelectedFile = function (fileName) {
  document.querySelectorAll("#recent-files-tbody tr").forEach(row => {
    row.classList.remove("bg-blue-50", "dark:bg-blue-900/20");
  });

  const rows = document.querySelectorAll("#recent-files-tbody tr");
  rows.forEach(row => {
    if (row.innerText.includes(fileName)) {
      row.classList.add("bg-blue-50", "dark:bg-blue-900/20");
    }
  });
};

window.addEventListener("load", () => {
  const fileName = localStorage.getItem("selectedFileName");
  const ediText = localStorage.getItem("selectedFileData");

  if (fileName && ediText) {
    console.log("Loading selected file:", fileName);

    // call existing function
    if (window.updateDashboardSummaryUI) {
      window.updateDashboardSummaryUI(ediText, fileName);
    }
  } else {
    console.log("No selected file found");
  }
});

// Initialize on first load
document.addEventListener('DOMContentLoaded', () => {
  window.runDashboardAnimations();

  // Startup Splash Animation
  const splash = document.createElement('div');
  splash.id = 'startup-splash';
  splash.innerHTML = `
    <div class="splash-content flex flex-col items-center">
      <div class="startup-logo mb-6">
        <img src="/logo.png" alt="HealthEDI Logo">
      </div>
      <h1 class="splash-text">HealthEDI Analyzer</h1>
    </div>
  `;
  document.body.appendChild(splash);

  // Fade out and remove
  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.remove();
    }, 500);
  }, 1200);
});

window.updateSummaryUI = function () {
  const file = window.ediStore && window.ediStore.currentFile;

  // --- Header ---
  const title = document.getElementById('summary-title');
  const subtitle = document.getElementById('summary-subtitle');
  const fileMeta = document.getElementById('summary-file-meta');
  const emptyMsg = document.getElementById('summary-empty-msg');

  if (!file || !file.raw) {
    if (title) title.innerText = 'EDI Claims Summary';
    if (subtitle) {
      subtitle.innerText = 'No file loaded yet. Upload a file to see detailed insights.';
      subtitle.classList.add('hidden');
    }
    if (emptyMsg) emptyMsg.classList.remove('hidden');
    if (fileMeta) fileMeta.classList.add('hidden');
    return;
  }

  // Detect type
  let detectType = String(file.type || '');
  if (!detectType && file.name) {
    if (file.name.includes('837')) detectType = '837';
    else if (file.name.includes('835')) detectType = '835';
    else if (file.name.includes('834')) detectType = '834';
  }
  const typeLabel = detectType.includes('837') ? '837 Professional' : detectType.includes('835') ? '835 Payment' : detectType.includes('834') ? '834 Enrollment' : 'Unknown EDI';

  if (title) title.innerText = typeLabel + ' Summary';
  if (subtitle) {
    subtitle.classList.remove('hidden');
    subtitle.innerText = 'Aggregated insights for: ' + (file.name || 'Unknown file');
  }
  if (emptyMsg) emptyMsg.classList.add('hidden');

  // File meta badges
  if (fileMeta) fileMeta.classList.remove('hidden');
  const fnEl = document.getElementById('summary-filename'); if (fnEl) fnEl.innerText = file.name || '--';
  const ftEl = document.getElementById('summary-filetype'); if (ftEl) ftEl.innerText = typeLabel;
  const tmEl = document.getElementById('summary-filetime'); if (tmEl) tmEl.innerText = file.time || 'Unknown';

  // --- Metric Cards (normalized severity — match Validation Report EXACTLY) ---
  const issues = file.errors || [];
  console.log("Issues:", issues); // debug trace

  const errorCount = issues.filter(i => (i.severity || "").toUpperCase().trim() === "ERROR" || (i.severity || "").toUpperCase().trim() === "CRITICAL" || (i.severity || "").toUpperCase().trim() === "HIGH").length;
  const warningCount = issues.filter(i => (i.severity || "").toUpperCase().trim() === "WARNING" || (i.severity || "").toUpperCase().trim() === "MEDIUM").length;
  const infoCount = issues.filter(i => (i.severity || "").toUpperCase().trim() === "INFO" || (i.severity || "").toUpperCase().trim() === "LOW").length;

  const totalIssues = errorCount + warningCount + infoCount;
  const ediText = file.raw || '';
  const totalSegments = ediText ? ediText.split('~').filter(s => s.trim().length > 0).length : (file.segments ? file.segments.length : 0);

  const el = id => document.getElementById(id);
  if (el('summary-total-errors')) el('summary-total-errors').innerText = totalIssues;
  if (el('summary-critical-count')) el('summary-critical-count').innerText = errorCount;
  if (el('summary-warn-count')) el('summary-warn-count').innerText = warningCount;
  if (el('summary-segments-count')) el('summary-segments-count').innerText = infoCount;

  // --- Real Data: BPR Claim Amount ---
  let totalClaimAmount = 0;
  if (ediText && ediText.includes('BPR')) {
    const bprMatch = ediText.match(/BPR[^*]*\*[^*]*\*([^*]*)/);
    if (bprMatch && !isNaN(bprMatch[1]) && bprMatch[1].trim().length > 0) {
      totalClaimAmount = parseFloat(bprMatch[1]);
    }
  }

  // --- Global Stats tracking ---
  const sessionProcessedKey = `processed_${file.name}_${file.time || 'unknown'}`;
  if (!sessionStorage.getItem(sessionProcessedKey)) {
    let globalStats = JSON.parse(localStorage.getItem('globalStats') || '{"totalFiles":0,"totalErrors":0,"totalSegments":0,"totalAmount":0}');
    globalStats.totalFiles += 1;
    globalStats.totalErrors += totalIssues;
    globalStats.totalSegments += totalSegments;
    globalStats.totalAmount += totalClaimAmount;
    localStorage.setItem('globalStats', JSON.stringify(globalStats));

    let fileStats = JSON.parse(localStorage.getItem('fileStats') || '{"total":0,"837":0,"835":0,"834":0}');
    fileStats.total += 1;
    if (detectType.includes('837')) fileStats['837']++;
    else if (detectType.includes('835')) fileStats['835']++;
    else if (detectType.includes('834')) fileStats['834']++;
    localStorage.setItem('fileStats', JSON.stringify(fileStats));
    sessionStorage.setItem(sessionProcessedKey, 'true');
  }

  // Populate Global Stats Cards
  const gStats = JSON.parse(localStorage.getItem('globalStats') || '{"totalFiles":0,"totalErrors":0,"totalSegments":0,"totalAmount":0}');
  if (el('global-total-files')) el('global-total-files').innerText = gStats.totalFiles;
  if (el('global-total-errors')) el('global-total-errors').innerText = gStats.totalErrors;
  if (el('global-total-segments')) el('global-total-segments').innerText = gStats.totalSegments;
  if (el('global-total-amount')) {
    el('global-total-amount').innerText = '$' + gStats.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // --- Validation Summary ---
  const valid = Math.max(totalSegments - errorCount, 0);
  if (el('summary-valid-segments')) el('summary-valid-segments').innerText = valid;
  if (el('summary-invalid-segments')) el('summary-invalid-segments').innerText = errorCount;
  if (el('summary-missing-fields')) el('summary-missing-fields').innerText = warningCount;

  // --- Error Breakdown ---
  const errorList = el('summary-error-list');
  if (errorList) {
    if (issues.length === 0) {
      errorList.innerHTML = '<p class="text-green-500 text-sm font-bold flex items-center gap-2"><span>✔</span> No errors found</p>';
    } else {
      const tally = {};
      issues.forEach(e => {
        const key = e.description ? e.description.slice(0, 55) : e.segment || 'Unknown';
        tally[key] = (tally[key] || 0) + 1;
      });
      const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 5);
      errorList.innerHTML = sorted.map(([desc, count]) => {
        const sevColor = count > 1 ? 'text-red-500' : 'text-yellow-500';
        return `<div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
          <span class="text-sm text-slate-700 dark:text-slate-300 truncate flex-1 mr-3">${desc}</span>
          <span class="font-bold text-xs px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/20 ${sevColor} shrink-0">×${count}</span>
        </div>`;
      }).join('');
    }
  }

  // Remove placeholder provider content — ONLY show claim amount for 837
  if (el('summary-type-insights')) {
    el('summary-type-insights').innerHTML = ''; // Clear fake content
    if (detectType.includes('837') && totalClaimAmount > 0) {
      const claimCard = document.createElement('div');
      claimCard.className = 'card shadow-sm border-l-4 border-l-emerald-500';
      claimCard.innerHTML = `
        <p class="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Claim Amount</p>
        <h3 class="text-3xl font-black text-emerald-600">$${totalClaimAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
        <p class="text-xs text-slate-400 mt-1">Extracted from BPR</p>`;
      el('summary-type-insights').appendChild(claimCard);
    }
  }

  // --- AI Insight (Dynamic + Emoji Indicators) ---
  const aiInsight = el('ai-insight-text');
  if (aiInsight) {
    let insightStr = "✅ File looks good. No major validation issues found.";

    if (errorCount > 0) {
      const firstError = issues.find(i => {
        const s = (i.severity || "").toUpperCase().trim();
        return s === "ERROR" || s === "CRITICAL" || s === "HIGH";
      });

      if (firstError && firstError.segment) {
        insightStr = `❌ Most issues are associated with "${firstError.segment}". Please review this segment.`;
      } else {
        insightStr = "❌ Errors detected. Please review validation report.";
      }
    } else if (warningCount > 0) {
      insightStr = "⚠️ Warnings detected. Review recommended improvements.";
    }

    aiInsight.innerText = insightStr;
  }

  // --- Charts ---
  const validSegs = Math.max(totalSegments - errorCount, 0);
  if (window._fileTypeChartInstance) { window._fileTypeChartInstance.destroy(); }
  if (window._errorChartInstance) { window._errorChartInstance.destroy(); }

  import('chart.js/auto').then(({ default: Chart }) => {
    const ftCanvas = document.getElementById('fileTypeChart');
    const erCanvas = document.getElementById('errorChart');
    const stats = JSON.parse(localStorage.getItem('fileStats') || '{}');

    if (ftCanvas && stats) {
      window._fileTypeChartInstance = new Chart(ftCanvas, {
        type: 'pie',
        data: {
          labels: ['837 Professional', '835 Payment', '834 Enrollment'],
          datasets: [{
            data: [stats['837'] || 0, stats['835'] || 0, stats['834'] || 0],
            backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6'],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } } } }
      });
    }

    if (erCanvas) {
      window._errorChartInstance = new Chart(erCanvas, {
        type: 'pie',
        data: {
          labels: ['Errors', 'Valid Segments'],
          datasets: [{
            data: [errorCount, validSegs],
            backgroundColor: ['#ef4444', '#22c55e'],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 12 } } } }
      });
    }
  }).catch(() => console.log('Chart.js not available'));
};


// --- Dynamic Segment Details Panel Click Logic (Event Delegation) ---

document.addEventListener("click", function(e) {

  let el = e.target;

  // walk up manually (robust fix)
  while (el && !el.classList?.contains("segment")) {
    el = el.parentElement;
  }

  if (!el) return;

  const type = el.getAttribute("data-type");
  const panel = document.getElementById("detailsPanel");
  const left = document.querySelector(".edi-left");

  if (!panel || !type || !left) return;

  console.log("Clicked segment:", type);

  const segmentInfo = {
    ISA: {
      title: "Interchange Control Header",
      description: "Contains sender and receiver information.",
      purpose: "Starts the EDI interchange.",
      example: "ISA*00*          *00*          *ZZ*SENDERID     *ZZ*RECEIVERID   *230318*1253*U*00501*000000905*1*T*:~"
    },
    GS: {
      title: "Functional Group Header",
      description: "Groups related transactions.",
      purpose: "Defines functional group.",
      example: "GS*HC*SENDER*RECEIVER*20230318*1253*1*X*005010X222A1~"
    },
    ST: {
      title: "Transaction Set Header",
      description: "Begins a transaction.",
      purpose: "Identifies transaction type.",
      example: "ST*837*0001~"
    },
    BHT: {
      title: "Beginning of Hierarchical Transaction",
      description: "Defines structure of transaction.",
      purpose: "Starts hierarchical transaction.",
      example: "BHT*0019*00*0123*20230318*1458*CH~"
    },
    NM1: {
      title: "Individual or Organization Name",
      description: "Provides entity name details.",
      purpose: "Identifies payer/provider/patient.",
      example: "NM1*IL*1*SMITH*JOHN****MI*123456789~"
    },
    N3: {
      title: "Address Information",
      description: "Provides street address.",
      purpose: "Specifies address line.",
      example: "N3*123 MAIN ST~"
    },
    N4: {
      title: "City, State, ZIP",
      description: "Provides location details.",
      purpose: "Specifies city/state/zip.",
      example: "N4*CHICAGO*IL*60601~"
    }
  };

  const data = segmentInfo[type] || {
    title: "EDI Segment " + type,
    description: "Standard X12 EDI segment.",
    purpose: "Provides specific data within the transaction hierarchy.",
    example: type + "*...~"
  };

  // Toggle layout states
  const emptyState = document.getElementById("parsedEmptyState");
  if(emptyState) emptyState.classList.add("hidden");
  panel.classList.remove("hidden");
  void panel.offsetWidth; // force reflow for animation
  panel.classList.add("show");
  left.classList.add("active");

  // Highlight active segment
  document.querySelectorAll(".segment").forEach(s => s.classList.remove("active"));
  el.classList.add("active");

  // Error Detection
  let errorHTML = "";
  if (el.classList.contains("error")) {
    errorHTML = `
      <div style="margin-top:12px; background:#fee2e2; color:#b91c1c; padding:12px; border-radius:10px; border:1px solid #fecaca; font-size:13px; display:flex; gap:10px; align-items:flex-start;">
        <span style="font-size:16px;">❌</span>
        <div>
          <b style="display:block; margin-bottom:2px;">Error Detected</b>
          Potential invalid format or missing required elements in ${type} segment.
        </div>
      </div>
    `;
  }

  panel.innerHTML = `
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
    <div style="display:flex; align-items:center; gap:8px;">
      <span style="background:#e0edff; color:#2563eb; padding:4px 10px; border-radius:6px; font-weight:600; font-size:12px;">
        ${type}
      </span>
      <span style="font-weight:600; font-size:16px;">${data.title}</span>
    </div>
    <button id="closeBtn" style="background:none; border:none; font-size:18px; cursor:pointer; color:#64748b; transition:color 0.2s;">✖</button>
  </div>

  ${errorHTML}

  <p style="color:#475569; font-size:14px; line-height:1.5; margin-bottom:16px;">${data.description}</p>

  <div style="margin-top:16px;">
    <div style="font-weight:600; font-size:13px; color:#1e293b; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
      <span>⚙</span> Purpose in EDI
    </div>
    <div style="background:#f1f5f9; padding:10px; border-radius:8px; font-size:13px; color:#334155; border: 1px solid #e2e8f0;">
      ${data.purpose}
    </div>
  </div>

  <div style="margin-top:16px;">
    <div style="font-weight:600; font-size:13px; color:#1e293b; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
      <span>💻</span> Example Elements
    </div>
    <pre style="background:#1e293b; color:#e2e8f0; padding:12px; border-radius:10px; font-size:12px; overflow-x:auto; font-family: 'JetBrains Mono', monospace;">
${data.example}
    </pre>
    <button id="copyBtn" style="margin-top:10px; background:#f1f5f9; border:1px solid #e2e8f0; padding:6px 12px; border-radius:6px; font-size:12px; color:#64748b; cursor:pointer; display:flex; align-items:center; gap:6px; transition:all 0.2s;">
      📋 Copy Segment
    </button>
  </div>

  <div style="margin-top:20px; padding-top:20px; border-top: 1px solid #f1f5f9; display:flex; flex-direction:column; gap:10px;">
    <button id="askAiBtn" style="width:100%; background:#2563eb; color:white; padding:12px; border:none; border-radius:10px; font-weight:700; font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.2s;">
      🤖 Ask AI Assistant
    </button>
    
    <button id="simpleAiBtn" style="width:100%; background:#059669; color:white; padding:10px; border:none; border-radius:8px; font-weight:600; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
      🧠 Explain Simply
    </button>
  </div>
`;

  document.getElementById("closeBtn").onclick = () => {
    panel.classList.remove("show");
    left.classList.remove("active");
    // Wait for animation to finish before hiding completely
    setTimeout(() => {
      if (!panel.classList.contains("show")) {
        panel.classList.add("hidden");
        const emptyState = document.getElementById("parsedEmptyState");
        if(emptyState) emptyState.classList.remove("hidden");
      }
    }, 300);
  };

  const askBtn = document.getElementById("askAiBtn");
  if (askBtn) {
    askBtn.onclick = () => {
      const message = `Explain the EDI segment ${type} in simple terms with examples and common errors.`;
      localStorage.setItem("ai_query", message);
      window.switchView("assistant");
    };
  }

  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(el.innerText);
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = "✅ Copied!";
      setTimeout(() => copyBtn.innerHTML = originalText, 2000);
    };
  }


  const simpleBtn = document.getElementById("simpleAiBtn");
  if (simpleBtn) {
    simpleBtn.onclick = () => {
      const msg = `Explain ${type} EDI segment in very simple terms for beginners.`;
      localStorage.setItem("ai_query", msg);
      window.switchView("assistant");
    };
  }

});

// --- Search Filter Logic ---
document.addEventListener("input", (e) => {
  if (e.target.id === "searchInput") {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll(".segment").forEach(el => {
      const isMatch = el.innerText.toLowerCase().includes(val);
      el.style.display = isMatch ? "" : "none";
      
      // Also hide parents if no children match (optional but cleaner)
      let parent = el.parentElement;
      while (parent && parent.tagName === 'LI') {
        if (isMatch) parent.style.display = "";
        parent = parent.parentElement;
      }
    });
  }
});

// AI Button Helper Functions
window.copyFormatFromValidation = function() {
  const exampleText = document.querySelector('.fix-example-text')?.innerText;
  if (exampleText) {
    navigator.clipboard.writeText(exampleText);
    const btn = document.getElementById('copyFormatBtn');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = '✅ Copied!';
      setTimeout(() => btn.innerHTML = originalText, 2000);
    }
  }
};

window.askAIFix = function() {
  const errorJson = localStorage.getItem("selectedEDIError");
  if (!errorJson) return;
  const error = JSON.parse(errorJson);
  const prompt = `I am validating a Healthcare EDI file and found an error.
Segment: ${error.segment}
Loop: ${error.loop}
Problem: ${error.description}

Please provide a detailed fix for this specific EDI segment error.`;
  localStorage.setItem("ai_query", prompt);
  window.switchView('assistant');
};



