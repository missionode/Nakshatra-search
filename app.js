document.addEventListener("DOMContentLoaded", () => {
  const nakshatraData = {
    Ashwini: (day) => {
      const result = {};
      if (day % 2 === 0) result.safety = true;
      if ([1, 7, 15, 21, 28].includes(day)) result.dating_interest = true;
      if (day % 3 === 0) result.consent = true;
      if (day % 4 === 0) result.fertile = true;
      return result;
    },
    Bharani: (day) => {
      const result = {};
      if (day % 2 !== 0) result.safety = true;
      if ([5, 10, 20, 25].includes(day)) result.dating_interest = true;
      if (day % 5 === 0) result.consent = true;
      if ([6, 12, 18, 24, 30].includes(day)) result.fertile = true;
      return result;
    },
    Krittika: (day) => {
      const result = {};
      if (day % 6 === 0) result.safety = true;
      if ([2, 14, 26].includes(day)) result.dating_interest = true;
      if (day % 4 === 1) result.consent = true;
      if (day % 2 === 1) result.fertile = true;
      return result;
    },
    Rohini: (day) => {
      const result = {};
      if (day > 15) result.safety = true;
      if ([9, 18, 27].includes(day)) result.dating_interest = true;
      if (day % 3 === 1) result.consent = true;
      if (day < 10) result.fertile = true;
      return result;
    },
    Mrigashira: (day) => {
      const result = {};
      if (day % 3 === 2) result.safety = true;
      if ([3, 11, 19, 27].includes(day)) result.dating_interest = true;
      if (day % 6 === 0) result.consent = true;
      if (day % 7 === 0) result.fertile = true;
      return result;
    },
    Ardra: (day) => {
      const result = {};
      if ([4, 8, 12, 16].includes(day)) result.safety = true;
      if (day % 2 === 0 && day < 20) result.dating_interest = true;
      if (day % 3 === 0 && day > 10) result.consent = true;
      if (day > 20) result.fertile = true;
      return result;
    },
    Punarvasu: (day) => {
      const result = {};
      if (day % 7 === 1) result.safety = true;
      if ([5, 13, 21, 29].includes(day)) result.dating_interest = true;
      if (day % 5 === 0) result.consent = true;
      if (day % 6 === 0) result.fertile = true;
      return result;
    },
    Pushya: (day) => {
      const result = {};
      if (day % 4 === 2) result.safety = true;
      if ([6, 12, 18, 24, 30].includes(day)) result.dating_interest = true;
      if (day < 15) result.consent = true;
      if (day > 15) result.fertile = true;
      return result;
    },
    Ashlesha: (day) => {
      const result = {};
      if (day % 3 === 0) result.safety = true;
      if ([1, 10, 20].includes(day)) result.dating_interest = true;
      if (day % 2 === 0) result.consent = true;
      if ([5, 15, 25].includes(day)) result.fertile = true;
      return result;
    },
    Magha: (day) => {
      const result = {};
      if (day > 20) result.safety = true;
      if (day % 2 !== 0) result.dating_interest = true;
      if (day < 10) result.consent = true;
      if (day % 5 === 0) result.fertile = true;
      return result;
    },
    PurvaPhalguni: (day) => {
      const result = {};
      if (day % 2 === 0 && day < 15) result.safety = true;
      if ([2, 8, 22, 28].includes(day)) result.dating_interest = true;
      if (day > 15) result.consent = true;
      if (day % 3 === 0) result.fertile = true;
      return result;
    },
    UttaraPhalguni: (day) => {
      const result = {};
      if ([3, 6, 9, 12].includes(day)) result.safety = true;
      if (day % 4 === 0) result.dating_interest = true;
      if (day % 7 === 0) result.consent = true;
      if (day > 10) result.fertile = true;
      return result;
    },
    Hasta: (day) => {
      const result = {};
      if (day % 5 === 0) result.safety = true;
      if ([7, 14, 21, 28].includes(day)) result.dating_interest = true;
      if (day % 2 === 1) result.consent = true;
      if ([6, 12, 18].includes(day)) result.fertile = true;
      return result;
    },
    Chitra: (day) => {
      const result = {};
      if (day % 2 === 1) result.safety = true;
      if ([9, 18, 27].includes(day)) result.dating_interest = true;
      if (day < 15) result.consent = true;
      if (day % 3 === 0) result.fertile = true;
      return result;
    },
    Swati: (day) => {
      const result = {};
      if (day % 3 === 0) result.safety = true;
      if ([3, 13, 23].includes(day)) result.dating_interest = true;
      if (day % 4 === 0) result.consent = true;
      if (day % 5 === 0) result.fertile = true;
      return result;
    },
    Vishakha: (day) => {
      const result = {};
      if (day < 10) result.safety = true;
      if (day % 6 === 0) result.dating_interest = true;
      if (day > 20) result.consent = true;
      if ([10, 20, 30].includes(day)) result.fertile = true;
      return result;
    },
    Anuradha: (day) => {
      const result = {};
      if (day % 2 === 0) result.safety = true;
      if (day % 5 === 0) result.dating_interest = true;
      if ([7, 17, 27].includes(day)) result.consent = true;
      if (day % 3 === 1) result.fertile = true;
      return result;
    },
    Jyeshtha: (day) => {
      const result = {};
      if (day > 15) result.safety = true;
      if (day % 7 === 0) result.dating_interest = true;
      if (day < 15) result.consent = true;
      if (day % 4 === 0) result.fertile = true;
      return result;
    },
    Mula: (day) => {
      const result = {};
      if (day % 6 === 0) result.safety = true;
      if ([1, 11, 21, 31].includes(day)) result.dating_interest = true;
      if (day % 2 === 1) result.consent = true;
      if (day % 3 === 0) result.fertile = true;
      return result;
    },
    PurvaAshadha: (day) => {
      const result = {};
      if (day % 4 === 0) result.safety = true;
      if ([8, 16, 24].includes(day)) result.dating_interest = true;
      if (day % 5 === 0) result.consent = true;
      if (day > 20) result.fertile = true;
      return result;
    },
    UttaraAshadha: (day) => {
      const result = {};
      if ([2, 12, 22].includes(day)) result.safety = true;
      if (day % 6 === 0) result.dating_interest = true;
      if (day % 2 === 0) result.consent = true;
      if (day < 10) result.fertile = true;
      return result;
    },
    Shravana: (day) => {
      const result = {};
      if (day % 2 === 1) result.safety = true;
      if ([4, 14, 24].includes(day)) result.dating_interest = true;
      if (day > 25) result.consent = true;
      if (day % 7 === 0) result.fertile = true;
      return result;
    },
    Dhanishta: (day) => {
      const result = {};
      if (day < 10) result.safety = true;
      if ([6, 18, 30].includes(day)) result.dating_interest = true;
      if (day % 3 === 1) result.consent = true;
      if (day % 4 === 0) result.fertile = true;
      return result;
    },
    Shatabhisha: (day) => {
      const result = {};
      if (day % 3 === 0) result.safety = true;
      if (day % 5 === 0) result.dating_interest = true;
      if ([7, 14, 21, 28].includes(day)) result.consent = true;
      if (day > 20) result.fertile = true;
      return result;
    },
    PurvaBhadrapada: (day) => {
      const result = {};
      if ([1, 6, 11, 16, 21, 26, 31].includes(day)) result.safety = true;
      if (day % 6 === 0) result.dating_interest = true;
      if (day % 2 === 1) result.consent = true;
      if (day % 5 === 0) result.fertile = true;
      return result;
    },
    UttaraBhadrapada: (day) => {
      const result = {};
      if (day % 7 === 0) result.safety = true;
      if ([2, 8, 14, 20, 26].includes(day)) result.dating_interest = true;
      if (day < 15) result.consent = true;
      if (day > 15) result.fertile = true;
      return result;
    },
    Revati: (day) => {
      const result = {};
      if (day > 25) result.safety = true;
      if (day % 2 === 0) result.dating_interest = true;
      if (day % 4 === 0) result.consent = true;
      if ([3, 9, 15, 21, 27].includes(day)) result.fertile = true;
      return result;
    },
  };

  const today = new Date().getDate();
  const resultsDiv = document.getElementById("results");

  Object.entries(nakshatraData).forEach(([nakshatra, logicFn]) => {
    const result = logicFn(today);
    const keys = Object.keys(result);
    if (keys.length > 0) {
      const block = document.createElement("div");
      block.className = "result-block";
      block.innerHTML = `<h2>${nakshatra}</h2><ul>${keys
        .map((k) => `<li>${k.replace("_", " ").toUpperCase()}</li>`) // uppercase output
        .join("")}</ul>`;
      resultsDiv.appendChild(block);
    }
  });
});
