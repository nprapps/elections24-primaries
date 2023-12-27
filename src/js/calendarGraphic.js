const prev_button = document.querySelector("#cg__prev-button")
const next_button = document.querySelector("#cg__next-button")
const calendar_element = document.querySelector(".cg__viewport")
const month_width = 185

const today = new Date()
// const current_month = today.getMonth()
const current_month = 0 // pretending it is january for testing
let current_position

const scroll_to_month = function(month) {
	calendar_element.scroll(month * month_width, 0)
}

const scroll_to_position = function(position) {
	calendar_element.scroll(position, 0)
}

const scroll_to_previous_month = function() {
	current_position = calendar_element.scrollLeft
	scroll_to_position(current_position - month_width)
}

const scroll_to_next_month = function() {
	current_position = calendar_element.scrollLeft
	scroll_to_position(current_position + month_width)
}

// scroll_to_month(current_month)
prev_button.addEventListener("click", scroll_to_previous_month)
next_button.addEventListener("click", scroll_to_next_month)