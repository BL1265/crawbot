document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const learnBtn = document.getElementById("learnBtn");
  const aiModeBtn = document.getElementById("aiMode");
  const robotModeBtn = document.getElementById("robotMode");

  const modeStatus = document.getElementById("modeStatus");
  const aiStatus = document.getElementById("aiStatus");
  const detectedItem = document.getElementById("detectedItem");
  const wasteType = document.getElementById("wasteType");
  const confidence = document.getElementById("confidence");
  const confidenceBar = document.getElementById("confidenceBar");
  const bluetoothStatus = document.getElementById("bluetoothStatus");
  const robotStatus = document.getElementById("robotStatus");
  const destinationBin = document.getElementById("destinationBin");
  const robotAction = document.getElementById("robotAction");
  const cameraState = document.getElementById("cameraState");
  const modelState = document.getElementById("modelState");
  const arduinoState = document.getElementById("arduinoState");
  const robotState = document.getElementById("robotState");
  const historyBody = document.getElementById("historyBody");
  const liveClock = document.getElementById("liveClock");
  const cameraFeed = document.getElementById("cameraFeed");
  const cameraNote = document.getElementById("cameraNote");

  let currentMode = "AI Only";
  let running = false;
  let cameraStream = null;

  const pad = (n) => String(n).padStart(2, "0");

  function nowTime() {
    const d = new Date();
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  function setClock() {
    if (liveClock) liveClock.textContent = `🟢 LIVE ${nowTime()}`;
  }

  function setConfidence(percent) {
    const p = Math.max(0, Math.min(100, percent));
    confidence.textContent = `${p}%`;
    confidenceBar.style.width = `${p}%`;
  }

  function setStatusColors(aiText, robotText) {
    aiStatus.style.color = aiText.includes("Scanning") ? "#ffb300" : "#00ff99";
    robotStatus.style.color = ["Ready", "Active"].includes(robotText) ? "#00ff99" : "#ffffff";
  }

  function updateDashboard({
    ai = "Waiting...",
    item = "None",
    waste = "Unknown",
    confidenceValue = 0,
    bluetooth = "Disconnected",
    robot = "Offline",
    bin = "Waiting...",
    action = "Idle",
    camera = "Online",
    model = "Ready",
    arduino = "Disconnected",
    arm = "Standby"
  }) {
    aiStatus.textContent = ai;
    detectedItem.textContent = item;
    wasteType.textContent = waste;
    bluetoothStatus.textContent = bluetooth;
    robotStatus.textContent = robot;
    destinationBin.textContent = bin;
    robotAction.textContent = action;
    cameraState.textContent = camera;
    modelState.textContent = model;
    arduinoState.textContent = arduino;
    robotState.textContent = arm;

    setConfidence(confidenceValue);
    setStatusColors(ai, robot);
  }

  function addHistory(item, category, percent) {
    const placeholder = historyBody.querySelector("tr td");
    if (placeholder && placeholder.textContent.includes("No detections")) {
      historyBody.innerHTML = "";
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nowTime()}</td>
      <td>${item}</td>
      <td>${category}</td>
      <td>${percent}%</td>
    `;
    historyBody.prepend(row);
  }

  function setMode(mode) {
    currentMode = mode;
    modeStatus.textContent = `Current Mode: ${mode}`;
    aiModeBtn.classList.toggle("active-mode", mode === "AI Only");
    robotModeBtn.classList.toggle("active-mode", mode === "AI + Robot");

    if (mode === "AI Only") {
      updateDashboard({
        ai: "Ready",
        item: "Demo Mode",
        waste: "AI Only",
        confidenceValue: 82,
        bluetooth: "Disconnected",
        robot: "Offline",
        bin: "Not Sending",
        action: "Preview Only",
        camera: "Online",
        model: "Ready",
        arduino: "Disconnected",
        arm: "Standby"
      });
    } else {
      updateDashboard({
        ai: "Ready",
        item: "Demo Mode",
        waste: "Robot Mode",
        confidenceValue: 82,
        bluetooth: "Connected",
        robot: "Ready",
        bin: "Automatic",
        action: "Standing By",
        camera: "Online",
        model: "Ready",
        arduino: "Connected",
        arm: "Ready"
      });
    }
  }

  function pulse(el) {
    if (!el) return;
    el.classList.add("glow");
    setTimeout(() => el.classList.remove("glow"), 650);
  }

  async function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      cameraState.textContent = "Unsupported";
      if (cameraNote) cameraNote.textContent = "This browser does not support camera access.";
      return;
    }

    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.stop());
      }

      cameraState.textContent = "Starting...";
      if (cameraNote) cameraNote.textContent = "Requesting camera permission...";

      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment"
        },
        audio: false
      });

      cameraFeed.srcObject = cameraStream;
      await cameraFeed.play();

      cameraState.textContent = "Online";
      if (cameraNote) cameraNote.textContent = "Camera is live.";
    } catch (err) {
      console.error("Camera error:", err);
      cameraState.textContent = "Blocked";
      if (cameraNote) {
        cameraNote.textContent = "Allow camera access, then refresh. Use GitHub Pages or Live Server, not a file double-click.";
      }
    }
  }

  function runDetectionDemo() {
    if (running) return;
    running = true;

    startBtn.disabled = true;
    startBtn.textContent = "Scanning...";
    pulse(startBtn);

    document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });

    updateDashboard({
      ai: "Scanning...",
      item: "Searching...",
      waste: "Analyzing...",
      confidenceValue: 0,
      bluetooth: currentMode === "AI + Robot" ? "Connecting..." : "Disconnected",
      robot: currentMode === "AI + Robot" ? "Preparing..." : "Offline",
      bin: "Waiting...",
      action: "Scanning Platform",
      camera: cameraState.textContent || "Online",
      model: "Running",
      arduino: currentMode === "AI + Robot" ? "Connecting..." : "Disconnected",
      arm: currentMode === "AI + Robot" ? "Preparing" : "Standby"
    });

    let p = 0;
    const timer = setInterval(() => {
      p += 4;
      setConfidence(p);
      if (p >= 96) clearInterval(timer);
    }, 70);

    setTimeout(() => {
      updateDashboard({
        ai: "Ready",
        item: "Plastic Bottle",
        waste: "Plastic",
        confidenceValue: 96,
        bluetooth: currentMode === "AI + Robot" ? "Connected" : "Disconnected",
        robot: currentMode === "AI + Robot" ? "Active" : "Offline",
        bin: "Plastic Bin",
        action: currentMode === "AI + Robot" ? "Moving Robotic Claw" : "Prediction Complete",
        camera: cameraState.textContent || "Online",
        model: "Ready",
        arduino: currentMode === "AI + Robot" ? "Connected" : "Disconnected",
        arm: currentMode === "AI + Robot" ? "Sorting" : "Standby"
      });

      addHistory("Plastic Bottle", "Plastic", 96);

      startBtn.disabled = false;
      startBtn.textContent = "Start Detection";
      running = false;
    }, 2500);
  }

  aiModeBtn.addEventListener("click", () => {
    setMode("AI Only");
    pulse(aiModeBtn);
  });

  robotModeBtn.addEventListener("click", () => {
    setMode("AI + Robot");
    pulse(robotModeBtn);
  });

  startBtn.addEventListener("click", async () => {
    if (!cameraStream) {
      await startCamera();
    }
    runDetectionDemo();
  });

  learnBtn.addEventListener("click", () => {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => pulse(link));
  });

  const revealItems = document.querySelectorAll(".glass, .feature, .step, .top-stat, .status-card, .team-card, .stat");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));

  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "1s";
    document.body.style.opacity = "1";
  }, 80);

  setMode("AI Only");
  setClock();
  setInterval(setClock, 1000);
  startCamera();
});