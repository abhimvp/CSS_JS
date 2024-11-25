const words = [
    "abandon", "beacon", "candy", "dove", "eagle", "flame", "grape", "happy", "ice", "jungle",
    "kingdom", "lunar", "mango", "noble", "ocean", "petal", "quest", "river", "shadow", "train",
    "umbrella", "vivid", "whale", "basket", "yellow", "zebra", "angel", "brave", "crane", "dusk",
    "enigma", "frost", "glow", "honey", "index", "juice", "knight", "lunar", "magic", "night",
    "oasis", "pearl", "quill", "rose", "scent", "tiger", "unity", "vortex", "wind", "xray",
    "yogurt", "zoned", "atlas", "bliss", "cider", "dawn", "epoch", "flame", "gauge", "heaven",
    "irony", "jolly", "koala", "lamb", "mint", "neon", "opal", "plum", "quartz", "ruby",
    "sunset", "tango", "urban", "vogue", "wave", "xerox", "yearn", "zephyr", "aqua", "bold",
    "crisp", "dove", "edge", "forge", "grace", "hush", "ink", "jade", "kite", "leaf",
    "mist", "navy", "oak", "pale", "quilted", "rare", "stone", "tone", "urban", "vibes",
    "wisp", "yacht", "zeal", "arc", "blaze", "core", "dust", "echo", "flint", "gaze",
    "halo", "iron", "june", "kale", "lime", "moss", "nest", "ore", "peach", "quail",
    "ridge", "snow", "tide", "use", "vow", "window", "xmas", "yoga", "zoo", "amber",
    "breeze", "clover", "drift", "enjoy", "flame", "grin", "hatch", "icicle", "jazz", "knack",
    "latch", "mocha", "nail", "open", "pale", "quiz", "rust", "sail", "tide", "ugly",
    "vowed", "wool", "xenon", "yawned", "zone", "awe", "belt", "charm", "dome", "elixir",
    "fawn", "gala", "hop", "inc", "june", "knot", "lump", "moon", "noon", "opal",
    "pier", "quiver", "ride", "stare", "twin", "unit", "vase", "wax", "yolk", "zoom",
    "arrow", "brick", "cloud", "dune", "eagle", "frost", "grip", "haze", "ignite", "jacket",
    "lure", "mesh", "nest", "ogre", "puff", "quilt", "rave", "swoop", "track", "urge",
    "view", "windy", "yell", "zen", "bolt", "clip", "deep", "echo", "flare", "gaze",
    "heron", "iris", "jolt", "key", "lily", "mint", "nook", "olive", "plow", "quill",
    "rust", "sage", "tick", "uniform", "vibe", "whip", "yarn", "zoomed", "art", "blow",
    "core", "dove", "eagle", "foam", "gloom", "hand", "ice", "joke", "knee", "loaf",
    "melt", "note", "open", "pale", "quill", "roar", "slug", "tear", "urge", "blank",
    "wait", "yawn", "zinc"];
// In this project we want to shuffle these words and don't want them in order

const textContainer = document.getElementById('text-container');
const timerElement = document.getElementById('timer');
const tryAgainButton = document.getElementById('try-again');
const finalScoreElement = document.getElementById('final-score');

let totalTyped = '';
let currentCharIndex = 0;
let errors = 0;
let longText = generateLongText();
// console.log(longText);
let timeLeft = 60;
let timerInterval; // run this interval every one second
let typingStarted = false;
// textContainer.textContent = longText;

// shuffle the words array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// console.log(shuffleArray(words));
//combine shuffled words into one long string
function generateLongText(){
    const shuffledWords = shuffleArray([...words]); // using spread operator to create a copy of the words array
    const longText = shuffledWords.join(' ');
     // join the shuffled words with a space
    return longText;
}

// start countdown timer 
function startTimer(){
    if(!typingStarted){
        typingStarted = true;
        timerInterval = setInterval(()=>{
            timeLeft--;
            timerElement.textContent = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0){
                clearInterval(timerInterval);
                endTest();
            }
        }, 1000)
    }
    
}

// end the test to display the final score 
function endTest(){
    // alert('Test is over!')
    timerElement.textContent = `Time's up!`;
    finalScoreElement.textContent = `Final WPM: ${calculateWPM()}`;
    textContainer.style.display = 'none';
    tryAgainButton.style.display = 'block';
    // calculateWPM();
}

// calculate words per minute with error adjustment
function calculateWPM(){
    const wordsTyped = totalTyped.trim().split(/\s+/).length;
    // console.log('wordsTyped : ', wordsTyped , ' data ', totalTyped.trim().split(/\s+/))
    const baseWPM = Math.round(wordsTyped / 60)*60;
    const adjustedWPM = Math.max(0, baseWPM - errors);
    return adjustedWPM
}
// Handle typing over displayed text and scrolling
document.addEventListener('keydown',(e)=>{
    startTimer();
    if(e.key === 'Backspace'){
        if (totalTyped.length>0){
            currentCharIndex = Math.max(0, currentCharIndex-1)
            totalTyped = totalTyped.slice(0,-1)
        }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey){
       
        totalTyped += e.key;
        currentCharIndex++;
        
    }
    // console.log('e.key : ',e.key,'totalTyped : ',totalTyped, 'currentCharIndex : ',currentCharIndex)

    const textArray = longText.split('')
    // console.log('textArray : ', textArray)
    textContainer.innerText='';
    errors=0;

    for (let i=0; i<textArray.length;i++){
        const span = document.createElement('span'); 
        if (i<totalTyped.length){
            if(totalTyped[i] === textArray[i]){
                span.classList.add('correct')
            }else{
                span.classList.add('error')
                errors++;
                // console.log('errors : ', errors)
            }
        }
        span.textContent = textArray[i];
        textContainer.appendChild(span);
    }

    // scroll the container only after 20 characters 
    if (totalTyped.length>=20){
        const scrollAmount = (totalTyped.length-20)*14;
        textContainer.scrollLeft = scrollAmount;
    }
})

// Reset the test 
function resetTest(){
    totalTyped = '';
    currentCharIndex = 0;
    errors = 0;
    longText = generateLongText();
    timeLeft = 60;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    textContainer.textContent = longText;
    textContainer.style.display = 'block';
    tryAgainButton.style.display = 'none';
    finalScoreElement.textContent = '';
    typingStarted = false;
    clearInterval(timerInterval);
    textContainer.scrollLeft = 0;
}

// initialize the test
function init(){
    if (isMobileDevice()){
        showMobileMessage();
        
    }else{
        textContainer.innerText=longText;
        timerElement.textContent = `Time Left: ${timeLeft}s`;
    }
    
}

// Try again button listener
tryAgainButton.addEventListener('click', resetTest)

// Detect if the device is mobile
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 800;
}

// Show message for mobile users
function showMobileMessage() {
    textContainer.textContent = "This test is designed for desktop use. Please use a desktop computer for the best experience.";
    
}

// Startup
init()