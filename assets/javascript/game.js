// Original 151 pokemon - minus Farfetch'd and Mr. Mime because of the weird characters
var wordBank = ["bulbasaur","ivysaur","venusaur","charmander","charmeleon",
"charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree",
"weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate",
"spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash",
"nidorina","nidoqueen","nidoran","nidorino","nidoking","clefairy",
"clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat",
"oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett",
"dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe",
"arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop",
"machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel",
"geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite",
"magneton","doduo","dodrio","seel","dewgong","grimer","muk","shellder",
"cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler",
"voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan",
"lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan",
"horsea","seadra","goldeen","seaking","staryu","starmie","scyther","jynx","electabuzz",
"magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon",
"jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl",
"snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew"];

// Generate random number between 0 and the number of words in the word bank
var rand = Math.floor(Math.random() * wordBank.length);

// Pick a word from the word bank, based on the random number
var solve = wordBank[rand];

// Determine how many letters in the word and display the dashes
var dashes = [];
for (var i = 0; i < solve.length; i++) { 
    dashes[i] = "_";
}
var display = dashes.join(' ');
document.getElementById("wordToGuess").innerHTML = display;

// Set lives
var lives = 10;
// Set remaining letters
var remLetters = solve.length;
// Define emptty array for user guesses
var userGuesses = [];
// Define img url
var imgSrc = '<img src="assets/images/' + solve + '.gif" alt="">';
// Define pokemon cry
var pokemonCry = "assets/audio/" + solve + ".wav"
var audio = new Audio(pokemonCry);

document.getElementById("lives").innerHTML = lives;

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {
    // Determines which key was pressed.
    var userGuess = event.key;
    
    // Check if user has guessed the letter already
    if (userGuesses.includes(userGuess)) {
        document.getElementById("state").innerHTML = "Already guessed " + userGuess + ". Try again.";
    } else {
        // Add guess to guessed letters pool
        userGuesses = userGuesses + userGuess;

        // Life handling
        if(solve.includes(userGuess)) {
            // Check where letter is in solution
            for (var x = 0; x < solve.length; x++) { 
                if (userGuess === solve[x]) {
                    dashes[x] = userGuess;
                    remLetters--;
                } 
            }
        } else {
            // Letter is not in the solution, lose a life
            lives--;
            document.getElementById("lives").innerHTML = lives;
            // If lives is 0, then user loses
            if (lives === 0) {
                document.getElementById("state").innerHTML ="You lose!"
            }
        }
    
        // Recalculate dashes and solved letters, then display
        display = dashes.join(' ');
        document.getElementById("wordToGuess").innerHTML = display;
        
        // Check remLetters and if 0, then the user won
        if (remLetters === 0) {
            // Show pokemon image
            document.getElementById("img").innerHTML = imgSrc;
            
            // Play pokemon audio
            audio.play();

            // Alert the user that they won
            document.getElementById("state").innerHTML ="You won!"
        }
    }    
}
