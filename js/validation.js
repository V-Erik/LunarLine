document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE PEDIDOS (Solo para pedidos.html) ---
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        // Lógica visual del formulario de pedidos (Precios, Tiempos, etc.)
        const tipoArteSelect = document.getElementById('tipoArte');
        const summaryTime = document.getElementById('summaryTime');
        const summaryPrice = document.getElementById('summaryPrice');
        const summaryShipping = document.getElementById('summaryShipping');

        tipoArteSelect.addEventListener('change', () => {
            const valor = tipoArteSelect.value;
            if (valor === 'carboncillo') {
                summaryTime.textContent = '1-2 Semanas';
                summaryPrice.textContent = '$45 - $80';
                summaryShipping.textContent = 'Físico (Global)';
            } else if (valor === 'lienzo') {
                summaryTime.textContent = '3-4 Semanas';
                summaryPrice.textContent = '$120 - $300';
                summaryShipping.textContent = 'Físico (Caja madera)';
            } else if (valor === 'digital') {
                summaryTime.textContent = '3-5 Días';
                summaryPrice.textContent = '$30 - $60';
                summaryShipping.textContent = 'Email / Nube';
            }
        });

        // ENVÍO DE PEDIDO (Con EmailJS)
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = orderForm.querySelector('button');
            const descripcion = document.getElementById('descripcion').value;

            // Validación de longitud
            if (descripcion.length < 10) {
                alert("Por favor, escribe una descripción más detallada.");
                return;
            }

            btn.textContent = "Enviando...";
            
            // Reemplaza con tus datos de EmailJS
            const templateParams = {
                tipo: tipoArteSelect.value,
                tamano: document.getElementById('tamano').value,
                descripcion: descripcion
            };

            // Asegúrate de tener emailjs configurado en el head de pedidos.html
            if (typeof emailjs !== 'undefined') {
                emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams)
                    .then(() => {
                        alert('✅ ¡Pedido enviado con éxito! Te contactaremos pronto.');
                        orderForm.reset();
                        btn.textContent = "Enviar Solicitud";
                    }, (err) => {
                        alert('❌ Error: ' + JSON.stringify(err));
                        btn.textContent = "Enviar Solicitud";
                    });
            } else {
                alert("Falta configurar EmailJS en el HTML");
                btn.textContent = "Enviar Solicitud";
            }
        });
    }
});

// --- FUNCIÓN EXTRA: Validar formato de correo real (Regex) ---
function esCorreoValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}