
// Event listner that triggers the fetch request for the Memes searched 
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("search-button");
    if (button) {
        button.addEventListener("click", request);

        // Event listener for the Random function to get a Random meme
        const randomButton = document.getElementById("random-button");
        if (randomButton) {
            randomButton.addEventListener("click", showRandomMeme);
        }
        // loads the API data unconditionally for the glossary to show 
        addMemesToGlossary();
    }
});

// This is the XML requst 
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.imgflip.com/get_memes", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    }
};
xhr.send();

// fetch request function to recieve API data
function request() {
    fetch("https://api.imgflip.com/get_memes")
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(({ data: { memes: MemeTable } }) => {
            // added feature to make all data lowercase to avoid input errors
            const searchTerm = document.getElementById("search").value.toLowerCase();
            const foundMeme = MemeTable.find(({ name }) => name.toLowerCase() === searchTerm);
            if (foundMeme) {
                const section = document.getElementsByClassName("result")[0];
                if (section) {
                    section.innerHTML = `<h1> ${foundMeme.name} </h1>
                <img class="meme-image" src="${foundMeme.url}">`;
                }

                else {
                    alert("Meme not found. Please try again.");
                }
            }
        })
        .catch(error => {
            console.log("An error occurred: ", error);
        });
}
//Function that fetches the API data 
function showRandomMeme() {
    fetch("https://api.imgflip.com/get_memes")
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        // creates a table out of the API data to randomly select a url and name 
        .then(({ data: { memes: MemeTable } }) => {
            const randomIndex = Math.floor(Math.random() * MemeTable.length);
            const randomMeme = MemeTable[randomIndex];
            const section = document.getElementsByClassName("result")[0];
            if (section) {
                section.innerHTML = `<h1> ${randomMeme.name} </h1> 
            <img class="meme-image" src="${randomMeme.url}">`;
            }
        })
}
// function to fetch the API data for the glossary
function addMemesToGlossary() {
    fetch("https://api.imgflip.com/get_memes")
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(({ data: { memes: MemeTable } }) => {
            const glossaryTable = document.getElementById("glossary-table");
            let currentRow;
            let currentCell;
            //Creates table for the memes to be presented
            for (let i = 0; i < MemeTable.length; i++) {
                if (i % 5 === 0) {
                    // Creates a new row every 5 cells
                    currentRow = document.createElement("tr");
                    glossaryTable.appendChild(currentRow);
                }
                // Creates a new cell for the current meme
                currentCell = document.createElement("td");
                currentCell.textContent = MemeTable[i].name;
                currentRow.appendChild(currentCell);
            }
        })
        .catch(error => {
            console.log("An error occurred: ", error);
        });
}
