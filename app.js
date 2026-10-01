const chat = document.getElementById('chat');
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Загрузка имени приложения
fetch('config.json')
    .then(r => r.json())
    .then(config => {
        if (config.Name) {
            document.getElementById('app-title').textContent = config.Name;
            document.title = config.Name;
        }
    })
    .catch(() => {});

function getTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + 
           now.getMinutes().toString().padStart(2, '0');
}

function addMessage(text, type) {
    const message = document.createElement('div');
    message.className = 'message ' + type;

    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const p = document.createElement('p');
    p.textContent = text;

    const time = document.createElement('span');
    time.className = 'time';
    time.textContent = getTime();

    bubble.appendChild(p);
    bubble.appendChild(time);
    message.appendChild(bubble);
    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'outgoing');
    input.value = '';

    if (navigator.vibrate) navigator.vibrate(20);

    // Ответ бота
    setTimeout(() => {
        const replies = [
            'Понял тебя! 👌',
            'Интересно!',
            'Расскажи подробнее',
            'Ха-ха 😄',
            'Согласен',
            'А что дальше?',
            'Круто! 🔥'
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        addMessage(randomReply, 'incoming');
        if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
    }, 800);
}

sendBtn.addEventListener('click', sendMessage);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Автопрокрутка вниз
chat.scrollTop = chat.scrollHeight;