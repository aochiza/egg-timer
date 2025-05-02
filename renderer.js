// Навигация между страницами
document.addEventListener('DOMContentLoaded', () => {
    // ==================== Стартовая страница (index.html) ====================
    if (document.getElementById('start-btn')) {
        document.getElementById('start-btn').addEventListener('click', () => {
            window.location.href = 'select.html';
        });
    }
        
    // ==================== Страница выбора продукта (select.html) ====================
    if (document.querySelector('.food-options')) {
        const foodButtons = document.querySelectorAll('.food-options button');
        foodButtons.forEach(button => {
            button.addEventListener('click', () => {
                const foodName = button.textContent;
                
                // Для яйца - переход на страницу выбора типа
                if (button.dataset.food === 'egg') {
                    window.location.href = 'egg-type.html';
                } 
                // Для других продуктов - сразу на таймер
                else {
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

    // ==================== Страница выбора типа яйца (egg-type.html) ====================
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

        // Назад к выбору продукта
        document.getElementById('back-to-select').addEventListener('click', () => {
            window.location.href = 'select.html';
        });
    }

    // ==================== Страница таймера (timer.html) ====================
    if (document.getElementById('time')) {
        const timeDisplay = document.getElementById('time');
        const notification = document.getElementById('notification');
        const foodNameElement = document.getElementById('food-name');
        let timer;
        
        // Получаем выбранный продукт и время
        const selectedFood = localStorage.getItem('selectedFood');
        const cookingTime = parseInt(localStorage.getItem('cookingTime')) || 300;
        
        let totalSeconds = cookingTime;
        foodNameElement.textContent = selectedFood;

        // Обновление отображения времени
        function updateTimeDisplay() {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // Запуск таймера
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

        // Показать уведомление
        function showNotification(message) {
            notification.textContent = message;
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
        }

        // Воспроизвести звук
        function playSound() {
            const audio = new Audio(); // Добавьте путь к звуковому файлу
            audio.play().catch(e => console.log('Не удалось воспроизвести звук:', e));
        }

        // Автозапуск таймера при загрузке страницы
        startTimer();

        // Обработчики кнопок
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

        // Инициализация
        updateTimeDisplay();
    }
});