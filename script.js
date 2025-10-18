let currentThemeIndex = 0;
let currentQuestionIndex = 0;
let userAnswers = [];
let scoreByTheme = [];
const container = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result-container");

let isAnswerShown = false;

function displayQuestion() {
  const theme = quizQuestions[currentThemeIndex];
  const qObj = theme.questions[currentQuestionIndex];

  container.innerHTML = "";

  if (currentQuestionIndex === 0) {
    const themeTitle = document.createElement("div");
    themeTitle.className = "theme-title";
    themeTitle.textContent = theme.theme;
    container.appendChild(themeTitle);
  }

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
  nextBtn.textContent = "Valider la réponse";

  container.querySelectorAll('input[name="answer"]').forEach(input => {
    input.addEventListener("change", () => {
      nextBtn.disabled = false;
    });
  });

  isAnswerShown = false;
}

function showAnswer() {
  const theme = quizQuestions[currentThemeIndex];
  const qObj = theme.questions[currentQuestionIndex];
  const selectedOption = container.querySelector('input[name="answer"]:checked');
  if (!selectedOption) {
    alert("Veuillez sélectionner une réponse.");
    return;
  }

  userAnswers.push(parseInt(selectedOption.value));

  container.querySelectorAll('input[name="answer"]').forEach(input => input.disabled = true);

  const answerText = qObj.options[qObj.answer];
  const userChoice = qObj.options[parseInt(selectedOption.value)];
  const feedback = document.createElement("div");
  feedback.style.marginTop = "15px";
  if (qObj.answer === parseInt(selectedOption.value)) {
    feedback.innerHTML = `<span style="color:green; font-weight:bold;">Bonne réponse !</span> (${answerText})`;
  } else {
    feedback.innerHTML = `<span style="color:red; font-weight:bold;">Mauvaise réponse.</span> La bonne réponse est : <strong>${answerText}</strong>. Vous avez choisi : ${userChoice}.`;
  }
  container.appendChild(feedback);

  const isLastQuestion =
    currentThemeIndex === quizQuestions.length - 1 &&
    currentQuestionIndex === quizQuestions[currentThemeIndex].questions.length - 1;

  nextBtn.textContent = isLastQuestion ? "Terminer" : "Suivant";

  isAnswerShown = true;
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  if (!isAnswerShown) {
    showAnswer();
  } else {
    currentQuestionIndex++;
    const theme = quizQuestions[currentThemeIndex];
    if (currentQuestionIndex >= theme.questions.length) {
      let score = 0;
      for (let i = 0; i < theme.questions.length; i++) {
        if (theme.questions[i].answer === userAnswers[userAnswers.length - theme.questions.length + i]) {
          score++;
        }
      }
      scoreByTheme.push({ theme: theme.theme, score, total: theme.questions.length });
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
