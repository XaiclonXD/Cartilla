let currentPage = 0;
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    updatePageDisplay();
    updatePageCounter();
    updateNavigationButtons();
});

function changePage(direction) {
    // Remover clase active de la página actual
    pages[currentPage].classList.remove('active');
    
    // Calcular nueva página
    const newPage = currentPage + direction;
    
    // Verificar límites
    if (newPage < 0 || newPage >= totalPages) {
        // Restaurar página actual si está fuera de límites
        pages[currentPage].classList.add('active');
        return;
    }
    
    // Actualizar página actual
    currentPage = newPage;
    
    // Mostrar nueva página
    updatePageDisplay();
    updatePageCounter();
    updateNavigationButtons();
}

function goToPage(index) {
    // Verificar que el índice sea válido
    if (index < 0 || index >= totalPages) {
        return;
    }
    
    // Remover clase active de la página actual
    pages[currentPage].classList.remove('active');
    
    // Actualizar página actual
    currentPage = index;
    
    // Mostrar nueva página
    updatePageDisplay();
    updatePageCounter();
    updateNavigationButtons();
}

function updatePageDisplay() {
    pages.forEach((page, index) => {
        page.classList.remove('active', 'prev', 'next');
        
        if (index === currentPage) {
            page.classList.add('active');
        } else if (index < currentPage) {
            page.classList.add('prev');
        } else {
            page.classList.add('next');
        }
    });
}

function updatePageCounter() {
    const currentPageElement = document.getElementById('current-page');
    const totalPagesElement = document.getElementById('total-pages');
    
    if (currentPageElement) {
        currentPageElement.textContent = currentPage + 1;
    }
    
    if (totalPagesElement) {
        totalPagesElement.textContent = totalPages;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages - 1;
    }
}

function toggleTheme() {
    const body = document.body;
    const label = document.getElementById('theme-label');
    
    body.classList.toggle('dark-mode');
    
    if (label) {
        label.textContent = body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
    }
}

// Navegación con teclado
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
            changePage(-1);
            break;
        case 'ArrowRight':
            changePage(1);
            break;
        case 'Home':
            goToPage(0);
            break;
        case 'End':
            goToPage(totalPages - 1);
            break;
    }
});

// Prevenir el comportamiento por defecto de los enlaces del índice
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.onclick) {
        event.preventDefault();
    }
});