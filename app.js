const nakshatras = [
    { name: 'Ashwini', malayalam: 'അശ്വിനി', index: 0, ruling: 'Ketu', element: 'Fire' },
    { name: 'Bharani', malayalam: 'ഭരണി', index: 1, ruling: 'Venus', element: 'Earth' },
    { name: 'Krittika', malayalam: 'കാർത്തിക', index: 2, ruling: 'Sun', element: 'Fire' },
    { name: 'Rohini', malayalam: 'രോഹിണി', index: 3, ruling: 'Moon', element: 'Earth' },
    { name: 'Mrigashira', malayalam: 'മൃഗശിര', index: 4, ruling: 'Mars', element: 'Earth' },
    { name: 'Ardra', malayalam: 'ആർദ്ര', index: 5, ruling: 'Rahu', element: 'Water' },
    { name: 'Punarvasu', malayalam: 'പുനർവസു', index: 6, ruling: 'Jupiter', element: 'Water' },
    { name: 'Pushya', malayalam: 'പുഷ്യ', index: 7, ruling: 'Saturn', element: 'Water' },
    { name: 'Ashlesha', malayalam: 'ആശ്ലേഷ', index: 8, ruling: 'Mercury', element: 'Water' },
    { name: 'Magha', malayalam: 'മാഘ', index: 9, ruling: 'Ketu', element: 'Fire' },
    { name: 'Purva Phalguni', malayalam: 'പൂർവ ഫൽഗുനി', index: 10, ruling: 'Venus', element: 'Earth' },
    { name: 'Uttara Phalguni', malayalam: 'ഉത്തര ഫൽഗുനി', index: 11, ruling: 'Sun', element: 'Fire' },
    { name: 'Hasta', malayalam: 'ഹസ്ത', index: 12, ruling: 'Moon', element: 'Earth' },
    { name: 'Chitra', malayalam: 'ചിത്ര', index: 13, ruling: 'Mars', element: 'Fire' },
    { name: 'Swati', malayalam: 'സ്വാതി', index: 14, ruling: 'Rahu', element: 'Fire' },
    { name: 'Vishakha', malayalam: 'വിശാഖ', index: 15, ruling: 'Jupiter', element: 'Fire' },
    { name: 'Anuradha', malayalam: 'അനുരാധ', index: 16, ruling: 'Saturn', element: 'Fire' },
    { name: 'Jyeshtha', malayalam: 'ജ്യേഷ്ഠ', index: 17, ruling: 'Mercury', element: 'Water' },
    { name: 'Mula', malayalam: 'മൂലം', index: 18, ruling: 'Ketu', element: 'Fire' },
    { name: 'Purva Ashadha', malayalam: 'പൂർവ ആഷാഢ', index: 19, ruling: 'Venus', element: 'Water' },
    { name: 'Uttara Ashadha', malayalam: 'ഉത്തര ആഷാഢ', index: 20, ruling: 'Sun', element: 'Earth' },
    { name: 'Abhijit', malayalam: 'അഭിജിത്', index: 21, ruling: 'Brahma', element: 'Water' },
    { name: 'Shravana', malayalam: 'ശ്രവണ', index: 22, ruling: 'Moon', element: 'Air' },
    { name: 'Dhanishta', malayalam: 'ധനിഷ്ഠ', index: 23, ruling: 'Mars', element: 'Air' },
    { name: 'Shatabhisha', malayalam: 'ശതഭിഷ', index: 24, ruling: 'Rahu', element: 'Air' },
    { name: 'Purva Bhadrapada', malayalam: 'പൂർവ ഭാദ്രപാദ', index: 25, ruling: 'Jupiter', element: 'Air' },
    { name: 'Uttara Bhadrapada', malayalam: 'ഉത്തര ഭാദ്രപാദ', index: 26, ruling: 'Saturn', element: 'Water' },
    { name: 'Revati', malayalam: 'രേവതി', index: 27, ruling: 'Mercury', element: 'Water' }
];

function getCurrentDateData() {
    const now = new Date(); // Dynamic current date and time
    const dayOfWeek = now.getDay();
    const day = now.getDate();
    const isFavorableDay = ['Venus', 'Mars'].includes(nakshatras.find(n => n.index === ((day + now.getMonth() + now.getFullYear()) % 28)).ruling) || [3, 5].includes(dayOfWeek);
    const isWaxing = day <= 15;
    const isFavorableTithi = ['Jupiter', 'Saturn'].includes(nakshatras.find(n => n.index === ((day + now.getMonth() + now.getFullYear()) % 28)).ruling) || (day % 3 !== 0);
    const daysSince2000 = Math.floor((now - new Date('2000-01-01')) / 86400000);
    const currentNakIndex = (daysSince2000 % 28 + 12) % 28; // Calibrated
    return { currentNakIndex, isFavorableDay, isWaxing, isFavorableTithi };
}

function getTaraPosition(seekerIndex, targetIndex) {
    return (targetIndex - seekerIndex + 28) % 9;
}

function isFavorableTara(position) {
    return [0, 2, 4, 6, 8].includes(position);
}

function getCompatibility(seekerIndex, partnerIndex) {
    return Math.round(100 - (Math.abs(seekerIndex - partnerIndex) / 28 * 100));
}

function findNextAuspiciousTime(currentIndex, seekerIndex, partnerIndex) {
    const now = new Date();
    for (let days = 1; days <= 7; days++) {
        const futureIndex = (currentIndex + days) % 28;
        if (isFavorableTara(getTaraPosition(seekerIndex, futureIndex)) && isFavorableTara(getTaraPosition(partnerIndex, futureIndex))) {
            const futureDate = new Date(now);
            futureDate.setDate(now.getDate() + days);
            return `${futureDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, 7:00 PM local time`;
        }
    }
    return 'Within the next week';
}

function shouldSeekerEngageFirst(seekerTara, partnerTara) {
    const scores = { 0: 5, 2: 4, 4: 3, 6: 2, 8: 1, 1: 0, 3: -1, 5: -2, 7: -3 };
    return (scores[seekerTara] || 0) >= (scores[partnerTara] || 0) ? 'Yes' : 'No';
}

function getCompatibilityColor(compat) {
    if (compat > 70) return 'bg-green-500';
    if (compat >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
}

// Populate dropdown and set default to Rohini (index 3)
const select = document.getElementById('seeker-nakshatra');
nakshatras.forEach(nak => {
    const opt = document.createElement('option');
    opt.value = nak.index;
    opt.textContent = `${nak.name} (${nak.malayalam})`;
    if (nak.index === 3) opt.selected = true; // Default to Rohini
    select.appendChild(opt);
});

// Update results on page load and change
function updateResults() {
    const seekerIndex = parseInt(select.value) || 3; // Default to Rohini
    const { currentNakIndex, isFavorableDay, isWaxing, isFavorableTithi } = getCurrentDateData();
    const results = document.getElementById('results');
    results.innerHTML = '';
    const data = nakshatras.map(partner => {
        const compat = getCompatibility(seekerIndex, partner.index);
        const seekerTara = getTaraPosition(seekerIndex, currentNakIndex);
        const partnerTara = getTaraPosition(partner.index, currentNakIndex);
        const safe = isFavorableTara(seekerTara);
        const interest = isFavorableDay || ['Venus', 'Mars'].includes(partner.ruling);
        const consent = isFavorableTithi || ['Jupiter', 'Saturn'].includes(partner.ruling);
        const fertile = isWaxing && ['Water', 'Earth'].includes(partner.element);
        const engageFirst = shouldSeekerEngageFirst(seekerTara, partnerTara);
        const nextTime = findNextAuspiciousTime(currentNakIndex, seekerIndex, partner.index);
        return { ...partner, compat, safe, interest, consent, fertile, engageFirst, nextTime };
    }).sort((a, b) => b.compat - a.compat);

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'p-2 border-b';
        div.innerHTML = `
            <p class="font-bold flex items-center">
                <span class="inline-block w-3 h-3 rounded-full ${getCompatibilityColor(item.compat)} mr-2"></span>
                ${item.name} (${item.malayalam}) - Compatibility: ${item.compat}%
            </p>
            <ul class="text-sm">
                <li>Safe Period: <span class="${item.safe ? 'text-green-600' : 'text-red-600'}">${item.safe ? 'Yes' : 'No'}</span></li>
                <li>Dating Interest: <span class="${item.interest ? 'text-green-600' : 'text-red-600'}">${item.interest ? 'Yes' : 'No'}</span></li>
                <li>Partner/Guardian Consent: <span class="${item.consent ? 'text-green-600' : 'text-red-600'}">${item.consent ? 'Yes' : 'No'}</span></li>
                <li>Fertile Status: <span class="${item.fertile ? 'text-green-600' : 'text-red-600'}">${item.fertile ? 'Yes' : 'No'}</span></li>
                <li>Should Seeker Engage First: <span class="${item.engageFirst === 'Yes' ? 'text-green-600' : 'text-red-600'}">${item.engageFirst}</span></li>
                <li>Next Auspicious Dating Time: ${item.nextTime}</li>
            </ul>
        `;
        results.appendChild(div);
    });
    results.classList.remove('hidden');
}

// Run on page load
updateResults();
select.addEventListener('change', updateResults);
