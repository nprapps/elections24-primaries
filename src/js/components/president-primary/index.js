var ElementBase = require("../elementBase");
var Retriever = require("../retriever");
require("../president-results");
require("./president-primary.less");
var { mapToElements, toggleAttribute } = require("../utils");

var strings = require("strings.sheet.json");
var mugs = require("mugs.sheet.json");

class PresidentPrimary extends ElementBase {
  constructor() {
    super();
    this.fetch = new Retriever(this.load);
  }

  static get boundMethods() {
    return ["load"];
  }

  static get mirroredProps() {
    return ["src", "href"]
  }

  static get observedAttributes() {
    return ["src", "href", "live", "party"];
  }

  attributeChangedCallback(attr, old, value) {

    switch (attr) {
      case "src":
        if (this.hasAttribute("live")) {
          this.fetch.watch(value, this.getAttribute("refresh") || 15);
        } else {
          this.fetch.once(value);
        }
        break;

      case "live":
        if (typeof value == "string") {
          this.fetch.start(value || 15);
        } else {
          this.fetch.stop();
        }
        break;

      default:
        this.render();
    }
  }

  load(data) {
    this.cache = data;
    this.render();
  }

  render() {
    var elements = this.illuminate();

    if (!this.cache) return;
    var { races, chatter, footnote } = this.cache;

    elements.chatter.innerHTML = chatter || "";
    elements.footnote.innerHTML = footnote || "";
    
    var partyDisplayOrder = ["GOP","Dem"]

    function sortParty(parties,displayOrder) {
      const orderIndexes = displayOrder.slice(0).reverse();
      return parties.sort((a,b) => {
        var aI = -orderIndexes.indexOf(a.party)
        var bI = -orderIndexes.indexOf(b.party)
        return aI - bI
      })
    }
    sortParty(races,partyDisplayOrder)

    var pairs = mapToElements(elements.results, races, "president-results");
    pairs.forEach(([data, child]) => {
      
      var href = this.getAttribute("href");
      var max = this.getAttribute("max");
      var party = this.getAttribute("party");
      var host = this.getAttribute("host");
      var isTest = !!this.cache.test;
      
      toggleAttribute(child, "hidden", party && data.party != party);
      toggleAttribute(child, "test", isTest);
      
      var partyText = data.party == "Dem" ? "Democratic" : data.party == "GOP" ? "Republican" : data.party;
      var headline = `${strings[data.state + "-AP"]} ${partyText} primary`;
        // thanks utah (presidential primary AND a caucus on the same day)
        if (data.id == "47758") {
        var headline = `${strings[data.state + "-AP"]} ${partyText} caucus`;
      }

      if (host == "statepage") {
        headline = `${partyText} primary`;
        // thanks utah pt 2
        if (data.id == "47758") {
          headline = `${partyText} caucus`;
        }

        // update the link
        if (href != "false") {
          var search = new URLSearchParams("counties=true&office=P");
          search.set("date", data.date);
          search.set("party", data.party);
          href = "#" + search.toString();
          var { resultsLink } = child.illuminate();
          resultsLink.innerHTML = "See county results &rsaquo;";
        }
      }

      if (href && href != "false") child.setAttribute("href", href);
      if (max) child.setAttribute("max", max);
      child.setAttribute("headline", headline);
      child.render(data);
    });

    let credits = [], creditString = ""
    races.forEach(race => {
      let ap_candidates = race.results[0].candidates
      ap_candidates.forEach(c => {
        if (c.percentage > 1 && mugs[c.last]) {
          credits.push(mugs[c.last].credit)
        }
      })
    })
    if (credits.length > 0) {
      credits.forEach((c, i) => {
        if (credits.length === 1) {
          creditString += "Photo by " + c
        } else {
          if (i === 0) {
            creditString += "Photos by " + c
          } else if (i < credits.length - 1) {
            creditString += ", " + c
          } else if (i === credits.length - 1) {
            creditString += " and " + c
          }
        }
      })
    }
    elements.photoCredit.innerHTML = creditString
  }

  static get template() {
    return `
<div class="chatter" data-as="chatter"></div>
<div class="results" data-as="results"></div>
<p class="footnote" data-as="footnote"></p>
<p class="photo-credit" data-as="photoCredit"></p>
    `
  }
}

PresidentPrimary.define("president-primary");
