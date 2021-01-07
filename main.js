//config
body.style.height = visualViewport.height + "px";
body.style.width = visualViewport.width + "px";
let intval;
let clap = new Audio();
let gunsfx = new Audio();
let maxMiss = 1;
let maxEnemy = 10;
let timeInterval = firstLevel = 1500;
let perfectScore = missScore = finish = audioExpire = 0;
let backgroundX = mouseX = 0;

///////////
// perfectScore = 98;
///////////
let perfectHolder = document.getElementsByClassName("perfect")[0];
window.addEventListener("keyup", () => { clearInterval(intval) })

const configGun = e => {
    let x = e.clientX;
    let y = e.clientY;
    gun.style.top = y + 'px';
    gun.style.left = x - 233 + 'px';

    backgroundX = x > mouseX ? backgroundX + 2 : backgroundX - 2;
    mouseX = x;
    document.body.style.backgroundPositionX = backgroundX + "px";
    console.log();
}
const score = event => {
    if (finish) return;
    let targetName = event.target.tagName;
    if (targetName === "SPAN")
        perfect.innerText = ++perfectScore;
    else if (targetName === "DIV")
        miss.innerText = ++missScore;
    switch (perfectScore) {
        case 2:
            if (audioExpire == 2) break;
            clapForUser(2, "doublekill");
            break;
        case 10:
            if (audioExpire == 10) break;
            clapForUser(10, "godlike");
            break;
        case 20:
            if (audioExpire == 20) break;
            clapForUser(20, "perfect");
            break;
        case 30:
            if (audioExpire == 30) break;
            clapForUser(30, "headshot");
            break;
        case 50:
            if (audioExpire == 50) break;
            clapForUser(50, "impressive");
            break;
        case 75:
            if (audioExpire == 75) break;
            clapForUser(75, "headhunter", "wav");
            break;
        case 100:
            if (audioExpire == 100) break;
            clapForUser(100, "killingspree");
            break;
        case 150:
            if (audioExpire == 150) break;
            clapForUser(150, "holyshit");
            break;
        case 200:
            if (audioExpire == 200) break;
            clapForUser(200, "unstoppable");
            break;
    }
    if (missScore > maxMiss) return finishTheGame();
}
const clapForUser = (kill, audio, diffType = false) => {
    clearInterval(intval);
    timeInterval = firstLevel - (kill * 5);
    intval = setInterval(makeElement, timeInterval);
    audioExpire = kill;
    clap.src = `audio/${audio}.${!diffType ? "mp3" : diffType}`;
    gunsfx.volume = 0.2;
    clap.play();
    clapLog.innerText = audio;
    clapLog.style.display = "block";
    setTimeout(() => {
        gunsfx.volume = 1;
        clapLog.style.display = "none";
    }, 1500);
}
const finishTheGame = () => {
    finish = true;
    clearInterval(intval);
    perfectHolder.classList.add("big");
}
const makeElement = () => {
    if (document.getElementsByTagName("span").length > maxEnemy) return finishTheGame();
    let enemy = document.createElement("span");
    let top = random(visualViewport.height - 400);
    let left = random(visualViewport.width - 400);
    body.appendChild(enemy);
    enemy.style.top = top + "px";
    enemy.style.left = left + "px";
    enemy.style.backgroundImage = `url("images/enemy${random(4)}.png")`;
    enemy.onclick = function () {
        if (finish) return;
        gunsfx.src = 'audio/gun.wav';
        gunsfx.play();
        this.style.backgroundImage = `url('images/blood${random(6)}.png')`;
        setTimeout(() => {
            this.remove();
        }, 300);
    }
}
const makeEnemy = firstCountEnemey => {
    let rand = random(firstCountEnemey);
    while (rand) {
        makeElement();
        rand--;
    }
    intval = setInterval(makeElement, timeInterval);
}
const random = max => Math.floor(Math.random() * max);

const start = (custom = false) => {
    if(custom){
        maxMiss = +prompt("Enter life time");
        maxEnemy = +prompt("Enter max enemy");
    }
    else{
        maxMiss = 3;
        maxEnemy = 10;
    }
    makeEnemy();
}

start();