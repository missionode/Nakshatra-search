const nakshatras = [
  { name: "അശ്വിനി Ashwini", id: "Ashwini" },
  { name: "ഭരണി Bharani", id: "Bharani" },
  { name: "കൃതിക Krittika", id: "Krittika" },
  { name: "രോഹിണി Rohini", id: "Rohini" },
  { name: "മൃഗശിര Mrigashira", id: "Mrigashira" },
  { name: "ആര്ദ്ര Ardra", id: "Ardra" },
  { name: "പുനർവസു Punarvasu", id: "Punarvasu" },
  { name: "പുഷ്യ Pushya", id: "Pushya" },
  { name: "ആശ്ലേഷ Ashlesha", id: "Ashlesha" },
  { name: "മകം Magha", id: "Magha" },
  { name: "പൂർവഫൽഗുണി Purva Phalguni", id: "Purva Phalguni" },
  { name: "ഉത്തരഫൽഗുണി Uttara Phalguni", id: "Uttara Phalguni" },
  { name: "ഹസ്ത Hast", id: "Hasta" },
  { name: "ചിത Chitra", id: "Chitra" },
  { name: "സ്വാതി Swati", id: "Swati" },
  { name: "വിശാഖ Visakha", id: "Visakha" },
  { name: "അനൂരാധ Anuradha", id: "Anuradha" },
  { name: "ജ്യേഷ്ഠ Jyeshtha", id: "Jyeshtha" },
  { name: "മൂല Mula", id: "Mula" },
  { name: "പൂർവാഷാഢ Purva Ashadha", id: "Purva Ashadha" },
  { name: "ഉത്തരാഷാഢ Uttara Ashadha", id: "Uttara Ashadha" },
  { name: "ശ്രവണ Shravana", id: "Shravana" },
  { name: "ധനിഷ്ഠ Dhanishta", id: "Dhanishta" },
  { name: "ശതഭിഷ Shatabhisha", id: "Shatabhisha" },
  { name: "പൂർവഭാദ്രപദ Purva Bhadrapada", id: "Purva Bhadrapada" },
  { name: "ഉത്തരഭാദ്രപദ Uttara Bhadrapada", id: "Uttara Bhadrapada" },
  { name: "രേവതി Revati", id: "Revati" }
];

const nakshatraMap = {};
nakshatras.forEach((n, i) => nakshatraMap[n.id] = i);

function getDailySeed() {
  const date = new Date();
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

function getPatternMatches(seed, referenceIndex) {
  const result = [];
  for (let i = 0; i < nakshatras.length; i++) {
    const val = (seed + referenceIndex * i * 7) % 100;
    if (val % 11 === 0 || val % 13 === 0 || val % 7 === 0) {
      result.push(nakshatras[i].name);
    }
  }
  return result;
}

function populateSelect() {
  const select = document.getElementById("refNakshatra");
  nakshatras.forEach(n => {
    const opt = document.createElement("option");
    opt.value = n.id;
    opt.textContent = n.name;
    if (n.id === "Mula") opt.selected = true;
    select.appendChild(opt);
  });
  select.addEventListener("change", refreshResults);
}

function refreshResults() {
  const ref = document.getElementById("refNakshatra").value;
  const index = nakshatraMap[ref];
  const seed = getDailySeed();
  const matched = getPatternMatches(seed, index);

  const container = document.getElementById("results");
  container.innerHTML = "";
  matched.forEach(item => {
    const div = document.createElement("div");
    div.className = "result-item";
    div.textContent = item;
    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateSelect();
  refreshResults();
});
