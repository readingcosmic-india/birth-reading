const API_URL = "https://script.google.com/macros/s/AKfycby7ztL5a4Nd5_KnU1ZbyoKznKbNWcYwwpFqlau38Y1amWpkamyvA2gm3b1Rl7IGzf-w/exec";

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
