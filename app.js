// List of 27 Nakshatras with indices and Yoni animals
const nakshatras = [
    { name: 'Ashwini', index: 0, yoni: 'Horse' },
    { name: 'Bharani', index: 1, yoni: 'Elephant' },
    { name: 'Krittika', index: 2, yoni: 'Goat' },
    { name: 'Rohini', index: 3, yoni: 'Serpent' },
    { name: 'Mrigashira', index: 4, yoni: 'Serpent' },
    { name: 'Ardra', index: 5, yoni: 'Dog' },
    { name: 'Punarvasu', index: 6, yoni: 'Cat' },
    { name: 'Pushya', index: 7, yoni: 'Goat' },
    { name: 'Ashlesha', index: 8, yoni: 'Cat' },
    { name: 'Magha', index: 9, yoni: 'Rat' },
    { name: 'Purva Phalguni', index: 10, yoni: 'Rat' },
    { name: 'Uttara Phalguni', index: 11, yoni: 'Cow' },
    { name: 'Hasta', index: 12, yoni: 'Buffalo' },
    { name: 'Chitra', index: 13, yoni: 'Tiger' },
    { name: 'Swati', index: 14, yoni: 'Buffalo' },
    { name: 'Vishakha', index: 15, yoni: 'Tiger' },
    { name: 'Anuradha', index: 16, yoni: 'Deer' },
    { name: 'Jyeshtha', index: 17, yoni: 'Deer' },
    { name: 'Mula', index: 18, yoni: 'Dog' },
    { name: 'Purva Ashadha', index: 19, yoni: 'Monkey' },
    { name: 'Uttara Ashadha', index: 20, yoni: 'Mongoose' },
    { name: 'Shravana', index: 21, yoni: 'Monkey' },
    { name: 'Dhanishta', index: 22, yoni: 'Lion' },
    { name: 'Shatabhisha', index: 23, yoni: 'Horse' },
    { name: 'Purva Bhadrapada', index: 24, yoni: 'Lion' },
    { name: 'Uttara Bhadrapada', index: 25, yoni: 'Cow' },
    { name: 'Revati', index: 26, yoni: 'Elephant' }
];

// Current astrological data (hypothetical for July 25, 2025, 04:53 AM IST)
const currentNakshatraIndex = 10; // Purva Phalguni
const isFavorableTithi = true;    // Shukla Dwitiya
const isFavorableDay = true;      // Friday
const isWaxingMoon = true;        // Waxing phase

// Function to calculate Tara Bala (favorable if Sampat, Kshema, Sadhana, Mitra, Parama Mitra)
function getTaraBala(selectedIndex, currentIndex) {
    const diff = (currentIndex - selectedIndex + 27) % 9;
    return [2, 4, 6, 8, 0].includes(diff); // Favorable Tara positions
}

// Function to calculate Yoni compatibility (simplified)
function getCompatibility(selectedYoni, otherYoni) {
    return selectedYoni === otherYoni ? 100 : 50; // 100% if same Yoni, 50% otherwise
}

// Populate the dropdown with Nakshatras
const select = document.getElementById('janma-nakshatra');
nakshatras.forEach((nakshatra, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = nakshatra.name;
    select.appendChild(option);
});

// Event listener for Nakshatra selection
select.addEventListener('change', function() {
    const selectedIndex = parseInt(this.value);
    if (isNaN(selectedIndex)) {
        document.getElementById('compatibility-list').classList.add('hidden');
        document.getElementById('suitability').classList.add('hidden');
        return;
    }

    const selectedNakshatra = nakshatras[selectedIndex];
    const selectedYoni = selectedNakshatra.yoni;

    // Generate compatibility list
    const compatibilityList = document.querySelector('#compatibility-list ul');
    compatibilityList.innerHTML = '';
    nakshatras.forEach(nakshatra => {
        const compatibility = getCompatibility(selectedYoni, nakshatra.yoni);
        const li = document.createElement('li');
        li.textContent = `${nakshatra.name}: ${compatibility}%`;
        li.className = compatibility === 100 ? 'text-green-600' : 'text-yellow-600';
        compatibilityList.appendChild(li);
    });
    document.getElementById('compatibility-list').classList.remove('hidden');

    // Calculate dating suitability
    const isFavorableTara = getTaraBala(selectedIndex, currentNakshatraIndex);
    const score = (
        (isFavorableTara ? 1 : 0) * 0.4 + 
        (isFavorableTithi ? 1 : 0) * 0.2 + 
        (isFavorableDay ? 1 : 0) * 0.2 + 
        (isWaxingMoon ? 1 : 0) * 0.1
    );
    const percentage = Math.round(score * 100);
    let rating = '';
    let colorClass = '';
    if (percentage > 70) {
        rating = 'Highly Favorable';
        colorClass = 'text-green-600';
    } else if (percentage >= 50) {
        rating = 'Moderately Favorable';
        colorClass = 'text-yellow-600';
    } else {
        rating = 'Not Favorable';
        colorClass = 'text-red-600';
    }

    const suitabilityText = document.getElementById('suitability-text');
    suitabilityText.textContent = `${rating} (${percentage}%)`;
    suitabilityText.className = `text-lg ${colorClass}`;
    document.getElementById('suitability').classList.remove('hidden');
});
