window.onload = () => {
// header scroll
let header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  let scrollBar = window.scrollY;
  const logoLinks = document.querySelectorAll('.logo a');
  const hambugerLinks = document.querySelectorAll('.hambuger a');

  if (scrollBar > 0) {
    header.classList.add('active');

    logoLinks[0].classList.remove('active');
    logoLinks[1].classList.add('active');

    hambugerLinks[0].classList.remove('active');
    hambugerLinks[1].classList.add('active');
  } else {
    header.classList.remove('active');

    logoLinks[1].classList.remove('active');
    logoLinks[0].classList.add('active');

    hambugerLinks[1].classList.remove('active');
    hambugerLinks[0].classList.add('active');
  }
});
  //main visual 영역
  const slides = document.querySelectorAll('.slide');
  const navContainer = document.querySelector('.nav-buttons');
  const labels = ['Intro', 'End-to-End', 'Trust', 'Innovation'];
  let current = 0;
  let interval;


  //main visual gsap 애니메이션영역
  function animateText(slide) {
    const h2 = slide.querySelector('h2');
    const p = slide.querySelector('p');
    gsap.fromTo(h2, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 });
    gsap.fromTo(p, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.4 });
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      navContainer.children[i].classList.toggle('active', i === index);
    });
    animateText(slides[index]);
    current = index;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  function createNavButtons() {
    labels.forEach((label, i) => {
      const btn = document.createElement('div');
      btn.classList.add('nav-button');
      btn.textContent = label;
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => {
        clearInterval(interval);
        showSlide(i);
        interval = setInterval(nextSlide, 5000);
      });
      navContainer.appendChild(btn);
    });
  }

  createNavButtons();
  showSlide(0);
  interval = setInterval(nextSlide, 5000);




  //   햄버거버튼클릭시 모달 나옴
  const hamburger = document.querySelector('.hambuger');
  const menuModal = document.querySelector('.menu-modal');
  const menuClose = document.querySelector('.menu-close');

  hamburger.addEventListener('click', () => {
    menuModal.classList.add('active');
  });

  menuClose.addEventListener('click', () => {
    menuModal.classList.remove('active');
  });


  // section01 숫자카운트영역
  function animateCounter(el, target) {
    let current = 0;
    const duration = 1000; // 1초
    const increment = Math.ceil(target / (duration / 16));

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      el.textContent = current.toLocaleString();
    }, 16);
  }
  //   section01 글자효과

  gsap.from(".section01 h3", {
    scrollTrigger: {
      trigger: ".section01 h3",
      start: "bottom bottom",  // h3의 bottom이 화면 bottom에 닿을 때 시작 (올라올 때 자연스럽게 등장)
      end: "top top",          // h3의 top이 화면 top에 닿을 때 끝 (내려갈 때 reverse)
      toggleActions: "play reverse play reverse",
      markers: false
    },
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: "power2.out"
  });

  // sectioncount가 보이면 실행
  function animateCounterGSAP(el, target, hasPlus) {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.1,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.floor(obj.val).toLocaleString() + (hasPlus ? '+' : '');
      },
      onComplete: () => {
        el.textContent = target.toLocaleString() + (hasPlus ? '+' : '');
      }
    });
  }

  function observeCountSection() {
    const section = document.querySelector('.sectioncount');
    const spans = section.querySelectorAll('span');
    let triggered = false;

    const observer = new IntersectionObserver((entries) => {
      if (!triggered && entries[0].isIntersecting) {
        spans.forEach((el) => {
          const rawText = el.textContent;
          const hasPlus = rawText.includes('+');
          const numberOnly = parseInt(rawText.replace(/[^\d]/g, ''), 10);
          animateCounterGSAP(el, numberOnly, hasPlus);
        });
        triggered = true;
        observer.unobserve(section); // 한 번 실행 후 중지
      }
    }, {
      threshold: 0.3 // 30% 이상 보이면 실행
    });

    observer.observe(section);
  }

  observeCountSection();

  // section02
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".section02 ul li", {
    scrollTrigger: {
      trigger: ".section02 ul",       // 리스트 전체 기준
      start: "top 80%",               // 화면의 80% 지점에 닿으면 시작
      toggleActions: "play reverse play reverse",
    },
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    stagger: 0.2                     // ✅ 순차 등장! (0.2초 간격)
  });

  //   section02 hover event
  // hover 애니메이션 - 반복 적용을 위해 모두 가져옴
  document.querySelectorAll('.imagebox').forEach(box => {
    const btn = box.querySelector('.morebtn1');

    // 기본 위치 초기화
    gsap.set(btn, {
      opacity: 0,
      y: 20
    });

    // 마우스 오버
    box.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    });

    // 마우스 아웃
    box.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.in"
      });
    });
  });

  // section03
  ScrollTrigger.create({
    trigger: ".section03 .inner",      // 고정 기준: inner
    start: "top top",                  // inner의 top이 브라우저 top에 닿을 때
    end: "bottom bottom",              // inner의 bottom이 브라우저 bottom에 닿을 때
    pin: ".section03 .fix",            // 고정할 대상
    pinSpacing: false                  // 추가 여백 없이 고정
  });

  // section04
  let menu = document.querySelectorAll('.section04 .inner .contents .content');
  let itemWrap = document.querySelectorAll('.section04 .inner .item_wrap');
  for (let i = 0; i < itemWrap.length; i++) {
    menu[i].addEventListener('click', () => {
      menu.forEach(element => {
        element.classList.remove('active');
      });
      // forEach로 모든 클래스 제거를 해준뒤
      menu[i].classList.add('active');
      // 클래스i추가를 해준다. (제거->추가 이 순서 반대로되면 작동이안됨.)
      itemWrap.forEach(item => {
        item.classList.remove('active');
      })
      itemWrap[i].classList.add('active');


    });
  }

  // 뒷배경 그라디언트
  const yellowBlob = document.querySelector('.blob-yellow');
const blueBlob = document.querySelector('.blob-blue');
const cursorDot = document.querySelector('.cursor-dot');

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
  targetX = e.clientX;
  targetY = e.clientY;

  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
});

function animateBlobs() {
  const speed = 0.05;
  currentX += (targetX - currentX) * speed;
  currentY += (targetY - currentY) * speed;

  yellowBlob.style.left = `${currentX}px`;
  yellowBlob.style.top = `${currentY}px`;
  blueBlob.style.left = `${currentX + 100}px`;
  blueBlob.style.top = `${currentY + 100}px`;

  requestAnimationFrame(animateBlobs);
}
animateBlobs();
document.addEventListener('mousemove', (e) => {
  const sections = document.querySelectorAll('.section01, .section02, .section03, .section04, .section05, .section06');
  let insideSection = false;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom
    ) {
      insideSection = true;
    }
  });

  if (insideSection) {
    yellowBlob.style.opacity = '1';
    blueBlob.style.opacity = '1';
    cursorDot.style.opacity = '0';
  } else {
    yellowBlob.style.opacity = '0';
    blueBlob.style.opacity = '0';
    cursorDot.style.opacity = '0';
  }
});
};//end




