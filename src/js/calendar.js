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