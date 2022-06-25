const builtInForm = document.getElementById('built-in-form');
builtInForm.addEventListener('submit', function (event) {
  alert('Validation seems to be completed!');
});
// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.
const form = document.getElementById('javascript-form');

const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');

email.addEventListener('input', function (event) {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (email.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    emailError.textContent = ''; // Reset the content of the message
    emailError.className = 'error'; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener('submit', function (event) {
  // if the email field is valid, we let the form submit

  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showError();
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();
  } else {
    event.preventDefault();
    alert('Validation completed!');
  }
});

function showError() {
  if (email.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.textContent = 'You need to enter an e-mail address.';
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (email.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  // Set the styling appropriately
  emailError.className = 'error active';
}

let contactAPI = 'https://cse341-node-jofravimusic.herokuapp.com/contacts/';

function loadContacts() {
  fetch(contactAPI)
    .then((response) => response.json())
    .then((contact) => showContact(contact));

  showContact = (contacts) => {
    const contactDiv = document.querySelector('#contactList');
    contactDiv.innerHTML = '';
    contacts.forEach((contact) => {
      const tableRowEle = document.createElement('tr');

      tableRowEle.innerHTML = `
          <td>${contact.firstName}</td>
          <td>${contact.lastName}</td>
          <td>${contact.email}</td>
          <td>${contact.birthday}</td>
          <td>${contact.favoriteColor}</td>
          
          `;

      contactDiv.append(tableRowEle);
    });
  };
}

try {
  loadContacts();
} catch (error) {
  console.log(error);
}

// Example POST method implementation:
async function postData() {
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let email = document.getElementById('email').value;
  let birthday = document.getElementById('birthday').value;
  let favoriteColor = document.getElementById('favoriteColor').value;

  data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    birthday: birthday,
    favoriteColor: favoriteColor,
  };
  // Default options are marked with *
  const response = await fetch(contactAPI, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  let result = response.json(); // parses JSON response into native JavaScript objects
  result.then((data) => {
    console.log(data);
  });
  loadContacts();
  return result;
}
