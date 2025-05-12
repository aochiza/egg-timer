/**
 * @module TimerApp
 * @description Основной модуль приложения для управления таймером приготовления пищи.
 * Обрабатывает навигацию между страницами и управление таймером.
 */

/**
 * Обработчик события загрузки DOM.
 * Инициализирует функционал в зависимости от текущей страницы.
 * @event DOMContentLoaded
 * @listens document
 */
document.addEventListener('DOMContentLoaded', () => {
    /**
     * Обработчик для стартовой страницы (index.html)
     * @function
     * @inner
     */
    if (document.getElementById('start-btn')) {
        document.getElementById('start-btn').addEventListener('click', () => {
            window.location.href = 'select.html';
        });
    }
        
    /**
     * Обработчик для страницы выбора продукта (select.html)
     * @function
     * @inner
     */
    if (document.querySelector('.food-options')) {
        const foodButtons = document.querySelectorAll('.food-options button');
        foodButtons.forEach(button => {
            button.addEventListener('click', () => {
                const foodName = button.textContent;
                
                if (button.dataset.food === 'egg') {
                    window.location.href = 'egg-type.html';
                } else {
                    const cookingTime = button.dataset.time;
                    localStorage.setItem('selectedFood', foodName);
                    localStorage.setItem('cookingTime', cookingTime);
                    window.location.href = 'timer.html';
                }
            });
        });

        if (document.getElementById('back-btn')) {
            document.getElementById('back-btn').addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }

    /**
     * Обработчик для страницы выбора типа яйца (egg-type.html)
     * @function
     * @inner
     */
    if (document.querySelector('.egg-options')) {
        const eggButtons = document.querySelectorAll('.egg-options button[data-time]');
        
        eggButtons.forEach(button => {
            button.addEventListener('click', () => {
                const time = button.dataset.time;
                localStorage.setItem('cookingTime', time);
                localStorage.setItem('selectedFood', button.textContent.trim());
                window.location.href = 'timer.html';
            });
        });

        document.getElementById('back-to-select').addEventListener('click', () => {
            window.location.href = 'select.html';
        });
    }

    /**
     * Обработчик для страницы таймера (timer.html)
     * @function
     * @inner
     */
    if (document.getElementById('time')) {
        const timeDisplay = document.getElementById('time');
        const notification = document.getElementById('notification');
        const foodNameElement = document.getElementById('food-name');
        let timer;
        
        const selectedFood = localStorage.getItem('selectedFood');
        const cookingTime = parseInt(localStorage.getItem('cookingTime')) || 300;
        
        let totalSeconds = cookingTime;
        foodNameElement.textContent = selectedFood;

        /**
         * Обновляет отображение времени на странице
         * @function updateTimeDisplay
         * @inner
         */
        function updateTimeDisplay() {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        /**
         * Запускает таймер обратного отсчета
         * @function startTimer
         * @inner
         */
        function startTimer() {
            clearInterval(timer);
            timer = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTimeDisplay();
                } else {
                    clearInterval(timer);
                    showNotification(`${selectedFood} ready!`);
                    playSound();
                }
            }, 1000);
        }

        /**
         * Показывает уведомление
         * @function showNotification
         * @param {string} message - Текст уведомления
         * @inner
         */
        function showNotification(message) {
            notification.textContent = message;
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
        }

        /**
         * Воспроизводит звуковое уведомление
         * @function playSound
         * @inner
         */
        function playSound() {
            const audio = new Audio();
            audio.play().catch(e => console.log('Не удалось воспроизвести звук:', e));
        }

        startTimer();

        document.getElementById('stop').addEventListener('click', () => {
            clearInterval(timer);
        });

        document.getElementById('reset').addEventListener('click', () => {
            clearInterval(timer);
            totalSeconds = cookingTime;
            updateTimeDisplay();
            startTimer();
        });

        document.getElementById('back-to-select').addEventListener('click', () => {
            window.location.href = 'select.html';
        });

        updateTimeDisplay();
    }
});