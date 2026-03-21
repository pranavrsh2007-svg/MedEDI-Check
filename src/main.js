import './style.css';
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "health-edi-analyzer.firebaseapp.com",
  projectId: "health-edi-analyzer",
  storageBucket: "health-edi-analyzer.firebasestorage.app",
  messagingSenderId: "56294322619",
  appId: "1:56294322619:web:a5b315670c19a46e2a949e"
};

// ─── Single Firebase initialization ──────────────────────────────────────────
console.debug("[Firebase] Initializing app...");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ─── Setup persistence and handle redirect log in ──────────────────────────
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("[Auth] Persistence error:", error);
});

getRedirectResult(auth).then((result) => {
  if (result) {
    console.debug("[Auth] Redirect result found:", result.user.email);
  }
}).catch((error) => {
  console.error("[Auth] Redirect error:", error);
});

const appDiv = document.querySelector('#app');

// ─── State to prevent multiple overlapping requests ──────────────────────────
let isAuthProcessing = false;

// ─── Friendly error messages for Firebase auth error codes ───────────────────
function getFriendlyError(code) {
  console.debug("[Auth] Error code received:", code);
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
    case 'auth/invalid-email':
      return 'Email or password is incorrect. Please check and try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Access to this account has been temporarily disabled. Please wait or reset your password.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please sign in instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before finishing. Please try again.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked. Please enable popups for this site.';
    default:
      return 'Authentication failed. Please try again or contact support.';
  }
}

// ─── Show a minimal loading screen while Firebase resolves the session ────────
function renderLoadingScreen() {
  appDiv.innerHTML = `
    <div style="
      position:fixed;inset:0;
      background:#0f172a;
      display:flex;flex-direction:column;
      align-items:center;justify-content:center;gap:16px;
    ">
      <img src="/logo.png" alt="logo" style="width:60px;opacity:0.85;" />
      <div class="loader-spinner" style="
        width:28px;height:28px;
        border-radius:50%;
        border:3px solid #334155;
        border-top-color:#2563eb;
      "></div>
    </div>
  `;
}

// ─── Auth UI ──────────────────────────────────────────────────────────────────
function renderAuthUI() {
  console.debug("[UI] Rendering Auth UI...");
  appDiv.innerHTML = `
    <div class="auth-page-wrapper login-bg">
      <div class="floating-shape" style="width: 300px; height: 300px; top: -10%; left: -10%; filter: blur(50px);"></div>
      <div class="floating-shape" style="width: 400px; height: 400px; bottom: -20%; right: -10%; filter: blur(60px); animation-delay: -5s;"></div>
      <div class="login-card animate-fade-in glass-card relative z-10 p-10 mt-6">
        
        <!-- Logo + name INSIDE the card at the top -->
        <div class="auth-logo-block">
          <img src="/logo.png" alt="HealthEDI logo" />
          <span>HealthEDI Analyzer</span>
        </div>

        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-white mb-2 tracking-tight" id="auth-title">Welcome back</h2>
          <p class="text-slate-400 text-sm">Please enter your details to continue</p>
        </div>
          
          <form id="auth-form" class="space-y-6">
            <div>
              <label class="block text-xs font-bold text-slate-300 mb-2 ml-1">Email address</label>
              <input type="email" id="auth-email" required placeholder="name@company.com" class="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 text-sm placeholder:text-slate-600">
            </div>
            <div>
              <div class="flex items-center justify-between mb-2 ml-1">
                <label class="block text-xs font-bold text-slate-300">Password</label>
              </div>
              <input type="password" id="auth-password" required minlength="6" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 text-sm placeholder:text-slate-600">
            </div>
            <div id="auth-error" class="hidden font-semibold text-red-400 text-center text-xs bg-red-900/10 py-3 rounded-xl border border-red-900/20"></div>
            <button type="submit" id="auth-submit" class="w-full transition-all duration-300 flex justify-center items-center h-12 font-bold text-sm">
              Sign In
            </button>
          </form>
        
        <div class="mt-8 relative flex items-center justify-center">
          <div class="w-full border-t border-slate-700/50"></div>
          <span class="absolute bg-[#1e293b] px-3 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">OR</span>
        </div>
        
        <button type="button" id="auth-google-btn" class="mt-8 w-full transition-all duration-300 flex justify-center items-center h-12 font-bold text-sm">
            <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>
        
        <div class="mt-8 text-center text-xs">
          <span id="auth-switch-text" class="text-slate-400 font-medium">Don't have an account?</span>
          <button type="button" id="auth-switch-btn" class="ml-1 font-black text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-all">Sign Up</button>
        </div>
      </div>
    </div>
  `;

  let isSignup = false;
  const form = document.getElementById('auth-form');
  const title = document.getElementById('auth-title');
  const submitBtn = document.getElementById('auth-submit');
  const googleBtn = document.getElementById('auth-google-btn');
  const switchBtn = document.getElementById('auth-switch-btn');
  const switchText = document.getElementById('auth-switch-text');
  const errorEl = document.getElementById('auth-error');

  function setProcessing(processing, type = 'login') {
    isAuthProcessing = processing;
    submitBtn.disabled = processing;
    googleBtn.disabled = processing;
    
    if (processing) {
      const loader = '<div class="loader-spinner w-4 h-4 rounded-full border-2 border-white/30 border-t-white mr-2 inline-block"></div>';
      if (type === 'google') {
        googleBtn.innerHTML = loader + 'Logging in with Google...';
      } else {
        submitBtn.innerHTML = loader + (isSignup ? 'Creating account...' : 'Logging in...');
      }
    } else {
      submitBtn.textContent = isSignup ? 'Get Started' : 'Sign In';
      googleBtn.innerHTML = `
        <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Sign in with Google
      `;
    }
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
    console.debug("[Auth] Error displayed:", msg);
  }
  
  function clearError() {
    errorEl.classList.add('hidden');
  }

  switchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAuthProcessing) return;
    
    isSignup = !isSignup;
    title.textContent = isSignup ? 'Create Account' : 'Welcome back';
    submitBtn.textContent = isSignup ? 'Get Started' : 'Sign In';
    switchText.textContent = isSignup ? 'Already have an account?' : "Don't have an account?";
    switchBtn.textContent = isSignup ? 'Sign In' : 'Sign Up';
    clearError();
  });

  // ── Google Sign-In ──────────────────────────────────────────────────────────
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });

  googleBtn.addEventListener('click', async () => {
    if (isAuthProcessing) return;
    console.debug("[Auth] Starting Google Sign-in...");
    
    // Call immediately to avoid popup blockers
    const popupPromise = signInWithPopup(auth, googleProvider);
    
    clearError();
    setProcessing(true, 'google');
    
    try {
      await popupPromise;
      console.debug("[Auth] Google Sign-in popup success.");
      // onAuthStateChanged will handle routing to dashboard
    } catch (err) {
      console.error("[Auth] Google Error:", err.code, err.message);
      if (err.code === 'auth/popup-blocked') {
        console.warn("[Auth] Popup blocked! Falling back to redirect...");
        showError("Popup blocked. Redirecting to Google Sign-In...");
        try {
            await signInWithRedirect(auth, googleProvider);
        } catch (redirectErr) {
            console.error("[Auth] Redirect error:", redirectErr);
            showError("Redirect failed. Please check your connection.");
            setProcessing(false);
        }
        return; // Return early, keeping processing true during redirect
      }
      showError(getFriendlyError(err.code));
      setProcessing(false);
    }
  });

  // ── Email / Password Sign-In ────────────────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isAuthProcessing) return;
    
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    
    console.debug("[Auth] Starting Email/Password flow. Type:", isSignup ? "Signup" : "Login");
    
    clearError();
    setProcessing(true, 'email');

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      console.debug("[Auth] Credentials request sent.");
      // onAuthStateChanged routes to dashboard on success
    } catch (err) {
      console.error("[Auth] credential Error:", err.code, err.message);
      showError(getFriendlyError(err.code));
      setProcessing(false);
    }
  });
}

// ─── Inject logout button — wait for header to exist ─────────────────────────
function injectLogoutButton() {
  function tryInject() {
    const headerDiv = document.querySelector('header .flex.items-center.space-x-3');
    if (headerDiv && !document.getElementById('logout-btn')) {
      console.debug("[UI] Injecting logout button into header...");
      const logoutBtn = document.createElement('button');
      logoutBtn.id = 'logout-btn';
      logoutBtn.className = "ml-3 px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors duration-300 font-medium text-sm shadow-sm";
      logoutBtn.innerText = "Logout";
      logoutBtn.onclick = () => {
        console.debug("[Auth] User clicked logout.");
        signOut(auth);
      };
      headerDiv.appendChild(logoutBtn);
      return true;
    }
    return false;
  }

  if (tryInject()) return;

  const observer = new MutationObserver(() => {
    if (tryInject()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => observer.disconnect(), 10000);
}

// ─── Auth State Machine ───────────────────────────────────────────────────────
let dashboardLoaded = false;

// Show loading spinner immediately — avoids blank/flash state during auth check
renderLoadingScreen();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.debug("[Auth] User is authenticated:", user.email);
    if (!dashboardLoaded) {
      console.debug("[Auth] Loading dashboard module...");
      dashboardLoaded = true;
      import('./dashboard.js')
        .then(() => {
          console.debug("[Auth] Dashboard module loaded successfully.");
          injectLogoutButton();
        })
        .catch(err => {
          console.error("[Auth] Failed to load dashboard:", err);
          dashboardLoaded = false;
          // Re-render auth UI so they can at least try again
          renderAuthUI();
        });
    }
  } else {
    console.debug("[Auth] No active session. Rendering Login UI.");
    dashboardLoaded = false;
    isAuthProcessing = false; // Reset flag in case we logged out or session expired
    renderAuthUI();
  }
});
