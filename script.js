const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".main-nav a");
const topbar = document.querySelector(".topbar");
const mainNav = document.getElementById("primaryNav");
const navToggle = document.getElementById("navToggle");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  revealItems.forEach((item) => item.classList.add("in-view"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = `${Number(entry.target.dataset.delay || 0)}ms`;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const setActiveNavLink = (link) => {
  navLinks.forEach((item) => item.classList.remove("active"));
  if (link) link.classList.add("active");
};

let selectedNavLink = Array.from(navLinks).find((link) => link.classList.contains("active"));
if (!selectedNavLink && navLinks.length > 0) {
  selectedNavLink = navLinks[0];
  setActiveNavLink(selectedNavLink);
}

const closeNavMenu = () => {
  if (!topbar || !navToggle) return;
  topbar.classList.remove("menu-open");
  navToggle.setAttribute("aria-expanded", "false");
};

if (navLinks.length > 0) {
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => setActiveNavLink(link));
    link.addEventListener("focus", () => setActiveNavLink(link));
    link.addEventListener("click", () => {
      selectedNavLink = link;
      setActiveNavLink(link);
      closeNavMenu();
    });
  });
}

if (mainNav) {
  mainNav.addEventListener("mouseleave", () => {
    if (selectedNavLink) setActiveNavLink(selectedNavLink);
  });

  mainNav.addEventListener("focusout", () => {
    if (!mainNav.contains(document.activeElement) && selectedNavLink) {
      setActiveNavLink(selectedNavLink);
    }
  });
}

if (navToggle && topbar) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    const nextState = !isExpanded;

    topbar.classList.toggle("menu-open", nextState);
    navToggle.setAttribute("aria-expanded", String(nextState));
  });

  document.addEventListener("click", (event) => {
    if (!topbar.contains(event.target)) {
      closeNavMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeNavMenu();
  });
}

const letterTitles = document.querySelectorAll(".js-letter-title");

letterTitles.forEach((title) => {
  const rawText = (title.dataset.text || title.textContent || "").trim();
  if (!rawText) return;

  const fragment = document.createDocumentFragment();
  Array.from(rawText).forEach((char, index) => {
    const span = document.createElement("span");
    span.className = "title-letter";
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.setProperty("--letter-delay", `${index * 36}ms`);
    fragment.appendChild(span);
  });

  title.textContent = "";
  title.appendChild(fragment);
});

if (reduceMotion) {
  letterTitles.forEach((title) => title.classList.add("is-visible"));
} else if (letterTitles.length > 0) {
  const letterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  letterTitles.forEach((title) => letterObserver.observe(title));
}

const nextCardBtn = document.getElementById("nextCardBtn");
const nextCardImage = document.getElementById("nextCardImage");
const projectCard = document.getElementById("projectContentCard");
const featureImage = document.getElementById("featureImage");
const establishedText = document.getElementById("establishedText");
const projectTitle = document.getElementById("projectTitle");
const projectDesc = document.getElementById("projectDesc");
const projectCta = document.getElementById("projectCta");

if (
  nextCardBtn &&
  nextCardImage &&
  projectCard &&
  featureImage &&
  establishedText &&
  projectTitle &&
  projectDesc &&
  projectCta
) {
  const showcaseProjects = [
    {
      year: "ESTABLISHED 2009",
      title: "Residential Interior Designer in Chennai",
      description:
        "Most homes look finished the day the contractor leaves — and never quite feel right after that. Just Design Interiors works differently. Every home interior project in Chennai begins with understanding how your family moves, rests, and gathers. We plan rooms around those habits, not around a mood board. The result is a home that carries your personality in every corner — not just the ones guests see.",
      image:
        "./img/1.jpg",
    
      cta: "Explore Home Interiors"
    },
    {
      year: "ESTABLISHED 2011",
      title: "Office Interior Designer in Chennai",
      description:
        "A poorly designed office costs more than a renovation — it costs attention, energy, and the kind of clear thinking that only happens when the space gets out of the way. Just Design Interiors plans office interiors in Chennai where every layout decision has a reason behind it. Whether it is a private cabin, an open floor, or a client-facing reception — each area is built for the work that actually happens inside it, not the work that looks good in a brochure.",
      image:
        "./img/4.jpg",
      alt: "Living room interior",
      cta: "Explore Office Interiors"
    },
    {
      year: "ESTABLISHED 2014",
      title: "Modular Kitchen Designers in Chennai",
      description:
        "Not every kitchen needs an island. Not every cook works the same way. Just Design Interiors plans modular kitchens in Chennai around your habits — the way you move between the stove and the counter, the way you store everyday groceries versus once-a-year utensils, and the meals your family actually makes on a Tuesday. No wasted corners. No shelves you never reach. Every cabinet earns its place before a single board is cut.",
      image:
        "./img/7.jpg",
      alt: "Kitchen interior",
      cta: "Explore Modular Kitchens"
    },
    // {
    //   year: "ESTABLISHED 2017",
    //   title: "Hotel-Style Bedrooms\nBuilt to Relax",
    //   description:
    //     "Balanced lighting, soft palettes and detailed material selection create bedrooms that feel calm, private and beautifully layered.",
    //   image:
    //     "https://images.unsplash.com/photo-1616594039964-3c8f9f14fce9?auto=format&fit=crop&w=900&q=80",
    //   alt: "Luxury bedroom interior",
    //   cta: "#"
    // }
  ];

  let currentIndex = 0;
  let isSwitching = false;

  const setProjectData = () => {
    const currentProject = showcaseProjects[currentIndex];
    const nextIndex = (currentIndex + 1) % showcaseProjects.length;
    const nextProject = showcaseProjects[nextIndex];

    featureImage.src = currentProject.image;
    featureImage.alt = currentProject.alt;
    establishedText.textContent = currentProject.year;
    projectTitle.innerHTML = currentProject.title.replace(/\n/g, "<br />");
    projectDesc.textContent = currentProject.description;
    projectCta.href = currentProject.cta;

    nextCardImage.src = nextProject.image;
    nextCardImage.alt = `Next project preview: ${nextProject.alt}`;
  };

  const switchProject = () => {
    if (isSwitching) return;
    currentIndex = (currentIndex + 1) % showcaseProjects.length;

    if (reduceMotion) {
      setProjectData();
      return;
    }

    isSwitching = true;
    projectCard.classList.add("is-switching");
    nextCardBtn.classList.add("is-switching");

    window.setTimeout(() => {
      setProjectData();
      requestAnimationFrame(() => {
        projectCard.classList.remove("is-switching");
        nextCardBtn.classList.remove("is-switching");
        isSwitching = false;
      });
    }, 220);
  };

  setProjectData();
  nextCardBtn.addEventListener("click", switchProject);
}

const countNodes = document.querySelectorAll(".count-up");
const resultsSection = document.querySelector(".results-section");

if (countNodes.length > 0) {
  const animateCounter = (node, delay = 0) => {
    const target = Number(node.dataset.target || 0);
    const suffix = node.dataset.suffix || "";
    const duration = 1450;

    if (reduceMotion) {
      node.textContent = `${target}${suffix}`;
      return;
    }

    window.setTimeout(() => {
      const start = performance.now();

      const updateCounter = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(target * eased);
        node.textContent = `${currentValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    }, delay);
  };

  if (reduceMotion) {
    countNodes.forEach((node) => animateCounter(node));
  } else if (resultsSection) {
    let didStart = false;

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || didStart) return;
          didStart = true;

          countNodes.forEach((node, index) => {
            animateCounter(node, index * 110);
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    counterObserver.observe(resultsSection);
  }
}

const storyItemsWrap = document.getElementById("storyItems");
const storyLineProgress = document.getElementById("storyLineProgress");

if (storyItemsWrap && storyLineProgress) {
  const updateStoryLine = () => {
    const maxScroll = storyItemsWrap.scrollHeight - storyItemsWrap.clientHeight;
    const ratio = maxScroll > 0 ? storyItemsWrap.scrollTop / maxScroll : 1;
    storyLineProgress.style.transform = `scaleY(${Math.max(0, Math.min(1, ratio))})`;
  };

  const syncStoryLine = () => updateStoryLine();

  syncStoryLine();
  storyItemsWrap.addEventListener("scroll", syncStoryLine, { passive: true });
  window.addEventListener("resize", syncStoryLine);
}



// ======================================
// ROOM SHOWCASE SLIDER
// ======================================
const roomSliderSection = document.querySelector(".room-slider-section");

if (roomSliderSection) {
  const roomSlides = Array.from(roomSliderSection.querySelectorAll(".room-slide"));
  const roomTabs = Array.from(roomSliderSection.querySelectorAll(".room-slider-tab"));
  const dotsWrap = roomSliderSection.querySelector(".room-slider-dots");
  const stage = roomSliderSection.querySelector(".room-slider-stage");

  if (roomSlides.length > 0 && dotsWrap && stage) {
    let activeIndex = roomSlides.findIndex((slide) => slide.classList.contains("is-active"));
    let autoTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;
    const SWIPE_THRESHOLD = 45;

    if (activeIndex < 0) {
      activeIndex = 0;
    }

    function getWrappedIndex(index) {
      const total = roomSlides.length;
      return (index + total) % total;
    }

    function getRelativePosition(index) {
      const total = roomSlides.length;
      const rawOffset = index - activeIndex;
      const wrappedOffset = ((rawOffset + total) % total + total) % total;
      return wrappedOffset > total / 2 ? wrappedOffset - total : wrappedOffset;
    }

    function buildDots() {
      roomSlides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "room-slider-dot";
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        dot.addEventListener("click", () => {
          setActive(i);
          restartAuto();
        });
        dotsWrap.appendChild(dot);
      });
    }

    function updateClasses() {
      const dots = Array.from(dotsWrap.querySelectorAll(".room-slider-dot"));

      roomSlides.forEach((slide, index) => {
        const rel = getRelativePosition(index);
        slide.classList.remove("is-active", "is-prev", "is-next", "is-far-left", "is-far-right");

        if (rel === 0) {
          slide.classList.add("is-active");
          slide.setAttribute("aria-hidden", "false");
        } else if (rel === -1) {
          slide.classList.add("is-prev");
          slide.setAttribute("aria-hidden", "true");
        } else if (rel === 1) {
          slide.classList.add("is-next");
          slide.setAttribute("aria-hidden", "true");
        } else if (rel < 0) {
          slide.classList.add("is-far-left");
          slide.setAttribute("aria-hidden", "true");
        } else {
          slide.classList.add("is-far-right");
          slide.setAttribute("aria-hidden", "true");
        }
      });

      roomTabs.forEach((tab, index) => {
        const isActive = index === activeIndex;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      const activeTab = roomTabs[activeIndex];
      if (activeTab) {
        // activeTab.scrollIntoView({
        //   behavior: "smooth",
        //   inline: "center",
        //   block: "nearest",
        // });
      }

      dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === activeIndex);
      });
    }

    function setActive(index) {
      activeIndex = getWrappedIndex(index);
      updateClasses();
    }

    function nextSlide() {
      setActive(activeIndex + 1);
    }

    function prevSlide() {
      setActive(activeIndex - 1);
    }

    function startAuto() {
      if (autoTimer || roomSlides.length <= 1) return;
      autoTimer = setInterval(nextSlide, 3500);
    }

    function stopAuto() {
      if (!autoTimer) return;
      clearInterval(autoTimer);
      autoTimer = null;
    }

    function restartAuto() {
      stopAuto();
      startAuto();
    }

    roomTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const index = Number(tab.dataset.slide);
        if (Number.isNaN(index)) return;
        setActive(index);
        restartAuto();
      });
    });

    roomSlides.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        if (index === activeIndex) return;
        setActive(index);
        restartAuto();
      });
    });

    stage.addEventListener("mouseenter", stopAuto);
    stage.addEventListener("mouseleave", startAuto);

    stage.addEventListener(
      "touchstart",
      (event) => {
        if (!event.touches.length) return;
        touchStartX = event.touches[0].clientX;
        touchEndX = touchStartX;
      },
      { passive: true }
    );

    stage.addEventListener(
      "touchmove",
      (event) => {
        if (!event.touches.length) return;
        touchEndX = event.touches[0].clientX;
      },
      { passive: true }
    );

    stage.addEventListener(
      "touchend",
      () => {
        const distance = touchStartX - touchEndX;
        if (Math.abs(distance) < SWIPE_THRESHOLD) return;
        if (distance > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        restartAuto();
      },
      { passive: true }
    );

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAuto();
      } else {
        startAuto();
      }
    });

    buildDots();
    updateClasses();
    startAuto();
  }
}



// ===============================
// ULTRA PREMIUM CAROUSEL
// ===============================
(function () {
  const data = [
    { img: "./img/15.jpg", title: "Luxury Hall", price: "5,999", old: "8,999" },
    { img: "./img/14.jpg", title: "Modern Kitchen", price: "6,499", old: "9,999" },
    { img: "./img/13.jpg", title: "Living Room", price: "4,999", old: "7,999" },
    { img: "./img/12.jpg", title: "Bedroom", price: "3,999", old: "6,999" },
    { img: "./img/11.jpg", title: "Office Setup", price: "7,499", old: "10,999" }
  ];

  const carousel = document.getElementById("ultraCarousel");
  if (!carousel) return;

  let current = 2;

  function render() {
    carousel.innerHTML = "";

    data.forEach((item, i) => {
      const card = document.createElement("div");
      card.className = "ultra-card";

      let pos = (i - current + data.length) % data.length;

      if (pos === 0) card.classList.add("ultra-far-left");
      else if (pos === 1) card.classList.add("ultra-left");
      else if (pos === 2) card.classList.add("ultra-active");
      else if (pos === 3) card.classList.add("ultra-right");
      else card.classList.add("ultra-far-right");

      if (pos === 2) {
        card.innerHTML = `
          <img src="${item.img}">
          <div class="ultra-info">
            <h3>${item.title}</h3>
            <p>${item.price} /- <span>${item.old}</span></p>
          </div>
          <div class="ultra-icon">🛒</div>
        `;
      } else {
        card.innerHTML = `
          <img src="${item.img}">
          <div class="ultra-label">lorem ipsum</div>
        `;
      }

      carousel.appendChild(card);
    });
  }

  function animateRotate() {
    current = (current + 1) % data.length;
    render();
  }

  setInterval(animateRotate, 3000);
  render();
})();








const elements = document.querySelectorAll(".card, .large");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      const counters = entry.target.querySelectorAll(".count");
      counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;

        const update = () => {
          const increment = target / 50;
          count += increment;

          if (count < target) {
            counter.textContent = Math.floor(count) + "+";
            requestAnimationFrame(update);
          } else {
            counter.textContent = target + "+";
          }
        };

        update();
      });

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

elements.forEach(el => observer.observe(el));





