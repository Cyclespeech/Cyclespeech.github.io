const header = document.querySelector("[data-header]");
const filterButtons = document.querySelectorAll("[data-filter]");
const demoCards = document.querySelectorAll("[data-language]");
const audioPlayers = document.querySelectorAll("audio");
const revealItems = document.querySelectorAll(".reveal");

window.addEventListener(
  "scroll",
  () => header?.classList.toggle("is-scrolled", window.scrollY > 30),
  { passive: true },
);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    demoCards.forEach((card) => {
      card.classList.toggle(
        "is-hidden",
        filter !== "all" && card.dataset.language !== filter,
      );
    });
  });
});

audioPlayers.forEach((player) => {
  player.addEventListener("play", () => {
    audioPlayers.forEach((other) => {
      if (other !== player) other.pause();
    });
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px" },
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
