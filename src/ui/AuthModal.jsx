import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../contexts/UserContext.jsx';

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
    <dialog ref={dialogRef} aria-labelledby="auth-title" className="rounded-3 border-0 p-0" style={{ width: 'min(520px, 92vw)' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 id="auth-title" className="modal-title">
            {activeTab === 'login' ? t('auth.titleLogin') : t('auth.titleRegister')}
          </h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={closeAuthModal} />
        </div>
        <div className="modal-body">
          <div className="mb-3 d-flex gap-2">
            <button
              className={`btn ${activeTab === 'login' ? 'btn-primary' : 'btn-outline-primary'} flex-fill`}
              onClick={() => setActiveTab('login')}
              aria-pressed={activeTab === 'login'}
            >
              {t('common.login')}
            </button>
            <button
              className={`btn ${activeTab === 'register' ? 'btn-primary' : 'btn-outline-primary'} flex-fill`}
              onClick={() => setActiveTab('register')}
              aria-pressed={activeTab === 'register'}
            >
              {t('common.register')}
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">{error}</div>
          )}
          {success && (
            <div className="alert alert-success" role="alert">{success}</div>
          )}

          {activeTab === 'login' && (
            <form onSubmit={onLoginSubmit}>
              <div className="mb-3">
                <label htmlFor="login-email" className="form-label">{t('auth.email')}</label>
                <input id="login-email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">{t('auth.password')}</label>
                <input id="login-password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary" disabled={!canSubmitLogin}>{t('auth.signIn')}</button>
                <div className="text-center text-muted">{t('auth.or')}</div>
                <button type="button" className="btn btn-outline-secondary" onClick={onGoogle}>{t('auth.continueWithGoogle')}</button>
              </div>
            </form>
          )}

          {activeTab === 'register' && (
            <form onSubmit={onRegisterSubmit}>
              <div className="mb-3">
                <label htmlFor="register-name" className="form-label">{t('auth.name')}</label>
                <input id="register-name" type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="register-email" className="form-label">{t('auth.email')}</label>
                <input id="register-email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="register-password" className="form-label">{t('auth.password')}</label>
                <input id="register-password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary" disabled={!canSubmitRegister}>{t('auth.signUp')}</button>
                <div className="text-center text-muted">{t('auth.or')}</div>
                <button type="button" className="btn btn-outline-secondary" onClick={onGoogle}>{t('auth.continueWithGoogle')}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}