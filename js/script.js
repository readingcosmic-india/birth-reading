// 1. PASTE YOUR BRAND NEW DEPLOYMENT URL HERE:
const scriptURL = 'PASTE_YOUR_NEW_WEB_APP_URL_HERE';

let messages = {};
fetch('messages.json').then(r => r.json()).then(d => messages = d);

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

  setTimeout(() => { typing.innerHTML = "Finding your strengths..."; }, 2000);
  setTimeout(() => { typing.innerHTML = "Preparing your inspiration..."; }, 4000);

  let s = getZodiacSign(dob);
  let arr = messages[s] || ['Keep believing in yourself.'];
  let msg = arr[Math.floor(Math.random() * arr.length)];

  // UPDATED FETCH WITH CORS BYPASS
  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors', // Tells GitHub Pages to shoot the data out without blocking it
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, dob, time, place })
  })
  .then(() => console.log("Data dispatched successfully."))
  .catch(err => console.error("Network error:", err));

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
