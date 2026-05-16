// ====== 1. СКВОЗНАЯ СИНХРОНИЗАЦИЯ И СОХРАНЕНИЕ ТЕМЫ ======
function initThemeEngine() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('dark');
        themeToggle.checked = false;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ====== 2. ГЛОБАЛЬНЫЙ АДАПТИВ СТРОКИ ПОИСКА В ХЕДЕРЕ ======
function relocateSearch() {
    const searchElement = document.querySelector('.search');
    const topRow = document.querySelector('.header-top-row');
    const bottomRow = document.querySelector('.header-bottom-row');

    if (!searchElement || !topRow || !bottomRow) return;

    if (window.innerWidth <= 900) {
        if (searchElement.parentElement !== bottomRow) {
            bottomRow.appendChild(searchElement);
        }
    } else {
        if (searchElement.parentElement !== topRow) {
            const aiBtn = document.querySelector('.ai-assistant-btn');
            if (aiBtn) {
                topRow.insertBefore(searchElement, aiBtn);
            } else {
                topRow.appendChild(searchElement);
            }
        }
    }
}

// ====== 3. ИНТЕРАКТИВНОЕ РАЗВЕРТЫВАНИЕ КАРТОЧЕК КОРПУСОВ ======
function initUnikiAccordion() {
    const cards = document.querySelectorAll('.unic-card');

    cards.forEach(card => {
        const header = card.querySelector('.unic-header');
        const details = card.querySelector('.unic-details');

        header.addEventListener('click', () => {
            const isOpen = card.classList.contains('active');

            // Сначала закрываем все остальные открытые карточки (эффект аккордеона)
            cards.forEach(c => {
                c.classList.remove('active');
                c.querySelector('.unic-details').style.maxHeight = null;
            });

            // Если кликнутая карточка была закрыта — плавно открываем её
            if (!isOpen) {
                card.classList.add('active');
                // Вычисляем полную высоту контента внутри скрытого блока
                details.style.maxHeight = details.scrollHeight + "px";
            }
        });
    });
}

// ====== 4. ЕДИНАЯ ТОЧКА ЗАПУСКА ======
document.addEventListener('DOMContentLoaded', () => {
    initThemeEngine();      // Ставим тему сразу, чтобы избежать моргания
    initUnikiAccordion();  // Врубаем аккордеон для корпусов
    relocateSearch();       // Выстраиваем шапку под экран
});

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ТЕМА (ночной режим)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = localStorage.getItem('dark-theme') === 'true';
        if (themeToggle.checked) document.body.classList.add('dark');

        themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark', themeToggle.checked);
            localStorage.setItem('dark-theme', themeToggle.checked);
        });
    }

    // ==========================================
    // 2. БУРГЕР-МЕНЮ (выезд слева)
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const burgerOverlay = document.getElementById('burgerOverlay');

    function closeBurger() {
        if (menuToggle) menuToggle.checked = false;
        if (burgerOverlay) burgerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('change', function() {
            if (this.checked) {
                if (burgerOverlay) burgerOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                if (burgerOverlay) burgerOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (burgerOverlay) {
        burgerOverlay.addEventListener('click', closeBurger);
    }

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', closeBurger);
    });

    // ==========================================
    // 3. НАВБАР: КАРТЫ С МЕТКАМИ КГУ (Пункт 2)
    // ==========================================
    const btnMap = document.getElementById('btnMap');
    const mapModal = document.getElementById('mapModal');
    const mapClose = document.getElementById('mapClose');
    const mapFrame = document.getElementById('mapFrame');
    
    // Сюда мы подставим кастомную карту, когда пришлешь адреса корпусов!
    const yandexMapUrl = 'https://yandex.ru/map-widget/v1/?ll=40.9264%2C57.7679&z=13&l=map';

    if (btnMap && mapModal && mapClose && mapFrame) {
        btnMap.addEventListener('click', () => {
            mapFrame.src = yandexMapUrl;
            mapModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        function closeMap() {
            mapModal.classList.remove('active');
            mapFrame.src = '';
            document.body.style.overflow = '';
        }

        mapClose.addEventListener('click', closeMap);
        mapModal.addEventListener('click', (e) => {
            if (e.target === mapModal) closeMap();
        });
    }

    // ==========================================
    // 4. НАВБАР: СКРОЛЛ ВВЕРХ
    // ==========================================
    const btnScrollUp = document.getElementById('btnScrollUp');
    if (btnScrollUp) {
        btnScrollUp.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 5. НАВБАР: СКРОЛЛ ВНИЗ
    // ==========================================
    const btnScrollDown = document.getElementById('btnScrollDown');
    if (btnScrollDown) {
        btnScrollDown.addEventListener('click', () => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 6. НАВБАР: ИНФО-ПАНЕЛЬ
    // ==========================================
    const btnInfo = document.getElementById('btnInfo');
    const infoPanel = document.getElementById('infoPanel');
    const infoOverlay = document.getElementById('infoOverlay');
    const infoClose = document.getElementById('infoClose');

    function openInfo() {
        if (infoPanel) infoPanel.classList.add('active');
        if (infoOverlay) infoOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeInfo() {
        if (infoPanel) infoPanel.classList.remove('active');
        if (infoOverlay) infoOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (btnInfo) btnInfo.addEventListener('click', openInfo);
    if (infoClose) infoClose.addEventListener('click', closeInfo);
    if (infoOverlay) infoOverlay.addEventListener('click', closeInfo);

    // ==========================================
    // 7. ПОЧИНЕННЫЕ КВЕСТЫ: СВАЙПЫ (Пункт 1)
    // ==========================================
    const wrapper = document.getElementById('questsWrapper');
    const dots = document.querySelectorAll('.dot');

    if (wrapper && dots.length > 0) {
        let currentStage = 0;
        const totalStages = dots.length;

        function goToStage(index) {
            if (index < 0 || index >= totalStages) return;
            currentStage = index;
            wrapper.style.transform = `translateX(-${currentStage * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[currentStage].classList.add('active');
        }

        // Логика Touch-свайпов для телефонов
        let touchStartX = 0;
        let touchEndX = 0;

        wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        wrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50; // Чувствительность свайпа в пикселях
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    goToStage(currentStage + 1); // Свайп влево -> следующий слайд
                } else {
                    goToStage(currentStage - 1); // Свайп вправо -> предыдущий слайд
                }
            }
        }

        // Логика Drag-свайпов мышкой на ПК
        let isDragging = false;
        let mouseStartX = 0;

        wrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            mouseStartX = e.screenX;
        });

        wrapper.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const diff = mouseStartX - e.screenX;
            const dragThreshold = 50;

            if (Math.abs(diff) > dragThreshold) {
                if (diff > 0) goToStage(currentStage + 1);
                else goToStage(currentStage - 1);
            }
        });

        wrapper.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        // Навигация кнопками-точками
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToStage(parseInt(dot.dataset.dot) - 1);
            });
        });
    }

    // Сохранение состояния чекбоксов в квестах
    document.querySelectorAll('.quest-check').forEach((cb, i) => {
        const key = `quest-check-${i}`;
        cb.checked = localStorage.getItem(key) === 'true';
        cb.addEventListener('change', () => {
            localStorage.setItem(key, cb.checked);
        });
    });

    // ==========================================
    // 8. ESCAPE — закрыть всё активное
    // ==========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBurger();
            closeInfo();
            const mapModal = document.getElementById('mapModal');
            if (mapModal && mapModal.classList.contains('active')) {
                mapModal.classList.remove('active');
                const mapFrame = document.getElementById('mapFrame');
                if (mapFrame) mapFrame.src = '';
                document.body.style.overflow = '';
            }
        }
    });
});

window.addEventListener('resize', relocateSearch);