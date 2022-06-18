const links = [
  {
    label: 'Week 1 notes',
    url: 'week1/index.html',
  },
  {
    label: 'Week 2 notes',
    url: 'week2/index.html',
  },
  {
    label: 'Week 3 notes',
    url: 'week3/index.html',
  },
  {
    label: 'Week 4 notes',
    url: 'week4/index.html',
  },
  {
    label: 'Week 5 notes',
    url: 'week5/index.html',
  },
  {
    label: 'To Do List App',
    url: 'week6/index.html',
  },
  {
    label: 'Week 7 notes',
    url: 'week7/index.html',
  },
  {
    label: 'Week 8 notes',
    url: 'week8/index.html',
  },
  {
    label: 'Week 9 notes',
    url: 'week9/index.html',
  },
];

function createList() {
  let list = '';

  links.forEach((link) => {
    list += '<li>';
    list += "<a href='" + link['url'] + "'>";
    list += link.label + '</a>';
    list += '</li>';
  });

  document.getElementById('weeks-list').innerHTML = list;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function appear() {
  let appear = document.querySelectorAll('.appear');
  let hideButton = document.getElementById('hideButton');
  hideButton.disabled = false;
  let appearButton = document.getElementById('appearButton');
  appearButton.disabled = true;

  for (let i = 0; i < appear.length; i++) {
    appear[i].classList.add('active');
    await delay(100);
  }
}

async function hide() {
  let hide = document.querySelectorAll('.appear');
  let appearButton = document.getElementById('appearButton');
  appearButton.disabled = false;

  let hideButton = document.getElementById('hideButton');
  hideButton.disabled = true;

  for (let i = 0; i < hide.length; i++) {
    hide[i].classList.remove('active');
    await delay(100);
  }
}
async function revealScroll() {
  let revealScroll = document.querySelectorAll('.revealScroll');

  for (let i = 0; i < revealScroll.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = revealScroll[i].getBoundingClientRect().top;
    let elementVisible = 50;

    if (elementTop < windowHeight - elementVisible) {
      revealScroll[i].classList.add('active');
      await delay(100);
    } else {
      revealScroll[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', revealScroll);

const form = document.forms[0];
const input = form.elements.searchInput;

form.addEventListener('submit', search, false);

function search(event) {
  alert(`You Searched for: ${input.value}`);
  event.preventDefault();
}

input.addEventListener('change', () => alert('changed'), false);
input.addEventListener(
  'focus',
  function () {
    if (input.value === 'Search Here') {
      input.value = '';
    }
  },
  false
);

const loginForm = document.forms.login;

loginForm.addEventListener('submit', login, false);

function login(event) {
  alert(`You Simulated a login session`);
  event.preventDefault();
}

input.addEventListener(
  'blur',
  function () {
    if (input.value === '') {
      input.value = 'Search Here';
    }
  },
  false
);

class Animal {
  constructor(name, family) {
    this.name = name;
    this.family = family;
  }
  run() {
    return alert(`${this.name} is running`);
  }
  showFamily() {
    return alert(`${this.name}'s family is ${this.family}`);
  }
}

const cat = new Animal('Cat', 'feline');
