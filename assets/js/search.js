// Get the search input element
var searchElem = document.getElementById("search-input");
// Define a global object to store search-related data and ensure it's initialized only once
window.pankajpipadaCom = window.pankajpipadaCom || {};

// Initialize search only once
if (!window.pankajpipadaCom.initialized) {
  window.pankajpipadaCom.lunrIndex = null;
  window.pankajpipadaCom.posts = null;
  window.pankajpipadaCom.initialized = true;

  // Load search data and initialize lunr.js
  loadSearch();
}

// Function to load search data and initialize lunr.js
function loadSearch() {
  var now = new Date().getTime();
  // Check for cached data in localStorage
  var storedData = localStorage.getItem("postData");
  
  // Use cached data if available and not expired
  if (storedData) {
    storedData = JSON.parse(storedData);
    if (now < storedData.expiry) {
      console.log("Using cached data");
      buildIndex(storedData.data, checkURLAndSearch);
      return;
    } else {
      console.log("Cached data expired");
      localStorage.removeItem("postData");
    }
  }

  // Fetch search data via AJAX request
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        var data = JSON.parse(xhr.responseText);
        buildIndex(data, checkURLAndSearch);
        console.log("Search initialized");

        // Cache fetched data with expiry
        localStorage.setItem(
          "postData",
          JSON.stringify({
            data: data,
            expiry: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // TTL for 1 week
          })
        );
      } catch (error) {
        console.error("Error parsing JSON:", error);
        showError("Failed to load search data.");
      }
    } else if (xhr.status !== 200) {
      console.error("Failed to load data:", xhr.status, xhr.statusText);
      showError("Failed to load search data.");
    }
  };
  xhr.onerror = function () {
    console.error("Network error occurred.");
    showError("Failed to load search data due to network error.");
  };
  xhr.open("GET", "../index.json");
  xhr.send();
}

// Function to build lunr.js index
function buildIndex(data, callback) {
  window.pankajpipadaCom.posts = data;
  window.pankajpipadaCom.lunrIndex = lunr(function () {
    this.ref("url");
    this.field("content", { boost: 10 });
    this.field("title", { boost: 20 });
    // Define the new field for concatenated tags
    this.field("tags_str", { boost: 15 });
    this.field("date");
    window.pankajpipadaCom.posts.forEach(function (doc) {
      // Create a new field 'tags_str' for indexing
      const docForIndexing = {
        ...doc,
        tags_str: doc.tags.join(" "),
      };
      this.add(docForIndexing);
    }, this);
  });
  console.log("Index built at", new Date().toISOString());
  callback();
}

// Function to display error message
function showError(message) {
  var searchResults = document.getElementById("searchresults");
  searchResults.innerHTML = `<br><h2 style="text-align:center">${message}</h2>`;
  searchElem.disabled = true; // Disable search input on error
}

// Function to check URL for search query and perform search
function checkURLAndSearch() {
  var urlParams = new URLSearchParams(window.location.search);
  var query = urlParams.get("query");
  if (query) {
    searchElem.value = query;
    showSearchResults();
  }
}

// Function to perform search and display results
function showSearchResults() {
  if (!window.pankajpipadaCom.lunrIndex) {
    console.log("Index not available.");
    return; // Exit function if index not loaded
  }
  var query = searchElem.value || "";
  var searchString = query.trim().replace(/[^\w\s]/gi, "");
  if (!searchString) {
    displayResults([]);
    return; // Exit if the search string is empty or only whitespace
  }

  var matches = window.pankajpipadaCom.lunrIndex.search(searchString);
  console.log("matches", matches);
  var matchPosts = matches.map((m) =>
    window.pankajpipadaCom.posts.find((p) => p.url === m.ref)
  );
  console.log("Match posts", matchPosts);
  displayResults(matchPosts);
}

// Function to display search results
function displayResults(results) {
  const searchResults = document.getElementById("searchresults");
  const maxResults = 10; // Limit to 10 results
  if (results.length) {
    let resultList = "";
    results.slice(0, maxResults).forEach((result) => {
      if (result) {
        resultList += getResultStr(result);
      }
    });
    searchResults.innerHTML = resultList;
  } else {
    searchResults.innerHTML = "No results found.";
  }
}

// Function to format search result items
function getResultStr(result) {
  var resultList = `
      <li style="margin-bottom: 1rem">
        <a href="${result.url}">${result.title}</a><br />
        <p>${result.content.substring(0, 150)}...</p>
        <div class="text-muted" style="display: flex; justify-content: space-between; align-items: center; font-size: small; height: 1.2em; line-height: 1em; padding: 0.25em;">
            <div>${result.date}</div>
            <div><i class="fa fa-tags"></i>
                ${result.tags
                  .map(
                    (tag) =>
                      `<a class="text-muted" href="/tags/${tag}">${tag}</a>`
                  )
                  .join(", ")}
            </div>
        </div>
      </li>`;
  return resultList;
}