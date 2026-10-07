import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'
import CompradorPanel from './CompradorPanel.jsx'
import PanelVendedor from './PanelVendedor.jsx' 

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function EyeIcon({ visible }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 12s3.5-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.5 5.5-9.5 5.5S2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />{!visible && <path d="m4 20 16-16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}</svg>
}

function GoogleIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><text x="12" y="18" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="21" fill="currentColor">G</text></svg>
}

function AppleIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.7 19.5c-1.04 1.01-2.18.85-3.28.37-1.17-.5-2.24-.52-3.48 0-1.55.66-2.37.47-3.3-.37C3.36 14.04 4.09 5.73 10.08 5.4c1.47.08 2.5.8 3.36.87 1.28-.26 2.5-.98 3.87-.88 1.65.13 2.9.8 3.7 1.93-3.39 2.02-2.58 6.48.52 7.75-.62 1.63-1.43 3.25-2.83 4.43ZM13.31 5.3c-.15-2.43 1.81-4.44 4.08-4.63.31 2.79-2.53 4.86-4.08 4.63Z" /></svg>
}

function App() {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState('')
  const [role, setRole] = useState('comprador')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeView, setActiveView] = useState('comprador')
  const isRegister = mode === 'register'

  function changeMode(nextMode) {
    setMode(nextMode)
    setNotice('')
    setShowPassword(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    setActiveView(role)
    setIsLoggedIn(true)
  }

  function handleSocial(provider) {
    setNotice(`El acceso con ${provider} estará disponible al conectar la autenticación.`)
  }

  function handleViewChange(nextView) {
    setActiveView(nextView)
    setIsLoggedIn(true)
  }

  if (isLoggedIn) {
    if (activeView === 'comprador') {
      return <CompradorPanel onViewChange={handleViewChange} />
    }

    return <PanelVendedor onViewChange={handleViewChange} />
  }

  return (
    <div className="site-shell">
      <main id="inicio" className="login-layout">
        <section className="editorial-panel" aria-labelledby="editorial-title">
          <div className="panel-topline"><span>EL SIGUIENTE PASO EMPIEZA AQUÍ</span><span>01 — 03</span></div>
          <div className="editorial-content">
            <span className="eyebrow eyebrow-light">TU ESPACIO. TUS POSIBILIDADES.</span>
            <h1 id="editorial-title">ENTRA.<br />DESCUBRE.<br /><span>CONECTA.</span></h1>
            <p>Encuentra productos que te interesan o comparte los tuyos con nuevos compradores.</p>
          </div>
          <div className="editorial-end">
            <a className="brand-mark" href="#inicio" aria-label="TecMart, inicio"><img src={logo} alt="TecMart" /></a>
            <div className="panel-bottomline"><span>COMPRA Y VENTA EN UN MISMO LUGAR</span><span className="line-mark" aria-hidden="true" /></div>
          </div>
        </section>

        <section className="form-panel" aria-labelledby="form-title">
          <div className="form-content">
            <div className="form-intro">
              <span className="eyebrow">{isRegister ? 'EMPIEZA AQUÍ' : 'QUÉ BUENO VERTE DE NUEVO'}</span>
              <h2 id="form-title">{isRegister ? 'Crea tu cuenta' : 'Inicia sesión'}</h2>
              <p>{isRegister ? 'Elige cómo quieres participar en la tienda.' : 'Accede a tu cuenta para continuar.'}</p>
            </div>

            <form key={mode} className="access-form" onSubmit={handleSubmit}>
              {isRegister && <>
                <div className="field"><label htmlFor="name">Nombre completo</label><input id="name" name="name" type="text" autoComplete="name" placeholder="Tu nombre" minLength="2" /></div>
                <fieldset className="role-fieldset">
                  <legend>Quiero usar mi cuenta para</legend>
                  <div className="role-options">
                    <label className={role === 'comprador' ? 'role-option selected' : 'role-option'}><input type="radio" name="role" value="comprador" checked={role === 'comprador'} onChange={() => setRole('comprador')} />Comprar</label>
                    <label className={role === 'vendedor' ? 'role-option selected' : 'role-option'}><input type="radio" name="role" value="vendedor" checked={role === 'vendedor'} onChange={() => setRole('vendedor')} />Vender</label>
                  </div>
                </fieldset>
              </>}
              <div className="field"><label htmlFor="email">Correo electrónico</label><input id="email" name="email" type="email" autoComplete="email" placeholder="nombre@correo.com" /></div>
              <div className="field">
                <label htmlFor="password">Contraseña</label>
                <div className="password-control">
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder={isRegister ? 'Mínimo 8 caracteres' : 'Ingresa tu contraseña'} minLength={isRegister ? 8 : undefined} />
                  <button className="visibility-button" type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={showPassword}><EyeIcon visible={showPassword} /></button>
                </div>
              </div>
              <button className="submit-button" type="submit"><span>{isRegister ? 'Crear cuenta' : 'Entrar a mi cuenta'}</span><ArrowIcon /></button>
            </form>
            <div className="social-login">
              <div className="social-divider"><span>O CONTINÚA CON</span></div>
              <div className="social-buttons">
                <button type="button" onClick={() => handleSocial('Google')}><GoogleIcon /><span>Google</span></button>
                <button type="button" onClick={() => handleSocial('Apple')}><AppleIcon /><span>Apple</span></button>
              </div>
            </div>
            {notice && <p className="form-notice" role="status">{notice}</p>}
            <div className="form-switch">
              <span>{isRegister ? '¿Ya tienes una cuenta?' : '¿Aún no tienes una cuenta?'}</span>
              <button type="button" onClick={() => changeMode(isRegister ? 'login' : 'register')}>{isRegister ? 'Inicia sesión' : 'Crear cuenta'} <ArrowIcon /></button>
            </div>
          </div>
          <div className="form-footer">
            <span>TECMART</span>
            <button className="login-view-switch" type="button" onClick={() => setRole(role === 'comprador' ? 'vendedor' : 'comprador')}>
              Ver vista {role === 'comprador' ? 'vendedor' : 'comprador'}
            </button>
            <span>COMPRA Y VENTA, SIN COMPLICACIONES.</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App