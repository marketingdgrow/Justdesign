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
