const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
const isHomePage = currentPage === "index.html";

if (!isHomePage) {
  window.location.replace("./index.html");
}

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("nav-open");
  });
}

const issuesSearch = document.getElementById("issues-search");
const issuesList = document.getElementById("issues-list");

if (issuesSearch && issuesList) {
  const issuesItems = Array.from(issuesList.querySelectorAll(".issue-item"));

  issuesSearch.addEventListener("input", () => {
    const query = issuesSearch.value.trim().toLowerCase();

    issuesItems.forEach((item) => {
      const visible = item.textContent.toLowerCase().includes(query);
      item.style.display = visible ? "" : "none";
    });
  });
}

const officeTourVideos = document.querySelectorAll(".office-tour-video");

officeTourVideos.forEach((video) => {
  const clipLength = 15;

  video.addEventListener("play", () => {
    const duration = Number(video.duration);
    if (!Number.isFinite(duration) || duration <= clipLength) return;

    const maxStart = duration - clipLength;
    const randomStart = Math.random() * maxStart;
    video.dataset.clipEnd = String(randomStart + clipLength);
    video.currentTime = randomStart;
  });

  video.addEventListener("timeupdate", () => {
    const clipEnd = Number(video.dataset.clipEnd);
    if (Number.isFinite(clipEnd) && video.currentTime >= clipEnd) {
      video.pause();
    }
  });

  video.addEventListener("pause", () => {
    if (video.dataset.clipEnd) {
      video.removeAttribute("data-clip-end");
    }
  });
});

if (isHomePage) {
  document.body.classList.add("site-locked");

  const blockedControls = document.querySelectorAll(
    "a, button, input, textarea, select, summary, .calendly-inline-widget, .office-tour-video"
  );

  blockedControls.forEach((element) => {
    element.classList.add("is-disabled-control");
    element.setAttribute("aria-disabled", "true");

    if (element.tagName === "A") {
      element.setAttribute("href", "#");
      element.setAttribute("tabindex", "-1");
    }

    if (element.tagName === "BUTTON" || element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT") {
      element.setAttribute("disabled", "true");
      element.setAttribute("tabindex", "-1");
    }

    if (element.tagName === "VIDEO") {
      element.pause();
      element.removeAttribute("controls");
    }

    element.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  });
}

