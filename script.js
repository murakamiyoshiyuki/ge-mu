const targetTimeEl = document.getElementById('target-time');
const stopwatchDisplayEl = document.getElementById('stopwatch-display');
const startStopBtn = document.getElementById('start-stop-btn');
const resultMessageEl = document.getElementById('result-message');
const bestRecordEl = document.getElementById('best-record');
const animationContainer = document.getElementById('animation-container');

let startTime;
let stopwatchInterval;
let targetTime;
let running = false;
let bestRecord = localStorage.getItem('bestRecord') || Infinity;

if (bestRecord !== Infinity) {
    bestRecordEl.textContent = parseFloat(bestRecord).toFixed(3);
}

function generateTargetTime() {
    targetTime = (Math.random() * 2 + 1).toFixed(2); // 1.00から3.00までのランダムな数
    targetTimeEl.textContent = targetTime;
}

function startStopwatch() {
    startTime = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 10);
    startStopBtn.textContent = 'ストップ';
    startStopBtn.classList.add('stop');
    resultMessageEl.textContent = '';
    running = true;
    clearAnimation();
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    const elapsedTime = (Date.now() - startTime) / 1000;
    stopwatchDisplayEl.textContent = elapsedTime.toFixed(3);
    startStopBtn.textContent = 'リトライ';
    startStopBtn.classList.remove('stop');
    running = false;
    checkResult(elapsedTime);
}

function updateStopwatch() {
    const elapsedTime = (Date.now() - startTime) / 1000;
    stopwatchDisplayEl.textContent = elapsedTime.toFixed(3);
}

function checkResult(elapsedTime) {
    const target = parseFloat(targetTime);
    const difference = Math.abs(elapsedTime - target);

    if (difference <= 0.01) {
        resultMessageEl.innerHTML = '凄い！<br>天才！<br>やばい！！';
        resultMessageEl.style.color = '#ff0';
        showSparkles();
    } else if (difference <= 10) {
        resultMessageEl.innerHTML = 'まあまあ、<br>やるじゃん！！<br>ちょっと見なおしたよ！';
        resultMessageEl.style.color = '#0f0';
        showFireworks();
    } else {
        resultMessageEl.innerHTML = 'うわっ、<br>だせ～ｗｗｗｗ<br>草生えるｗｗｗｗ';
        resultMessageEl.style.color = '#f00';
        showInsults();
    }

    if (difference < bestRecord) {
        bestRecord = difference;
        bestRecordEl.textContent = difference.toFixed(3);
        localStorage.setItem('bestRecord', bestRecord);
    }
}

function showSparkles() {
    const compliments = ['凄い！', '天才！', 'やばい！！', '神！', '最高！', 'パーフェクト！'];
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = compliments[Math.floor(Math.random() * compliments.length)];
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;
        sparkle.style.fontSize = `${Math.random() * 20 + 10}px`;
        animationContainer.appendChild(sparkle);
    }
}

function showFireworks() {
    for (let i = 0; i < 30; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${Math.random() * 100}vw`;
        firework.style.top = `${Math.random() * 100}vh`;
        firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        animationContainer.appendChild(firework);
    }
}

function showInsults() {
    for (let i = 0; i < 50; i++) {
        const insult = document.createElement('div');
        insult.className = 'insult';
        insult.textContent = 'だせ～w';
        insult.style.left = `${Math.random() * 100}vw`;
        insult.style.top = `${-Math.random() * 100}px`; // Start from top
        insult.style.animationDuration = `${Math.random() * 2 + 1}s`;
        animationContainer.appendChild(insult);
    }
}

function clearAnimation() {
    animationContainer.innerHTML = '';
}

startStopBtn.addEventListener('click', () => {
    if (running) {
        stopStopwatch();
    } else {
        if (startStopBtn.textContent === 'リトライ') {
            generateTargetTime();
            stopwatchDisplayEl.textContent = '0.000';
        }
        startStopwatch();
    }
});

generateTargetTime();