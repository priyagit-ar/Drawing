/* Priya's Drawing Studio — small progressive enhancements.
   The page works without JavaScript; this file only adds polish. */
(function () {
  "use strict";

  // WhatsApp number in international format, digits only (+31 6 16 31 10 63).
  var WHATSAPP_NUMBER = "31616311063";

  var lang = (document.documentElement.lang || "en").slice(0, 2);

  var TEXT = {
    en: {
      greeting: "Hi Priya!",
      intro: "I'd like to ask about drawing classes.",
      parent: "My name",
      age: "Child's age",
      years: "years",
      cls: "Interested in",
      day: "Preferred day",
      note: "Note",
      suggest: "Suggested level for this age:",
      levels: { 1: "Little Doodlers", 2: "Young Artists", 3: "Junior Studio" }
    },
    nl: {
      greeting: "Hoi Priya!",
      intro: "Ik heb een vraag over de tekenlessen.",
      parent: "Mijn naam",
      age: "Leeftijd kind",
      years: "jaar",
      cls: "Interesse in",
      day: "Voorkeursdag",
      note: "Opmerking",
      suggest: "Aanbevolen niveau voor deze leeftijd:",
      levels: { 1: "Little Doodlers", 2: "Young Artists", 3: "Junior Studio" }
    }
  };
  var t = TEXT[lang] || TEXT.en;

  function waLink(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  // Sticky header border once the page scrolls.
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobile navigation.
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Curriculum tabs (WAI-ARIA tabs pattern).
  document.querySelectorAll("[role='tablist']").forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll("[role='tab']"));

    function select(tab, focus) {
      tabs.forEach(function (other) {
        var selected = other === tab;
        other.setAttribute("aria-selected", selected ? "true" : "false");
        other.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(other.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        select(tab, false);
      });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") next = tabs[0];
        if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          e.preventDefault();
          select(next, true);
        }
      });
    });

    // "See curriculum" links on the level cards open the matching tab.
    document.querySelectorAll("[data-open-tab]").forEach(function (link) {
      link.addEventListener("click", function () {
        var tab = document.getElementById(link.getAttribute("data-open-tab"));
        if (tab && tabs.indexOf(tab) !== -1) select(tab, false);
      });
    });
  });

  // Booking helper: builds a WhatsApp message. Nothing is stored or sent
  // anywhere except to WhatsApp when the parent presses the button.
  var form = document.getElementById("booking-form");
  if (form) {
    var ageSelect = form.querySelector("[name='age']");
    var hint = document.getElementById("age-hint");

    var levelForAge = function (age) {
      if (!age) return null;
      if (age <= 6) return 1;
      if (age <= 9) return 2;
      return 3;
    };

    if (ageSelect && hint) {
      ageSelect.addEventListener("change", function () {
        var level = levelForAge(parseInt(ageSelect.value, 10));
        hint.textContent = level ? t.suggest + " " + t.levels[level] : "";
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var lines = [t.greeting + " " + t.intro, ""];
      var add = function (label, value) {
        value = (value || "").toString().trim();
        if (value) lines.push(label + ": " + value);
      };
      add(t.parent, data.get("parent"));
      var age = data.get("age");
      add(t.age, age ? age + " " + t.years : "");
      add(t.cls, data.get("class"));
      add(t.day, data.get("day"));
      add(t.note, data.get("note"));
      var link = document.createElement("a");
      link.href = waLink(lines.join("\n"));
      link.target = "_blank";
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  // Keep the copyright year current.
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
