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

    try {
        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                dob: dob,
                time: time,
                place: place
            })
        });

        setTimeout(() => {
            document.getElementById("loading").style.display = "none";

            document.getElementById("result").innerHTML = `
                <h2>Your Cosmic Reading</h2>
                <p>The universe suggests that new opportunities are approaching.</p>
                <p>Your determination and patience will guide your journey.</p>
                <p><strong>Lucky Number:</strong> ${Math.floor(Math.random() * 9) + 1}</p>
                <p><strong>Lucky Color:</strong> Blue</p>
            `;
        }, 2500);

    } catch (error) {
        document.getElementById("loading").style.display = "none";
        alert("Unable to save data to Google Sheets.");
        console.error(error);
    }
}
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
