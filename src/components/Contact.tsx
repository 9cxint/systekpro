import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconClock,
  IconSend
} from '@tabler/icons-react'

import styles from '../styles/contact.module.css'

type FormData = {
  nombre: string
  email: string
  numero: string
  servicio: string
  message: string
}

function Contact() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData) as FormData

    if (!data.nombre || !data.email || !data.numero || !data.servicio || !data.message) {
      alert('Por favor completa todos los campos')
      return
    }

    if (data.nombre.length < 3) {
      alert('El nombre debe tener al menos 3 caracteres')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      alert('Ingresa un correo electrónico válido')
      return
    }

    if (data.numero.length < 7) {
      alert('Ingresa un número de teléfono válido')
      return
    }

    if (data.message.length < 10) {
      alert('El mensaje es demasiado corto')
      return
    }

    try {
      const response = { ok: true };
      if (response.ok) {
        alert('¡Mensaje enviado con éxito! Te contactaremos pronto.')
        form.reset()
      } else {
        alert('No se pudo enviar el mensaje. Intenta de nuevo o contáctanos por WhatsApp.')
      }
    } catch (error) {
      alert('Error de conexión. Intenta de nuevo o contáctanos por WhatsApp.')
    }
  }

  return (
    <section id="contacto" className={styles.contacto}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Contacto</span>
          <h2 className={styles.sectionTitle}>
            Hablemos de tu<span className={styles.gradientText}> proyecto</span>
          </h2>
          <p className={styles.sectionDesc}>
            Cuéntanos qué necesitas y te enviaremos una propuesta personalizada.
          </p>
        </div>

        <div className={styles.contactGrid}>
          <form
            className={styles.contactFormm}
            action="https://formspree.io/f/xpqngavp"
            onSubmit={(e) => handleSubmit(e)}
            method='POST'
            noValidate
          >
            <div className={styles.formmRow}>
              <div className={styles.formmGroup}>
                <label htmlFor="nombre" className={styles.formmLabel}>Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className={styles.formmInput}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  required
                  minLength={3}
                />
              </div>

              <div className={styles.formmGroup}>
                <label htmlFor="email" className={styles.formmLabel}>Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.formmInput}
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className={styles.formmGroup}>
              <label htmlFor="numero" className={styles.formmLabel}>Teléfono</label>
              <input
                type="tel"
                id="numero"
                name="numero"
                className={styles.formmInput}
                placeholder="+57 300 123 4567"
                autoComplete="tel"
                required
                minLength={7}
              />
            </div>

            <div className={styles.formmGroup}>
              <label htmlFor="servicio" className={styles.formmLabel}>Servicio de interés</label>
              <select id="servicio" name="servicio" className={styles.formmSelect} required>
                <option value="">Selecciona un servicio</option>
                <option value="mantenimiento">Mantenimiento de equipos</option>
                <option value="redes">Instalación de redes</option>
                <option value="cableado">Cableado estructurado</option>
                <option value="configuracion">Configuración de routers/switches</option>
                <option value="soporte">Soporte técnico</option>
                <option value="wifi">Redes inalámbricas</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className={styles.formmGroup}>
              <label htmlFor="message" className={styles.formmLabel}>Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={styles.formmTextarea}
                placeholder="Cuéntanos sobre tu proyecto..."
                required
                minLength={10}
              />
            </div>

            <button type="submit" className={styles.formmBtn}>
              Enviar mensaje
              <IconSend />
            </button>
          </form>

          <div className={styles.contactInfo}>
            <div className={styles.contactInfoList}>
              <div className={styles.contactInfoItem}>
                <div className={`${styles.contactInfoIcon} ${styles.primary}`}>
                  <IconPhone />
                </div>
                <div>
                  <h3 className={styles.contactInfoLabel}>Teléfono</h3>
                  <a href="tel:+571234513541" className={styles.contactInfoValue}>+57 123 4513541</a>
                </div>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={`${styles.contactInfoIcon} ${styles.accent}`}>
                  <IconMail />
                </div>
                <div>
                  <h3 className={styles.contactInfoLabel}>Correo electrónico</h3>
                  <a href="mailto:contacto@sistek.com.co" className={styles.contactInfoValue}>contacto@sistek.com.co</a>
                </div>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={`${styles.contactInfoIcon} ${styles.primary}`}>
                  <IconMapPin />
                </div>
                <div>
                  <h3 className={styles.contactInfoLabel}>Ubicación</h3>
                  <p className={styles.contactInfoValue}>Calle 41, Cra 31 #00, Cali, Valle del Cauca</p>
                </div>
              </div>

              <div className={styles.contactInfoItem}>
                <div className={`${styles.contactInfoIcon} ${styles.accent}`}>
                  <IconClock />
                </div>
                <div>
                  <h3 className={styles.contactInfoLabel}>Horario</h3>
                  <p className={styles.contactInfoValue}>Lun - Vie: 8:00 - 18:00</p>
                  <p className={styles.contactInfoValue}>Sáb: 9:00 - 13:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
