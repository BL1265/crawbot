/* =========================
   CLAWEX SCRIPT
========================= */


// Dashboard elements

const startBtn = document.getElementById("startBtn");

const aiStatus = document.getElementById("aiStatus");
const detectedItem = document.getElementById("detectedItem");
const confidence = document.getElementById("confidence");

const bluetoothStatus = document.getElementById("bluetoothStatus");
const robotStatus = document.getElementById("robotStatus");

const robotImage = document.getElementById("robotImage");


// Mode buttons

const aiMode = document.getElementById("aiMode");
const robotMode = document.getElementById("robotMode");
const modeStatus = document.getElementById("modeStatus");


// Current mode

let detectionMode = "AI Only";





/* =========================
   MODE SELECTION
========================= */


aiMode.addEventListener("click",()=>{


    detectionMode = "AI Only";


    modeStatus.textContent =
    "Current Mode: 🧠 AI Detection Only";


    robotStatus.textContent =
    "Disabled";


    bluetoothStatus.textContent =
    "Not Required";


});




robotMode.addEventListener("click",()=>{


    detectionMode = "AI + Robot";


    modeStatus.textContent =
    "Current Mode: 🤖 Full Robot Sorting";


    robotStatus.textContent =
    "Ready";


    bluetoothStatus.textContent =
    "Ready To Connect";


});







/* =========================
   START DETECTION
========================= */


startBtn.addEventListener("click",()=>{


    aiStatus.textContent =
    "Scanning Waste...";


    detectedItem.textContent =
    "Searching...";


    confidence.textContent =
    "...";


    startBtn.textContent =
    "Detecting";



    setTimeout(()=>{


        aiStatus.textContent =
        "AI Ready";


        detectedItem.textContent =
        "Plastic Bottle";


        confidence.textContent =
        "98%";



        if(detectionMode==="AI Only"){


            bluetoothStatus.textContent =
            "Not Used";


            robotStatus.textContent =
            "Standby";


        }



        else{


            bluetoothStatus.textContent =
            "Connected";


            robotStatus.textContent =
            "Sorting";


        }



        startBtn.textContent =
        "Detection Complete";



    },3000);



});







/* =========================
   CARD ANIMATION
========================= */


const cards =
document.querySelectorAll(".card");



cards.forEach(card=>{


    card.style.opacity="0";

    card.style.transform=
    "translateY(40px)";

    card.style.transition=
    "0.8s ease";


});





window.addEventListener("scroll",()=>{


    cards.forEach(card=>{


        let position =
        card.getBoundingClientRect().top;



        if(position <
        window.innerHeight - 100){


            card.style.opacity="1";


            card.style.transform=
            "translateY(0)";


        }


    });


});







/* =========================
   ROBOT EFFECT
========================= */


if(robotImage){


robotImage.addEventListener("mouseenter",()=>{


    robotImage.style.filter =
    "drop-shadow(0 0 25px #00ff99)";


});




robotImage.addEventListener("mouseleave",()=>{


    robotImage.style.filter =
    "none";


});


}