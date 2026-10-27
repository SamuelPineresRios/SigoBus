import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'

function Registro() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [carrera, setCarrera] = useState('')
  const [semestre, setSemestre] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return setMensaje("Las contrasenas no coinciden")
    }

    const nuevoUsuario = {
      nombre: nombre,
      correo: email,
      carrera: carrera,
      semestre: Number(semestre),
      password: password
    }

    fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === false) {
          return setMensaje(data.message)
        }
        setMensaje("Usuario registrado correctamente")
        setNombre("")
        setEmail("")
        setCarrera("")
        setSemestre("")
        setPassword("")
        setConfirmPassword("")
        navigate("/")
      })
      .catch(() => setMensaje("Error al registrar usuario"))
  }

  return (
    <div className="login-body">
      <div className="bg-decoration">
        <div className="circle-green"></div>
        <div className="circle-beige"></div>
      </div>

      <main className="login-card">
        <div className="login-header">
          <h1>Crear cuenta</h1>
          <p>Registrate para acceder al seguimiento de rutas TdeA.</p>
        </div>

        {mensaje && <p className="register-message">{mensaje}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label" htmlFor="nombre">
              Nombre completo
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <span className="material-symbols-outlined">person</span>
              </div>
              <input
                className="login-input"
                id="nombre"
                type="text"
                placeholder="Samuel Pineres"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </div>

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
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="carrera">
              Carrera
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <span className="material-symbols-outlined">school</span>
              </div>
              <input
                className="login-input"
                id="carrera"
                type="text"
                placeholder="Tecnologia profesional en sistemas"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="semestre">
              Semestre
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <input
                className="login-input"
                id="semestre"
                type="number"
                placeholder="3"
                value={semestre}
                onChange={(e) => setSemestre(e.target.value)}
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="password">
              Contrasena
            </label>
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
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="confirmPassword">
              Confirmar contrasena
            </label>
            <div className="input-wrapper">
              <div className="input-icon">
                <span className="material-symbols-outlined">lock</span>
              </div>
              <input
                className="login-input"
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="btn-submit" type="submit">
            <span>Registrarse</span>
            <span className="material-symbols-outlined">person_add</span>
          </button>
        </form>

        <div className="login-footer">
          <p>
            Ya tienes una cuenta?
            <Link to="/">Iniciar sesion</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Registro
