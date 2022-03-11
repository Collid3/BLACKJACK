let blackjackusername = document.getElementById("username");
let startGame = document.getElementById("startGame");

blackjackusername.addEventListener("input", function() {
    if (blackjackusername.value.length !== '') {
        blackjackusername.setAttribute("autocomplete", "'on'");
    }
})

startGame.addEventListener("click", function() {
    if (blackjackusername.value.length < 1){
        alert("Enter a username")
        event.preventDefault();
    } else {
        localStorage.setItem("blackjackusername", blackjackusername.value)
    }
})
