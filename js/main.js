document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE FILTROS DE GALERÍA ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if(filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // --- DETECTAR ENLACE DESDE INICIO (HASH) ---
        const currentHash = window.location.hash.substring(1);
        if (currentHash) {
            const targetBtn = document.querySelector(`.filter-btn[data-filter="${currentHash}"]`);
            if (targetBtn) {
                setTimeout(() => targetBtn.click(), 100);
            }
        }
    }
});