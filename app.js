// Nakshatras with indices and Yonis
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

// Simulated astrological data based on current date (for prototype)
function getCurrentAstroData() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 5 = Friday
    // Simulate Nakshatra based on day of month (27 Nakshatras, cycle every 27 days)
    const dayOfMonth = now.getDate();
    const currentNakshatraIndex = (dayOfMonth - 1) % 27;
    // Simulate waxing/waning Moon based on date (approximate 15-day cycle)
    const isWaxingMoon = dayOfMonth <= 15;
    // Simulate favorable Tithi (assume true for simplicity)
    const isFavorableTithi = dayOfMonth % 2 === 0; // Even days as favorable
    const isFavorableDay = dayOfWeek === 5; // Friday
    return { currentNakshatraIndex, isFavorableTithi, isFavorableDay, isWaxingMoon };
}

// Calculate Tara position
function getTaraPosition(birthIndex, currentIndex) {
    return (currentIndex - birthIndex + 27) % 9;
}

// Check if Tara is favorable
function isFavorableTara(position) {
    return [2, 4, 6, 8, 0].includes(position); // Sampat, Kshema, Sadhana, Mitra, Parama Mitra
}

// Get Tara score for initiation decision
function getTaraScore(position) {
    const scores = {
        0: 5, // Parama Mitra
        8: 4, // Mitra
        6: 3, // Sadhana
        4: 2, // Kshema
        2: 1, // Sampat
        1: 0, // Janma
        3: -1, // Vipat
        5: -2, // Pratyak
        7: -3 // Naidhana
    };
    return scores[position] || 0;
}

// Calculate compatibility (simplified Yoni Kuta)
function getCompatibility(seekerYoni, partnerYoni) {
    return seekerYoni === partnerYoni ? 100 : 50;
}

// Populate dropdowns
const seekerSelect = document.getElementById('seeker-nakshatra');
const partnerSelect = document.getElementById('partner-nakshatra');
nakshatras.forEach((nakshatra, index) => {
    const optionSeeker = document.createElement('option');
    optionSeeker.value = index;
    optionSeeker.textContent = nakshatra.name;
    seekerSelect.appendChild(optionSeeker);
    const optionPartner = document.createElement('option');
    optionPartner.value = index;
    optionPartner.textContent = nakshatra.name;
    partnerSelect.appendChild(optionPartner);
});

// Update insights when selections change
function updateInsights() {
    const seekerIndex = parseInt(seekerSelect.value);
    const partnerIndex = parseInt(partnerSelect.value);
    if (isNaN(seekerIndex) || isNaN(partnerIndex)) {
        document.getElementById('results').classList.add('hidden');
        return;
    }

    const seekerNakshatra = nakshatras[seekerIndex];
    const partnerNakshatra = nakshatras[partnerIndex];
    const compatibility = getCompatibility(seekerNakshatra.yoni, partnerNakshatra.yoni);

    // Get current astrological data
    const { currentNakshatraIndex, isFavorableTithi, isFavorableDay, isWaxingMoon } = getCurrentAstroData();

    // Calculate factors
    const seekerTaraPosition = getTaraPosition(seekerIndex, currentNakshatraIndex);
    const safePeriod = isFavorableTara(seekerTaraPosition);
    const datingInterest = isFavorableDay;
    const partnerConsent = isFavorableTithi;
    const fertileStatus = isWaxingMoon;
    const isHighCompatibility = compatibility > 75;

    // Calculate confidence score
    const factors = [isHighCompatibility, safePeriod, datingInterest, partnerConsent, fertileStatus];
    const favorableCount = factors.filter(Boolean).length;
    const confidenceScore = (favorableCount / 5) * 100;

    // Determine who should initiate
    let engageSuggestion = '';
    if (confidenceScore > 70) {
        const seekerScore = getTaraScore(seekerTaraPosition);
        const partnerTaraPosition = getTaraPosition(partnerIndex, currentNakshatraIndex);
        const partnerScore = getTaraScore(partnerTaraPosition);
        engageSuggestion = seekerScore >= partnerScore ? 'You (Seeker) should initiate.' : 'Partner should initiate.';
    }

    // Display results
    document.getElementById('compatibility').textContent = `Compatibility: ${compatibility}%`;
    const factorsList = document.getElementById('factors');
    factorsList.innerHTML = '';
    ['High Compatibility (>75%)', 'Safe Period', 'Dating Interest', 'Partner/Guardian Consent', 'Fertile Status'].forEach((factor, i) => {
        const li = document.createElement('li');
        li.textContent = `${factor}: ${factors[i] ? 'Yes' : 'No'}`;
        li.className = factors[i] ? 'text-green-600' : 'text-red-600';
        factorsList.appendChild(li);
    });
    const confidenceText = document.getElementById('confidence');
    confidenceText.textContent = confidenceScore > 70 ? `Best Time to Engage - ${engageSuggestion}` : 'Not the best time—wait for better conditions.';
    confidenceText.className = confidenceScore > 70 ? 'text-green-600' : 'text-red-600';
    document.getElementById('results').classList.remove('hidden');
}

// Add event listeners
seekerSelect.addEventListener('change', updateInsights);
partnerSelect.addEventListener('change', updateInsights);

// Initial update (optional, if pre-selected)
updateInsights();
