const formNewsletter = document.querySelector("#newsletter-form");
const inputEmail = document.querySelector("#newsletter-email");
const mensaje = document.querySelector("#newsletter-mensaje");

formNewsletter.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = inputEmail.value.trim();

    if (email === "") {
        mensaje.textContent = "Ingresá un correo.";
        return;
    }

    if (!email.includes("@")) {
        mensaje.textContent = "Ingresá un correo válido.";
        return;
    }

    let suscriptores =
        JSON.parse(localStorage.getItem("newsletter")) || [];

    if (suscriptores.includes(email)) {
        mensaje.textContent = "Este correo ya está suscripto.";
        return;
    }

    suscriptores.push(email);

    localStorage.setItem(
        "newsletter",
        JSON.stringify(suscriptores)
    );

    mensaje.textContent = "¡Suscripción registrada correctamente!";
    formNewsletter.reset();
});