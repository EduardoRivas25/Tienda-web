import { useEffect, useMemo, useState } from 'react'
import logo from './assets/logo.png'
import './CompradorPanel.css'

export const PRODUCTOS_INICIALES = [
  {
    id: 1,
    nombre: 'Zapatilla Urbana Pro',
    descripcion: 'Diseño ergonómico y suela antideslizante para uso diario.',
    precio: 1899,
    stock: 12,
    categoria: 'Calzado',
    imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 2,
    nombre: 'Camiseta Essential',
    descripcion: 'Algodón peinado premium, corte regular y transpirable.',
    precio: 649,
    stock: 25,
    categoria: 'Moda',
    imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 3,
    nombre: 'Bolso Everyday',
    descripcion: 'Compartimentos funcionales y acabado resistente al agua.',
    precio: 1199,
    stock: 8,
    categoria: 'Accesorios',
    imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 4,
    nombre: 'Watch Minimal',
    descripcion: 'Caja metálica ultradelgada y correa intercambiable.',
    precio: 2499,
    stock: 5,
    categoria: 'Accesorios',
    imagen: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 5,
    nombre: 'Gafas Deportivas',
    descripcion: 'Lentes polarizados con protección UV400 y marco ligero.',
    precio: 899,
    stock: 15,
    categoria: 'Deporte',
    imagen: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 6,
    nombre: 'Boleto Tecnológico',
    descripcion: 'Estilo urbano contemporáneo y materiales sustentables.',
    precio: 1499,
    stock: 10,
    categoria: 'Moda',
    imagen: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85'
  }
]

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L20 8H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  )
}

export default function CompradorPanel({ onViewChange }) {
  const [busqueda, setBusqueda] = useState('')
  const [carrito, setCarrito] = useState([])
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [mensaje, setMensaje] = useState('')

  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('tecmart_vendedor_productos')
    if (guardados) {
      try {
        return JSON.parse(guardados)
      } catch {
        return PRODUCTOS_INICIALES
      }
    }
    return PRODUCTOS_INICIALES
  })

  useEffect(() => {
    function sincronizarProductos(event) {
      if (event.key && event.key !== 'tecmart_vendedor_productos') return

      const guardados = localStorage.getItem('tecmart_vendedor_productos')
      if (guardados) {
        try {
          setProductos(JSON.parse(guardados))
        } catch {
          setProductos(PRODUCTOS_INICIALES)
        }
      } else {
        setProductos(PRODUCTOS_INICIALES)
      }
    }

    window.addEventListener('storage', sincronizarProductos)
    return () => window.removeEventListener('storage', sincronizarProductos)
  }, [])

  const productosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLocaleLowerCase('es')

    if (!termino) return productos

    return productos.filter((producto) =>
      `${producto.nombre} ${producto.categoria} ${producto.descripcion || ''}`.toLocaleLowerCase('es').includes(termino)
    )
  }, [busqueda, productos])

  const cantidadCarrito = carrito.reduce((total, item) => total + item.cantidad, 0)
  const subtotal = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  )

  function agregarAlCarrito(producto) {
    setCarrito((items) => {
      const productoExistente = items.find((item) => item.id === producto.id)

      if (productoExistente) {
        return items.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...items, { ...producto, cantidad: 1 }]
    })

    setMensaje(`${producto.nombre} se agregó al carrito.`)
    window.setTimeout(() => setMensaje(''), 2400)
  }

  function eliminarDelCarrito(id) {
    setCarrito((items) => items.filter((item) => item.id !== id))
  }

  function confirmarCompra() {
    setMensaje('Compra confirmada. Gracias por usar TecMart.')
    setCarrito([])
    setCarritoAbierto(false)
    window.setTimeout(() => setMensaje(''), 3600)
  }

  return (
    <div className="comprador-shell">
      <header className="comprador-navbar">
        <a className="comprador-brand" href="#inicio" aria-label="TecMart, inicio">
          <img src={logo} alt="TecMart" />
        </a>

        <label className="buscador">
          <SearchIcon />
          <span className="sr-only">Buscar productos</span>
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar productos..."
          />
        </label>

        <div className="nav-actions">
          <button className="nav-button nav-button--vendor" type="button" onClick={() => onViewChange('vendedor')}>
            Ver vendedor
          </button>
          <button
            className="carrito-button"
            type="button"
            aria-label={`Carrito con ${cantidadCarrito} productos`}
            aria-expanded={carritoAbierto}
            onClick={() => setCarritoAbierto(true)}
          >
            <CartIcon />
            {cantidadCarrito > 0 && <span>{cantidadCarrito}</span>}
          </button>
          {onViewChange && (
            <button className="nav-button" type="button" onClick={() => onViewChange('login')} title="Cerrar sesión local">
              Cerrar sesión
            </button>
          )}
        </div>
      </header>

      <main id="inicio" className="comprador-main">
        <section className="hero-comprador">
          <div>
            <span className="hero-kicker">NUEVOS ARTÍCULOS</span>
            <h1>Descubre cosas<br />que valen la pena.</h1>
            <p>Productos seleccionados para tu everyday life.</p>
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
              <span className="section-kicker">CATÁLOGO</span>
              <h2 id="catalogo-title">Productos disponibles</h2>
            </div>
            <span className="resultado-count">{productosFiltrados.length} productos</span>
          </div>

          {productosFiltrados.length > 0 ? (
            <div className="product-grid">
              {productosFiltrados.map((producto) => (
                <article className="product-card" key={producto.id}>
                  <div className="product-image-wrap">
                    <img src={producto.imagen} alt={producto.nombre} />
                    <span>{producto.categoria}</span>
                  </div>
                  <div className="product-card-content">
                    <div>
                      <h3>{producto.nombre}</h3>
                      <p>${producto.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</p>
                    </div>
                    <button type="button" onClick={() => agregarAlCarrito(producto)}>
                      Agregar al carrito
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <h3>No encontramos productos</h3>
              <p>Prueba con otra palabra o revisa todo el catálogo.</p>
              <button type="button" onClick={() => setBusqueda('')}>Limpiar búsqueda</button>
            </div>
          )}
        </section>
      </main>

      {carritoAbierto && (
        <div className="drawer-backdrop" role="presentation" onMouseDown={() => setCarritoAbierto(false)}>
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <div>
                <span className="section-kicker">TU SELECCIÓN</span>
                <h2 id="cart-title">Carrito de compras</h2>
              </div>
              <button
                className="close-cart"
                type="button"
                aria-label="Cerrar carrito"
                onClick={() => setCarritoAbierto(false)}
              >
                &times;
              </button>
            </div>

            {carrito.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon"><CartIcon /></div>
                <h3>No hay productos seleccionados</h3>
                <p>Agrega algún producto al carrito para comenzar tu compra.</p>
                <button type="button" onClick={() => setCarritoAbierto(false)}>Continuar comprando</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {carrito.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <img src={item.imagen} alt={item.nombre} />
                      <div className="cart-item-details">
                        <div>
                          <h3>{item.nombre}</h3>
                          <p>${item.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN c/u</p>
                        </div>
                        <div className="cart-item-bottom">
                          <span>Cantidad: {item.cantidad}</span>
                          <button type="button" onClick={() => eliminarDelCarrito(item.id)}>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <strong>${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</strong>
                  </div>
                  <p>El total incluye los productos seleccionados. No se realizan pagos reales.</p>
                  <button className="checkout-button" type="button" onClick={confirmarCompra}>
                    Confirmar compra
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {mensaje && <div className="toast" role="status">{mensaje}</div>}
    </div>
  )
}
