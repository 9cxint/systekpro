import React, { type FormEvent, useState } from "react"
import { authService, setSession } from "@/services/auth"
import { IconArrowLeft } from "@tabler/icons-react"

export default function Auth() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const response = await authService.login(name, password)
      setSession(response)
      window.location.href = "/sistema"
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-auth">
      <a href="/" title="volver" className="back" ><IconArrowLeft size={36} /> </a>
      <div className="auth">
        <h4>Iniciar sesion</h4>
        <div className="container-form">
          <form onSubmit={handleSubmit} className="form" >
            <div>
              <label><input className="input-name" type="text" alt="Escribe tu nombre de usuario" placeholder="nombre de usuario" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label><input className="input-name" type="password" alt="Escribe tu nombre de usuario" placeholder="contraseña..." value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" disabled={loading}>{loading ? "Ingresando..." : "Iniciar sesion"}</button>
          </form>
        </div>
        <a href="/">No tengo una cuenta</a>
      </div>
    </div>)
}
