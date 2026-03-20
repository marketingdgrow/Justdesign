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
      title: "Interior Design Firm\nBased in Chennai",
      description:
        "Just Design believes that everyone deserves spaces they truly enjoy. We create original, interesting and deeply personal interiors.",
      image:
        "https://images.unsplash.com/photo-1600607687644-c7f34b5b3b8f?auto=format&fit=crop&w=900&q=80",
      alt: "Bedroom interior",
      cta: "#"
    },
    {
      year: "ESTABLISHED 2011",
      title: "Modern Living Spaces\nwith Warm Character",
      description:
        "We shape living rooms that blend comfort, practical storage and timeless textures, so every corner feels functional and emotionally rich.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
      alt: "Living room interior",
      cta: "#"
    },
    {
      year: "ESTABLISHED 2014",
      title: "Kitchen Concepts\nMade for Daily Life",
      description:
        "From workflow planning to premium finishes, we build kitchens that stay elegant while handling real family routines with ease.",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80",
      alt: "Kitchen interior",
      cta: "#"
    },
    {
      year: "ESTABLISHED 2017",
      title: "Hotel-Style Bedrooms\nBuilt to Relax",
      description:
        "Balanced lighting, soft palettes and detailed material selection create bedrooms that feel calm, private and beautifully layered.",
      image:
        "https://images.unsplash.com/photo-1616594039964-3c8f9f14fce9?auto=format&fit=crop&w=900&q=80",
      alt: "Luxury bedroom interior",
      cta: "#"
    }
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
        activeTab.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
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
