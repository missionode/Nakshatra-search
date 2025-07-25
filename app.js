const nakshatras = [
    { name: 'Ashwini', malayalam: 'അശ്വിനി', index: 0, ruling: 'Ketu' },
    { name: 'Bharani', malayalam: 'ഭരണി', index: 1, ruling: 'Venus' },
    { name: 'Krittika', malayalam: 'കാർത്തിക', index: 2, ruling: 'Sun' },
    { name: 'Rohini', malayalam: 'രോഹിണി', index: 3, ruling: 'Moon' },
    { name: 'Mrigashira', malayalam: 'മൃഗശിര', index: 4, ruling: 'Mars' },
    { name: 'Ardra', malayalam: 'ആർദ്ര', index: 5, ruling: 'Rahu' },
    { name: 'Punarvasu', malayalam: 'പുനർവസു', index: 6, ruling: 'Jupiter' },
    { name: 'Pushya', malayalam: 'പുഷ്യ', index: 7, ruling: 'Saturn' },
    { name: 'Ashlesha', malayalam: 'ആശ്ലേഷ', index: 8, ruling: 'Mercury' },
    { name: 'Magha', malayalam: 'മാഘ', index: 9, ruling: 'Ketu' },
    { name: 'Purva Phalguni', malayalam: 'പൂർവ ഫൽഗുനി', index: 10, ruling: 'Venus' },
    { name: 'Uttara Phalguni', malayalam: 'ഉത്തര ഫൽഗുനി', index: 11, ruling: 'Sun' },
    { name: 'Hasta', malayalam: 'ഹസ്ത', index: 12, ruling: 'Moon' },
    { name: 'Chitra', malayalam: 'ചിത്ര', index: 13, ruling: 'Mars' },
    { name: 'Swati', malayalam: 'സ്വാതി', index: 14, ruling: 'Rahu' },
    { name: 'Vishakha', malayalam: 'വിശാഖ', index: 15, ruling: 'Jupiter' },
    { name: 'Anuradha', malayalam: 'അനുരാധ', index: 16, ruling: 'Saturn' },
    { name: 'Jyeshtha', malayalam: 'ജ്യേഷ്ഠ', index: 17, ruling: 'Mercury' },
    { name: 'Mula', malayalam: 'മൂലം', index: 18, ruling: 'Ketu' },
    { name: 'Purva Ashadha', malayalam: 'പൂർവ ആഷാഢ', index: 19, ruling: 'Venus' },
    { name: 'Uttara Ashadha', malayalam: 'ഉത്തര ആഷാഢ', index: 20, ruling: 'Sun' },
    { name: 'Abhijit', malayalam: 'അഭിജിത്', index: 21, ruling: 'Brahma' },
    { name: 'Shravana', malayalam: 'ശ്രവണ', index: 22, ruling: 'Moon' },
    { name: 'Dhanishta', malayalam: 'ധനിഷ്ഠ', index: 23, ruling: 'Mars' },
    { name: 'Shatabhisha', malayalam: 'ശതഭിഷ', index: 24, ruling: 'Rahu' },
    { name: 'Purva Bhadrapada', malayalam: 'പൂർവ ഭാദ്രപാദ', index: 25, ruling: 'Jupiter' },
    { name: 'Uttara Bhadrapada', malayalam: 'ഉത്തര ഭാദ്രപാദ', index: 26, ruling: 'Saturn' },
    { name: 'Revati', malayalam: 'രേവതി', index: 27, ruling: 'Mercury' }
];

function getCurrentDateData() {
    const now = new Date(); // Dynamic today's date
    const dayOfWeek = now.getDay(); // 0=Sunday, 5=Friday
    const isFavorableDay = [3,5].includes(dayOfWeek); // Wednesday/Friday favorable
    const dayOfMonth = now.getDate();
    const month = now.getMonth() + 1; // 1-12
    const year = now.getFullYear();
    // Simulate current Nakshatra index based on date (approximate 27-day cycle)
    // Real app: Fetch from API like 'https://api.example.com/panchang?date=' + now.toISOString()
    const currentNakIndex = ((dayOfMonth + month + year) % 28); // Simple hash for simulation; replace with API
    const isWaxing = dayOfMonth <= 15; // Approximate waxing for first half of month
    const isFavorableTithi = dayOfMonth % 2 === 0; // Even days favorable (simulation)
    return { currentNakIndex, isFavorableDay, isWaxing, isFavorableTithi };
}

function getTaraPosition(seekerIndex, targetIndex) {
    return (targetIndex - seekerIndex + 28) % 9;
}

function isFavorableTara(position) {
    return [0,2,4,6,8].includes(position);
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
    return seekerTara >= partnerTara ? 'Yes' : 'No';
}

// Populate dropdown
const select = document.getElementById('seeker-nakshatra');
nakshatras.forEach(nak => {
    const opt = document.createElement('option');
    opt.value = nak.index;
    opt.textContent = `${nak.name} (${nak.malayalam})`;
    select.appendChild(opt);
});

select.addEventListener('change', () => {
    const seekerIndex = parseInt(select.value);
    if (isNaN(seekerIndex)) return;
    const { currentNakIndex, isFavorableDay, isWaxing, isFavorableTithi } = getCurrentDateData();
    const results = document.getElementById('results');
    results.innerHTML = '';
    const data = nakshatras.map(partner => {
        const compat = getCompatibility(seekerIndex, partner.index);
        const seekerTara = getTaraPosition(seekerIndex, currentNakIndex);
        const partnerTara = getTaraPosition(partner.index, currentNakIndex);
        const safe = isFavorableTara(seekerTara);
        const interest = isFavorableDay;
        const consent = isFavorableTithi;
        const fertile = isWaxing;
        const engageFirst = shouldSeekerEngageFirst(seekerTara, partnerTara);
        const nextTime = findNextAuspiciousTime(currentNakIndex, seekerIndex, partner.index);
        return { ...partner, compat, safe, interest, consent, fertile, engageFirst, nextTime };
    }).sort((a, b) => b.compat - a.compat);

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'p-2 border-b';
        div.innerHTML = `
            <p class="font-bold">${item.name} (${item.malayalam}) - Compatibility: ${item.compat}%</p>
            <ul class="text-sm">
                <li>Safe Period: ${item.safe ? 'Yes' : 'No'}</li>
                <li>Dating Interest: ${item.interest ? 'Yes' : 'No'}</li>
                <li>Partner/Guardian Consent: ${item.consent ? 'Yes' : 'No'}</li>
                <li>Fertile Status: ${item.fertile ? 'Yes' : 'No'}</li>
                <li>Should Seeker Engage First: ${item.engageFirst}</li>
                <li>Next Auspicious Dating Time: ${item.nextTime}</li>
            </ul>
        `;
        results.appendChild(div);
    });
    results.classList.remove('hidden');
});
