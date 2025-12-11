// Función para mostrar la tarjeta bonita
function showNotify(titulo, mensaje, tipo = 'success') {
    // 1. Verificar si ya existe el elemento en el HTML, si no, crearlo
    let box = document.getElementById('custom-notification');
    if (!box) {
        box = document.createElement('div');
        box.id = 'custom-notification';
        document.body.appendChild(box);
    }

    // 2. Elegir icono
    const icon = tipo === 'success' ? '✨' : '❌';
    
    // 3. Aplicar estilos
    box.className = tipo === 'success' ? 'notify-success' : 'notify-error';

    // 4. Poner el contenido
    box.innerHTML = `
        <div class="notify-icon">${icon}</div>
        <div class="notify-title">${titulo}</div>
        <div class="notify-message">${mensaje}</div>
    `;

    // 5. Mostrar con animación
    setTimeout(() => box.classList.add('active'), 10);

    // 6. Ocultar después de 3 segundos
    setTimeout(() => box.classList.remove('active'), 3000);
}