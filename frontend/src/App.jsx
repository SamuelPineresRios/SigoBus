import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import RegistroUsuario from './RegistroUsuario'
import Buses from './Buses'
import './App.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo: email, password: password })
    })
      .then(res => res.json())
      .then(data => {
        if (!data.token) {
          return alert(data.message || "Entradas invalidas")
        }
        localStorage.setItem("token", data.token)
        alert("Inicio de sesion correcto\n\nToken JWT:\n" + data.token)
        navigate("/buses")
      })
      .catch(() => alert("Error al iniciar sesion"))
  }

  return (
    <div className="login-body">
      <div className="bg-decoration">
        <div className="circle-green"></div>
        <div className="circle-beige"></div>
      </div>

      <main className="login-card">
        <div className="login-header">
          <h1>Bienvenido de nuevo</h1>
          <p>Ingresa tus credenciales para acceder al seguimiento de rutas TdeA.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label" htmlFor="email">
              Correo Institucional
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <span className="material-symbols-outlined">alternate_email</span>
              </div>
              <input
                className="login-input"
                id="email"
                type="email"
                placeholder="usuario@tdea.edu.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <div className="field-label-row">
              <label className="field-label" htmlFor="password">
                Contraseña
              </label>
            </div>
            <div className="input-wrapper">
              <div className="input-icon">
                <span className="material-symbols-outlined">lock</span>
              </div>
              <input
                className="login-input"
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="btn-submit" type="submit">
            <span>Iniciar sesion</span>
            <span className="material-symbols-outlined">login</span>
          </button>
        </form>

        <div className="login-footer">
          <p>
            Eres nuevo en la plataforma?
            <Link to="/registro">Crear cuenta</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<RegistroUsuario />} />
      <Route path="/buses" element={<Buses />} />
    </Routes>
  )
}

export default App
