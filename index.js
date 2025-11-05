// HANGMAN GAME
/*
    Building a Hangman game is one of the best JavaScript 
    project ideas for beginners who want a bit of a 
    challenge.

    If you’re not familiar, the hangman game is about 
    guessing a random word by guessing letters one by one. 
    If the player runs out of guesses, the game is over.
*/
window.onload = ()=>{
    beginHangman()
}

let cities = [
    "London", "Paris", "Tokyo", "Sydney", "Mexico City", 
    "Cairo", "Toronto", "Dubai", "Buenos Aires", "Instabul",
    "Nairobi", "Moscow", "Singapore", "Seoul", "Barcelona",
    "Vancouver", "Granada", "Cape Town", "Osaka", "Auckland"
] 

let furnitures = [
    "Sofa", "Armchair", "Coffe Table", "Dinig Table", "Chair",
    "Bed", "Nightstand", "Wardrobe", "Bookshelf", "Desk",
    "TV Stand", "Office Chair", "Dresser", "Cupboard", "Couch",
    "Cabinet", "Stool", "Mirror", "Shelf", "Bench"
]

let fruits = [
    "Orange", "Apple", "Banana", "Raspberry", "Grape",
    "Strawberry", "Pineapple", "Mango", "Pear", "Kiwi",
    "Watermelon", "Cherry", "Peach", "Lemon", "Lime",
    "Blueberry", "Papaya", "Coconut", "Plum", "Pomegranate"
]

let animals = [
    "Eagle", "Flamingo", "Ostrich", "Peafowl", "Toucan",
    "Whale", "Giraffe", "Mouse", "Kangaroo", "Porcupine",
    "Salmon", "Shark", "Trout", "Mackarel", "Herring",
    "Grasshopper", "Butterfly", "Centipede", "Mussels", "Barnacle"
]

let myDivWord, myAlphabet;
let disabledLetters = [];

function beginHangman(){
    myDivWord = document.getElementById("word");
    myAlphabet = document.getElementById("alphabet");
    let myMessage = document.getElementById("message");
    let myCategory = document.getElementById("category"); 
    let chosenCategory = document.getElementById("chosenCategory");
    let myLives = document.getElementById("lives");
    let choice, word, lives = 10;
    
    disableAlphabet(); // Disable alphabet at the beginning

    myCategory.addEventListener("click", (e)=>{
        choice = e.target.id;
        word = generateWord(choice);

        myCategory.remove();
        chosenCategory.innerHTML = "Category is "+choice +" word is "+word;
        myLives.innerHTML = "You have "+lives+" lives";
        myMessage.innerHTML = "Pick a letter!";

        createDiv(word);
        enableAlphabet(); // Enable alphabet

    })

    myAlphabet.addEventListener("click", (e)=>{
        disableAlphabet();

        let letter = e.target.id;
        let letterCollection = myDivWord.querySelectorAll(`.${letter}, .${letter.toUpperCase()}`);
        // If the length is higher than 0 it means that letter is part of
        // the word
        if(letterCollection.length > 0){
            myMessage.innerHTML = "Correct!";
            revealLetters(letter, letterCollection);
        }
        else{
            lives--;
            myMessage.innerHTML = "Incorrect! You lose a life";
            myLives.innerHTML = "You have "+lives+" lives";
        }
        disabledLetters.push(letter);

        setTimeout(enableAlphabet, letterCollection.length * 1000)
    })
}

// Function that returns the hidden word
function generateWord(choice){
    let word;
    switch(choice){
        case "cities":
            word = cities[Math.floor(Math.random()*20)];
            break;

        case "furnitures":
            word = furnitures[Math.floor(Math.random()*20)];
            break;

        case "fruits":
            word = fruits[Math.floor(Math.random()*20)];
            break;
            
        case "animals":
            word = animals[Math.floor(Math.random()*20)];
            break;
    }

    return word;
}

// Function that creates 
function createDiv(word){
    for(let i=0; i<word.length; i++){
        if(word.charAt(i)!=" "){
            let div = document.createElement("div");
            div.className = word.charAt(i);
            let myDiv = myDivWord.appendChild(div);
            myDiv.innerHTML = "_";
        }
    }
}

// Function that disables the whole alphabet
function disableAlphabet(){
    for(let i=0; i<myAlphabet.children.length; i++)
        myAlphabet.children[i].disabled = true;
}

// Function that enables the alphabet except for the clicked letters
function enableAlphabet(){  
    let disabled; // Flag variable
    for(let i=0; i<myAlphabet.children.length; i++){
        disabled = false; // Sets disabled as false when the next iteration starts
        for(let j=0; j<disabledLetters.length && !disabled; j++)
            // If a letter is in the disabledLetters array, the flag becomes true
            if(myAlphabet.children[i].id==disabledLetters[j]) {
                disabled = true;
                myAlphabet.children[i].style.opacity = "50%";
            }      
        // If true, that letter will not get enabled
        if(!disabled) myAlphabet.children[i].disabled = false;
    }
}

// Function that reveals the letters
function revealLetters(letter, letterCollection){
    for(let i=0; i<letterCollection.length; i++){
        setTimeout(()=>{
            letterCollection[i].innerHTML = 
                letterCollection[i].className == letter?letter:
                letter.toUpperCase();
        }, 1000 * i);
    }
}