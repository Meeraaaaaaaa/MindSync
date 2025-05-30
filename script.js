// Switch modes
function switchMode(mode) {
  document.getElementById("moodSection").style.display = "none";
  document.getElementById("journalSection").style.display = "none";
  document.getElementById("goalsSection").style.display = "none";

  if (mode === "mood") document.getElementById("moodSection").style.display = "block";
  if (mode === "journal") {
    document.getElementById("journalSection").style.display = "block";
    loadJournal();
  }
  if (mode === "goals") {
    document.getElementById("goalsSection").style.display = "block";
    loadGoals();
  }
}

// Mood Tracker
const moodBtn = document.getElementById("submitMoodBtn");
const moodSelect = document.getElementById("mood");
const affirmation = document.getElementById("affirmation");
const moodLog = document.getElementById("moodLog");

const affirmations = [
  "🌟 You are doing better than you think.",
  "💪 You are strong and capable.",
  "🌈 Every day is a fresh start.",
  "✨ You deserve happiness and peace.",
  "🌻 You are enough just as you are."
];

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function saveMood(date, mood) {
  let data = JSON.parse(localStorage.getItem("moodData")) || {};
  data[date] = mood;
  localStorage.setItem("moodData", JSON.stringify(data));
}

function displayMoodLog() {
  const data = JSON.parse(localStorage.getItem("moodData")) || {};
  let log = "<h3>Mood Log</h3><ul>";
  for (let date in data) {
    log += `<li><strong>${date}</strong>: ${data[date]}</li>`;
  }
  log += "</ul>";
  moodLog.innerHTML = log;
}

moodBtn.onclick = () => {
  const mood = moodSelect.value;
  if (!mood) return alert("Please select a mood.");
  saveMood(getTodayDate(), mood);
  affirmation.innerText = affirmations[Math.floor(Math.random() * affirmations.length)];
  moodSelect.value = "";
};

document.getElementById("viewLogBtn").onclick = displayMoodLog;

// Journal
function saveJournal() {
  const date = getTodayDate();
  const text = document.getElementById("journalEntry").value.trim();
  if (!text) return alert("Write something first.");
  let journal = JSON.parse(localStorage.getItem("journalData")) || {};
  journal[date] = text;
  localStorage.setItem("journalData", JSON.stringify(journal));
  document.getElementById("journalEntry").value = "";
  loadJournal();
}

function loadJournal() {
  const journal = JSON.parse(localStorage.getItem("journalData")) || {};
  let log = "<h3>Journal Entries</h3><ul>";
  for (let date in journal) {
    log += `<li><strong>${date}</strong>: ${journal[date]}</li>`;
  }
  log += "</ul>";
  document.getElementById("journalLog").innerHTML = log;
}

// Goals
function addGoal() {
  const text = document.getElementById("goalText").value.trim();
  const date = document.getElementById("goalDate").value;
  if (!text || !date) return alert("Enter both goal and date.");
  let goals = JSON.parse(localStorage.getItem("goals")) || [];
  goals.push({ text, date, done: false });
  localStorage.setItem("goals", JSON.stringify(goals));
  document.getElementById("goalText").value = "";
  document.getElementById("goalDate").value = "";
  loadGoals();
}

function toggleGoal(index) {
  let goals = JSON.parse(localStorage.getItem("goals")) || [];
  goals[index].done = !goals[index].done;
  localStorage.setItem("goals", JSON.stringify(goals));
  loadGoals();
}

function loadGoals() {
  const list = document.getElementById("goalList");
  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  list.innerHTML = "";
  goals.forEach((goal, i) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <input type="checkbox" ${goal.done ? "checked" : ""} onchange="toggleGoal(${i})" />
      <strong>${goal.text}</strong> (by ${goal.date})
    `;
    list.appendChild(item);
  });
}

// Default mode
switchMode("mood");
