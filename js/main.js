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
