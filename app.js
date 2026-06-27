console.log("APP JS LOADED");

const API_URL = "https://script.google.com/macros/s/AKfycbwX57x4KHz4jQzGU_LKrwF5dQiiAHm78Yo4IZc_oDPJu1lcG5zizS7QuWhDSObmgfeN/exec";

function getZodiac(month, day) {
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    return "Pisces";
}

async function startReading() {

    const name = document.getElementById("name").value || "Anonymous";
    const dob = document.getElementById("dob").value;
    const time = document.getElementById("time").value;
    const place = document.getElementById("place").value;

    if (!dob || !time || !place) {
        alert("Please fill all required fields.");
        return;
    }

    const loading = document.getElementById("loading");
    const result = document.getElementById("result");

    loading.style.display = "block";
    result.innerHTML = "";

    const birthDate = new Date(dob);

    const zodiac = getZodiac(
        birthDate.getMonth() + 1,
        birthDate.getDate()
    );

    const readings = {
        Aries: "Your courage will create new opportunities.",
        Taurus: "Patience and consistency will bring success.",
        Gemini: "Communication opens unexpected doors.",
        Cancer: "Trust your emotions and intuition.",
        Leo: "Recognition for your efforts is approaching.",
        Virgo: "Attention to detail creates success.",
        Libra: "Balance brings peace and progress.",
        Scorpio: "Transformation leads to growth.",
        Sagittarius: "Adventure and discovery await you.",
        Capricorn: "Hard work is about to pay off.",
        Aquarius: "Innovation opens unexpected paths.",
        Pisces: "Trust your intuition and creativity."
    };

    const colors = [
        "Blue",
        "Purple",
        "Gold",
        "Silver",
        "Green",
        "Red",
        "White",
        "Orange"
    ];

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const luckyNumber = Math.floor(Math.random() * 9) + 1;
    const luckyColor = colors[Math.floor(Math.random() * colors.length)];
    const luckyDay = days[Math.floor(Math.random() * days.length)];

    try {

        await fetch(API_URL, {
            method: "POST",
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
        });

    } catch (error) {
        console.error("Google Sheet Error:", error);
    }

    setTimeout(() => {

        loading.style.display = "none";

        result.innerHTML = `
            <div style="text-align:center;">
                <h2>🔮 ${zodiac}</h2>

                <p style="font-size:18px;">
                    ${readings[zodiac]}
                </p>

                <hr>

                <p><strong>🎲 Lucky Number:</strong> ${luckyNumber}</p>

                <p><strong>🎨 Lucky Color:</strong> ${luckyColor}</p>

                <p><strong>📅 Lucky Day:</strong> ${luckyDay}</p>

                <p>
                    The stars suggest that the coming days hold
                    new opportunities and personal growth.
                </p>
            </div>
        `;

    }, 2000);
}