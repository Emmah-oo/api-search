const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

//fetch data
const cities = []; //create empty array to store retrieved data

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    //figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
} //what this does is create a function with 2 para, wordToMatch is the user's
//input and cities is the cities array
//so we're returning something if city in the cities array matches the user input
//or state in the cities array matches user input

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">
        ${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">
        ${this.value}</span>`
      );
      return `
        <li>
            <span class= "name">${cityName}, ${stateName}</span>
            <span class= "population">${place.population}</span>
        </li>
        `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

//Get your data first, get your functionalities first then worry about hooking
//it up to event listeners
