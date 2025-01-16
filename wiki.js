let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;

    // 1. Div container -- result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    // 2. Anchor Title -- result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);

    // 3. Title break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    // 4. Anchor URL -- result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    // 5. Line break
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    // 6. Paragraph Description -- result-description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("result-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    // Clear previous search results
    searchResultsEl.innerHTML = "";

    // Loop through the results and create the search result elements
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        // Fetching the data from the API
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;

                // Displaying the search results
                displayResults(search_results);
            });
    }
}

// Event listener for the input field
searchInputEl.addEventListener("keydown", searchWikipedia);