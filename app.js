
document.addEventListener("DOMContentLoaded", () => {

  const nakshatraList = [
    "Ashwini~അശ്വതി", "Bharani~ഭരണി", "Krittika~കാർത്തിക", "Rohini~രോഹിണി", "Mrigashira~മകയിരം",
    "Ardra~തിരുവാതിര", "Punarvasu~പുനഃർതം", "Pushya~പൂയം", "Ashlesha~ആയില്യം", "Magha~മകം",
    "Purva Phalguni~ഉത്രം", "Uttara Phalguni~അത്തം", "Hasta~ചിത്തിര", "Chitra~ചോതി", "Swati~വിശാഖം",
    "Vishakha~അനിഴം", "Anuradha~തൃക്കേട്ട", "Jyeshtha~തൃക്കേട്ട", "Mula~മൂലം", "Purva Ashadha~പൂരാടം",
    "Uttara Ashadha~ഉത്രാടം", "Shravana~തിരുവോണം", "Dhanishta~അവിട്ടം", "Shatabhisha~ചതയം", "Purva Bhadrapada~പൂരുരുട്ടാതി",
    "Uttara Bhadrapada~ഉത്രട്ടാതി", "Revati~രേവതി"
  ];

 
  const resultsContainer = document.getElementById("results");

  function getTodaysNakshatraIndex() {
    const baseDate = new Date("2020-01-01");
    const today = new Date();
    const daysElapsed = Math.floor((today - baseDate) / (1000 * 60 * 60 * 24));
    return daysElapsed % 27;
  }

  function calculateInsight(index) {
    const nak = nakshatraList[index];
    const dayNumber = index + 1;

    // Example pattern formulas (simplified; you can expand later)
    const isSafe = dayNumber % 2 === 0;
    const interestedInDating = (dayNumber % 3 === 1 || dayNumber === 7);
    const consentPossible = (dayNumber % 5 === 0 || nak.includes("Ash"));
    const oppositionLikely = (dayNumber % 4 === 0 && !nak.includes("Pu"));
    const fertility = (dayNumber % 3 === 0 || dayNumber === 6);

    // Only show if at least one positive insight
    if (isSafe || interestedInDating || consentPossible || fertility) {
      return {
        nakshatra: nak,
        isSafe,
        interestedInDating,
        consentPossible,
        oppositionLikely,
        fertility
      };
    }

    return null;
  }

  function renderInsightCard(insight) {
    const card = document.createElement("div");
    card.className = "insight-card";

    card.innerHTML = `
      <h2>${insight.nakshatra}</h2>
      <ul>
        ${insight.isSafe ? "<li>✅ Safety period active</li>" : ""}
        ${insight.interestedInDating ? "<li>💞 Likely open to dating</li>" : ""}
        ${insight.consentPossible ? "<li>💬 Openness to intimacy</li>" : ""}
        ${insight.fertility ? "<li>🌸 Fertility is high</li>" : ""}
      </ul>
    `;

    resultsContainer.appendChild(card);
  }

  function runApp() {
    resultsContainer.innerHTML = "";

    const todayIndex = getTodaysNakshatraIndex();

    for (let i = 0; i < nakshatraList.length; i++) {
      const result = calculateInsight(i);
      if (result) {
        renderInsightCard(result);
      }
    }

    const info = document.createElement("div");
    info.className = "footer-note";
    info.innerHTML = `<p><strong>Today's reference Nakshatra Index:</strong> ${todayIndex + 1} (${nakshatraList[todayIndex]})</p>`;
    resultsContainer.appendChild(info);
  }

  runApp();
});
