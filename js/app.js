function getZodiac(month, day) {
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "capricorn";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "aquarius";
    return "pisces";
}

const API_URL = "https://script.google.com/macros/s/AKfycbwX57x4KHz4jQzGU_LKrwF5dQiiAHm78Yo4IZc_oDPJu1lcG5zizS7QuWhDSObmgfeN/exec";

async function startReading() {

    const name = document.getElementById("name").value || "Anonymous";
    const dob = document.getElementById("dob").value;
    const time = document.getElementById("time").value;
    const place = document.getElementById("place").value;

    if (!dob || !time || !place) {
        alert("Please fill all required fields.");
        return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("result").innerHTML = "";

    const birthDate = new Date(dob);

    const zodiac = getZodiac(
        birthDate.getMonth() + 1,
        birthDate.getDate()
    );

    const zodiacNames = {
        aries: "♈ Aries",
        taurus: "♉ Taurus",
        gemini: "♊ Gemini",
        cancer: "♋ Cancer",
        leo: "♌ Leo",
        virgo: "♍ Virgo",
        libra: "♎ Libra",
        scorpio: "♏ Scorpio",
        sagittarius: "♐ Sagittarius",
        capricorn: "♑ Capricorn",
        aquarius: "♒ Aquarius",
        pisces: "♓ Pisces"
    };

    const readings = {
        aries: [
            "Your courage will create new opportunities.",
            "Leadership and confidence will guide your path.",
            "The universe rewards your determination."
        ],
        taurus: [
            "Patience and consistency will bring success.",
            "Financial opportunities may appear soon.",
            "Your stability inspires those around you."
        ],
        gemini: [
            "Communication will open unexpected doors.",
            "Learning something new will benefit you greatly.",
            "Exciting connections are approaching."
        ],
        cancer: [
            "Your kindness strengthens relationships.",
            "Family support will play an important role.",
            "Trust your emotions and intuition."
        ],
        leo: [
            "Your confidence inspires others.",
            "Recognition for your efforts is approaching.",
            "The spotlight is moving toward you."
        ],
        virgo: [
            "Attention to detail creates success.",
            "Organization will help you reach your goals.",
            "Small steps create extraordinary results."
        ],
        libra: [
            "Balance will bring peace and progress.",
            "A meaningful relationship may deepen soon.",
            "Harmony attracts positive opportunities."
        ],
        scorpio: [
            "Transformation leads to growth.",
            "Your determination can overcome any challenge.",
            "Powerful opportunities are near."
        ],
        sagittarius: [
            "Adventure and discovery await you.",
            "Travel or learning will bring rewards.",
            "Your optimism attracts success."
        ],
        capricorn: [
            "Hard work is about to pay off.",
            "Your discipline creates lasting achievements.",
            "Success grows through persistence."
        ],
        aquarius: [
            "Innovation opens unexpected paths.",
            "Your creativity is your greatest strength.",
            "New ideas deserve your attention."
        ],
        pisces: [
            "Trust your intuition.",
            "Creativity will lead to exciting opportunities.",
            "Your compassion is a powerful gift."
        ]
    };

    const colors = [
        "Blue",
        "Purple",
        "Gold",
        "Silver",
        "Green",
        "Red",
        "White",
        "Orange",
        "Pink"
    ];

    const luckyDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const reading = readings[zodiac][Math.floor(Math.random() * readings[zodiac].length)];
    const luckyNumber = Math.floor(Math.random() * 9) + 1;
    const luckyColor = colors[Math.floor(Math.random() * colors.length)];
    const luckyDay = luckyDays[Math.floor(Math.random() * luckyDays.length)];

    // Save to Google Sheets in background
    fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            dob,
            time,
            place,
            zodiac,
            luckyNumber,
            luckyColor,
            luckyDay
        })
    }).catch(error => console.error(error));

    // Show loading animation for 2 seconds
    setTimeout(() => {

        document.getElementById("loading").style.display = "none";

        document.getElementById("result").innerHTML = `
            <div class="result-card">

                <h2>${zodiacNames[zodiac]}</h2>

                <p>${reading}</p>

                <hr>

                <p><strong>🎲 Lucky Number:</strong> ${luckyNumber}</p>

                <p><strong>🎨 Lucky Color:</strong> ${luckyColor}</p>

                <p><strong>📅 Lucky Day:</strong> ${luckyDay}</p>

                <br>

                <p>
                    ✨ The stars suggest that the coming days hold
                    new opportunities and personal growth.
                </p>

            </div>
        `;

    }, 2000);
}
