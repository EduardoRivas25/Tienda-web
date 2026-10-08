import { useMemo, useState, useEffect } from 'react'
import logo from './assets/logo.png'
import './PanelVendedor.css'

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  )
}

export default function PanelVendedor({ onViewChange }) {
  const [busqueda, setBusqueda] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editandoId, setEditandoId] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('tecmart_vendedor_productos')
    return guardados ? JSON.parse(guardados) : []
  })

  useEffect(() => {
    localStorage.setItem('tecmart_vendedor_productos', JSON.stringify(productos))
  }, [productos])

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    imagen: ''
  })

  const productosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLocaleLowerCase('es')
    if (!termino) return productos
    return productos.filter((producto) =>
      `${producto.nombre} ${producto.descripcion} ${producto.categoria}`.toLocaleLowerCase('es').includes(termino)
    )
  }, [busqueda, productos])

  function handleStockChange(id, delta) {
    setProductos(productos.map(p => {
      if (p.id === id) {
        const nuevoStock = Math.max(0, p.stock + delta)
        return { ...p, stock: nuevoStock }
      }
      return p
    }))
  }

  function abrirModalNuevo() {
    setEditandoId(null)
    setForm({ nombre: '', descripcion: '', precio: '', stock: '', categoria: '', imagen: '' })
    setShowModal(true)
  }

  function abrirModalEditar(prod) {
    setEditandoId(prod.id)
    setForm({
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      precio: prod.precio,
      stock: prod.stock,
      categoria: prod.categoria,
      imagen: prod.imagen
    })
    setShowModal(true)
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, imagen: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  function handleGuardarProducto(e) {
    e.preventDefault()
    if (editandoId) {
      setProductos(productos.map(p => p.id === editandoId ? {
        ...p,
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: Number(form.precio) || 0,
        stock: Number(form.stock) || 0,
        categoria: form.categoria,
        imagen: form.imagen || p.imagen
      } : p))
      setMensaje('Producto actualizado correctamente.')
    } else {
      const item = {
        id: Date.now(),
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: Number(form.precio) || 0,
        stock: Number(form.stock) || 1,
        categoria: form.categoria,
        imagen: form.imagen || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85'
      }
      setProductos([item, ...productos])
      setMensaje('Producto publicado en tu inventario.')
    }
    setShowModal(false)
    setTimeout(() => setMensaje(''), 3000)
  }

  function eliminarProducto(id) {
    setProductos(productos.filter(p => p.id !== id))
    setMensaje('Producto eliminado del inventario.')
    setTimeout(() => setMensaje(''), 2500)
  }

  return (
    <div className="comprador-shell">
      <header className="comprador-navbar">
        <a className="comprador-brand" href="#inicio" aria-label="TecMart, inicio">
          <img src={logo} alt="TecMart" />
        </a>

        <label className="buscador">
          <SearchIcon />
          <span className="sr-only">Buscar tus productos</span>
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar en tus productos..."
          />
        </label>

        <div className="nav-actions">
          {onViewChange && (
            <button className="nav-button nav-button--vendor" type="button" onClick={() => onViewChange('comprador')}>
              Ver comprador
            </button>
          )}
          <button className="nav-button nav-button--primary" type="button" onClick={abrirModalNuevo}>
            + Añadir producto
          </button>
        </div>
      </header>

      <main id="inicio" className="comprador-main">
        <section className="hero-comprador">
          <div>
            <span className="hero-kicker">PANEL DE VENDEDOR</span>
            <h1>Gestiona tu catálogo<br />y controla tu stock.</h1>
            <p>Publica nuevos artículos, actualiza existencias y mantén tu inventario al día de forma local.</p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-orbit hero-orbit--one" />
            <div className="hero-orbit hero-orbit--two" />
            <span>TEC<span>MART</span></span>
          </div>
        </section>

        <section className="catalogo" aria-labelledby="catalogo-title">
          <div className="catalogo-heading">
            <div>
              <span className="section-kicker">INVENTARIO</span>
              <h2 id="catalogo-title">Tus productos publicados</h2>
            </div>
            <span className="resultado-count">{productosFiltrados.length} artículos</span>
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="product-grid">
              {productosFiltrados.map((producto) => (
                <article className="product-card" key={producto.id}>
                  <div className="product-image-wrap">
                    <img src={producto.imagen} alt={producto.nombre} />
                    <span>{producto.categoria}</span>
                  </div>
                  <div className="product-card-content" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ margin: '0 0 4px' }}>{producto.nombre}</h3>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <button
                            type="button"
                            onClick={() => abrirModalEditar(producto)}
                            style={{ background: 'none', border: 'none', color: 'var(--comprador-ink)', cursor: 'pointer', fontSize: '12px', padding: 0, textDecoration: 'underline' }}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => eliminarProducto(producto.id)}
                            style={{ background: 'none', border: 'none', color: '#a33d35', cursor: 'pointer', fontSize: '12px', padding: 0 }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                      <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--comprador-muted)' }}>{producto.descripcion}</p>
                      <strong style={{ fontSize: '16px' }}>${producto.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--comprador-line)', paddingTop: '12px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--comprador-muted)' }}>Stock actual:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f2f1ed', border: '1px solid var(--comprador-line)', padding: '4px 10px', borderRadius: '999px' }}>
                        <button
                          type="button"
                          onClick={() => handleStockChange(producto.id, -1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 600, minWidth: '18px', textAlign: 'center' }}>{producto.stock}</span>
                        <button
                          type="button"
                          onClick={() => handleStockChange(producto.id, 1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <h3>No tienes productos registrados</h3>
              <p>Comienza añadiendo tu primer artículo usando el botón superior o inferior.</p>
              <button type="button" onClick={abrirModalNuevo}>Añadir producto</button>
            </div>
          )}
        </section>
      </main>

      <button
        onClick={abrirModalNuevo}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          background: 'var(--comprador-ink)',
          color: 'var(--comprador-white)',
          border: 'none',
          padding: '16px 24px',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 50
        }}
      >
        <PlusIcon /> Añadir producto
      </button>

      {showModal && (
        <div className="drawer-backdrop" role="presentation" onMouseDown={() => setShowModal(false)}>
          <div
            className="cart-drawer"
            style={{ width: 'min(500px, 100%)', padding: '0', display: 'flex', flexDirection: 'column' }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <div>
                <span className="section-kicker">{editandoId ? 'MODIFICAR ARTÍCULO' : 'NUEVO ARTÍCULO'}</span>
                <h2>{editandoId ? 'Editar producto' : 'Añadir producto'}</h2>
              </div>
              <button className="close-cart" type="button" onClick={() => setShowModal(false)}>&times;</button>
            </div>

            <form onSubmit={handleGuardarProducto} style={{ padding: '28px', overflowY: 'auto', display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500 }}>Nombre del producto</label>
                <input
                  type="text"
                  placeholder="Ej. Zapatilla Urbana"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  required
                  style={{ padding: '12px 16px', border: '1px solid var(--comprador-line)', borderRadius: '8px', font: 'inherit', fontSize: '14px', background: '#fcfbfa' }}
                />
              </div>

              <div style={{ display: 'grid', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500 }}>Descripción</label>
                <input
                  type="text"
                  placeholder="Breve descripción del artículo"
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  required
                  style={{ padding: '12px 16px', border: '1px solid var(--comprador-line)', borderRadius: '8px', font: 'inherit', fontSize: '14px', background: '#fcfbfa' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'grid', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500 }}>Precio ($ MXN)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={form.precio}
                    onChange={(e) => setForm({ ...form, precio: e.target.value })}
                    required
                    style={{ padding: '12px 16px', border: '1px solid var(--comprador-line)', borderRadius: '8px', font: 'inherit', fontSize: '14px', background: '#fcfbfa' }}
                  />
                </div>
                <div style={{ display: 'grid', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500 }}>Stock inicial</label>
                  <input
                    type="number"
                    placeholder="1"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    required
                    style={{ padding: '12px 16px', border: '1px solid var(--comprador-line)', borderRadius: '8px', font: 'inherit', fontSize: '14px', background: '#fcfbfa' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500 }}>Categoría</label>
                <input
                  type="text"
                  placeholder="Ej. Moda, Accesorios, Calzado"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  required
                  style={{ padding: '12px 16px', border: '1px solid var(--comprador-line)', borderRadius: '8px', font: 'inherit', fontSize: '14px', background: '#fcfbfa' }}
                />
              </div>

              <div style={{ display: 'grid', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 500 }}>Imagen desde el dispositivo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ padding: '10px 0', border: 'none', font: 'inherit', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ flex: 1, padding: '14px', border: '1px solid var(--comprador-line)', borderRadius: '999px', background: 'transparent', font: 'inherit', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="checkout-button"
                  style={{ flex: 1 }}
                >
                  {editandoId ? 'Actualizar cambios' : 'Guardar producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mensaje && <div className="toast" role="status">{mensaje}</div>}
    </div>
  )
}