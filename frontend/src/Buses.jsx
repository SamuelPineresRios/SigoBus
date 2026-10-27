import { useState, useEffect } from 'react'
import './App.css'

function Buses() {
  const [buses, setBuses] = useState([])
  const [interno, setInterno] = useState('')
  const [placa, setPlaca] = useState('')
  const [modelo, setModelo] = useState('')
  const [capacidad, setCapacidad] = useState('')
  const [ruta, setRuta] = useState('Ruta 1: Chimeneas ↔ Campus TdeA')
  const [conductor, setConductor] = useState('')
  const [estado, setEstado] = useState('Activo')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    fetch("http://localhost:3000/buses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBuses(data)
        } else {
          alert("Debes iniciar sesion")
        }
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevoBus = {
      interno: interno,
      placa: placa,
      modelo: modelo,
      capacidad: Number(capacidad),
      ruta: ruta,
      conductor: conductor,
      estado: estado
    }

    fetch("http://localhost:3000/buses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(nuevoBus)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === false) {
          return setMensaje(data.message)
        }
        setBuses([...buses, data])
        setMensaje("Bus registrado correctamente")
        setInterno("")
        setPlaca("")
        setModelo("")
        setCapacidad("")
        setConductor("")
        setEstado("Activo")
      })
      .catch(() => setMensaje("Error al registrar el bus"))
  }

  const handleEliminar = (id) => {
    fetch(`http://localhost:3000/buses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === false) {
          return setMensaje(data.message)
        }
        setBuses(buses.filter(bus => bus.id !== id))
        setMensaje("Bus eliminado")
      })
      .catch(() => setMensaje("Error al eliminar el bus"))
  }

  return (
    <div className="buses-page">
      <h1 className='buses-title'>BUSES</h1>
      <div className="buses-layout">
        <div className="buses-form-card">
          <h2 className="buses-title">Registrar Bus</h2>

          {mensaje && <p className="buses-mensaje">{mensaje}</p>}

          <form className="buses-form" onSubmit={handleSubmit}>
            <div className="buses-row">
              <div className="field-group">
                <label className="field-label" htmlFor="interno">Número Interno *</label>
                <input
                  className="bus-input"
                  id="interno"
                  type="text"
                  placeholder="ej. TDE-105"
                  value={interno}
                  onChange={(e) => setInterno(e.target.value)}
                  required
                />
              </div>
              <div className="field-group">
                <label className="field-label" htmlFor="placa">Placa Vehicular *</label>
                <input
                  className="bus-input"
                  id="placa"
                  type="text"
                  maxLength="7"
                  placeholder="ej. SMK-482"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="buses-row">
              <div className="field-group">
                <label className="field-label" htmlFor="modelo">Modelo / Carrocería</label>
                <input
                  className="bus-input"
                  id="modelo"
                  type="text"
                  placeholder="ej. Mercedes Senior"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                />
              </div>
              <div className="field-group">
                <label className="field-label" htmlFor="capacidad">Capacidad (Pax) *</label>
                <input
                  className="bus-input"
                  id="capacidad"
                  type="number"
                  min="10"
                  max="80"
                  placeholder="40"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="ruta">Ruta Asignada</label>
              <select
                className="bus-input"
                id="ruta"
                value={ruta}
                onChange={(e) => setRuta(e.target.value)}
              >
                <option>Ruta 1: Chimeneas ↔ Campus TdeA</option>
                <option>Ruta 2: Estación Itagüí ↔ Campus TdeA</option>
                <option>Ruta 3: Envigado ↔ Campus TdeA</option>
                <option>Refuerzo Hora Pico</option>
                <option>Sin ruta fija (En Patio)</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="conductor">Conductor Responsable</label>
              <input
                className="bus-input"
                id="conductor"
                type="text"
                placeholder="ej. Carlos Mario Vélez"
                value={conductor}
                onChange={(e) => setConductor(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label className="field-label">Estado Inicial Operativo</label>
              <div className="buses-chips">
                <label className="bus-chip">
                  <input
                    type="radio"
                    name="estado"
                    value="Activo"
                    checked={estado === "Activo"}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                  <span className={estado === "Activo" ? "chip-activo" : "chip"}>Activo</span>
                </label>
                <label className="bus-chip">
                  <input
                    type="radio"
                    name="estado"
                    value="En Patio"
                    checked={estado === "En Patio"}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                  <span className={estado === "En Patio" ? "chip-patio" : "chip"}>En Patio</span>
                </label>
                <label className="bus-chip">
                  <input
                    type="radio"
                    name="estado"
                    value="Mantenimiento"
                    checked={estado === "Mantenimiento"}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                  <span className={estado === "Mantenimiento" ? "chip-taller" : "chip"}>Taller</span>
                </label>
              </div>
            </div>

            <button className="btn-submit" type="submit">
              <span>Guardar Unidad en Flota</span>
            </button>
          </form>
        </div>

        <div className="buses-list">
          <div className="buses-list-header">
            <h2 className="buses-title">Buses Registrados</h2>
          </div>

          <p className="buses-count">{buses.length} unidades</p>

          <div className="buses-cards">
            {buses.map(bus => (
              <div className="bus-card" key={bus.id}>
                <div className="bus-card-info">
                  <span className="bus-card-interno">{bus.interno}</span>
                  <span className="bus-card-placa">{bus.placa}</span>
                  <span className={
                    bus.estado === "Activo" ? "bus-badge activo" :
                    bus.estado === "En Patio" ? "bus-badge patio" :
                    "bus-badge taller"
                  }>
                    {bus.estado}
                  </span>
                </div>
                <p className="bus-card-ruta">{bus.ruta}</p>
                <div className="bus-card-footer">
                  <div>
                    <p className="bus-card-conductor">{bus.conductor || "Sin asignar"}</p>
                    <p className="bus-card-capacidad">{bus.capacidad} pax</p>
                  </div>
                  <button
                    className="bus-btn-eliminar"
                    type="button"
                    onClick={() => handleEliminar(bus.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Buses
