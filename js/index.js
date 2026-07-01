const endpointProductos = "./JavaScript/productos.json";
const contenedorDestacados = document.querySelector("#productos-destacados");
const mensajeDestacados = document.querySelector("#mensaje-destacados");
const contadorDestacados = document.querySelector("#contador-destacados");
const formNewsletter = document.querySelector("#newsletter-form");
const inputEmailNewsletter = document.querySelector("#email-newsletter");
const mensajeNewsletter = document.querySelector("#newsletter-mensaje");

const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2
});

function crearCardProducto(producto) {
  const imagen = producto.pictures?.[0] || "./img/logo-winebox.png";
  const descripcion = producto.description || "Producto Winebox";

  return `
    <article class="tarjeta">
      <figure>
        <img src="${imagen}" alt="Botella de vino ${producto.title}" onerror="this.src='./img/logo-winebox.png'">
        <figcaption>${descripcion}</figcaption>
      </figure>
      <h3>${producto.title}</h3>
      <p>Producto seleccionado desde la fake API del grupo.</p>
      <p class="precio"><strong>${formatoPrecio.format(producto.price)}</strong></p>
      <a href="Contacto.html" class="link-detalle">Hablar con el sommelier</a>
    </article>
  `;
}

function renderizarDestacados(productos) {
  const destacados = productos.slice(0, 4);
  contenedorDestacados.innerHTML = "";

  if (destacados.length === 0) {
    mensajeDestacados.textContent = "No hay productos destacados para mostrar.";
    contadorDestacados.textContent = "";
    return;
  }

  mensajeDestacados.textContent = "";
  contadorDestacados.textContent = `${destacados.length} productos cargados desde la fake API del grupo`;
  contenedorDestacados.innerHTML = destacados.map(crearCardProducto).join("");
}

async function obtenerProductosDestacados() {
  try {
    mensajeDestacados.textContent = "Cargando productos destacados...";
    contadorDestacados.textContent = "";

    const respuesta = await fetch(endpointProductos, {
      headers: {
        accept: "application/json"
      }
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la informacion de productos.");
    }

    const productos = await respuesta.json();
    renderizarDestacados(productos);
  } catch (error) {
    mensajeDestacados.textContent = "No se pudieron cargar los productos destacados.";
    contadorDestacados.textContent = "";
    console.error(error);
  }
}

function obtenerSuscriptores() {
  return JSON.parse(localStorage.getItem("newsletter-winebox")) || [];
}

function guardarSuscriptores(suscriptores) {
  localStorage.setItem("newsletter-winebox", JSON.stringify(suscriptores));
}

function validarNewsletter(event) {
  event.preventDefault();

  const email = inputEmailNewsletter.value.trim().toLowerCase();
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    mensajeNewsletter.textContent = "Ingresa un correo electronico valido.";
    mensajeNewsletter.className = "mensaje-formulario mensaje-error";
    return;
  }

  const suscriptores = obtenerSuscriptores();

  if (suscriptores.includes(email)) {
    mensajeNewsletter.textContent = "Ese correo ya estaba suscripto.";
    mensajeNewsletter.className = "mensaje-formulario mensaje-error";
    return;
  }

  suscriptores.push(email);
  guardarSuscriptores(suscriptores);
  mensajeNewsletter.textContent = "Suscripcion registrada correctamente.";
  mensajeNewsletter.className = "mensaje-formulario mensaje-exito";
  formNewsletter.reset();
}

obtenerProductosDestacados();
formNewsletter?.addEventListener("submit", validarNewsletter);
