const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { text: "The best error message is the one that never shows up.", author: "Unknown" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
    { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
    { text: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay" },
    { text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.", author: "Dan Salomon" },
    { text: "There are two ways to write error-free programs; only the third one works.", author: "Alan J. Perlis" },
    { text: "To understand recursion, one must first understand recursion.", author: "Unknown" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "Dream big. Work hard. Stay focused.", author: "Unknown" }
];

function updateClock() {
    var now = new Date();
	hours = now.getHours();
	minutes = now.getMinutes();
	if (minutes < 10) {
		time = hours + ':' + "0" + minutes;
	} else {
		time = hours + ':' + minutes;
	}
	if (hours < 10) {
		time = "0" + time;
	}
    document.getElementById('time').innerHTML = time;
    setTimeout(updateClock, 1000);
}

function updateGreetingAndDate() {
    const now = new Date();
    const hour = now.getHours();
    const greetingEl = document.getElementById('greeting');
    const dateEl = document.getElementById('date');
    
    if (hour < 12) {
        greetingEl.textContent = 'good morning';
    } else if (hour < 18) {
        greetingEl.textContent = 'good afternoon';
    } else {
        greetingEl.textContent = 'good evening';
    }
    
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('en-US', options);
}

function showQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote-text').textContent = `"${randomQuote.text}"`;
    document.getElementById('quote-author').textContent = `- ${randomQuote.author}`;
    
    fetch('https://zenquotes.io/api/random')
        .then(res => res.json())
        .then(data => {
            if (data && data[0]) {
                document.getElementById('quote-text').textContent = `"${data[0].q}"`;
                document.getElementById('quote-author').textContent = `- ${data[0].a}`;
            }
        })
        .catch(() => {});
}

updateClock();

function setup(data) {
    function createLinks(linkGroups) {
        const outerBox = document.querySelector('.box');

        function createLinkContainer(linkGroup) {
            const linkContainer = document.createElement('div');
            linkContainer.classList.add('box-container');

            const heading = document.createElement('div');
            heading.classList.add('heading');
            heading.innerHTML = linkGroup.name;

            linkContainer.appendChild(heading);

            for (let link of linkGroup.links) {
                const anchor = document.createElement('a');
                anchor.setAttribute('href', link.url);

                anchor.innerHTML = link.name;

                linkContainer.appendChild(anchor);
            }

            return linkContainer;
        }

        for (let linkGroup of linkGroups) {
            const linkContainer = createLinkContainer(linkGroup);

            outerBox.appendChild(linkContainer);
        }
    }

    createLinks(data.linkGroups);
}

new CustomStartStorage().get()
    .then(data => {
        setup(data);
    });

updateClock();
updateGreetingAndDate();
showQuote();
