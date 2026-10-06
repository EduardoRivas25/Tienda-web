# Tienda Web

## Descripción

Proyecto escolar de una **tienda web** desarrollada con React.

La aplicación permitirá que diferentes vendedores publiquen sus productos y que los compradores puedan verlos, agregarlos al carrito y realizar una compra simulada.

No se utilizarán tarjetas, pasarelas de pago ni pagos reales.

Existirán tres tipos de usuarios:

- Comprador
- Vendedor
- Administrador

---

## 1. Inicio de sesión y registro

Los usuarios podrán:

- Crear una cuenta.
- Iniciar sesión.
- Cerrar sesión.

Cada cuenta tendrá un rol:

- `comprador`
- `vendedor`
- `admin`

---

## 2. Comprador

El comprador podrá:

- Ver los productos disponibles.
- Ver información de un producto.
- Ver nombre, fotografía, descripción y precio.
- Agregar productos al carrito.
- Eliminar productos del carrito.
- Cambiar la cantidad de productos.
- Ver el total de la compra.
- Realizar una compra simulada.
- Ver sus compras realizadas.

### Pantallas

- Inicio / Productos
- Detalle del producto
- Carrito
- Confirmar compra
- Mis compras

---

## 3. Vendedor

El vendedor podrá publicar y administrar sus propios productos.

Podrá:

- Agregar productos.
- Subir una fotografía del producto.
- Escribir el nombre del producto.
- Agregar una descripción.
- Establecer el precio.
- Indicar la cantidad disponible.
- Editar sus productos.
- Eliminar sus productos.
- Ver sus productos publicados.
- Ver las compras realizadas de sus productos.

### Pantallas

- Panel del vendedor
- Mis productos
- Agregar producto
- Editar producto
- Ventas

---

## 4. Administrador

El administrador tendrá funciones básicas para controlar la plataforma.

Podrá:

- Ver las cuentas registradas.
- Ver compradores.
- Ver vendedores.
- Dar de baja cuentas.
- Ver los productos publicados.
- Eliminar productos cuando sea necesario.

### Pantallas

- Panel de administrador
- Usuarios
- Productos

---

## 5. Productos

Cada producto tendrá información básica:

- Nombre
- Descripción
- Precio
- Fotografía
- Cantidad disponible
- Vendedor

---

## 6. Carrito

El carrito permitirá:

- Agregar productos.
- Eliminar productos.
- Cambiar cantidades.
- Ver el total.

Al seleccionar **Comprar**, se realizará una compra simulada.

No se solicitarán datos de tarjetas ni se utilizarán servicios de pago reales.

---

## 7. Funciones principales del sistema

El proyecto deberá permitir completar estos tres flujos:

**Comprador:**

Iniciar sesión → Ver productos → Agregar al carrito → Comprar

**Vendedor:**

Iniciar sesión → Agregar producto → Subir foto → Establecer precio → Publicar

**Administrador:**

Iniciar sesión → Ver usuarios → Dar de baja cuentas → Administrar productos

---

## Alcance

El proyecto será una aplicación sencilla para fines escolares.

No se implementarán:

- Pagos reales.
- Tarjetas bancarias.
- PayPal, Mercado Pago o Stripe.
- Envíos reales.
- Facturación.
- Chat.
- Cupones.
- Sistemas avanzados de estadísticas.
- Funciones innecesarias para el objetivo de la práctica.

El objetivo es tener una aplicación sencilla y funcional donde **vendedores publiquen productos, compradores puedan comprarlos de manera simulada y un administrador pueda controlar usuarios y productos**.