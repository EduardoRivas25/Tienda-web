import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function PlusIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
}

export default function PanelVendedor({ onViewChange }) {
  const [showModal, setShowModal] = useState(false)
  const [notice, setNotice] = useState('')

  const [productos, setProductos] = useState([])

  const [nuevo, setNuevo] = useState({ nombre: '', descripcion: '', precio: '', stock: '', imagen: null })

  function handleStockChange(id, delta) {
    setProductos(productos.map(p => {
      if (p.id === id) {
        const nuevoStock = Math.max(0, p.stock + delta)
        return { ...p, stock: nuevoStock }
      }
      return p
    }))
  }

  function handleAddProduct(e) {
    e.preventDefault()
    const item = {
      id: Date.now(),
      nombre: nuevo.nombre,
      descripcion: nuevo.descripcion,
      precio: Number(nuevo.precio),
      stock: Number(nuevo.stock) || 1,
      esMio: true,
      vendedor: 'Tú'
    }
    setProductos([item, ...productos])
    setNuevo({ nombre: '', descripcion: '', precio: '', stock: '', imagen: null })
    setShowModal(false)
    setNotice('¡Producto añadido exitosamente a tu inventario!')
    setTimeout(() => setNotice(''), 4000)
  }

  return (
    <div className="site-shell" style={{ background: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Barra de Navegación Superior */}
      <header style={{ background: 'var(--color-obsidian)', color: 'var(--color-paper-white)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <img src={logo} alt="TecMart" style={{ width: '110px', background: '#fff', padding: '3px 8px' }} />
          <nav style={{ display: 'flex', gap: '16px' }}>
            <button type="button" onClick={() => onViewChange('comprador')} style={{ color: '#fff', background: 'none', border: 0, borderBottom: '2px solid #fff', padding: '0 0 4px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
              Comprar
            </button>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500, paddingBottom: '4px', borderBottom: '2px solid #fff', cursor: 'default' }}>
              Tus Productos
            </span>
          </nav>
        </div>
        <div style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#c1c1c1' }}>
          PANEL DE VENDEDOR — [ LR ]
        </div>
      </header>

      {/* Notificación flotante temporal */}
      {notice && (
        <div style={{ position: 'fixed', top: '80px', right: '32px', background: 'var(--color-obsidian)', color: '#fff', padding: '12px 20px', fontSize: '13px', zIndex: 100, borderLeft: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          {notice}
        </div>
      )}

      {/* Contenido Principal */}
      <main style={{ flex: 1, padding: '40px clamp(24px, 5vw, 64px)', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
          <div>
            <span className="eyebrow">GESTIÓN DE TUS PRODUCTOS</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', margin: '8px 0 0' }}>
              Tus productos publicados
            </h2>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--color-steel)' }}>
            {productos.length} artículos tuyos
          </span>
        </div>

        {productos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', border: '1px solid var(--color-concrete-gray)' }}>
            <p style={{ color: 'var(--color-steel)', fontSize: '15px', margin: '0 0 8px' }}>Aún no has registrado ningún producto.</p>
            <span style={{ fontSize: '13px', color: '#888' }}>Usa el botón "Añadir producto" en la esquina inferior derecha para empezar.</span>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', paddingBottom: '80px' }}>
            {productos.map((prod) => (
              <div key={prod.id} style={{ background: '#fff', border: '1px solid var(--color-concrete-gray)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px', position: 'relative' }}>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', background: '#e2e8f0', padding: '2px 6px', letterSpacing: '0.1em', fontWeight: 600 }}>
                      {prod.vendedor}
                    </span>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#666' }} title="Editar producto">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 500, margin: '0 0 6px' }}>{prod.nombre}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-steel)', margin: 0, lineHeight: 1.4 }}>{prod.descripcion}</p>
                </div>

                <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '11px', display: 'block', color: '#888' }}>PRECIO</span>
                    <span style={{ fontSize: '18px', fontWeight: 600 }}>${Number(prod.precio).toLocaleString()} MXN</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '4px 8px' }}>
                    <button onClick={() => handleStockChange(prod.id, -1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>-</button>
                    <span style={{ fontSize: '13px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{prod.stock}</span>
                    <button onClick={() => handleStockChange(prod.id, 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>+</button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>

      {/* Botón Flotante Estático Inferior Derecho ("Añadir producto") */}
      <button 
        onClick={() => setShowModal(true)}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          background: 'var(--color-obsidian)',
          color: 'var(--color-paper-white)',
          border: 'none',
          padding: '16px 24px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 50
        }}>
        <PlusIcon /> Añadir producto
      </button>

      {/* Ventana Modal (Fondo desenfocado) */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(5px)',
          display: 'grid',
          placeItems: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            width: '100%',
            maxWidth: '480px',
            padding: '36px',
            border: '1px solid var(--color-concrete-gray)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: 0 }}>Nuevo producto</h3>
              <button onClick={() => setShowModal(false)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}>&times;</button>
            </div>

            <form onSubmit={handleAddProduct} style={{ display: 'grid', gap: '16px' }}>
              <div className="field">
                <label htmlFor="p-name">Nombre del producto</label>
                <input id="p-name" type="text" placeholder="Nombre de producto" value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} required />
              </div>

              <div className="field">
                <label htmlFor="p-desc">Descripción</label>
                <input id="p-desc" type="text" placeholder="Breve detalle del artículo" value={nuevo.descripcion} onChange={e => setNuevo({...nuevo, descripcion: e.target.value})} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="field">
                  <label htmlFor="p-price">Precio ($ MXN)</label>
                  <input id="p-price" type="number" placeholder="0.00" value={nuevo.precio} onChange={e => setNuevo({...nuevo, precio: e.target.value})} required />
                </div>
                <div className="field">
                  <label htmlFor="p-stock">Stock inicial</label>
                  <input id="p-stock" type="number" placeholder="1" value={nuevo.stock} onChange={e => setNuevo({...nuevo, stock: e.target.value})} required />
                </div>
              </div>

              <div className="field">
                <label htmlFor="p-file">Imagen del producto (Archivos)</label>
                <input id="p-file" type="file" accept="image/*" style={{ padding: '10px 0', border: 'none' }} onChange={e => setNuevo({...nuevo, imagen: e.target.files[0]})} />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: '#f1f5f9', border: '1px solid #cbd5e1', cursor: 'pointer', fontWeight: 500 }}>
                  Cancelar
                </button>
                <button type="submit" className="submit-button" style={{ flex: 1, marginTop: 0 }}>
                  <span>Guardar producto</span>
                  <ArrowIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}