document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-login");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();

        if (email === "") {
            alert("Ingrese un correo válido");
            return;
        }

        localStorage.setItem("usuario", JSON.stringify({
            logueado: true,
            email: email
        }));

        alert("✅ Inicio de sesión exitoso");
        window.location.href = "index.html";
    });
});
