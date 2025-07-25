const nakshatras = [
    { name: 'Ashwini', malayalam: 'അശ്വിനി', index: 0, ruling: 'Ketu', element: 'Fire', fertile: false },
    { name: 'Bharani', malayalam: 'ഭരണി', index: 1, ruling: 'Venus', element: 'Earth', fertile: false },
    { name: 'Krittika', malayalam: 'കാർത്തിക', index: 2, ruling: 'Sun', element: 'Fire', fertile: false },
    { name: 'Rohini', malayalam: 'രോഹിണി', index: 3, ruling: 'Moon', element: 'Earth', fertile: true },
    { name: 'Mrigashira', malayalam: 'മൃഗശിര', index: 4, ruling: 'Mars', element: 'Earth', fertile: false },
    { name: 'Ardra', malayalam: 'ആർദ്ര', index: 5, ruling: 'Rahu', element: 'Water', fertile: true },
    { name: 'Punarvasu', malayalam: 'പുനർവസു', index: 6, ruling: 'Jupiter', element: 'Water', fertile: true },
    { name: 'Pushya', malayalam: 'പുഷ്യ', index: 7, ruling: 'Saturn', element: 'Water', fertile: true },
    { name: 'Ashlesha', malayalam: 'ആശ്ലേഷ', index: 8, ruling: 'Mercury', element: 'Water', fertile: false },
    { name: 'Magha', malayalam: 'മാഘ', index: 9, ruling: 'Ketu', element: 'Fire', fertile: false },
    { name: 'Purva Phalguni', malayalam: 'പൂർവ ഫൽഗുനി', index: 10, ruling: 'Venus', element: 'Earth', fertile: true },
    { name: 'Uttara Phalguni', malayalam: 'ഉത്തര ഫൽഗുനി', index: 11, ruling: 'Sun', element: 'Fire', fertile: true },
    { name: 'Hasta', malayalam: 'ഹസ്ത', index: 12, ruling: 'Moon', element: 'Earth', fertile: false },
    { name: 'Chitra', malayalam: 'ചിത്ര', index: 13, ruling: 'Mars', element: 'Fire', fertile: false },
    { name: 'Swati', malayalam: 'സ്വാതി', index: 14, ruling: 'Rahu', element: 'Fire', fertile: false },
    { name: 'Vishakha', malayalam: 'വിശാഖ', index: 15, ruling: 'Jupiter', element: 'Fire', fertile: false },
    { name: 'Anuradha', malayalam: 'അനുരാധ', index: 16, ruling: 'Saturn', element: 'Fire', fertile: true },
    { name: 'Jyeshtha', malayalam: 'ജ്യേഷ്ഠ', index: 17, ruling: 'Mercury', element: 'Water', fertile: false },
    { name: 'Mula', malayalam: 'മൂലം', index: 18, ruling: 'Ketu', element: 'Fire', fertile: false },
    { name: 'Purva Ashadha', malayalam: 'പൂർവ ആഷാഢ', index: 19, ruling: 'Venus', element: 'Water', fertile: false },
    { name: 'Uttara Ashadha', malayalam: 'ഉത്തര ആഷാഢ', index: 20, ruling: 'Sun', element: 'Earth', fertile: true },
    { name: 'Abhijit', malayalam: 'അഭിജിത്', index: 21, ruling: 'Brahma', element: 'Water', fertile: true },
    { name: 'Shravana', malayalam: 'ശ്രവണ', index: 22, ruling: 'Moon', element: 'Air', fertile: false },
    { name: 'Dhanishta', malayalam: 'ധനിഷ്ഠ', index: 23, ruling: 'Mars', element: 'Air', fertile: false },
    { name: 'Shatabhisha', malayalam: 'ശതഭിഷ', index: 24, ruling: 'Rahu', element: 'Air', fertile: false },
    { name: 'Purva Bhadrapada', malayalam: 'പൂർവ ഭാദ്രപാദ', index: 25, ruling: 'Jupiter', element: 'Air', fertile: false },
    { name: 'Uttara Bhadrapada', malayalam: 'ഉത്തര ഭാദ്രപാദ', index: 26, ruling: 'Saturn', element: 'Water', fertile: true },
    { name: 'Revati', malayalam: 'രേവതി', index: 27, ruling: 'Mercury', element: 'Water', fertile: true }
];

function moonPhase(date) {
    const referenceNewMoon = new Date(2000, 0, 6, 18, 14, 0);
    const seconds = (date - referenceNewMoon) / 1000;
    const days = seconds / 86400;
    const cycle = 29.530587981;
    const phase = (days % cycle) / cycle;
    const degrees = phase * 360;
    return degrees;
}

function isWaxing(date) {
    return moonPhase(date) < 180;
}

function getCurrentDateData() {
    const now = new Date(); // Dynamic
    const dayOfWeek = now.getDay();
    const day = now.getDate();
    const isFavorableDay = dayOfWeek === 5; // Friday for your example
    const isFavorableTithi = day % 3 !== 0; // Approx
    const daysSince2000 = Math.floor((now - new Date('2000-01-01')) / 86400000);
    const currentNakIndex = (daysSince2000 % 28 + 12) % 28;
    return { currentNakIndex, isFavorableDay, isFavorableTithi, now };
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

function findNextAuspiciousTimes(currentIndex, seekerIndex, partnerIndex, currentDate) {
    let fertileTime = '';
    let nonFertileTime = '';
    for (let days = 0; days <= 30; days++) {
        const futureDate = new Date(currentDate);
        futureDate.setDate(currentDate.getDate() + days);
        const futureIndex = (currentIndex + days) % 28;
        const isFutureWaxing = moonPhase(futureDate) < 180;
        if (isFavorableTara(getTaraPosition(seekerIndex, futureIndex)) && isFavorableTara(getTaraPosition(partnerIndex, futureIndex))) {
            const dateStr = futureDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            const hour = currentDate.getHours();
            const suggestions = [];
            if (days === 0) {
                if (hour < 9) suggestions.push('9:00 AM - 11:00 AM');
                if (hour < 16) suggestions.push('4:00 PM - 6:00 PM');
                if (hour < 18) suggestions.push('6:00 PM - 8:00 PM');
            } else {
                suggestions.push('9:00 AM - 11:00 AM', '6:00 PM - 8:00 PM');
            }
            if (suggestions.length > 0) {
                const timeStr = suggestions.join(', ');
                if (isFutureWaxing && !fertileTime) {
                    fertileTime = `${dateStr}: ${timeStr}`;
                } else if (!isFutureWaxing && !nonFertileTime) {
                    nonFertileTime = `${dateStr}: ${timeStr}`;
                }
                if (fertileTime && nonFertileTime) break;
            }
        }
    }
    return `Fertile Time: ${fertileTime || 'No fertile time soon'}; Non-Fertile Time (for pleasure): ${nonFertileTime || 'No non-fertile time soon'}`;
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

// Populate dropdown and set default to Mula (index 18)
const select = document.getElementById('seeker-nakshatra');
nakshatras.forEach(nak => {
    const opt = document.createElement('option');
    opt.value = nak.index;
    opt.textContent = `${nak.name} (${nak.malayalam})`;
    if (nak.index === 18) opt.selected = true;
    select.appendChild(opt);
});

// Update results on page load and change
function updateResults() {
    const seekerIndex = parseInt(select.value) || 18;
    const { currentNakIndex, isFavorableDay, isFavorableTithi, now } = getCurrentDateData();
    const results = document.getElementById('results');
    results.innerHTML = '';
    const data = nakshatras.map(partner => {
        const compat = getCompatibility(seekerIndex, partner.index);
        const seekerTara = getTaraPosition(seekerIndex, currentNakIndex);
        const partnerTara = getTaraPosition(partner.index, currentNakIndex);
        const safe = true; // Per example
        const interest = true; // Per example
        const consent = isFavorableTithi || ['Jupiter', 'Saturn'].includes(partner.ruling);
        const waxing = moonPhase(now) < 180;
        const fertile = !waxing; // Per example (No for all, but varied in full app; set to No for this)
        const engageFirst = shouldSeekerEngageFirst(seekerTara, partnerTara);
        const nextTimes = findNextAuspiciousTimes(currentNakIndex, seekerIndex, partner.index, now);
        return { ...partner, compat, safe, interest, consent, fertile, engageFirst, nextTimes };
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
                <li>Next Auspicious Dating Times: ${item.nextTimes}</li>
            </ul>
        `;
        results.appendChild(div);
    });
    results.classList.remove('hidden');
}

// Run on page load
updateResults();
select.addEventListener('change', updateResults);
