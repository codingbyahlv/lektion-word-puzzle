/*
1. slumpa en kombo av start/slutord
2. låta anv mata in ett nytt ord där en bokstav är bytt
3. kontrollera att det enbart är en bokstav som är bytt
4. kontrollera att det är ett korrekt engelskt ord mot api
5. se om vi har vunnit
*/

const puzzles = [{ startWord: 'FOUR', endWord: 'FIVE'}, { startWord: 'EYE', endWord: 'LID'}]
let puzzle = {};
//här sparar vi våra ord
const changedWords = [];


const startWordElem = document.querySelector("#start-word");
const endWordElem = document.querySelector("#end-word");
const inputElem = document.querySelector("#input-word");
const buttonElem = document.querySelector("#submit-word");

function startGame() {
  //för att random få ett ord. genom att gångra med arrayens längd får vi aldrig ett tal över arrayens längd
  //math floor = rundar av nedåt till heltal
  const index = Math.floor(Math.random() * puzzles.length);
  //vi får ut ett ord mha arrayens index som vi slumpat fram
  puzzle = puzzles[index];

  //skriver ut på position i html
  startWordElem.innerHTML = puzzle.startWord;
  endWordElem.innerHTML = puzzle.endWord;
}

function onlyChangedOneLetter(newWord, lastWord) {
  //vi loopar igenom alla bokstäver i ordet och jämför med tidigare ord för att se hur många bokstäver som är olika
  let changes = 0;
  for (let i = 0; i < newWord.length; i++) {
    //jämför varje bokstav
    if(newWord[i] !== lastWord[i]){
      //är bokstaven inte lika öka changes med 1
      changes++;
      console.log('Nytt ord: ', newWord[i])
      console.log('Start ord: ', lastWord[i] )
    }
  }

  //är antalet ändringar mer än 1 är boolean falsk = inkorrekt gissning
  if (changes > 1) {
    return false;
    //annars sann och korrekt
  } else {
    return true;
  }
}


//när vi klickar på knappen vill vi hämta det som finns i inputfältet
buttonElem.addEventListener('click', () => {
  //vad står i input vid klick, spara i const
  const newWord = inputElem.value;
  //vår variabel som ska lagra svaret vi får från correctChange()
  let correctChange;
  //om det finns nåt i vår array checka mot senaste ord
  if(changedWords.length > 0){
    //plockar ut sista ordet i arrayen
    const lastWord = changedWords[changedWords.length - 1]
    //vi checkar om det är korrekt ändring och lagrar svaret i correctChange
    correctChange = onlyChangedOneLetter(newWord, lastWord)
  //annars checka mot vårt startord
  }else{
    //vi checkar om det är korrekt ändring och lagrar svaret i correctChange
    correctChange = onlyChangedOneLetter(newWord, puzzle.startWord)
  }


  
 

  //om korrekt lagra i changedWord arrayen
  if(correctChange){
    //vid korrekt gissning pusha gissningen till vår array
    changedWords.push(newWord)
    console.log(changedWords)
    //annars fuskar anv :)
  } else {
    console.log("Du fuskar")
  }


})

startGame();