const nakshatras = [
    { name: 'Ashwini', malayalam: 'അശ്വിനി', index: 0, ruling: 'Ketu' },
    { name: 'Bharani', malayalam: 'ഭരണി', index: 1, ruling: 'Venus' },
    // ... Add all 27 + Abhijit { name: 'Abhijit', malayalam: 'അഭിജിത്', index: 27, ruling: 'Brahma' }
    // Full list omitted for brevity; include as in prior code.
];

function getCurrentDateData() {
    const now = new Date(2025, 6, 25, 5, 0, 0); // Simulate July 25, 2025, 5 AM IST
    const dayOfWeek = now.getDay(); // 5 = Friday
    const isFavorableDay = dayOfWeek === 5;
    const currentNakIndex = 7; // Pushya (from data)
    const isWaxing = true; // Shukla Paksha
    const isFavorableTithi = true; // Pratipada
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
    for (let days = 1; days <= 7; days++) {
        const futureIndex = (currentIndex + days) % 28;
        if (isFavorableTara(getTaraPosition(seekerIndex, futureIndex)) && isFavorableTara(getTaraPosition(partnerIndex, futureIndex))) {
            const futureDate = new Date(2025, 6, 25 + days);
            return `${futureDate.toLocaleDateString()} , 7:00 PM IST`;
        }
    }
    return 'Within next week';
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
    }).sort((a,b) => b.compat - a.compat);

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
