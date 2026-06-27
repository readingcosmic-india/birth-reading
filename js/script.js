const scriptURL = 'https://script.google.com/macros/s/AKfycbjoT6ckzNzc-Cu7MFjbVD0M-3e9rPfmJsPyHUjlytnOOmE5STjUMVQs1S3vRXpZTZd/exec';
let messages = {};

// Load messages
fetch('messages.json')
  .then(r => r.json())
  .then(d => messages = d)
  .catch(err => console.error("Error loading messages.json:", err));

// Zodiac calculation function
function getZodiacSign(dobString) {
  let x = new Date(dobString),
      m = x.getMonth() + 1,
      day = x.getDate();
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

// This function matches the one called by your HTML form submission
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

  // 1. Start the visual animations
  result.style.display = "none";
  loading.style.display = "block";
  typing.innerHTML = "Reading cosmic energy...";

  setTimeout(() => {
    typing.innerHTML = "Finding your strengths...";
  }, 2000);

  setTimeout(() => {
    typing.innerHTML = "Preparing your inspiration...";
  }, 4000);

  // 2. Calculate sign and fetch local message text
  let s = getZodiacSign(dob);
  let arr = messages[s] || ['Keep believing in yourself.'];
  let msg = arr[Math.floor(Math.random() * arr.length)];

  // 3. Send data to Google Sheet using the clean text/plain content-type bypass
  fetch(scriptURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify({ name, dob, time, place })
  }).catch(err => console.error("Sheets sync error:", err));

  // 4. Reveal final result after the 6-second cosmic countdown
  setTimeout(() => {
    loading.style.display = "none";
    result.style.display = "block";
    result.innerHTML = `
      <h2>✨ Cosmic Inspiration (${s.toUpperCase()})</h2>
      <p>Hello <b>${name || 'Friend'}</b></p>
      <p>${msg}</p>
      <p>💜 Lucky Color: Violet</p>
      <p>🔢 Lucky Number: 7</p>
      <p>🌟 Affirmation<br>"I welcome every new opportunity with confidence."</p>
    `;
  }, 6000);
}
