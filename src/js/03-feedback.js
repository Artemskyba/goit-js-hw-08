import throttle from "lodash.throttle";
const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('[name = "email"]');
const messageEl = document.querySelector('[name = "message"]');
const STORAGE_KEY_FEEDBACK_FORM = "feedback-form-state";

emailEl.addEventListener("input", throttle(onInput, 600));
messageEl.addEventListener("input", throttle(onInput, 600));
formEl.addEventListener("submit", onSubmit);

populateTextArea();

function populateTextArea() {
  const savedUserInfo = localStorage.getItem(STORAGE_KEY_FEEDBACK_FORM);
  if (savedUserInfo) {
    const parsedUserInfo = JSON.parse(savedUserInfo);
    emailEl.value = parsedUserInfo.email;
    messageEl.value = parsedUserInfo.message;
  };
};

function onInput () {
  localStorage.setItem(STORAGE_KEY_FEEDBACK_FORM, JSON.stringify(createStorageForm()));

  function createStorageForm() {
    return {email: emailEl.value, message: messageEl.value}
  }
};

function onSubmit (e) {
  e.preventDefault();
  if (validateForm()) {
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY_FEEDBACK_FORM)));
    e.target.reset()
    localStorage.removeItem(STORAGE_KEY_FEEDBACK_FORM);
  } else {
      alert("Put all fields")
    }
};

function validateForm () {
  if (emailEl.value.trim() !== "" && messageEl.value.trim() !== "") {
    return true;
  }
  return false;
};