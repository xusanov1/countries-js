const countriesContainer = document.getElementById('countries-container');
const countryDetails = document.getElementById('country-details');
const searchInput = document.getElementById('search');
const regionFilter = document.getElementById('region-filter');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const headerBottom = document.querySelector('.header-bottom');

let allCountries = [];

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        allCountries = data;
        renderCountryCards(data);
    })
    .catch(error => console.error('Error fetching countries:', error));

function renderCountryCards(countries) {
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <div class="card-info">
                <h3>${country.name.common}</h3>
                <p>Population: ${country.population.toLocaleString()}</p>
                <p>Region: ${country.region}</p>
                <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        `;
        card.addEventListener('click', () => showCountryDetails(country));
        countriesContainer.appendChild(card);
    });
}

function showCountryDetails(country) {
    countriesContainer.classList.add('hidden');
    countryDetails.classList.remove('hidden');
    headerBottom.classList.add('hidden'); 
    countryDetails.innerHTML = `
        <div class="details-card">
            <img src="${country.flags.png}" alt="${country.name.common} flag">
            <div class="details-info">
                <h2>${country.name.common}</h2>
                <div class="description">
                <div class="left">
                <p><strong>Native Name:</strong> ${Object.values(country.name).join(', ')}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Subregion:</strong> ${country.subregion}</p>

                </div>
                <div class="right">
                <p><strong>Top levels Domain:</strong> be.</p>
                <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name}</p>

                </div>
                </div>
                <button onclick="goBack()">Back</button>
    `;
}



function goBack() {
    countryDetails.classList.add('hidden');
    countriesContainer.classList.remove('hidden');
    headerBottom.classList.remove('hidden'); 
}




searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm)
    );
    renderCountryCards(filteredCountries);
});




regionFilter.addEventListener('change', () => {
    const region = regionFilter.value;
    const filteredCountries = region
        ? allCountries.filter(country => country.region === region)
        : allCountries;
    renderCountryCards(filteredCountries);
});




darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

