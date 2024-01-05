const { inDays } = require("./components/utils");
const $ = require("./lib/qsa");
const prev_button = document.querySelector("#cg__prev-button")
const next_button = document.querySelector("#cg__next-button")
const calendar_element = document.querySelector(".cg__viewport")
const visual_month_width = 165,
  margin = 20,
  month_width = visual_month_width + margin,
  breakpoint = 1025,
  scroll_width = month_width * 12 - margin
const today = new Date()
let calendar_element_width = calendar_element.getBoundingClientRect().width
let current_month

if (today.getFullYear() === 2024) {
	current_month = today.getMonth()
} else {
	current_month = 0
}

const current_day_of_year = inDays([today.getMonth() + 1, today.getDate(), today.getFullYear()].join("/"))
const here = new URL(window.location.href)

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

const scroll_to_month = function(month) {
	if (window.innerWidth > breakpoint) {
		calendar_element.scroll(month * month_width, 0)
	} else {
		calendar_element.scroll(month * month_width - 60, 0)
	}
}

const scroll_to_position = function(position) {
	calendar_element.scroll(position, 0)
}

const recalculate_calendar_element_width = function() {
	calendar_element_width = calendar_element.getBoundingClientRect().width
}

const scroll_to_previous_month = function() {
	let position = calendar_element.scrollLeft
	scroll_to_position(position - month_width)
}

const scroll_to_next_month = function() {
	let position = calendar_element.scrollLeft
	scroll_to_position(position + month_width)
}

const show_or_hide_buttons = function() {
	let position = calendar_element.scrollLeft
	if (position === 0) {
		prev_button.classList.remove("shown")
		prev_button.classList.add("hidden")
		next_button.classList.remove("hidden")
		next_button.classList.add("shown")
	} else if (position === scroll_width - calendar_element_width) {
		prev_button.classList.remove("hidden")
		prev_button.classList.add("shown")
		next_button.classList.remove("shown")
		next_button.classList.add("hidden")
	} else {
		prev_button.classList.remove("hidden")
		prev_button.classList.add("shown")
		next_button.classList.remove("hidden")
		next_button.classList.add("shown")
	}
}

window.addEventListener("resize", recalculate_calendar_element_width)
prev_button.addEventListener("click", scroll_to_previous_month)
next_button.addEventListener("click", scroll_to_next_month)
calendar_element.addEventListener("scroll", show_or_hide_buttons)

scroll_to_month(current_month)
if (current_month === 0) {
		prev_button.classList.remove("shown")
		prev_button.classList.add("hidden")
}