import debounce from "lodash.debounce";
import countrySerchRes from "../templates/country-template.hbs";
import countryRes from '../templates/country-card.hbs';
import { alert } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
 
  

const refs = {
    countryEl: document.querySelector('.country-res'),
    lableEl: document.querySelector('.country-lable'),
    inputEl: document.getElementById('country-input'),
}
console.log(refs.inputEl)
refs.inputEl.addEventListener ('input', debounce(onSerch, 1000))


function onSerch(evnt) {
    evnt.preventDefault();
    
    const countryName = evnt.target.value

    fetchCountryByName (countryName)
    .then (renderCountryCard)
    .catch (error => {
        console.log(error)
    })

}

function fetchCountryByName (countryName) {
    return  fetch (`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => {
            return response.json()
        }) 
}

function renderCountryCard (countres) {
    if (countres.length < 2 || countres.length <= 10){
        const markupList = countrySerchRes(countres)
        refs.countryEl.innerHTML = markupList
    }
    if (countres.length === 1){
        const markupCountry = countryRes(countres)
        refs.countryEl.innerHTML = markupCountry
    } 
    else {
        alert({
            text: 'Too many matches found. Please enter a more specific query!'
          });
    }
}