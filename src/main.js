import './style.css';
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "health-edi-analyzer.firebaseapp.com",
  projectId: "health-edi-analyzer",
  storageBucket: "health-edi-analyzer.firebasestorage.app",
  messagingSenderId: "56294322619",
  appId: "1:56294322619:web:a5b315670c19a46e2a949e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const appDiv = document.querySelector('#app');

function renderAuthUI() {
  appDiv.innerHTML = `
    <div class="h-screen w-full flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 z-50 absolute inset-0">
       <div class="max-w-md w-full p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 animate-fade-in">
          <div class="flex justify-center mb-6">
            <img src="/logo.png" alt="Logo" class="w-16 h-16 rounded-xl shadow-sm">
          </div>
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6" id="auth-title">Sign In</h2>
          <form id="auth-form" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
              <input type="email" id="auth-email" required class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 dark:text-white outline-none transition-shadow duration-300 text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <input type="password" id="auth-password" required minlength="6" class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 dark:text-white outline-none transition-shadow duration-300 text-sm">
            </div>
            <div id="auth-error" class="hidden font-medium text-red-500 text-center text-sm py-1"></div>
            <button type="submit" id="auth-submit" class="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 flex justify-center items-center">
              Sign In
            </button>
          </form>
          <div class="mt-4 relative flex items-center justify-center">
            <span class="absolute bg-white dark:bg-slate-800 px-2 text-sm text-slate-500">or</span>
            <div class="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <button type="button" id="auth-google-btn" class="mt-4 w-full py-2.5 px-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 flex justify-center items-center">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <div class="mt-6 text-center text-sm">
            <span id="auth-switch-text" class="text-slate-600 dark:text-slate-400">Don't have an account?</span>
            <button type="button" id="auth-switch-btn" class="ml-1 font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">Sign Up</button>
          </div>
       </div>
    </div>
  `;

  let isSignup = false;
  const form = document.getElementById('auth-form');
  const title = document.getElementById('auth-title');
  const submitBtn = document.getElementById('auth-submit');
  const switchBtn = document.getElementById('auth-switch-btn');
  const switchText = document.getElementById('auth-switch-text');
  const errorEl = document.getElementById('auth-error');

  switchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isSignup = !isSignup;
    title.textContent = isSignup ? 'Sign Up' : 'Sign In';
    submitBtn.textContent = isSignup ? 'Sign Up' : 'Sign In';
    switchText.textContent = isSignup ? 'Already have an account?' : 'Don\'t have an account?';
    switchBtn.textContent = isSignup ? 'Sign In' : 'Sign Up';
    errorEl.classList.add('hidden');
  });

  const googleBtn = document.getElementById('auth-google-btn');
  const googleProvider = new GoogleAuthProvider();

  googleBtn.addEventListener('click', async () => {
    errorEl.classList.add('hidden');
    const originalText = googleBtn.innerHTML;
    googleBtn.disabled = true;
    googleBtn.innerHTML = '<div class="loader-spinner w-5 h-5 rounded-full border-2 border-slate-500 mb-0 inline-block"></div>';
    
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google Auth Error:", err);
      errorEl.classList.remove('hidden');
      errorEl.textContent = "Google Sign-In Error: " + err.message;
      googleBtn.disabled = false;
      googleBtn.innerHTML = originalText;
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    
    errorEl.classList.add('hidden');
    
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loader-spinner w-5 h-5 rounded-full border-2 border-white mb-0 inline-block"></div>';

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      errorEl.classList.remove('hidden');
      if (isSignup && err.code === 'auth/email-already-in-use') {
        errorEl.textContent = "User already exists. Please sign in";
      } else if (!isSignup) {
        // As per requirements: any sign-in error shows this message
        errorEl.textContent = "Email or password is incorrect";
      } else {
        errorEl.textContent = err.message;
      }
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

let dashboardLoaded = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (!dashboardLoaded) {
      import('./dashboard.js').then((module) => {
        dashboardLoaded = true;
        
        // Inject logout button to dashboard topbar
        setTimeout(() => {
          // Select the container holding search and theme toggle
          const headerDiv = document.querySelector('header .flex.items-center.space-x-3');
          if (headerDiv && !document.getElementById('logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logout-btn';
            logoutBtn.className = "ml-3 px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors duration-300 font-medium text-sm shadow-sm";
            logoutBtn.innerText = "Logout";
            logoutBtn.onclick = () => {
              signOut(auth);
            };
            headerDiv.appendChild(logoutBtn);
          }
        }, 100);
      }).catch(err => {
        console.error("Failed to load dashboard:", err);
      });
    }
  } else {
    if (dashboardLoaded) {
      // Reload page to wipe dashboard state and show Auth UI fresh
      window.location.reload();
    } else {
      renderAuthUI();
    }
  }
});
