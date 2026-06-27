// Keep your actual Google Web App URL intact here:
const scriptURL = 'https://script.google.com/macros/s/AKfycbwds3TGqNjhVoJrwah6IfbQujMcg4vEcb5nvnLzGGR8p4K8nMzAq7ScVIHWt7xI6WIA/exec';

let messages = {};

// Load the updated motivational messages JSON file
fetch('./data/messages.json')
  .then(r => {
    if (!r.ok) throw new Error("Could not find messages.json in data folder");
    return r.json();
  })
  .then(d => messages = d)
  .catch(err => console.error("Error loading messages.json:", err));

// Zodiac calculation function
function getZodiacSign(dobString) {
  let x = new Date(dobString), m = x.getMonth() + 1, day = x.getDate();
  if (isNaN(x.getTime())) return ''; 
  if ((m == 3 && day >= 21) || (m == 4 && day <= 19)) return 'aries';
  if ((m == 4 && day >= 20) || (m == 5 && day <= 20)) return 'taurus';
  if ((m == 5 && day >= 21) || (m == 6 && day <= 20)) return 'gemini';
  if ((m == 6 && day >= 21) || (m == 7 && day <= 22)) return 'cancer';
  if ((m == 7 && day >= 23) || (m == 8 && day <= 22)) return 'leo';
  if ((m == 8 && day >= 23) || (m == 9 && day <= 22)) return 'virgo';
  if ((m == 9 && day >= 23) || (m == 10 && day <= 22)) return 'libra';
  if ((m == 10 && day >= 23) || (m == 11 && day <= 21)) return 'scorpio';
  if ((m == 11 && day >= 22) || (m == 12 && day <= 21)) return 'sagittarius';
  if ((m == 12 && day >= 22) || (m == 1 && day <= 19)) return 'capricorn';
  if ((m == 1 && day >= 20) || (m == 2 && day <= 18)) return 'aquarius';
  return 'pisces';
}

// NEW: Numerology engine to calculate a highly personalized Lucky Number from DOB
function calculateLuckyNumber(dobString) {
  // Extract only the numbers from the date string (e.g., "1995-12-25" -> "19951225")
  let digits = dobString.replace(/[^0-9]/g, '');
  let sum = 0;
  
  // Sum up all the single digits
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits[i]);
  }
  
  // Keep reducing down to a single digit (1-9) if it's greater than 9
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
  }
  
  return sum;
}

// NEW: Dynamic color array picked based on their lucky number math
const cosmicColors = ["Mystic Violet", "Celestial Blue", "Solar Gold", "Emerald Green", "Cosmic Crimson", "Lunar Silver", "Deep Magenta", "Starlight Indigo", "Aquamarine"];

function startReading() {
  const nameEl = document.getElementById('name');
  const dobEl = document.getElementById('dob');
  const timeEl = document.getElementById('time');
  const placeEl = document.getElementById('place');
  const result = document.getElementById('result');
  const loading = document.getElementById('loading');
  const typing = document.getElementById('typing');

  let name = nameEl.value;
  let dob = dobEl.value;
  let time = timeEl.value;
  let place = placeEl.value;

  if (!dob || !time || !place) {
    alert('Please fill all required fields');
    return;
  }

  result.style.display = "none";
  loading.style.display = "block";
  typing.innerHTML = "Reading cosmic energy...";

  setTimeout(() => { typing.innerHTML = "Finding your strengths... 🌟"; }, 2000);
  setTimeout(() => { typing.innerHTML = "Preparing your unique inspiration... 🔮"; }, 4000);

  let s = getZodiacSign(dob);
  
  // Fetch dynamic, longer messages and targeted affirmations from our data structure
  let signData = messages[s] || { 
    readings: ["Keep believing in yourself. Your path is uniquely yours."], 
    affirmations: ["I welcome every new opportunity with confidence."] 
  };
  
  let msg = signData.readings[Math.floor(Math.random() * signData.readings.length)];
  let affirmation = signData.affirmations[Math.floor(Math.random() * signData.affirmations.length)];
  
  // Dynamic Calculations based on their unique input
  let luckyNum = calculateLuckyNumber(dob);
  let luckyColor = cosmicColors[luckyNum - 1] || "Deep Violet";

  // Dispatch data to Google Sheets cleanly[cite: 2]
  const formData = new FormData();
  formData.append('name', name);
  formData.append('dob', dob);
  formData.append('time', time);
  formData.append('place', place);

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors', 
    body: formData
  })
  .then(() => console.log("Data successfully dispatched to Google Sheets."))
  .catch(err => console.error("Google Sheets Network error:", err));

  // Render the fresh personalized results layout[cite: 2]
  setTimeout(() => {
    loading.style.display = "none";
    result.style.display = "block";
    result.innerHTML = `
      <h2>✨ Cosmic Inspiration (${s.toUpperCase()})</h2>
      <p>Welcome, <b>${name || 'Seeker of Stars'}</b>.</p>
      <p style="line-height: 1.6; font-size: 1.05rem;">${msg}</p>
      <hr style="border: 0; border-top: 1px dashed rgba(255,255,255,0.2); margin: 15px 0;">
      <p>💜 <b>Lucky Cosmic Color:</b> ${luckyColor}</p>
      <p>🔢 <b>Personal Numerology Number:</b> ${luckyNum}</p>
      <p style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; font-style: italic;">
        🌟 <b>Daily Affirmation:</b><br>"${affirmation}"
      </p>
    `;
  }, 6000);
}
