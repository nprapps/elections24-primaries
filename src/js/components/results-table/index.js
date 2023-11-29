/*

Simple generic results table - used for prototyping the custom element code

*/

var dot = require("../../lib/dot");
var table = dot.compile(require("./_table.html"));
require("./results-table.less");

var { formatAPDate, formatTime } = require("../utils");

var ElementBase = require("../elementBase");

var mugs = require("mugs.sheet.json");
var defaultFold = Object.keys(mugs)
  .filter(k => mugs[k].featured)
  .sort();

var defaultRefresh = 15;
var defaultMax = 4;

var sortIndex = item =>
  defaultFold.indexOf(item.last) + 1 || (item.last == "Other" ? 101 : 100);

class ResultsTable extends ElementBase {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["href", "headline"];
  }

  static get mirroredProps() {
    return ["href", "headline"];
  }

  attributeChangedCallback(attr, was, value) {
    var elements = this.illuminate();

    switch (attr) {
      case "href":
        elements.resultsLink.href = value || "";
        break;

      case "headline":
        elements.headline.innerHTML = value.trim();
        break;
    }
  }

  illuminate() {
    var elements = super.illuminate();
    elements.moreButton.addEventListener("click", () =>
      this.toggleAttribute("expanded")
    );
    return elements;
  }

  render(result) {
    var elements = this.illuminate();

    var {
      candidates,
      party,
      precincts,
      reporting,
      reportingPercentage,
      updated,
      eevp
    } = result;

    // copy the array before mutating
    candidates = candidates.slice();

    this.dispatch("updatedtime", { updated });

    elements.footnote.innerHTML =
      candidates.length > 1
        ? ""
        : "The AP does not tabulate votes for uncontested races and declares its winner as soon as polls close.";

    this.setAttribute("party", party);
    // normalize percentages
    var hasIncumbent = false;
    candidates.forEach(function(c) {
      c.percentage = c.percentage || 0;
      hasIncumbent = c.incumbent || hasIncumbent;
    });
    elements.incumbency.style.display = hasIncumbent ? "" : "none";

    // check for existing votes
    candidates.sort((a, b) => b.percentage - a.percentage);
    // re-sort if no votes are cast
    var hasVotes = !!candidates[0].percentage;
    if (!hasVotes) {
      // sort by default view, then by name
      candidates.sort(function(a, b) {
        var aValue = sortIndex(a);
        var bValue = sortIndex(b);
        if (aValue == bValue) {
          return a.last < b.last ? -1 : 1;
        }
        return aValue - bValue;
      });
    }

    // filter small candidates into others
    var [others] = candidates.filter(c => c.last == "Other");
    if (!others) {
      others = {
        last: "Other",
        votes: 0,
        percentage: 0
      };
      candidates.push(others);
    }
    candidates = candidates.filter(function(c) {
      if (
        hasVotes &&
        candidates.length > 3 &&
        c.last != "Other" &&
        c.percentage < 1 &&
        defaultFold.indexOf(c.last) == -1
      ) {
        others.percentage += c.percentage;
        others.votes += c.votes;
        return false;
      }
      return true;
    });
    // remove it if empty
    if (!others.votes) {
      candidates = candidates.filter(c => c != others);
    }

    // decide if we need overflow
    var max = this.getAttribute("max") || defaultMax;
    var fold = candidates.slice(0, max).map(c => c.last);
    if (candidates.length > fold.length) {
      this.setAttribute("overflow", "");
    } else {
      this.removeAttribute("overflow");
    }

    // if we only have one candidate (uncontested) don't show county results
    elements.resultsLink.style.display = candidates.length < 2 ? "none" : "";

    // insert content
    var highest = Math.max(...result.candidates.map(r => r.percentage || 0));
    elements.content.innerHTML = table({ candidates, highest, fold, party });

    // updated timestamp
    var updated = new Date(updated);
    var updateString = `as of ${formatTime(updated)} on ${formatAPDate(
      updated
    )}`;
    elements.updated.innerHTML = updateString;

    // adjust reporting numbers
    var reportingString = "";
    if (typeof eevp == "number") {
      reportingString = `${eevp.toFixed(0)}% results in`;
    } else {
      if (reporting > 0 && reportingPercentage < 1) {
        reportingPercentage = "<1";
      } else if (reporting < precincts && reportingPercentage > 99 && reportingPercentage < 100) {
        reportingPercentage = ">99";
      } else {
        reportingPercentage = reportingPercentage.toFixed(0);
      }

      reportingString = `${reportingPercentage}% of precincts reporting`;
    }
    elements.reporting.innerHTML = reportingString;
    if (candidates.length < 2 ) elements.reporting.style.display = "none";
  }

  static get template() {
    return require("./_template.html");
  }
}

ResultsTable.define("results-table");
