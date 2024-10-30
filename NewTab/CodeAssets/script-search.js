let urlParams = new URLSearchParams(window.location.search);
let term = urlParams.get('q');
document.getElementById('term').src = "https://www.bing.com/search?q=" + decodeURIComponent(term);

function googleSearch() {
    document.getElementById('term').src = "https://www.google.com/search?igu=1&q=" + decodeURIComponent(term);
}

function bingSearch() {
    document.getElementById('term').src = "https://www.bing.com/search?q=" + decodeURIComponent(term);
}

var searched = document.getElementById("search");

function pressed() {
    window.location.href = "./search.html" + "?q=" + encodeURIComponent(searched.value);
}