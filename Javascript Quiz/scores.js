// sets a const to the element scoresDiv in our highscores HTML
const scoresDiv = document.getElementById("scoresDiv");
// pulls our scores object from localStorage with JSON
var prevScores = JSON.parse(window.localStorage.getItem('scores')) || [];
// runs a for loop that displays our scores object by pushing a div to HTML with .innerHTML
for (var i = 0; i < prevScores.length; i++){
    var currScore = prevScores[i];

    scoresDiv.innerHTML += `
    <div class="individualScore">
        <p>${i+1}. ${currScore.name}</p>
        <p><b>Score:</b> ${currScore.score}</p>
    </div>
    `
}

