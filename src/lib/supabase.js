import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@bfr.com';
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Asdf1234!@#$';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local storage keys
const LOCAL_STORAGE_REVIEWS_KEY = 'burmese_food_reviews';
const LOCAL_STORAGE_ADMIN_SESSION = 'burmese_food_admin_session';

// --- AUTH HELPERS ---
export async function loginAdmin(email, password) {
  const cleanEmail = email.trim().toLowerCase();
  
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password,
      });
      if (!error && data?.user) {
        const user = {
          id: data.user.id,
          email: data.user.email,
          role: 'admin',
          user_metadata: { name: 'Admin' }
        };
        localStorage.setItem(LOCAL_STORAGE_ADMIN_SESSION, JSON.stringify(user));
        return user;
      }
    } catch {
      // fallback to credential check
    }
  }

  // Strict Admin Credential Check
  if (cleanEmail === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
    const adminUser = {
      id: 'admin-bfr-id',
      email: ADMIN_EMAIL,
      role: 'admin',
      user_metadata: { name: 'Burmese Food Admin' }
    };
    localStorage.setItem(LOCAL_STORAGE_ADMIN_SESSION, JSON.stringify(adminUser));
    return adminUser;
  } else {
    throw new Error('အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်။ (Invalid Email or Password)');
  }
}

export async function logoutAdmin() {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch {}
  }
  localStorage.removeItem(LOCAL_STORAGE_ADMIN_SESSION);
}

export function getStoredAdmin() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_ADMIN_SESSION);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    // Ensure only the valid admin user is recognized
    if (parsed && parsed.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      return parsed;
    }
    // Clean out any old/obsolete demo sessions
    localStorage.removeItem(LOCAL_STORAGE_ADMIN_SESSION);
    return null;
  } catch {
    return null;
  }
}

// --- REVIEWS & RATINGS HELPERS ---
export async function fetchReviews(recipeId) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('recipe_id', recipeId)
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetchReviews error:', error);
      return getLocalReviews(recipeId);
    }
    return data;
  }
  return getLocalReviews(recipeId);
}

export async function submitReview(reviewData) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select();
    if (error) {
      console.warn('Supabase insert review error:', error);
      return saveLocalReview(reviewData);
    }
    return data[0];
  }
  return saveLocalReview(reviewData);
}

export async function removeReview(reviewId) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);
    if (error) throw error;
    return true;
  }
  deleteLocalReview(reviewId);
  return true;
}

// Fallback Local Storage implementations
function getLocalReviews(recipeId) {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
    const all = stored ? JSON.parse(stored) : [];
    return all.filter(r => r.recipe_id === recipeId);
  } catch {
    return [];
  }
}

function saveLocalReview(reviewData) {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
    const all = stored ? JSON.parse(stored) : [];
    const newReview = {
      ...reviewData,
      id: 'review-' + Date.now(),
      created_at: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify([newReview, ...all]));
    return newReview;
  } catch (e) {
    console.error('Error saving local review', e);
    return reviewData;
  }
}

function deleteLocalReview(reviewId) {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
    const all = stored ? JSON.parse(stored) : [];
    const filtered = all.filter(r => r.id !== reviewId);
    localStorage.setItem(LOCAL_STORAGE_REVIEWS_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error deleting local review', e);
  }
}
