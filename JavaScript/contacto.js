document.addEventListener("DOMContentLoaded", () => {
    const contactoForm = document.getElementById("contacto-form");

    if (!contactoForm) return;

    contactoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();
        const calificar = contactoForm.querySelector("input[name='calificar']:checked");

        if (!nombre || !email || !mensaje || !calificar) {
            alert("Por favor completa todos los campos antes de enviar.");
            return;
        }

        const datos = {
            nombre,
            email,
            mensaje,
            calificacion: calificar.value,
        };

        console.log("Formulario de contacto enviado:", datos);

        alert("Gracias por tu mensaje, " + nombre + ". Nos contactaremos pronto.");

        contactoForm.reset();
    });
});
