require("@nprapps/sidechain");
var $ = require("./lib/qsa");

var strings = require("strings.sheet.json");
var races = require("races.sheet.json");

var form = $.one("form");
var preview = $.one("side-chain");
var embedPym = $.one("textarea#pym");
var embedSidechain = $.one("textarea#sidechain");

var stateSelect = $.one("form .state");
var raceSelect = $.one(`form [name="race"]`);

var stateShown = "SC"; // specify a state to be highlighted first

var states = [...new Set(races.map(r => r.state))].sort();
states.forEach(function(s) {
  var full = strings[s];
  if (!full) return;
  var option = document.createElement("option");
  option.value = s;
  option.innerHTML = full;
  stateSelect.appendChild(option);
});

var onFormChange = function() {
  var prefix = PROJECT_URL;
  var formData = {};
  $("select, input", form).forEach(function(input) {
    var name = input.name;
    if (input.type == "checkbox") {
      formData[name] = input.checked;
    } else {
      formData[name] = input.value;
    }

  });
  var [race, file, date] = formData.race.split(":");
  if (race == "P" && formData.party == "GOP") {
    var delegatesCheckbox = document.getElementById('delegates')
    delegatesItem.hidden = false;
  }
  var url;
  form.dataset.type = formData.type;
  if (formData.type == "page") {
    url = new URL(`${prefix}states/${stateSelect.value}.html?embedded=true`);
    var hash = new URLSearchParams("");
    if (date) hash.set("date", date);
    if (race) {
      hash.set("office", race == "C" ? "P" : race);
    }
    url.hash = hash.toString();
  } else {
    if (!race || !file) {
      preview.setAttribute("src", "");
      return;
    }
    url = new URL(`${prefix}embeds/?live`);
    url.searchParams.set("race", race);
    url.searchParams.set("data", file);
    if (formData.party) {
      url.searchParams.set("party", formData.party);
    }
    if (formData.delegates) {
      url.searchParams.set("delegates", "");
    }
    if (formData.link) {
      url.searchParams.set("link", `${prefix}states/${stateSelect.value}.html`);
    }
    if (formData.district) {
      url.searchParams.set("district", formData.district);
    }
  }
  var idParts = [stateSelect.value, race, date || "state", formData.district];

  var embedPymHTML = `<p
  data-pym-loader
  data-child-src="${url.toString()}"
  id="responsive-embed-${idParts.filter(p => p).join("-").replace(/\//g, "-")}">
    Loading...
</p>
<script src="https://pym.nprapps.org/npr-pym-loader.v2.min.js"></script>`;
  embedPymHTML = embedPymHTML.replace(/\</g, "&lt;").replace(/[\n\s]+/g, " ");
  embedPym.innerHTML = embedPymHTML;

  var embedSidechainHTML = `<side-chain src="${url.toString()}"></side-chain>
  <script src="${ PROJECT_URL }sidechain.js"></script>`;
  embedSidechainHTML = embedSidechainHTML.replace(/\</g, "&lt;").replace(/[\n\s]+/g, " ");
  embedSidechain.innerHTML = embedSidechainHTML;

  preview.setAttribute("src", url.toString().replace(prefix, ""));
}

$("select[name], input[name]").forEach(el => {
  el.addEventListener("change", onFormChange);
  el.addEventListener("keyup", onFormChange);
});

var onStateChange = function() {
  raceSelect.innerHTML = "";
  var filtered = races.filter(r => r.state == stateSelect.value);
  var recent = document.createElement("option");
  recent.value = "";
  recent.innerHTML = "Most recent results (state page only)";
  raceSelect.appendChild(recent);
  filtered.forEach(function(r) {
    var option = document.createElement("option");
    option.value = `${r.caucus ? "C" : r.office}:${r.filename}:${r.date}`;
    option.innerHTML = `${r.date} - ${strings[r.office]}`;
    raceSelect.appendChild(option);
  });

  onFormChange();
};
stateSelect.addEventListener("change", onStateChange);
onStateChange();

// default drop-down to a particular state
if (typeof(stateShown) != "undefined") {
  stateSelect.value = stateShown;
  stateSelect.dispatchEvent(new Event('change')); 
}