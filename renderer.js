document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('time');
    const notification = document.getElementById('notification');
    let timer;
    let totalSeconds = 300; // 5 минут по умолчанию
    
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
                showNotification('Яйца готовы!');
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
    
    // Воспроизвести звук (можно добавить позже)
    function playSound() {
        // Здесь можно добавить воспроизведение звука
        console.log('Звук!');
    }
    
    // Обработчики кнопок
    document.getElementById('soft').addEventListener('click', () => {
        totalSeconds = 3 * 60;
        updateTimeDisplay();
        startTimer();
    });
    
    document.getElementById('medium').addEventListener('click', () => {
        totalSeconds = 5 * 60;
        updateTimeDisplay();
        startTimer();
    });
    
    document.getElementById('hard').addEventListener('click', () => {
        totalSeconds = 7 * 60;
        updateTimeDisplay();
        startTimer();
    });
    
    document.getElementById('start-custom').addEventListener('click', () => {
        const minutes = parseInt(document.getElementById('minutes').value);
        totalSeconds = minutes * 60;
        updateTimeDisplay();
        startTimer();
    });
    
    document.getElementById('stop').addEventListener('click', () => {
        clearInterval(timer);
    });
    
    document.getElementById('reset').addEventListener('click', () => {
        clearInterval(timer);
        totalSeconds = 5 * 60;
        updateTimeDisplay();
    });
    
    // Инициализация
    updateTimeDisplay();
});