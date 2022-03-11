let buttonsEl = document.getElementById("buttons");
let playBtn = document.getElementById("play-btn");
let playerCardsEl = document.getElementById("playerCards-el");
let dealerCardsEl = document.getElementById("dealerCards-el");
let playerTotalEl = document.getElementById("playerTotal-el");
let dealerTotalEl = document.getElementById("dealerTotal-el");
let messaageEl = document.getElementById("message-el");
let playerNameEl = document.getElementById("playerName");

playerCardsEl.style.display = "none";
dealerCardsEl.style.display = "none";
playerTotalEl.style.display = "none";
dealerTotalEl.style.display = "none";

const dealerLimit = 17;
const blackjack = 21;

playerNameEl.innerText = localStorage.getItem("blackjackusername");

playBtn.addEventListener("click", function() {

    playerCardsEl.style.display = "block";
    dealerCardsEl.style.display = "block";
    playerTotalEl.style.display = "block";
    dealerTotalEl.style.display = "block";

    let cards = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10
    ];
    
    let playerCards = [];
    let dealerCards = [];
    let sum = 0;
    
    function draw(card) {
        let random = cards[ Math.floor( Math.random() * cards.length ) ];
        if (random === 1) {
            if (get(card) + random <= blackjack) {
                random = 11;
            } else {
                random = 1;
            }
        }
        card.push(random);
    }
    
    draw(playerCards), draw(playerCards);
    draw(dealerCards), draw(dealerCards);
    
    let playerHand = `Player Hand: ${playerCards} `;
    let dealerHand = `Dealer Hand: ${ dealerCards[0] }`;
    
    playerCardsEl.innerText = playerHand;
    dealerCardsEl.innerText = dealerHand;
    
    function get(total) {
        sum = 0;
        for(let i = 0; i < total.length; i++) {
            sum += total[i];
        }
        return sum;
    }
    
    messaageEl.innerText = "Game Started!";

    let dealerTotal = `Dealer Total: ${ dealerCards[0] }`;
    let playerTotal = `Player Total: ${ get(playerCards) }`;

    playerCardsEl.innerText = playerHand;
    dealerCardsEl.innerText = dealerHand;

    playerTotalEl.innerText = playerTotal;
    dealerTotalEl.innerText = dealerTotal;

    if (get(playerCards) < blackjack) {

        buttonsEl.innerHTML = `
        <button id="hit" >HIT</button> 
        <button id="stand" >STAND</button> 
        `
        let hitEl = document.getElementById("hit");
        let standEl = document.getElementById("stand");

        function buttonsChange() {
            buttonsEl.innerHTML = `
            <form action="started.html" >
                <button id="start" >NEW GAME</button>
            </form>
            `
        }

        hitEl.addEventListener("click", function() {

            if (get(playerCards) < blackjack) {

                messaageEl.innerText = "You are Still in the Game!";

                draw(playerCards);
                get(playerCards);

                playerTotal = `Player Total: ${ get(playerCards) }`;
                playerHand = `Player Hand: ${playerCards} `;

                playerCardsEl.innerText = playerHand;
                playerTotalEl.innerText = playerTotal; 

                if (get(playerCards) > blackjack) {
                    let checkBurst = playerCards.findIndex(element => element === 11);
                    playerCards[checkBurst] = 1;
                    playerTotal = `Player Total: ${ get(playerCards) }`;
                    playerHand = `Player Hand: ${playerCards} `;
                    if (get(playerCards) <= blackjack ) {
                        playerCardsEl.innerText = playerHand;
                        playerTotalEl.innerText = playerTotal;
                    } else {
                        playerCardsEl.innerText = playerHand;
                        playerTotalEl.innerText = playerTotal; 
                        messaageEl.innerText = `You Burst
                        You lost!`;
                        buttonsChange();
                    }
                } else if (get(playerCards) === blackjack) {
                    playerTotalEl.innerText = playerTotal;
                    messaageEl.innerText = "You are safe!";
                    buttonsEl.innerHTML = `
                    <button id="result" >RESULTS</button>
                    `
                    let resultEl = document.getElementById("result");
    
                    resultEl.addEventListener("click", function() {
                        for (let i = 0; i < dealerCards.length; i++) {
                            dealerHand = `Player Hand: ${dealerCards} `;
                            dealerTotal = `Player Total: ${ get(dealerCards) }`;

                            dealerCardsEl.innerText = dealerHand;
                            dealerTotalEl.innerText = dealerTotal;

                            if (get(dealerCards) < dealerLimit) {
                                draw(dealerCards);
                                dealerHand = `Player Hand: ${dealerCards} `;
                                dealerTotal = `Player Total: ${ get(dealerCards) }`;
                                dealerCardsEl.innerText = playerHand;
                                dealerTotalEl.innerText = playerTotal;

                                if (get(dealerCards) > dealerLimit && get(dealerCards) < get(playerCards) ) {
                                    dealerTotalEl.innerText = dealerTotal;
                                    messaageEl.innerText = "You won!";
                                    buttonsChange();
                                    break;
                                } else if (get(dealerCards) >= dealerLimit && get(dealerCards) > get(playerCards)) {
                                    if (get(dealerCards) <= blackjack) {
                                        dealerTotalEl.innerText = dealerTotal;
                                        messaageEl.innerText = "You lost!";
                                        buttonsChange();
                                        break;
                                    } else {
                                        let checkBurst = playerCards.findIndex(element => element === 11);
                                        playerCards[checkBurst] = 1;
                                        if (get(dealerCards) > blackjack) {
                                            let checkBurst = playerCards.findIndex(element => element === 11);
                                            playerCards[checkBurst] = 1;
                                            if (get(dealerCards) > blackjack) {
                                                dealerCardsEl.innerText = dealerHand;
                                                dealerTotalEl.innerText = dealerTotal;
                                                messaageEl.innerText = `Dealer Burst
                                                You won!`;
                                                buttonsChange();
                                                break;
                                            }
                                        }
                                    }

                                } else {
                                    dealerHand = `Player Hand: ${dealerCards} `;
                                    dealerTotal = `Player Total: ${ get(dealerCards) }`;
                                    dealerCardsEl.innerText = dealerHand;
                                    dealerTotalEl.innerText = dealerTotal;
                                    messaageEl.innerText = "TIE";
                                    buttonsChange();
                                    break;
                                }

                            } else if (get(dealerCards) >= dealerLimit && get(dealerCards) > get(playerCards) ) {
                                dealerHand = `Player Hand: ${dealerCards} `;
                                dealerTotal = `Player Total: ${ get(dealerCards) }`;
                                if (get(dealerCards) <= blackjack) {   
                                    dealerCardsEl.innerText = dealerHand;
                                    dealerTotalEl.innerText = dealerTotal;
                                    messaageEl.innerText = "You lost!";
                                    buttonsChange();
                                    break;
                                } else {
                                    let checkBurst = dealerCards.findIndex(element => element === 11);
                                    dealerCards[checkBurst] = 1;
                                    if (get(dealerCards) > blackjack) {
                                        dealerCardsEl.innerText = dealerHand;
                                        dealerTotalEl.innerText = dealerTotal;
                                        messaageEl.innerText = `Dealer Burst
                                        You won!`;
                                        buttonsChange();
                                        break;
                                    }
                                }
                            } else if (get(dealerCards) === get(playerCards) ) {
                                dealerTotalEl.innerText = dealerTotal;
                                messaageEl.innerText = "TIE";
                                buttonsChange();
                                break;
                            } else if (get(dealerCards) >= dealerLimit && get(dealerCards) < get(playerCards) ) {
                                dealerTotalEl.innerText = dealerTotal;
                                messaageEl.innerText = "You won!";
                                buttonsChange();
                                break;
                            }
                        }   
                    })
                }    
            }
        })

        standEl.addEventListener("click", function() {

            for (let i = 0; i < dealerCards.length; i++) {

                dealerTotal = `Dealer Total: ${ get(dealerCards) }`;
                dealerHand = `Dealer Hand: ${dealerCards}`;

                dealerCardsEl.innerText = dealerHand;
                dealerTotalEl.innerText = dealerTotal;
    
                if (get(dealerCards) < dealerLimit) {
                    draw(dealerCards);
                    dealerTotal = `Dealer Total: ${ get(dealerCards) }`;
                    dealerHand = `Dealer Hand: ${dealerCards}`;
                    dealerTotalEl.innerText = dealerTotal;
                    dealerCardsEl.innerText = dealerHand;

                    if (get(dealerCards) >= dealerLimit && get(dealerCards) < get(playerCards) ) {
                        dealerTotalEl.innerText = dealerTotal;
                        messaageEl.innerText = "You won!";
                        buttonsChange();
                        break;
                    } else if (get(dealerCards) >= dealerLimit && get(dealerCards) > get(playerCards)) {
                        if (get(dealerCards) <= blackjack) {
                            dealerTotalEl.innerText = dealerTotal;
                            messaageEl.innerText = "You lost!";
                            buttonsChange();
                            break;
                        } else {
                            let checkBurst = dealerCards.findIndex(element => element === 11);
                            dealerCards[checkBurst] = 1;
                            if (get(dealerCards) > blackjack) {
                                dealerCardsEl.innerText = dealerHand;
                                dealerTotalEl.innerText = dealerTotal;
                                messaageEl.innerText = `Dealer Burst
                                You won!`;
                                buttonsChange();
                                break;
                            }
                        }

                    } else if (get(dealerCards) >= dealerLimit && get(dealerCards) === get(playerCards) ) {
                        dealerCardsEl.innerText = dealerHand;
                        dealerTotalEl.innerText = dealerTotal;
                        messaageEl.innerText = "TIE";
                        buttonsChange();
                        break;
                    }

                } else if (get(dealerCards) >= dealerLimit && get(dealerCards) > get(playerCards) ) {
                    if (get(dealerCards) <= blackjack) {
                        dealerTotalEl.innerText = dealerTotal;
                        messaageEl.innerText = "You lost!";
                        buttonsChange();
                        break;
                    } else {
                        let checkBurst = dealerCards.findIndex(element => element === 11);
                        dealerCards[checkBurst] = 1;
                        if (get(dealerCards) > blackjack) {
                            dealerCardsEl.innerText = dealerHand;
                            dealerTotalEl.innerText = dealerTotal;
                            messaageEl.innerText = `Dealer Burst
                            You won!`;
                            buttonsChange();
                            break;
                        }
                    }
                } else if (get(dealerCards) === get(playerCards) ) {
                    dealerCardsEl.innerText = dealerHand;
                    dealerTotalEl.innerText = dealerTotal;
                    messaageEl.innerText = "TIE";
                    buttonsChange();
                    break;
                } else if (get(dealerCards) >= dealerLimit && get(dealerCards) < get(playerCards) ) {
                    dealerTotalEl.innerText = dealerTotal;
                    messaageEl.innerText = "You won!";
                    buttonsChange();
                    break;
                }
            }   
        })
    } else if (get(playerCards) === blackjack) {

        playerTotal = `Player Total: ${ get(playerCards) }`;
        playerHand = `Player Hand: ${playerCards} `;

        playerCardsEl.innerText = playerHand;
        playerTotalEl.innerText = playerTotal;
        messaageEl.innerText = "BLACKJACK";
        buttonsEl.innerHTML = `
        <form action="started.html" >
            <button id="start" >NEW GAME</button>
        </form>
        `;
    }
})