require("./analytics")

const { inDays } = require("./components/utils");
const $ = require("./lib/qsa");
const today = new Date()
const here = new URL(window.location.href)
const current_day_of_year = inDays([today.getMonth() + 1, today.getDate(), today.getFullYear()].join("/"))


if (!here.searchParams.has("eternal")) {
  $("div[data-days]").forEach(function(element) {
    let element_day = element.dataset.days
    if (element_day > current_day_of_year) {
      element.classList.add("future")
    }
  })

  $("a[data-days]").forEach(function(element) {
  	let element_day = element.dataset.days
  	if (element_day > current_day_of_year) {
 			element.removeAttribute("href")
 			element.setAttribute("aria-disabled", "true")
  	}
  })
}

// move past months to bottom of page
var months = $("section.cl__month");
var pastMonths = months.filter(function(section) {
  var month = section.dataset.month;
  var thisMonth = today.getMonth() + 1;
  return month < thisMonth;
});

if (pastMonths.length) {
  var previousLink = $.one("a.jump-to-past");
  previousLink.classList.add("show");

  var previousContainer = $.one("#past-months");
  previousContainer.classList.add("show");
  pastMonths.forEach(p => previousContainer.appendChild(p));
}

// when user clicks a month in the horizontal graphic, scroll to that month in the list
document.querySelectorAll(".cg__month-container").forEach(el => {
  el.addEventListener("click", () => {
    let section = document.querySelector("#section-" + el.dataset.month)
    let position = section.getBoundingClientRect().y
    window.scrollTo({
      top: position,
      left: 0,
      behavior: "smooth"
    })
  })
})

window.addEventListener("scroll", () => {
  const button = $.one("#scroll-to-top")
  if (window.scrollY > 1000) {
    button.style.display = "block"
  } else {
    button.style.display = "none"
  }
})

$.one("#scroll-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
})