
document.addEventListener("DOMContentLoaded", function () {
	
	toggleMenu();
	accordionFunction();
	prettyScroll();
	animationHeader();
	initCountdowns();
	addAnimationInit();
});

setTimeout(function () {
	let aosOffset = 120;
	if (window.innerWidth < 480) {
		aosOffset = 30;
	}
	AOS.init({
		offset: aosOffset
	});
}, 100);


const prettyScroll = () => {
	document.querySelectorAll('a[href^="#"]').forEach(link => {
			link.addEventListener('click', function(e) {
					e.preventDefault();

					const href = this.getAttribute('href').substring(1);
					const scrollTarget = document.getElementById(href);

					if (!scrollTarget) return;

					const header = document.querySelector('header');
					const fixedHeader = document.querySelector('.header__bottom');

					const topOffset = header?.offsetHeight || 0;
					const fixedOffset = fixedHeader?.offsetHeight || 0;

					const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
					const elementPosition = scrollTarget.getBoundingClientRect().top;

					const offsetPosition = isDesktop 
							? elementPosition - fixedOffset 
							: elementPosition - topOffset;

					window.scrollBy({
							top: offsetPosition,
							behavior: 'smooth'
					});
			});
	});
};
const animationHeader = () =>{
	let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
		const headerNav = document.querySelector(".header__bottom");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		let windowInnerWidth = window.innerWidth;
    if (windowInnerWidth >= 1024) {
      if (scrollTop > lastScrollTop) {
        if (scrollTop > 100) {
          headerNav.classList.add("fixed-header-nav");
          headerNav.style.animationName = "smoothScroll";
        }
      } else if (scrollTop <= 0) {
        headerNav.classList.remove("fixed-header-nav");
        headerNav.style.animationName = "removeSmoothScroll";
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
  });
}
const toggleMenu = () =>{
	const htmlElement = document.querySelector("html");
	const burgerMenu = document.querySelector(".burger");
  const navLinks = document.querySelectorAll("nav a");
  burgerMenu.addEventListener("click", () =>
    htmlElement.classList.toggle("open")
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      htmlElement.classList.remove("open");
    });
  });
}

function updateCountdown(targetDate, countdownElement, infoContentElement) {
	function calculateTime() {
			let now = new Date().getTime();
			let difference = targetDate - now;

			if (difference > 0) {
					let days = Math.floor(difference / (1000 * 60 * 60 * 24));
					let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

					countdownElement.querySelector(".days").textContent = days.toString().padStart(2, '0');
					countdownElement.querySelector(".hours").textContent = hours.toString().padStart(2, '0');
					countdownElement.querySelector(".minutes").textContent = minutes.toString().padStart(2, '0');
			} else {
					
					infoContentElement.innerHTML = "<span>The tournament is over</span>";
					countdownElement.style.display = "none"; 
			}
	}

	calculateTime();
	setInterval(calculateTime, 60000);
}

function initCountdowns() {
	let tournaments = document.querySelectorAll(".tournament__container");

	tournaments.forEach((tournament) => {
			let dateString = tournament.querySelector(".date").textContent.trim();
			let countdownElement = tournament.querySelector(".time");
			let infoContentElement = tournament.querySelector(".tournament__info__content");
			let targetDate = new Date(dateString).getTime();

			if (!isNaN(targetDate)) {
					updateCountdown(targetDate, countdownElement, infoContentElement);
			}
	});
}

const addAnimationInit = () => {

	const scrollers = document.querySelectorAll('.marquee');
	if(!window.matchMedia("(prefers-reduced-motion:reduce)").matches){
		addAnimation();
	}
	function addAnimation(){
		scrollers.forEach((scroller) =>{
			scroller.setAttribute("data-animate", true);
			const scrollerInner = scroller.querySelector('.marquee__wrap');
			const scrollerContent = Array.from(scrollerInner.children);
			scrollerContent.forEach(item =>{
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute('aria-hidden', true);
				scrollerInner.appendChild(duplicatedItem);
			});
			
		});
	}
}
const accordionFunction = () => {
  const accordionItems = document.querySelectorAll(".accord-item");

  accordionItems.forEach((item) => {
    item.addEventListener("click", function () {
      item.classList.toggle("active");
    });

    const buttons = item.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
  });
};


