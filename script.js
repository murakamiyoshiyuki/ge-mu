const targetTimeEl = document.getElementById('target-time');
const stopwatchDisplayEl = document.getElementById('stopwatch-display');
const startStopBtn = document.getElementById('start-stop-btn');
const resultMessageEl = document.getElementById('result-message');
const bestRecordEl = document.getElementById('best-record');

let startTime;
let stopwatchInterval;
let targetTime;
let running = false;
let bestRecord = localStorage.getItem('bestRecord') || Infinity;

if (bestRecord !== Infinity) {
    bestRecordEl.textContent = parseFloat(bestRecord).toFixed(3);
}

function generateTargetTime() {
    targetTime = (Math.random() * 9 + 1).toFixed(2); // 1.00から9.99までのランダムな数
    targetTimeEl.textContent = targetTime;
}

function startStopwatch() {
    startTime = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 10);
    startStopBtn.textContent = 'ストップ';
    startStopBtn.classList.add('stop');
    resultMessageEl.textContent = '';
    running = true;
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
        resultMessageEl.textContent = 'Perfect!';
        resultMessageEl.style.color = '#ffc107';
    } else if (difference <= 0.05) {
        resultMessageEl.textContent = 'Great!';
        resultMessageEl.style.color = '#28a745';
    } else if (difference <= 0.1) {
        resultMessageEl.textContent = 'Good';
        resultMessageEl.style.color = '#17a2b8';
    } else {
        resultMessageEl.textContent = 'Miss...';
        resultMessageEl.style.color = '#dc3545';
    }

    if (difference < bestRecord) {
        bestRecord = difference;
        bestRecordEl.textContent = difference.toFixed(3);
        localStorage.setItem('bestRecord', bestRecord);
    }
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
