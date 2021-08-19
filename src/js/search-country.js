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

refs.inputEl.addEventListener ('input', debounce(onSerch, 1000))


function onSerch(evnt) {
    evnt.preventDefault();
    
    const countryName = evnt.target.value

    if (countryName === '') {
        refs.countryEl.innerHTML = ''
    }

    fetchCountryByName (countryName)
    .then (renderCountryCard)
    .catch (error => {
            alert({
                text: 'Wrong name'
            });
        })
}

function fetchCountryByName (countryName) {
    return  fetch (`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => {
            if(response.ok){
               return response.json() 
            } else {
                return Promise.reject
            }
            
        })
        
}

function renderCountryCard (countres) {
    if (countres.length >= 2 || countres.length <= 10){
        const markupList = countrySerchRes(countres)
        refs.countryEl.innerHTML = markupList
    }
    if (countres.length === 1){
        const markupCountry = countryRes(countres)
        refs.countryEl.innerHTML = markupCountry
    } 
    if (countres.length > 10) {
        refs.countryEl.innerHTML = ''
        alert({
            text: 'Too many matches found. Please enter a more specific query!'
          });
    }
}