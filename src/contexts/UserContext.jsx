import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';

const UserContext = createContext(null);

const AUTH_USER_KEY = 'auth_user';
const REGISTERED_USERS_KEY = 'registered_users';

function readRegisteredUsers() {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeRegisteredUsers(users) {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Load persisted user on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Persist user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [user]);

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  const registerWithEmailPassword = useCallback((name, email, password) => {
    const users = readRegisteredUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      const error = new Error('EMAIL_EXISTS');
      error.code = 'EMAIL_EXISTS';
      throw error;
    }
    const newUser = { id: crypto.randomUUID(), name, email, passwordHash: password };
    const nextUsers = [...users, newUser];
    writeRegisteredUsers(nextUsers);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email, provider: 'password' });
    return newUser;
  }, []);

  const loginWithEmailPassword = useCallback((email, password) => {
    const users = readRegisteredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === password
    );
    if (!found) {
      const error = new Error('INVALID_CREDENTIALS');
      error.code = 'INVALID_CREDENTIALS';
      throw error;
    }
    setUser({ id: found.id, name: found.name, email: found.email, provider: 'password' });
    return found;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      const error = new Error('GOOGLE_CLIENT_MISSING');
      error.code = 'GOOGLE_CLIENT_MISSING';
      throw error;
    }

    // Load Google Identity Services script if needed
    async function loadScript() {
      if (window.google && window.google.accounts && window.google.accounts.id) return;
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    await loadScript();

    // Wrap the Google prompt in a Promise to get the credential
    const credential = await new Promise((resolve, reject) => {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => resolve(response.credential)
        });
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // fallback to button flow
            // Create an overlay button temporarily
            const div = document.createElement('div');
            window.google.accounts.id.renderButton(div, { theme: 'outline', size: 'large' });
            document.body.appendChild(div);
          }
        });
      } catch (e) {
        reject(e);
      }
    });

    // Decode JWT payload for basic profile (no external deps)
    try {
      const payload = JSON.parse(atob(credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      const googleUser = {
        id: payload.sub,
        name: payload.name || payload.given_name || 'Usuario',
        email: payload.email,
        avatar: payload.picture,
        provider: 'google'
      };
      setUser(googleUser);
      return googleUser;
    } catch (e) {
      // If decoding fails, still set a minimal user
      const googleUser = { id: crypto.randomUUID(), name: 'Usuario', email: '', provider: 'google' };
      setUser(googleUser);
      return googleUser;
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      registerWithEmailPassword,
      loginWithEmailPassword,
      loginWithGoogle,
      logout
    }),
    [user, isAuthModalOpen, openAuthModal, closeAuthModal, registerWithEmailPassword, loginWithEmailPassword, loginWithGoogle, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}