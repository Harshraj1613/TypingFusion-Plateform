
const quotes = [
 "The quick brown fox jumps over the lazy dog repeatedly",
  "Every student must learn how to write clean code effectively",
  "Typing accurately and quickly improves with daily effort",
  "Practice typing letters without looking at the keyboard",
  "Software engineers build amazing tools using logic and focus",
  "Developers enjoy solving problems with simple smart thinking",
  "Good habits in typing make programming faster and easier",
  "Code regularly to improve your speed and letter accuracy",
  "Always stay calm while typing long sentences or paragraphs",
  "Think logically and keep improving your typing each day",
  "Learning how to type is useful for every career and job",
  "Keep your hands steady and focus on the home row keys",
  "Accuracy in typing matters more than typing with speed",
  "Consistency builds confidence and helps reduce mistakes",
  "Type each letter carefully and aim for fewer corrections",
  "Reading your typed content will help spot the errors",
  "Fingers must return to the base position after each word",
  "Take small breaks and restart typing with full attention",
  "Typing practice improves not just speed but also focus",
  "Challenge yourself to type difficult words without errors",
  "Stay patient and persistent while learning to type better",
  "Avoid rushing through typing and focus on each letter",
  "The best typists are those who type with both speed and care",
  "Develop finger memory by repeating sentences daily",
  "Typing is a skill that grows with effort and discipline",
  "Never give up even when typing feels slow or frustrating",
  "Focusing on posture helps keep typing comfortable and smooth",
  "Avoid looking at keys and trust your muscle memory",
  "Repeat basic drills until they feel natural and effortless",
  "Typing long passages helps in building great endurance",
  "The keyboard is a tool that must be mastered with calm and focus",
  "Typing each word slowly will help improve accuracy over time",
  "Speed is the result of consistent and deliberate daily effort",
  "When you type with care the chances of errors go down a lot",
  "Focus your eyes on the screen and keep your fingers in flow",
  "Typing is not just about fingers but also about brain control",
  "Each letter typed correctly builds your skill and confidence",
  "Mistakes help you learn and grow into a better typist slowly",
  "Do not worry about speed just try to be as accurate as possible",
  "A clean desk and a good chair make typing more comfortable",
  "The home row is where your fingers should always return after words",
  "Good lighting can help reduce eye strain during long typing sessions",
  "Avoid peeking at the keys trust your memory and hand position",
  "Short daily practice is more effective than long random bursts",
  "Use all your fingers while typing not just the index fingers",
  "Developing typing skills will help you in coding and writing",
  "Typing is like music the rhythm comes from constant practice",
  "Avoid unnecessary hand movements and keep wrists relaxed",
  "Stretch your fingers before and after typing for flexibility",
  "Type what you see and trust what your fingers have learned",
  "Correcting your own mistakes without help improves awareness",
  "Avoid distractions and keep your typing practice distraction free",
  "Typing can become second nature with enough quiet repetition",
  "Building endurance is key to typing longer passages easily",
  "Never rush typing learn to enjoy the flow of words forming",
  "Treat typing like a sport the more you train the better you get",
  "Listen to calm music if it helps you stay focused while typing",
  "Always finish what you start even if the sentence is difficult",
  "Accuracy first then speed this is the rule of real typists",
  "A strong mindset leads to great habits and smooth performance"
];

// HTML Elements
const quoteDisplay = document.getElementById("quote-display");
const quoteInput = document.getElementById("quote-input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const timeSelect = document.getElementById("time-select");

let timer = null;
let startTime = null;
let totalTime = 300;
let currentQuote = "";
let totalTypedWords = 0;
let totalTypedChars = 0;
let correctTypedChars = 0;


function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function displayNewQuote() {
  currentQuote = getRandomQuote();
  quoteDisplay.innerHTML = "";
  currentQuote.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    quoteDisplay.appendChild(span);
  });
  // quoteInput.value = "";
}

function startTimer(duration) {
  startTime = new Date();
  let timeLeft = duration;

  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      quoteInput.disabled = true;
      showFinalStats();
    }
  }, 1000);
}

function calculateWPM() {
const minutesElapsed = (new Date() - startTime) / 1000 / 60;
const wpm = minutesElapsed > 0 ? Math.floor(totalTypedWords / minutesElapsed) : 0;

  wpmDisplay.innerText = isNaN(wpm) ? 0 : wpm;
}

function calculateAccuracy() {
  if (totalTypedChars === 0) {
    accuracyDisplay.innerText = "0";
    return;
  }

  const accuracy = Math.min(100, Math.max(0, parseFloat(((correctTypedChars / totalTypedChars) * 100).toFixed(1))));


  accuracyDisplay.innerText = accuracy;
}

function savePerformance() {
  const userId = localStorage.getItem("currentUser");
  if (!userId) return;

  const data = JSON.parse(localStorage.getItem(userId)) || {
  bestWPM: 0,
  bestAccuracy: 0
};

  const finalWPM = parseInt(wpmDisplay.innerText);
  const finalAccuracy = parseInt(accuracyDisplay.innerText);

  data.bestWPM = Math.max(data.bestWPM, finalWPM);
data.bestAccuracy = Math.max(data.bestAccuracy, finalAccuracy);


  localStorage.setItem(userId, JSON.stringify(data));
}

function showFinalStats() {
  quoteDisplay.innerHTML = "⏱️ Time's up! Final stats:";
  calculateWPM();
  calculateAccuracy();
  savePerformance();
}

quoteInput?.addEventListener("input", () => {
  const arrayQuote = quoteDisplay.querySelectorAll("span");
  const arrayValue = quoteInput.value.split("");

  let correctCharsThisInput = 0;
  let charsInThisInput = 0;
  let isInputFinished = arrayValue.length === arrayQuote.length;

  arrayQuote.forEach((charSpan, index) => {
    const char = arrayValue[index];
    const expectedChar = charSpan.innerText;

    if (char == null) {
      charSpan.classList.remove("correct", "incorrect");
    } else if (char === expectedChar) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
      correctCharsThisInput++;
      charsInThisInput++;
    } else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
      charsInThisInput++;
    }
  });

  correctTypedChars += correctCharsThisInput;
  totalTypedChars += charsInThisInput;

  if (isInputFinished) {
    totalTypedWords += quoteInput.value.trim().split(" ").filter(w => w !== "").length;
    calculateAccuracy();
    calculateWPM();
    displayNewQuote();
    quoteInput.value = "";
  }
});

function startGame() {
  clearInterval(timer);
  quoteInput.disabled = false;
  quoteInput.focus();
  totalTypedWords = 0;
  totalTypedChars = 0;
  correctTypedChars = 0;

  const selectedTime = parseInt(timeSelect.value);
  totalTime = selectedTime;
  timeDisplay.innerText = totalTime;

  wpmDisplay.innerText = "0";
  accuracyDisplay.innerText = "100";
  displayNewQuote();
  startTimer(totalTime);
}
function stopGame() {
  clearInterval(timer);
  quoteInput.disabled = true;
  showFinalStats();  // Call this before alert
  alert("Test stopped!");
}


document.addEventListener("keydown", function (e) {
  const key = e.key.toUpperCase();
  const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  if (keyElement) {
    keyElement.classList.add("active");
  }
});

document.addEventListener("keyup", function (e) {
  const key = e.key.toUpperCase();
  const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  if (keyElement) {
    keyElement.classList.remove("active");
  }
});


  const heading1 = document.getElementById("heading1");
  const headingText = "TypingFusion Platform";

  function typeHeading() {
    heading1.textContent = ""; // Clear heading before typing
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < headingText.length) {
        heading1.textContent += headingText.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(typeHeading, 2000);
      }
    }, 60); 
  }

  typeHeading(); 



  