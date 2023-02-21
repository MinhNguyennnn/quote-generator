const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loaderIcon = document.getElementById('loader');

// Get Quote from API
let apiQuotes = [];

//loadding and complete function
function loadding(){
    quoteContainer.hidden = true;
    loaderIcon.hidden = false;
}

function complete(){
    quoteContainer.hidden = false;
    loaderIcon.hidden = true;
}

//show new quotes
function newQuote() {
    loadding()
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    //check quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text

    //check if author is null
    if (!quote.author) {
        quoteAuthor.textContent = 'Unknow'
    } else {
        quoteAuthor.textContent = quote.author
    }
    complete();
}

async function getQuotes() {
    loadding()
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    // const apiUrl = 'https://type.fit/api/quotes'
    try {
        const respone = await fetch(apiUrl);
        apiQuotes = await respone.json();
        newQuote()
    } catch (e) {
        console.log(e)
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank')
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)


//onLoad
getQuotes();
