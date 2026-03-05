// theme-detector.js
(function() {
    'use strict';
    
    function getPreferredTheme() {
        // 1. Проверяем localStorage (ручной выбор пользователя)
        const saved = localStorage.getItem('userTheme');
        if (saved) {
            console.log('Используем сохранённую тему:', saved);
            return saved;
        }
        
        // 2. Системная тема (приоритет)
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        if (mql.matches !== undefined) {
            const systemTheme = mql.matches ? 'dark' : 'light';
            console.log('Системная тема:', systemTheme);
            return systemTheme;
        }
        
        // 3. Время суток (fallback)
        const hour = new Date().getHours();
        const timeTheme = (hour >= 20 || hour < 7) ? 'dark' : 'light';
        console.log('Тема по времени (', hour, 'ч):', timeTheme);
        return timeTheme;
    }
    
    // Применяем тему к body
    function applyTheme(theme) {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(theme);
        console.log('Применена тема:', theme);
    }
    
    // Сохраняем в глобальную переменную для основного HTML
    window.getTheme = getPreferredTheme;
    window.applyTheme = applyTheme;
    
    // Автоматически применяем при загрузке
    window.addEventListener('load', () => {
        const theme = getPreferredTheme();
        applyTheme(theme);
    });
    
})();
