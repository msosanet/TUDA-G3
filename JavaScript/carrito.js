/*obtenemos todos los botones con la clase .btn-carrito*/
const botones_carrito = document.querySelectorAll(".btn-carrito");
/**creo un array carrito vacio, 
 * para despues meterle los productos */
let carrito = [];
/**recorremos esos botones y "boton" representa cada boton(btn para mobile o pc)*/
botones_carrito.forEach(boton => {

    /**agregamos un evento cuando se hace click en un boton */
    boton.addEventListener("click", () => {
    
        /** Muestra en la consola el valor 
         * del atributo data-id del botón presionado
         */
        console.log(boton.dataset.id);
        /**guardo en una constante "id" el valor del id del boton */
        const id = boton.dataset.id;

        /**usamos fetch para traer los productos.json 
         * al carrito y representarlos como "productos" */
        fetch("./JavaScript/productos.json")
        .then(response => response.json())
        .then(productos => {
            /**busco en el array que creamos en fetch atraves de una con dicion*/
            const producto = productos.find(p => p.id == id);
           
            /**muestro el producto que cumple con la condicion*/
                 /*console.log(producto);*/
           
            /**cargo mi producto al array vacio "carrito" */
            carrito.push(producto);
            /**muestro el producto en el array carrito*/
            console.log("carrito: ",carrito);

            rendercarrito();
            
        }) 
    });
});
function rendercarrito(){
    const contenedor = document.querySelector(".container-carrito");
    
    contenedor.innerHTML = "";
}