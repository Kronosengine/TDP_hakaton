        const burger = document.getElementById('burgerBtn');
        const navMenu = document.getElementById('navMenu');
        burger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            burger.classList.toggle('active');
        });