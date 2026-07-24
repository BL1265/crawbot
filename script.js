// ===============================
// CLAWEX CONTROL SYSTEM
// ===============================


const startBtn = document.getElementById("startBtn");

const aiMode = document.getElementById("aiMode");
const robotMode = document.getElementById("robotMode");

const modeStatus = document.getElementById("modeStatus");

const aiStatus = document.getElementById("aiStatus");
const detectedItem = document.getElementById("detectedItem");
const wasteType = document.getElementById("wasteType");
const confidence = document.getElementById("confidence");

const bluetoothStatus = document.getElementById("bluetoothStatus");
const robotStatus = document.getElementById("robotStatus");

const destinationBin = document.getElementById("destinationBin");
const robotAction = document.getElementById("robotAction");



let currentMode = "AI";




// ===============================
// MODE BUTTONS
// ===============================


if(aiMode){

aiMode.onclick = function(){


    currentMode = "AI";


    modeStatus.textContent =
    "Current Mode: 🧠 AI Only";


    bluetoothStatus.textContent =
    "Not Required";


    robotStatus.textContent =
    "Offline";


    robotAction.textContent =
    "No Robot Movement";


};


}




if(robotMode){

robotMode.onclick = function(){


    currentMode = "ROBOT";


    modeStatus.textContent =
    "Current Mode: 🤖 AI + Robot";


    bluetoothStatus.textContent =
    "Connected";


    robotStatus.textContent =
    "Ready";


    robotAction.textContent =
    "Waiting";


};


}





// ===============================
// START DETECTION
// ===============================


if(startBtn){


startBtn.onclick = function(){


    startBtn.textContent =
    "Scanning...";


    aiStatus.textContent =
    "Processing Camera";


    detectedItem.textContent =
    "Detecting...";


    confidence.textContent =
    "...";



    setTimeout(function(){


        aiStatus.textContent =
        "AI Ready";


        detectedItem.textContent =
        "Plastic Bottle";


        wasteType.textContent =
        "Plastic";


        confidence.textContent =
        "98%";



        destinationBin.textContent =
        "Plastic Recycling Bin";



        if(currentMode==="AI"){


            bluetoothStatus.textContent =
            "Not Used";


            robotStatus.textContent =
            "Standby";


            robotAction.textContent =
            "Detection Finished";


        }


        else{


            bluetoothStatus.textContent =
            "Connected";


            robotStatus.textContent =
            "Sorting";


            robotAction.textContent =
            "Moving Claw";


        }



        startBtn.textContent =
        "Detection Complete";


    },3000);


};


}







// ===============================
// LIVE CAMERA
// ===============================


const cameraFeed =
document.getElementById("cameraFeed");



if(cameraFeed){


navigator.mediaDevices.getUserMedia({

    video:true

})

.then(function(stream){


    cameraFeed.srcObject = stream;


})

.catch(function(error){


    console.log(
    "Camera permission denied:",
    error
    );


});


}







// ===============================
// CARD ANIMATION
// ===============================


const cards =
document.querySelectorAll(".card");



cards.forEach(function(card){


    card.style.opacity="0";

    card.style.transform=
    "translateY(40px)";

    card.style.transition=
    "0.8s";


});





window.addEventListener("scroll",function(){


cards.forEach(function(card){


    let position =
    card.getBoundingClientRect().top;



    if(position < window.innerHeight-100){


        card.style.opacity="1";

        card.style.transform=
        "translateY(0)";


    }


});


});