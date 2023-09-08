import throttle from "lodash.throttle";
const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('[name = "email"]');
const messageEl = document.querySelector('[name = "message"]');

emailEl.addEventListener("input", throttle(onInput, 600));
messageEl.addEventListener("input", throttle(onInput, 600));
formEl.addEventListener("submit", onSubmit);

populateTextArea();

function populateTextArea() {
  const savedUserInfo = localStorage.getItem("feedback-form-state");
  if (savedUserInfo) {
    const parsedUserInfo = JSON.parse(savedUserInfo);
    emailEl.value = parsedUserInfo.email;
    messageEl.value = parsedUserInfo.message;
  };
};

function onInput () {
  localStorage.setItem("feedback-form-state", JSON.stringify(createStorageForm()));

  function createStorageForm() {
    return {email: emailEl.value, message: messageEl.value}
  }
};

function onSubmit (e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem("feedback-form-state")));
  e.target.reset()
  localStorage.removeItem("feedback-form-state")
}

