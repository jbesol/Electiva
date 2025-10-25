document.addEventListener("DOMContentLoaded", () => {

    // ================== HEADER SEGÚN LOGIN ==================
    const user = JSON.parse(localStorage.getItem("usuario"));
    const headerButtons = document.querySelector(".botones-header");

    if (headerButtons) {
        headerButtons.innerHTML = "";

        if (user && user.logueado) {
            headerButtons.innerHTML = `
                <button id="btn-logout">Cerrar Sesión</button>
                <button id="btn-carrito">Carrito</button>
            `;

            document.getElementById("btn-logout").addEventListener("click", () => {
                localStorage.removeItem("usuario");
                alert("Sesión cerrada");
                window.location.href = "index.html";
            });

        } else {
            headerButtons.innerHTML = `
                <button id="btn-login">Iniciar Sesión</button>
                <button id="btn-carrito">Carrito</button>
            `;
        }
    }

    // ================== NAV ==================
    const btnLogin = document.getElementById("btn-login");
    const btnCarrito = document.getElementById("btn-carrito");
    const btnCabello = document.getElementById("btn-cabello");
    const btnModa = document.getElementById("btn-moda");

    if (btnLogin) btnLogin.addEventListener("click", () => window.location.href = "login.html");
    if (btnCarrito) btnCarrito.addEventListener("click", () => window.location.href = "carrito.html");
    if (btnCabello) btnCabello.addEventListener("click", () => window.location.href = "cabello.html");
    if (btnModa) btnModa.addEventListener("click", () => window.location.href = "moda.html");

    // ================== PRODUCTOS ==================
    let contenedor = document.getElementById("contenedor-productos") ||
        document.querySelector(".contenedor-productos");

    if (!contenedor) return; // Evita error en páginas sin productos

    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            const filtrados = data.filter(prod =>
                prod.category !== "electronics"
            );
            mostrarProductos(filtrados);
            activarBotonesCarrito(filtrados);
        });

    function mostrarProductos(lista) {
        contenedor.innerHTML = "";
        lista.forEach(producto => {
            contenedor.innerHTML += `
                <div class="producto-card">
                    <img src="${producto.image}">
                    <p class="nombre">${escapeHtml(producto.title)}</p>
                    <p class="precio">$${producto.price}</p>
                    <button class="btn-categoria btn-agregar" data-id="${producto.id}">
                        Agregar al carrito
                    </button>
                </div>
            `;
        });
    }

    function activarBotonesCarrito(dataProductos) {
        const botones = document.querySelectorAll(".btn-agregar");

        botones.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idProducto = e.target.getAttribute("data-id");
                const productoSeleccionado = dataProductos.find(p => p.id == idProducto);

                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                carrito.push(productoSeleccionado);
                localStorage.setItem("carrito", JSON.stringify(carrito));

                alert("✅ Producto agregado al carrito");
            });
        });
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

});
