// ========== show sidebar ===========
const navMenu = document.getElementById('sidebar');
const navToggle = document.getElementById('nav-toggle');
const navclose = document.getElementById('nav-close');

if(navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-sidebar');
  });
}

if(navclose) {
  navclose.addEventListener('click', () => {
    navMenu.classList.remove('show-sidebar');
  });
}

// =============== MIXITUP FILTER PORTFOLIO ================
let mixerPorfolio = mixitup('.work__container', {
  selectors: {
      target: '.work__card'
  },
  animation: {
      duration: 300
  }
});

// ===== link active work =====

const linkWork = document.querySelectorAll('.work__item');

function activeWork() {
  linkWork.forEach(link => {
    link.classList.remove('active-work');
    this.classList.add('active-work');
  });
}

linkWork.forEach(l => l.addEventListener('click', activeWork));

// ===== work popup =====
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('work__button')) {
    togglePortfolioPopup();
    portfolioItemDetails(e.target.parentElement);
  }
});

function togglePortfolioPopup() {
  document.querySelector('.portfolio__popup').classList.toggle('open');
}

document.querySelector('.portfolio__popup-close').addEventListener('click', togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
  const portfolioPopup = document.querySelector('.portfolio__popup');
  document.querySelector('.portfolio__popup-subtitle span').innerHTML = portfolioItem.querySelector('.work__title').innerHTML;
  document.querySelector('.portfolio__popup-body').innerHTML = portfolioItem.querySelector('.portfolio__item-details').innerHTML;
  
  const thumbnailContainer = document.querySelector('.pp__thumbnail');
  thumbnailContainer.innerHTML = ''; // Clear the thumbnail container

  if (portfolioItem.classList.contains('video')) {
    const video = document.createElement('video');
    video.classList.add('portfolio__popup-video');
    video.controls = true;
    video.src = portfolioItem.querySelector('.work__video source').src;
    thumbnailContainer.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = portfolioItem.querySelector('.work__img').src;
    img.alt = portfolioItem.querySelector('.work__img').alt;
    thumbnailContainer.appendChild(img);
  }
}

// ======= SERVICES MODAL ========
const modalViews = document.querySelectorAll('.services__modal');
const modalBtns = document.querySelectorAll('.services__button');
const modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function(modalClick) {
  modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener('click', () => modal(i));
})

modalCloses.forEach(modalClose => {
  modalClose.addEventListener('click', () => {
    modalViews.forEach(modalView => {
      modalView.classList.remove('active-modal');
    })
  })
})

// ======== INPUT ANIMATION =======
const inputs = document.querySelectorAll('.input');

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add('focus');
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == '') {
    parent.classList.remove('focus');
  }
}

inputs.forEach(input => {
  input.addEventListener('focus', focusFunc);
  input.addEventListener('blur', blurFunc);
})

// ============= SCROLL SECTION ACTIVE LINK ===========

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', navHighlighter);

function navHighlighter() {
  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
    }
  })
}