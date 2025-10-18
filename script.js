let currentThemeIndex = 0;
let currentQuestionIndex = 0;
let userAnswers = [];
let scoreByTheme = [];
const container = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result-container");

function displayQuestion() {
  if (currentQuestionIndex === 0) {
    container.innerHTML += `<div class='theme-title'>${quizQuestions[currentThemeIndex].theme}</div>`;
  }
  const qObj = quizQuestions[currentThemeIndex].questions[currentQuestionIndex];
  container.innerHTML = container.innerHTML.replace(/<div class='questionBox'>[\\s\\S]*?<\/div>/, '');
  let html = `<div class="questionBox"><div class="question">${qObj.question}</div><div class="options">`;
  qObj.options.forEach((opt, idx) => {
    html += `<label><input type="radio" name="q${currentThemeIndex}_${currentQuestionIndex}" value="${idx}"> ${opt}</label>`;
  });
  html += '</div></div>';
  container.insertAdjacentHTML('beforeend', html);
  nextBtn.disabled = true;
  document.querySelectorAll(`input[name="q${currentThemeIndex}_${currentQuestionIndex}"]`)
    .forEach(radio => radio.addEventListener('change', () => nextBtn.disabled = false));
}

nextBtn.onclick = function() {
  const radios = document.querySelectorAll(`input[name="q${currentThemeIndex}_${currentQuestionIndex}"]`);
  const selected = Array.from(radios).find(r => r.checked);
  userAnswers.push(Number(selected.value));
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions[currentThemeIndex].questions.length) {
    displayQuestion();
  } else {
    scoreTheme();
    currentThemeIndex++;
    currentQuestionIndex = 0;
    if (currentThemeIndex < quizQuestions.length) {
      displayQuestion();
    } else {
      showResults();
    }
  }
};

function scoreTheme() {
  const theme = quizQuestions[currentThemeIndex];
  let score = 0;
  for (let i = 0; i < theme.questions.length; i++) {
    const expected = theme.questions[i].answer;
    const got = userAnswers[userAnswers.length - theme.questions.length + i];
    if (expected === got) score++;
  }
  scoreByTheme.push({theme: theme.theme, score, total: theme.questions.length});
}

function showResults() {
  container.classList.add('hidden');
  nextBtn.classList.add('hidden');
  resultDiv.classList.remove('hidden');
  let html = '<h2>Résultats par thème :</h2><ul>';
  scoreByTheme.forEach(th => {
    html += `<li>${th.theme} : <b>${th.score}</b> / ${th.total}</li>`;
  });
  html += '</ul>';
  const totalScore = scoreByTheme.reduce((a, b) => a + b.score, 0);
  const totalQuestions = scoreByTheme.reduce((a, b) => a + b.total, 0);
  html += `<h3>Score total : <span style='color:#1e5c96'>${totalScore} / ${totalQuestions}</span></h3>`;
  resultDiv.innerHTML = html;
  localStorage.setItem("quiz_excelpowerpoint_score", JSON.stringify({scoreByTheme}));
}

displayQuestion();
