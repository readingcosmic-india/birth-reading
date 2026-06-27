function startReading(){

document.getElementById("loading").style.display="block";

document.getElementById("typing").innerHTML="Reading cosmic energy...";

setTimeout(()=>{

document.getElementById("typing").innerHTML="Finding your strengths...";

},2000);

setTimeout(()=>{

document.getElementById("typing").innerHTML="Preparing your inspiration...";

},4000);

setTimeout(()=>{

document.getElementById("loading").style.display="none";

let result=document.getElementById("result");

result.style.display="block";

result.innerHTML=`

<h2>✨ Cosmic Inspiration</h2>

<p>

Your determination, kindness and optimism are among your greatest strengths.

Keep believing in yourself because wonderful opportunities can arise through consistent effort.

</p>

<p>

💜 Lucky Color: Violet

</p>

<p>

🔢 Lucky Number: 7

</p>

<p>

🌟 Affirmation

<br>

"I welcome every new opportunity with confidence."

</p>

`;

},6000);

}
