const word_el = document.getElementById('word');
const wrong_letters = document.getElementById('wrong-letters');
const popup_win = document.getElementById("popup-win");
let selectedWord = getRandomWord();
const items = document.querySelectorAll('.item');
const win = document.getElementById("win");
const popup_loose = document.getElementById("popup-loose");
const loose = document.getElementById("loose");

function getRandomWord(){
    const words = ["javascrıpt","java","python"];
    return words[Math.floor(Math.random() * words.length)];
}

console.log(getRandomWord());

const correctLetters = [];
const wrongLetters = [];

function displayWord(){
    word_el.innerHTML = `
     ${selectedWord.split('').map(letter =>`
             <div class="letter">
             ${correctLetters.includes(letter) ? letter : ''}
             </div>
     `).join('')}

    `
    const w = word_el.innerText.replace(/\n/g,'');
    if(w == selectedWord){
       popup_win.style.display = "flex";
    }
}

window.addEventListener('keydown',function(e){
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }
            
        }else{
            if(!wrongLetters.includes(letter))
            wrongLetters.push(letter);
            mistakeWords();
        }
    }
})

function mistakeWords(){
wrong_letters.innerHTML = `
${wrongLetters.length > 0 ?'<h3>Hatalı Harfler</h3>':''}
${wrongLetters.map(letter =>`<span>${letter}</span>`)}

`;
    items.forEach((item,index)=>{
        const errorCount = wrongLetters.length;

        if(index<errorCount){
            item.style.display="block"
        }else {
            item.style.display = "none"
        }
        if(errorCount == items.length){
           popup_loose.style.display = "flex";
            
        }
    })
}

win.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    mistakeWords();
    popup_win.style.display = "none";
})

loose.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    mistakeWords();
    popup_loose.style.display = "none";
})

displayWord();

