import throttle from 'lodash.throttle';

// Get the form and input elements
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Define the key for localStorage
const storageKey = 'feedback-form-state';

// Function to save the form state to localStorage
const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem(storageKey, JSON.stringify(formData));
};

// Function to load the form state from localStorage
const loadFormState = () => {
  const savedData = localStorage.getItem(storageKey);
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
};

// Throttle the saveFormState function to update localStorage every 500ms
const throttledSaveFormState = throttle(saveFormState, 500);

// Load form state on page load
window.addEventListener('load', loadFormState);

// Listen for input events and update localStorage
emailInput.addEventListener('input', throttledSaveFormState);
messageInput.addEventListener('input', throttledSaveFormState);

// Clear form state and localStorage on form submit
form.addEventListener('submit', event => {
  event.preventDefault();
  console.log('Form submitted with values:', {
    email: emailInput.value,
    message: messageInput.value
  });
  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
});
