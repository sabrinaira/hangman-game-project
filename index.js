/*
--- PRE-GAME ---
1. Greet the user "Welcome...hangman"
1b. Do you want to play hangman?
1c. Confirm, yes or no, if no send a personalized message and reset, if yes, start game.
1d. If YES, Invoke the callback function to play the game.

--- FUNCTION USER INPUT ---
2. They receive a prompt with the hint of the first 2 letters. Create /store that word combination with the dashes.
2b.Prompt user to input only 1 letter or whole word. (Need to catch any additional inputs).
2c. If input whole word Correct- call lines 7 function
2d. Wrong- call the function to print body part line 8
3. User starts inputting answers.

--- FUNCTION CHECK LETTER ---
4.We then check to see their inputs matches the letters. See if we can implement a higher order function. Maximum guesses of 10.
4b. Reference teh original word please not the skeleton.
5.If input matches a letter, replace a "-"" with the "letter", if not, we return/ print the body parts.
  - When letter is correct, rerun function user input, then update the hint
6.Prompt again to enter another letter, and repeat step 5.

--- FUNCTION ENDGAME ---
7.If total input =word, send a CORRECT Message, YOU WIN.
7b. Do you want to try another word?
7c. Yes-prompt new word
7d. If wrong letter-Send a perosnalized message."Guess the word right or a random cohortmate is on the line. No pressure!"
8.If total input=wrong word, print complete BODY. Prompt Message GAME OVER.
*/

const hangmanStages = [
  `
   -----
   |   |
       |
       |
       |
       |
  =========`,
  `
   -----
   |   |
   O |
       |
       |
       |
  =========`,
  `
   -----
   |   |
   O |
   |   |
       |
       |
  =========`,
  `
   -----
   |   |
   O |
  /|   |
       |
       |
  =========`,
  `
   -----
   |   |
   O |
  /|\\ |
       |
       |
  =========`,
  `
   -----
   |   |
   O |
  /|\\ |
  /    |
       |
  =========`,
  `
   -----
   |   |
   O |
  /|\\ |
  / \\ |
       |
  =========`,
];

let words = [
  'codesmith',
  'sausage',
  'closure',
  'javascript',
  'stipend',
  'mississippi',
];

let bodyWord = '';
console.log(bodyWord);

const prompts = {
  A1: 'Welcome to the Hangman game!',
  A2: 'Do you want to play hangman?',
  A3: 'Buddy has been hanged. GAME OVER.', //IF NO
  B1: 'Hangman is a game where you will guess the missing letters of a given word.',
  B2: "In this game, you will need to save your friend Buddy from being hanged. If you guess correctly, you will save Buddy and win the game. If not, Buddy unfortunately does not survive. It's up to you to save Buddy.",
  B3: 'You only have 7 tries to save Buddy. Good luck!',
  C1: 'Please guess this word',
  C2: 'Great! Keep Going! Buddy is rooting for you!', //If letter guess is correctly
  D1: 'GAME OVER. Restart to save your Buddy all over again.', //restart
};

// alert (shows a message only with OK button)
// confirm (contains OK and CANCEL buttons, where OK is true and CANCEL is false)
// prompt (contains text box for user to input text)

const preGame = () => {
  alert(`${prompts.A1}\n\n${prompts.B1} ${prompts.B2}\n\n${prompts.B3}`); // welcome message
  if (confirm(prompts.A2)) {
    //do you want to play hgman, invoke userinput, else have a nice day
    return userInput();
  } else {
    alert(prompts.A3);
  }
};

function wordGenerator() {
  // let input = '';
  let word = words[Math.floor(Math.random() * words.length)];
  bodyWord = word.split('');
  let letter1 = Math.floor(Math.random() * word.length);
  let letter2 = Math.floor(Math.random() * word.length);

  //the word array
  // checks if letter1 and letter2 are the same. if => reassign letter2
  while (letter1 === letter2) {
    letter1 = Math.floor(Math.random() * word.length);
  }

  for (let i = 0; i < word.length; i++) {
    if (i !== letter1 && i !== letter2) {
      //  as long as i greater than 0, means keep the first letter and also the last letter of the word
      word = word.replace(word[i], '-');
    }
  }
  return word;
}

function userInput( //assign dashed word to wordgenerator-creates a randomized combined word, turn that word to a string array
  dashedWord = wordGenerator().split(''), //parameters, dashed word will generate a new word everytime
  trials = 7, //will be decremented
  counter = 0 //
) {
  //counter to keep track array elements in order

  if (!dashedWord.includes('-')) {
    alert(
      `You've figured out the word': ${dashedWord.join('')}\nBuddy is now free!`
    );
    return nextRound();
  }
  //if dashedWord doesn't include dashes, we alert you figuredthe word out, and join to look like one word, then return nextRound 235
  let input = prompt(`${prompts.C1}\n ${dashedWord.join(' ')}\n`);
  //provide user with next dashed word joint together

  //214-the occurences of repeat letter,so user inputs a letter, the dash in dashed word gets replaced with the letter but the bodyword gets a star, now when second input, looks at bodyword and it now has a star at the instance so will go to second instance of the repeat letter
  if (bodyWord.includes(input)) {
    //if bodyword includes input, take the index of that letter if its in the word and replace the letter at that index
    dashedWord[bodyWord.indexOf(input)] = input;
    bodyWord[bodyWord.indexOf(input)] = '*'; // for repeated letters ex. bodyWord = j*vascript
    return userInput(dashedWord, trials, counter); //invoke userINput with new dashed updated word as an argument for every correct guess until no more dashes
  } else if (input === null) {
    alert(
      'Why are you clicking cancel? You can not escape!\nBuddy is crying now!'
    );
    return userInput(dashedWord, trials, counter); // repeats the function invocation
  } else if (!isNaN(input) || input.length > 1 || !bodyWord.includes(input)) {
    //217-no input, retry dashed word, 220-if we put in a number true or if we put in more than one letters
    counter++; //if number or more than one input counter++
    trials--;
    if (trials === 0) {
      //all guesses over, return GameOver and last element of array, as counter ncrease trials decreases
      return alert(`${prompts.D1}\n${hangmanStages[counter - 1]}`); //GETS THE LAST ELEMENT OF THE HANGMANSTAGES ARRAY
    }
    //if any other letter than the one from the original word is inputted, show alert
    alert(
      `Invalid Input\nYou have ${trials} tries left\n${
        hangmanStages[counter - 1]
      }`
    );
    // after each wrong input, counter is similar to the array index
    return userInput(dashedWord, trials, counter); //if trials get to 0, GAME OVER, and counter[6]
  }
}

const nextRound = () => {
  if (confirm('Do you want to play again?')) {
    userInput(wordGenerator().split(''));
    return nextRound();
  }
  //ask player if they want to play, we call userinput again and return next round, keeps repeating
  alert('Thank You. Have a Great Day!');
}; //if no, alert 241

//   bodyWord = bodyWord.split(''); //["dog"]=['d','o','g']

preGame();
