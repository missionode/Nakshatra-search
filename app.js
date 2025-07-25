// List of 27 Nakshatras with indices
const nakshatras = [
    { name: 'Ashwini', index: 0 },
    { name: 'Bharani', index: 1 },
    { name: 'Krittika', index: 2 },
    { name: 'Rohini', index: 3 },
    { name: 'Mrigashira', index: 4 },
    { name: 'Ardra', index: 5 },
    { name: 'Punarvasu', index: 6 },
    { name: 'Pushya', index: 7 },
    { name: 'Ashlesha', index: 8 },
    { name: 'Magha', index: 9 },
    { name: 'Purva Phalguni', index: 10 },
    { name: 'Uttara Phalguni', index: 11 },
    { name: 'Hasta', index: 12 },
    { name: 'Chitra', index: 13 },
    { name: 'Swati', index: 14 },
    { name: 'Vishakha', index: 15 },
    { name: 'Anuradha', index: 16 },
    { name: 'Jyeshtha', index: 17 },
    { name: 'Mula', index: 18 },
    { name: 'Purva Ashadha', index: 19 },
    { name: 'Uttara Ashadha', index: 20 },
    { name: 'Shravana', index: 21 },
    { name: 'Dhanishta', index: 22 },
    { name: 'Shatabhisha', index: 23 },
    { name: 'Purva Bhadrapada', index: 24 },
    { name: 'Uttara Bhadrapada', index: 25 },
    { name: 'Revati', index: 26 }
];

// Tara Bala types and their compatibility scores
const taraTypes = {
    0: { name: 'Parama Mitra', score: 100 }, // Very good
    1: { name: 'Janma', score: 50 },        // Neutral
    2: { name: 'Sampat', score: 60 },       // Favorable
    3: { name: 'Vipat', score: 40 },        // Unfavorable
    4: { name: 'Kshema', score: 70 },       // Favorable
    5: { name: 'Pratyak', score: 30 },      // Unfavorable
    6: { name: 'Sadhana', score: 80 },      // Favorable
    7: { name: 'Naidhana', score: 20 },     // Very unfavorable
    8: { name: 'Mitra', score: 90 }         // Good
};

// Function to calculate Tara position between two Nakshatras
function getTaraPosition(seekerIndex, partnerIndex) {
    return (partnerIndex - seekerIndex + 27) % 9;
}

// Function to get compatibility score based on Tara position
function getCompatibilityScore(taraPosition) {
    return taraTypes[taraPosition].score;
}

// Populate the dropdown with Nakshatras
const select = document.getElementById('seeker-nakshatra');
nakshatras.forEach((nakshatra, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = nakshatra.name;
    select.appendChild(option);
});

// Event listener for Nakshatra selection
select.addEventListener('change', function() {
    const seekerIndex = parseInt(this.value);
    if (isNaN(seekerIndex)) {
        document.getElementById('compatibility-list').classList.add('hidden');
        return;
    }

    // Calculate compatibility for all Nakshatras dynamically
    const compatibilityData = nakshatras.map((partner, partnerIndex) => {
        const taraPosition = getTaraPosition(seekerIndex, partnerIndex);
        const score = getCompatibilityScore(taraPosition);
        return { name: partner.name, score };
    });

    // Sort by compatibility score in descending order (most compatible at top)
    compatibilityData.sort((a, b) => b.score - a.score);

    // Update compatibility list
    const ul = document.querySelector('#compatibility-list ul');
    ul.innerHTML = '';
    compatibilityData.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}: ${item.score}%`;
        // Color-code based on compatibility
        li.className = item.score > 70 ? 'text-green-600' : item.score >= 50 ? 'text-yellow-600' : 'text-red-600';
        ul.appendChild(li);
    });
    document.getElementById('compatibility-list').classList.remove('hidden');
});
