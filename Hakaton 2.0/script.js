document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('programContainer');
    const themeBtn = document.getElementById('theme-toggle');
    const burgerBtn = document.getElementById('burgerBtn');
    const sidebar = document.getElementById('sidebar');
    const aiBtn = document.getElementById('aiBtn');
    const aiWindow = document.getElementById('ai-window');
    const navMap = document.getElementById('navMap');
    const mapView = document.getElementById('map-view');

    // 1. ГЕНЕРАЦИЯ 171 КОНТЕЙНЕРА
    

    // 2. ТЕМА
    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.textContent = isDark ? '☀️' : '🌙';
    });

    // 3. БУРГЕР
    burgerBtn.addEventListener('click', () => sidebar.classList.toggle('active'));

    // 4. МОДАЛКИ (НЕЙРОНКА И КАРТА)
    aiBtn.addEventListener('click', () => aiWindow.classList.add('active'));
    document.getElementById('closeAiBtn').addEventListener('click', () => aiWindow.classList.remove('active'));

    navMap.addEventListener('click', () => mapView.classList.add('active'));
    document.getElementById('closeMapBtn').addEventListener('click', () => mapView.classList.remove('active'));

    // 5. НАВИГАЦИЯ (BOTTOM NAV)
    document.getElementById('navUp').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.getElementById('navDown').addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    document.getElementById('navHome').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Сброс фильтров или перезагрузка при желании
    });

    document.getElementById('navInfo').addEventListener('click', () => {
        alert("Портал КГУ 2.0\nВыбрано программ: 171\nAI-ассистент: Активен");
    });

    // Закрытие бургер-меню при клике по ссылке или вне
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !burgerBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
});