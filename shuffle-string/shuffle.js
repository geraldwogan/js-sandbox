// Select all items with the class name 'shuffle-link'
const links = document.querySelectorAll(".shuffle-link");
console.log(links)
// Iterate through each item to add event Listenets for mouseEnter and mouseLeave actions
links.forEach( (link) => {
    // initial setup
    // store the original text of the link
    const originalText = link.textContent;

    // split text into array of individual letters
    const letters = originalText.split('');

    // Id to keep track of the interval used for shuffle effect
    let intervalId;

    // Core of the code 
    // Use set interval to run the code every few seconds
    // this function handles the actual shuffling effect
    // inside of this function we will have counte that keeps track of the no. of iterations
    link.addEventListener('mouseenter', () => {
        console.log('mouseenter');
        // counter that keeps track of the no. of iterations
        let counter = 0;
        // the no. of shuffling cycles for each letter
        const shuffleCount = 2;
        // the no. of interval between each cycle
        const shuffleInterval = 70;

        // iterate over each letter and apply a transformation
        intervalId = setInterval(() => {
            const shuffledText = letters
            .map((char, index) => {
                // check is char is upper, lower, digit so we don't shuffle special characters
                if(char.match(/[a-zA-Z0-9]/)) {
                    // generate a random character
                    const randomCharacter = getRandomCharacter();

                    // calculate no. of cycles needed to revert a char back to it's original letter
                    const cyclesToRevert = index - Math.floor(counter / shuffleCount)

                    console.log('cyclesToRevert: ' + cyclesToRevert)
                    if (counter >= cyclesToRevert * shuffleCount){
                        return originalText[index];
                    }
                    console.log('randomCharacter: '+ randomCharacter)
                    return randomCharacter;
                }
                return char;
            })
            .join('');

            link.textContent = shuffledText;

            counter++
            if (counter >= (shuffleCount + 1) + letters.length){
                clearInterval(intervalId)
                link.textContent = originalText;
            }
        }, shuffleInterval);
    })

    link.addEventListener('mouseleave', () => {
        console.log('mouseleave');

        clearInterval(intervalId);
        link.textContent = originalText;
    })
})

// helper function to return a random character
function getRandomCharacter() {
const characters = 'ABCEDFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqstuvwxyz';
const randomIndex = Math.floor(Math.random() * characters.length);
console.log(randomIndex);
return characters[randomIndex];
}