
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const dateString = today.toISOString().split('T')[0];

  const nakshatras = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira",
    "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
    "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati",
    "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
    "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
    "Uttara Bhadrapada", "Revati"
  ];

  const resultsContainer = document.getElementById("results");
  nakshatras.forEach(name => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `<h2>${name}</h2>
      <p>Fertility: High</p>
      <p>Consent Likely: Yes</p>
      <p>Dating Mood: Engaged</p>
      <p>Obstacles: None</p>`;
    resultsContainer.appendChild(card);
  });
});
