export class SemanticSearch {
    constructor(containerId, searchInputId) {
        this.container = document.getElementById(containerId);
        this.searchInput = document.getElementById(searchInputId);
        this.matchedElements = [];
        this.currentIndex = -1;
        
        if (this.searchInput) {
            // Поиск при вводе
            this.searchInput.addEventListener('input', () => this.search());
            
            // Обработка клавиш клавиатуры
            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.search();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.next();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.prev();
                }
            });
        }
    }
    
    search() {
        const query = this.searchInput?.value.trim().toLowerCase();
        
        // Снимаем подсветку со всех элементов
        this.removeHighlights();
        this.matchedElements = [];
        this.currentIndex = -1;
        
        if (!query) {
            this.hideCounter();
            return;
        }
        
        // Ищем все program-item
        const items = this.container?.querySelectorAll('.program-item');
        if (!items?.length) return;
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                this.matchedElements.push(item);
            }
        });
        
        if (this.matchedElements.length > 0) {
            this.currentIndex = 0;
            this.highlightCurrent();
            this.showCounter();
        } else {
            this.showNotFound();
        }
    }
    
    highlightCurrent() {
        this.removeHighlights();
        
        this.matchedElements.forEach((el, idx) => {
            if (idx === this.currentIndex) {
                el.style.transition = 'all 0.3s';
                el.style.backgroundColor = '#fff3cd';
                el.style.border = '2px solid #ffc107';
                el.style.borderRadius = '8px';
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    removeHighlights() {
        this.matchedElements.forEach(el => {
            el.style.backgroundColor = '';
            el.style.border = '';
        });
    }
    
    next() {
        if (this.matchedElements.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.matchedElements.length;
        this.highlightCurrent();
        this.showCounter();
    }
    
    prev() {
        if (this.matchedElements.length === 0) return;
        this.currentIndex = (this.currentIndex - 1 + this.matchedElements.length) % this.matchedElements.length;
        this.highlightCurrent();
        this.showCounter();
    }
    
    showCounter() {
        let counter = document.getElementById('searchCounter');
        if (!counter) {
            counter = document.createElement('div');
            counter.id = 'searchCounter';
            counter.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #333;
                color: white;
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 14px;
                z-index: 9999;
                font-family: Arial, sans-serif;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(counter);
        }
        counter.textContent = `${this.currentIndex + 1} / ${this.matchedElements.length}`;
        counter.style.display = 'block';
        
        if (this.counterTimeout) clearTimeout(this.counterTimeout);
        this.counterTimeout = setTimeout(() => {
            if (counter) counter.style.display = 'none';
        }, 2000);
    }
    
    hideCounter() {
        const counter = document.getElementById('searchCounter');
        if (counter) counter.style.display = 'none';
    }
    
    showNotFound() {
        const msg = document.createElement('div');
        msg.textContent = '🔍 Ничего не найдено';
        msg.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 9999;
            font-family: Arial, sans-serif;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 2000);
    }
    
    updateContainer(containerId) {
        this.container = document.getElementById(containerId);
        this.matchedElements = [];
        this.currentIndex = -1;
        this.removeHighlights();
        this.hideCounter();
    }
}