import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../contexts/UserContext.jsx';
import './AuthModal.css';

export default function AuthModal() {
  const { t } = useTranslation();
  const { isAuthModalOpen, closeAuthModal, loginWithEmailPassword, registerWithEmailPassword, loginWithGoogle, user } = useUser();
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    setError('');
    setSuccess('');
  }, [activeTab, isAuthModalOpen]);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (isAuthModalOpen) {
      if (!dialogRef.current.open) dialogRef.current.showModal();
    } else if (dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, [isAuthModalOpen]);

  useEffect(() => {
    if (user && isAuthModalOpen) {
      closeAuthModal();
    }
  }, [user, isAuthModalOpen, closeAuthModal]);

  const canSubmitLogin = useMemo(() => email && password, [email, password]);
  const canSubmitRegister = useMemo(() => email && password && name, [email, password, name]);

  const onLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      loginWithEmailPassword(email, password);
    } catch (err) {
      if (err.code === 'INVALID_CREDENTIALS') setError(t('auth.invalidCredentials'));
      else setError(t('common.error'));
    }
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      registerWithEmailPassword(name, email, password);
      setSuccess(t('auth.registeredSuccess'));
      setActiveTab('login');
    } catch (err) {
      if (err.code === 'EMAIL_EXISTS') setError(t('auth.emailExists'));
      else setError(t('common.error'));
    }
  };

  const onGoogle = async () => {
    setError('');
    try {
      await loginWithGoogle();
    } catch (err) {
      if (err.code === 'GOOGLE_CLIENT_MISSING') setError(t('auth.googleClientMissing'));
      else setError(t('common.error'));
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="auth-title"
      className="auth-modal border-0"
    >
      <div className="auth-card">
        <div className="auth-side" aria-hidden="true">
          <div className="brand-badge">
            <span className="brand-dot" />
            <span className="brand-name">{t('common.siteName')}</span>
          </div>
          <h2 className="side-title">
            {activeTab === 'login' ? t('auth.titleLogin') : t('auth.titleRegister')}
          </h2>
          <p className="side-subtitle">
            {t('auth.or')} {t('auth.continueWithGoogle')}
          </p>
        </div>
        <div className="auth-main">
          <div className="auth-header">
            <h3 id="auth-title" className="auth-title">
              {activeTab === 'login' ? t('auth.titleLogin') : t('auth.titleRegister')}
            </h3>
            <button type="button" className="auth-close" aria-label="Close" onClick={closeAuthModal}>
              <span aria-hidden>×</span>
            </button>
          </div>

          <div className="segmented" role="tablist" aria-label="Auth tabs">
            <button
              role="tab"
              className={`segment ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
              aria-selected={activeTab === 'login'}
              id="tab-login"
              aria-controls="panel-login"
            >
              {t('common.login')}
            </button>
            <button
              role="tab"
              className={`segment ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
              aria-selected={activeTab === 'register'}
              id="tab-register"
              aria-controls="panel-register"
            >
              {t('common.register')}
            </button>
          </div>

          {(error || success) && (
            <div className="feedback" aria-live="assertive">
              {error && <div className="alert error" role="alert">{error}</div>}
              {success && <div className="alert success" role="alert">{success}</div>}
            </div>
          )}

          <button type="button" className="provider-btn google" onClick={onGoogle}>
            <span className="provider-icon" aria-hidden>
              <svg viewBox="0 0 24 24" width="20" height="20" focusable="false" aria-hidden="true">
                <path fill="#EA4335" d="M12 11.999h10.545c.101.546.155 1.128.155 1.727 0 6.004-4.017 10.274-10.7 10.274C5.7 24 0 18.627 0 12S5.7 0 12 0c3.24 0 5.95 1.19 8.02 3.13l-3.26 3.13C15.52 4.76 13.9 4.2 12 4.2 7.9 4.2 4.5 7.62 4.5 12s3.4 7.8 7.5 7.8c4.8 0 6.6-3.447 6.9-5.223H12v-2.578z"/>
              </svg>
            </span>
            {t('auth.continueWithGoogle')}
          </button>

          {activeTab === 'login' && (
            <form onSubmit={onLoginSubmit} id="panel-login" role="tabpanel" aria-labelledby="tab-login">
              <div className="field">
                <label htmlFor="login-email" className="field-label">{t('auth.email')}</label>
                <div className="field-control">
                  <span className="field-icon" aria-hidden>✉</span>
                  <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@email.com" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="login-password" className="field-label">{t('auth.password')}</label>
                <div className="field-control">
                  <span className="field-icon" aria-hidden>•</span>
                  <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
                </div>
              </div>
              <button type="submit" className="cta" disabled={!canSubmitLogin}>{t('auth.signIn')}</button>
            </form>
          )}

          {activeTab === 'register' && (
            <form onSubmit={onRegisterSubmit} id="panel-register" role="tabpanel" aria-labelledby="tab-register">
              <div className="field">
                <label htmlFor="register-name" className="field-label">{t('auth.name')}</label>
                <div className="field-control">
                  <span className="field-icon" aria-hidden>👤</span>
                  <input id="register-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder={t('auth.name')} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="register-email" className="field-label">{t('auth.email')}</label>
                <div className="field-control">
                  <span className="field-icon" aria-hidden>✉</span>
                  <input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@email.com" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="register-password" className="field-label">{t('auth.password')}</label>
                <div className="field-control">
                  <span className="field-icon" aria-hidden>•</span>
                  <input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
                </div>
              </div>
              <button type="submit" className="cta" disabled={!canSubmitRegister}>{t('auth.signUp')}</button>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}