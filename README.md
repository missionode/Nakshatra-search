# Nakshatra-search

# Cycle Insights Dashboard

## Overview
Cycle Insights is a responsive web application that provides personalized predictions on women's fertility status, mood, communication style (listener/talker), and pleasure-seeking interest for the upcoming week. It uses date of birth (DOB) to estimate menstrual cycle phases and scores based on research patterns like the Seasonal Preovulatory Overripeness Ovopathy (SPrOO) hypothesis. The app is built with HTML, Tailwind CSS, JavaScript, and Chart.js for visualizations.

This tool is for educational and self-awareness purposes only. It is not a medical device—consult healthcare professionals for accurate health advice.

## Features
- **DOB Input**: Simple form to enter DOB and optional name.
- **Weekly Overview**: Scrollable timeline of 7 days with daily summaries.
- **Metrics Display**: Color-coded cards for Fertility Score (FS), Mood Score (MS), Communication Style Score (CSS), and Pleasure Seeking Interest Score (PSI).
- **Daily Details**: Modal with in-depth scores, tips, and trend charts.
- **Micro-Interactions**: Animations like button ripples, modal slides, and chart pops for engaging UX.
- **Responsive Design**: Mobile-first, adapts to desktop.
- **Privacy-Focused**: All computations are client-side; no data storage.

## Research Basis
The predictions are derived from:
- **SPrOO Hypothesis**: Links birth season to menstrual traits (e.g., cycle length, menarche age).
- **Menstrual Cycle Phases**: Influences on mood, communication, and pleasure via hormones (estrogen peaks in ovulation for higher scores).
- **Formulas**:
  - **FS** = (Age Factor × Seasonal Birth Factor × Cycle Regularity Factor) × 100
  - **MS/CSS/PSI**: Adjusted by cycle phase factors and hormonal stability.
- Data from studies on apps like Clue/Flo and European cohorts (e.g., Nijmegen study).

Key Assumptions:
- Cycle lengths: 28 days (summer/winter-born), 35 days (high-risk seasons like spring/autumn).
- Menarche ages: Vary by birth season (12.2–12.8 years).

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-repo/cycle-insights.git
   ```
2. Open `index.html` in a modern browser (no server needed, as it's static).

Dependencies (via CDNs):
- Tailwind CSS: https://cdn.tailwindcss.com
- Chart.js: https://cdn.jsdelivr.net/npm/chart.js

## Usage
1. Open the app in your browser.
2. Enter DOB (e.g., 1995-06-15) and optional name.
3. Click "Get Insights" to view the dashboard.
4. Scroll the timeline and tap days for details.
5. Scores are calculated for July 25–31, 2025 (hardcoded; update in JS for dynamic dates).

Example Output:
- For DOB June 15, 1995 (summer-born, age 30): High FS (~100), positive mood during ovulation.

## Customization
- Update current date in JS (line ~120: `new Date('2025-07-25')`).
- Add actual cycle tracking: Modify `cycleLength` logic.
- Themes: Extend Tailwind config for dark mode.

## Limitations
- **Accuracy**: Estimates only; doesn't use real-time cycle data or health factors (e.g., BMI, PCOS).
- **Scope**: Based on European studies; may not generalize globally.
- **Fixed Date**: Predictions tied to July 2025; no lunar/moon phase integration.
- **No Backend**: Static app; no user data persistence.

## Contributing
Fork the repo and submit pull requests. Issues welcome for bugs or enhancements (e.g., API integration for real cycle apps).

## License
MIT License. Free to use and modify.

Built with ❤️ by Grok (xAI).
