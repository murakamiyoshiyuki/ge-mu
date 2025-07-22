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
    resultMessageEl.innerHTML = ''; // メッセージをクリア
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

    resultMessageEl.innerHTML = ''; // Clear previous messages

    if (difference <= 0.01) {
        resultMessageEl.innerHTML = '凄い！<br>天才！<br>やばい！！';
        resultMessageEl.style.color = '#ff0';
        showSparkles();
    } else if (difference <= 0.20) {
        resultMessageEl.innerHTML = '<div class="scroll-text good-scroll">まあまあ、やるじゃん！！ちょっと見なおしたよ！</div>';
    } else {
        resultMessageEl.innerHTML = '<div class="scroll-text insult-scroll">うわっ、だせ～ｗｗｗｗ草生えるｗｗｗｗ</div>';
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