const subjectInput = document.getElementById("subject");
const questionInput = document.getElementById("question");
const submitQuestionBtn = document.getElementById("submitQuestion");

const questionList = document.getElementById("questionList");

const questionFormSection = document.getElementById("questionFormSection");
const questionDetails = document.getElementById("questionDetails");

const displaySubject = document.getElementById("displaySubject");
const displayQuestion = document.getElementById("displayQuestion");

const responseList = document.getElementById("responseList");

const nameInput = document.getElementById("name");
const commentInput = document.getElementById("comment");

const submitResponseBtn = document.getElementById("submitResponse");
const resolveBtn = document.getElementById("resolveBtn");

const searchBox = document.getElementById("searchBox");

let questions = JSON.parse(localStorage.getItem("questions")) || [];
let selectedQuestionIndex = null;

function saveToLocalStorage() {
  localStorage.setItem("questions", JSON.stringify(questions));
}

function renderQuestions(filteredQuestions = questions) {
  questionList.innerHTML = "";

  filteredQuestions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question-item");

    div.innerHTML = `
      <h3>${q.subject}</h3>
      <p>${q.question}</p>
    `;

    div.addEventListener("click", () => {
      selectedQuestionIndex = questions.indexOf(q);
      showQuestionDetails();
    });

    questionList.appendChild(div);
  });
}

submitQuestionBtn.addEventListener("click", () => {
  const subject = subjectInput.value.trim();
  const question = questionInput.value.trim();

  if (subject === "" || question === "") {
    alert("Both fields are mandatory!");
    return;
  }

  const newQuestion = {
    subject,
    question,
    responses: []
  };

  questions.push(newQuestion);

  saveToLocalStorage();
  renderQuestions();

  subjectInput.value = "";
  questionInput.value = "";
});

function showQuestionDetails() {
  questionFormSection.classList.add("hidden");
  questionDetails.classList.remove("hidden");

  const currentQuestion = questions[selectedQuestionIndex];

  displaySubject.textContent = currentQuestion.subject;
  displayQuestion.textContent = currentQuestion.question;

  renderResponses();
}

function renderResponses() {
  responseList.innerHTML = "";

  const responses = questions[selectedQuestionIndex].responses;

  responses.forEach((res) => {
    const div = document.createElement("div");
    div.classList.add("response-box");

    div.innerHTML = `
      <h4>${res.name}</h4>
      <p>${res.comment}</p>
    `;

    responseList.appendChild(div);
  });
}

submitResponseBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (name === "" || comment === "") {
    alert("Both fields are mandatory!");
    return;
  }

  questions[selectedQuestionIndex].responses.push({
    name,
    comment
  });

  saveToLocalStorage();
  renderResponses();

  nameInput.value = "";
  commentInput.value = "";
});

resolveBtn.addEventListener("click", () => {
  questions.splice(selectedQuestionIndex, 1);

  saveToLocalStorage();
  renderQuestions();

  questionDetails.classList.add("hidden");
  questionFormSection.classList.remove("hidden");
});

searchBox.addEventListener("keyup", () => {
  const value = searchBox.value.toLowerCase();

  const filtered = questions.filter((q) => {
    return (
      q.subject.toLowerCase().includes(value) ||
      q.question.toLowerCase().includes(value)
    );
  });

  renderQuestions(filtered);
});

document.getElementById("newQuestionBtn").addEventListener("click", () => {
  questionDetails.classList.add("hidden");
  questionFormSection.classList.remove("hidden");
});

renderQuestions();