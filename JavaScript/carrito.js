/*obtenemos todos los botones con la clase .btn-carrito*/
const botones_carrito = document.querySelectorAll(".btn-carrito");
/**recorremos esos botones y "boton" representa cada boton(btn para mobile o pc)*/
botones_carrito.forEach(boton => {

    /**agregamos un evento cuando se hace click en un boton */
    boton.addEventListener("click", () => {
    
        /** Muestra en la consola el valor 
         * del atributo data-id del botón presionado
         */
        console.log(boton.dataset.id);

        /**usamos fetch para traer los productos.json 
         * al carrito y representarlos como "productos" */
        fetch("./JavaScript/productos.json")
        .then(Response => Response.json)
        .then(productos => {
            console.log("productos")
        })
    });
});