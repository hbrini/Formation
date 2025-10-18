let currentThemeIndex = 0;
let currentQuestionIndex = 0;
let userAnswers = [];
let scoreByTheme = [];
const container = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result-container");

function displayQuestion() {
  const theme = quizQuestions[currentThemeIndex];
  const qObj = theme.questions[currentQuestionIndex];

  // Vider le contenu précédent
  container.innerHTML = "";

  // Affiche le titre du thème uniquement pour la première question du thème
  if (currentQuestionIndex === 0) {
    const themeTitle = document.createElement("div");
    themeTitle.className = "theme-title";
    themeTitle.textContent = theme.theme;
    container.appendChild(themeTitle);
  }

  // Construire la question et options
  const divQuestion = document.createElement("div");
  divQuestion.className = "question";
  divQuestion.textContent = qObj.question;

  const divOptions = document.createElement("div");
  divOptions.className = "options";

  qObj.options.forEach((option, idx) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = idx;
    label.appendChild(radio);
    label.append(" " + option);
    divOptions.appendChild(label);
    divOptions.appendChild(document.createElement("br"));
  });

  container.appendChild(divQuestion);
  container.appendChild(divOptions);

  nextBtn.disabled = true;

  container.querySelectorAll('input[name="answer"]').forEach(input => {
    input.addEventListener("change", () => {
      nextBtn.disabled = false;
    });
  });
}

function scoreTheme() {
  const theme = quizQuestions[currentThemeIndex];
  let score = 0;
  for (let i = 0; i < theme.questions.length; i++) {
    if (theme.questions[i].answer === userAnswers[userAnswers.length - theme.questions.length + i]) {
      score++;
    }
  }
  scoreByTheme.push({ theme: theme.theme, score, total: theme.questions.length });
}

nextBtn.addEventListener("click", () => {
  const selectedOption = container.querySelector('input[name="answer"]:checked');
  if (!selectedOption) {
    alert("Veuillez sélectionner une réponse.");
    return;
  }
  userAnswers.push(parseInt(selectedOption.value));

  currentQuestionIndex++;
  if (currentQuestionIndex >= quizQuestions[currentThemeIndex].questions.length) {
    scoreTheme();
    currentThemeIndex++;
    currentQuestionIndex = 0;
  }

  if (currentThemeIndex >= quizQuestions.length) {
    container.classList.add("hidden");
    nextBtn.classList.add("hidden");
    showResults();
  } else {
    displayQuestion();
  }
});

function showResults() {
  resultDiv.classList.remove("hidden");
  let html = "<h2>Résultats par thème :</h2><ul>";
  scoreByTheme.forEach(th => {
    html += `<li>${th.theme} : <b>${th.score}</b> / ${th.total}</li>`;
  });
  html += "</ul>";
  const totalScore = scoreByTheme.reduce((a, b) => a + b.score, 0);
  const totalQuestions = scoreByTheme.reduce((a, b) => a + b.total, 0);
  html += `<h3>Score total : <span style='color:#1e5c96'>${totalScore} / ${totalQuestions}</span></h3>`;
  resultDiv.innerHTML = html;
  localStorage.setItem("quiz_excelpowerpoint_score", JSON.stringify({ scoreByTheme }));
}

displayQuestion();

