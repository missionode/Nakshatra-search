// script.js

// Nakshatra Data with Malayalam prefix
const nakshatraData = [
  { name: "Ashwini", malayalam: "അശ്വതി" },
  { name: "Bharani", malayalam: "ഭരണി" },
  { name: "Krittika", malayalam: "കാർത്തിക" },
  { name: "Rohini", malayalam: "റോഹിണി" },
  { name: "Mrigashira", malayalam: "മകം" },
  { name: "Ardra", malayalam: "തിരുവാതിര" },
  { name: "Punarvasu", malayalam: "പുണർതം" },
  { name: "Pushya", malayalam: "പൂയം" },
  { name: "Ashlesha", malayalam: "ആയില്യം" },
  { name: "Magha", malayalam: "മകം" },
  { name: "Purva Phalguni", malayalam: "പൂരം" },
  { name: "Uttara Phalguni", malayalam: "ഉത്രം" },
  { name: "Hasta", malayalam: "അസ്ഥം" },
  { name: "Chitra", malayalam: "ചിത്തിര" },
  { name: "Swati", malayalam: "ചോതി" },
  { name: "Vishakha", malayalam: "വിശാഖം" },
  { name: "Anuradha", malayalam: "അനിഴം" },
  { name: "Jyeshtha", malayalam: "തൃക്കേട്ട" },
  { name: "Mula", malayalam: "മൂലം" },
  { name: "Purva Ashadha", malayalam: "പൂർവഷാഡ" },
  { name: "Uttara Ashadha", malayalam: "ഉത്തരഷാഡ" },
  { name: "Shravana", malayalam: "തിരുവോണം" },
  { name: "Dhanishta", malayalam: "അവിട്ടം" },
  { name: "Shatabhisha", malayalam: "ചതയം" },
  { name: "Purva Bhadrapada", malayalam: "പൂർവപ്രോഷഠപാദം" },
  { name: "Uttara Bhadrapada", malayalam: "ഉത്തറപ്രോഷഠപാദം" },
  { name: "Revati", malayalam: "രേവതി" }
];

function getTodayNakshatra() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % 27;
  return nakshatraData[index];
}

function calculateResults(todayNakshatra, referenceNakshatra) {
  const results = [];

  if (todayNakshatra.name !== referenceNakshatra.name) {
    const safe = (todayNakshatra.name.length + referenceNakshatra.name.length) % 2 === 0;
    const dating = (todayNakshatra.name.charCodeAt(0) % 3) === (referenceNakshatra.name.charCodeAt(0) % 3);
    const consent = (todayNakshatra.name.length % 2) === 1 && (referenceNakshatra.name.length % 2) === 1;
    const fertility = (todayNakshatra.name.charCodeAt(1) + referenceNakshatra.name.charCodeAt(1)) % 5 > 2;

    if (safe) results.push("🛡️ Safety Period: Yes");
    if (dating) results.push("🌱 Dating Interest: Yes");
    if (consent) results.push("💖 Consent: Yes");
    if (fertility) results.push("🧬 Fertility Chance: High");
  }

  return results;
}

function renderResults() {
  const select = document.getElementById("referenceSelect");
  const referenceName = select.value;
  const referenceNakshatra = nakshatraData.find(n => n.name === referenceName);

  const todayNakshatra = getTodayNakshatra();
  const results = calculateResults(todayNakshatra, referenceNakshatra);

  const display = document.getElementById("results");
  display.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = `Today's Nakshatra: ${todayNakshatra.malayalam} (${todayNakshatra.name})`;
  display.appendChild(heading);

  if (results.length === 0) {
    const noResults = document.createElement("p");
    noResults.textContent = "No positive indications today.";
    display.appendChild(noResults);
  } else {
    const ul = document.createElement("ul");
    results.forEach(result => {
      const li = document.createElement("li");
      li.textContent = result;
      ul.appendChild(li);
    });
    display.appendChild(ul);
  }
}

document.getElementById("referenceSelect").addEventListener("change", renderResults);

// Initialize on load
document.addEventListener("DOMContentLoaded", renderResults);
