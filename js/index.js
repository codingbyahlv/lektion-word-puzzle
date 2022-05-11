/*
1. slumpa en kombo av start/slutord
2. låta anv mata in ett nytt ord där en bokstav är bytt
3. kontrollera att det enbart är en bokstav som är bytt
4. kontrollera att det är ett korrekt engelskt ord mot api
5. se om vi har vunnit
*/


//våra två objekt vi slumpar mellan
const puzzles = [{ startWord: 'FOUR', endWord: 'FIVE'}, { startWord: 'EYE', endWord: 'LID'}]
//här ska spelets ord för den här omgången sparas
let puzzle = {};
//här sparar vi våra rätta gissningsord
const changedWords = [];

//hämtar positioner i html
const startWordElem = document.querySelector("#start-word");
const endWordElem = document.querySelector("#end-word");
const inputElem = document.querySelector("#input-word");
const buttonElem = document.querySelector("#submit-word");
const wordsElem = document.querySelector("#words");

//STARTAR VÅRT SPEL
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


//CHECK OM DET ENDAST ÄR EN BOKSTAV UTBYTT
function onlyChangedOneLetter(newWord, lastWord) {
  //sparar resultatet av våra jämförelser
  let changes = 0;

  //vi loopar igenom alla bokstäver i ordet och jämför med tidigare ord för att se hur många bokstäver som är olika
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


//CHECK OM DET ÄR ETT ENGELSKT ORD
async function isEnglishWord(newWord) {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`);
  //gör om till json
  const data = await response.json()
  console.log(data)
  //om data finns returnera true
  if(data.length > 0) {
    return true;
  //om ingen data finns
  } else{
    return false;
  }
}


//CHECK OM VI VUNNIT
function hasWon(lastWord) {
  if (lastWord === puzzle.endWord){
    alert('Du vann!')
  }

  //kan också skrivas som single line
  //if (lastWord === puzzle.endWord) alert('Du vann!')
}


//SKAPAR VÅRT LISTELEMENT AV GISSADE ORD
function createWordElem(word) {
  //skapar en li tagg
  const wordElem = document.createElement('li')
  //och lägger in vårt ord
  wordElem.innerHTML = word;
  //skicka till html
  wordsElem.append(wordElem)
}


//HITTAR VÅRA GISSADE OCH SOM SKA VISAS
function displayWords() {
  //tömmer vår gamla lista mellan varje omgång för att undvika dubbletter
  wordsElem.innerHTML = '';
  //för varje ord i vår array
  for (let i = 0; i < changedWords.length; i++) {
    //anropa vårt skapa element
    createWordElem(changedWords[i]);
  }
}


//ONCLICK PÅ KNAPPEN
//när vi klickar på knappen vill vi hämta det som finns i inputfältet
buttonElem.addEventListener('click', async () => {
  //vad står i input vid klick, spara i const
  const newWord = inputElem.value;
  //vår variabel som ska lagra svaret vi får från correctChange()
  let correctChange;
  //vår variabel som ska lagra svaret vi får från correctEnglishWord()
  let correctEnglishWord;

  //en check för att se att gissat ord är samma längd som startordet
  if(newWord.length === puzzle.startWord.length) {
    //om det finns nåt i vår array checka mot senaste ord
    if(changedWords.length > 0){
      //plockar ut sista ordet i arrayen
      const lastWord = changedWords[changedWords.length - 1]
      //vi checkar om det är korrekt ändring och lagrar svaret i correctChange
      correctChange = onlyChangedOneLetter(newWord, lastWord)
      //anropar check av engelskt ord
      correctEnglishWord = await isEnglishWord(newWord);
    //annars checka mot vårt startord
    }else{
      //vi checkar om det är korrekt ändring och lagrar svaret i correctChange
      correctChange = onlyChangedOneLetter(newWord, puzzle.startWord)
      //anropar check av engelskt ord
      correctEnglishWord = await isEnglishWord(newWord);
    }
  }

  //om korrekt gissning och ett engelskt ord lagra i changedWord arrayen
  if(correctChange && correctEnglishWord){
    //vid korrekt gissning pusha gissningen till vår array
    changedWords.push(newWord)
    //anropar för check om vi vunnit
    hasWon(newWord)
    //anropa att våra ord skrivs ut
    displayWords();
    console.log(changedWords)
    //annars fuskar anv :)
  } else {
    console.log("Du fuskar")
  }
})


startGame();