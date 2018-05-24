const cardsArrayConst = ["dallas.png", "dallas.png", "memphis.png", "memphis.png", "miami.png", "miami.png", "pacers.png", "pacers.png", "pistons.png", "pistons.png", "bulls.png", "bulls.png", "clippers.png", "clippers.png", "wolves.png", "wolves.png", "bucks.png", "bucks.png"];
let parentNode = document.querySelector(".wrapper");
let cardsArray = [];
let shirtNum = 0;
function setCardsArray(arr) {
    cardsArray = arr;
}
document.getElementById('start').addEventListener('click', function(e){
    let difficulty = lvlDif();
    shirtNum = pickShirt();
    setCardsArray(cardsArrayConst.slice(0,difficulty*2));
    console.log(cardsArray);
    shuffleCards(cardsArray);
    while(parentNode.firstChild){
        parentNode.removeChild(parentNode.firstChild);
    }

    let timer = document.createElement('div');
    timer.className = 'timer';
    parentNode.appendChild(timer);
    timer.innerHTML = "<form class=form name=MyForm>" +
        "        <input name=stopwatch readonly size=10 value='00:00:00.00'><br>" +
        "    </form>";

    let gameBoard = document.createElement('div');
    gameBoard.className = 'gameBoard';
    parentNode.appendChild(gameBoard);
    addCard(gameBoard, difficulty);

    handler.firstClick = false;
    handler.countCard = 0;
    handler.bool = false;
    let images = document.querySelectorAll('.card');
    for (let i = 0, image; image = images[i]; i++){
        image.onclick = handler;
    }
});



function addCard(gameBoard, difficulty) {
    let shirtsArray = ['./img/logoCards/logo-nba.png', './img/logoCards/logo-ball.png', './img/logoCards/logo-basket.png'];
    for (let i = 0; i < difficulty*2; i++) {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = "<div class='cardRet' id=" + cardsArray[i] + " style='visibility: hidden'><img src=" + "img/logoCards/" + cardsArray[i] + "></div>";
        card.style.background="url(" + shirtsArray[shirtNum] + ")";
        card.style.backgroundSize = "87px 200px";
        gameBoard.appendChild(card);
    }

}

function handler() {
    if(!handler.firstClick){
        StartStop();
        handler.firstClick=true
    }

    if(handler.bool){
        this.classList.add("card-open");

        handler.secondCard = this.querySelector(".cardRet").getAttribute("id");
        let imgInside = this.querySelector(".cardRet");
        imgInside.setAttribute("style", "visibility:revert");

        if(handler.firstCard === handler.secondCard){
            document.querySelector(".wrapper").style.pointerEvents = "none";
            setTimeout(()=>{
                document.querySelector(".wrapper").style.pointerEvents = "auto";
                handler.linkFirst.style.visibility = "hidden";
                this.style.visibility="hidden";
            },1200);
            handler.countCard++;
            if(handler.countCard===Math.floor(cardsArray.length/2)){
                StartStop();
                let score = document.MyForm.stopwatch.value;
                while(document.querySelector(".wrapper").firstChild){
                    document.querySelector(".wrapper").removeChild(document.querySelector(".wrapper").firstChild);
                }
                alert(score);
                document.querySelector(".wrapper").innerHTML = "<div class='congrats' ><p>Congratulation, you are win!!!<br> Your score is " + score + " sec</p></div>";
            }
        }else{
            document.querySelector(".wrapper").style.pointerEvents = "none";
            setTimeout(()=>{
                this.classList.remove("card-open");
                imgInside.setAttribute("style", "visibility:hidden");
                handler.linkFirst.classList.remove("card-open");
                handler.imgInside.setAttribute("style", "visibility:hidden");
                document.querySelector(".wrapper").style.pointerEvents = "auto";
            },800)
        }

        handler.bool=false;
        return;
    }
    if(!handler.bool){
        this.classList.add("card-open");
        console.log(this, 999999999)
        handler.linkFirst = this;
        handler.firstCard = this.querySelector(".cardRet").getAttribute("id");
        console.log(this.querySelector(".cardRet"), handler.firstCard, handler.bool);
        handler.imgInside = this.querySelector(".cardRet");
        handler.imgInside.setAttribute("style", "visibility:revert");
        handler.bool=true;
    }
}

function shuffleCards(cards) {
    cards.reverse();
    cards.map((card, i) =>{
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    });
    return cards;
}


function pickShirt() {
    let arDif=document.getElementsByName('shirt');
    for (let i=0; i<arDif.length; i++) {
        if (arDif[i].checked) {
            return i;
        }
    }
    return 0;
}

function lvlDif() {
    let countCards = [4,7,9];
    let arDif=document.getElementsByName('difficult');
    for (let i=0; i<arDif.length; i++) {
        if (arDif[i].checked) {
            return countCards[i];
        }
    }
    return 4;
}

//объявляем переменные
var base = 60;
var clocktimer,dateObj,dh,dm,ds,ms;
var readout='';
var h=1,m=1,tm=1,s=0,ts=0,ms=0,init=0;
//функция для очистки поля
function ClearClock() {
    clearTimeout(clocktimer);
    h=1;m=1;tm=1;s=0;ts=0;ms=0;
    init=0;
    readout='00:00:00.00';
    document.MyForm.stopwatch.value=readout;
}
//функция для старта секундомера
function StartTIME() {
    var cdateObj = new Date();
    var t = (cdateObj.getTime() - dateObj.getTime())-(s*1000);
    if (t>999) { s++; }
    if (s>=(m*base)) {
        ts=0;
        m++;
    } else {
        ts=parseInt((ms/100)+s);
        if(ts>=base) { ts=ts-((m-1)*base); }
    }
    if (m>(h*base)) {
        tm=1;
        h++;
    } else {
        tm=parseInt((ms/100)+m);
        if(tm>=base) { tm=tm-((h-1)*base); }
    }
    ms = Math.round(t/10);
    if (ms>99) {ms=0;}
    if (ms===0) {ms='00';}
    if (ms>0&&ms<=9) { ms = '0'+ms; }
    if (ts>0) { ds = ts; if (ts<10) { ds = '0'+ts; }} else { ds = '00'; }
    dm=tm-1;
    if (dm>0) { if (dm<10) { dm = '0'+dm; }} else { dm = '00'; }
    dh=h-1;
    if (dh>0) { if (dh<10) { dh = '0'+dh; }} else { dh = '00'; }
    readout = dh + ':' + dm + ':' + ds + '.' + ms;
    document.MyForm.stopwatch.value = readout;
    clocktimer = setTimeout("StartTIME()",1);
}
//Функция запуска и остановки
function StartStop() {
    if (init===0){
        ClearClock();
        dateObj = new Date();
        StartTIME();
        init=1;
    } else {
        clearTimeout(clocktimer);
        init=0;
    }
}