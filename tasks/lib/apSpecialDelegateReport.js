var axios = require("axios");
var fs = require("fs").promises;

var reportCache = {};

var endpoint = "https://api.ap.org/v3/elections/delegates/2024/special/preconvention";
var baseParams = {
  format: "json",
  votingRound: "latest"
};

var getAPIData = async function(url, ...params) {
  var response = await axios({
    url,
    params: Object.assign({}, baseParams, ...params),
    headers: {"x-api-key": process.env.AP_API_KEY}
  });
  return response.data;
};

var processSuperReport = function(report) {
  var data = report.delSuper.del;
  var out = {
    updated: Date.parse(report.delSuper.timestamp),
    parties: {}
  }

  var normalizeState = function(state) {
    var data = {
      state: state.sId,
      candidates: state.Cand ? state.Cand.map(function(c) {
        return {
          name: c.cName,
          id: c.cId,
          delegates: c.dTot * 1,
          supers: c.sdTot * 1
        }
      }) : []
    }
    return data;
  }

  data.forEach(function(d) {
    var party = d.pId;
    var needed = d.dNeed * 1;
    var votes = d.dVotes * 1;

    var total = d.State.filter(s => s.sId == "US").pop();
    var states = d.State.filter(s => s.sId != "US");

    out.parties[party] = {
      needed, votes,
      total: normalizeState(total),
      states: states.map(normalizeState)
    }
  });

  return out;
};

var processSumReport = function(report) {
  var out = {
    updated: Date.parse(report.delSum.timestamp),
    parties: {}
  }

  report.delSum.del.forEach(function(d) {
    var party = d.pId;
    var needed = d.dNeed * 1;
    var votes = d.dVotes * 1;
    var chosen = d.dChosen * 1;
    var remaining = d.dToBeChosen * 1;

    out.parties[party] = {
      needed, votes, chosen, remaining,
      candidates: d.Cand ? d.Cand.map(function(c) {
        return {
          name: c.cName,
          id: c.cId,
          total: c.dTot * 1,
          day: c.d1 * 1,
          week: c.d7 * 1,
          month: c.d30 * 1
        }
      }) : []
    }
  });

  return out;
};

var processStateReport = function(report) {
  var out = {
    updated: Date.parse(report.delState.timestamp),
    parties: {}
  };

  report.delState.del.forEach(function(d) {
    var party = d.pId;
    var needed = d.dNeed;
    var votes = d.dVotes;

    out.parties[party] = {
      needed, votes,
      states: d.State.map(function(s) {
        return {
          state: s.sId,
          candidates: s.Cand ? s.Cand.map(function(c) {
            return {
              name: c.cName,
              id: c.cId,
              total: c.dTot * 1,
              day: c.d1 * 1
            }
          }) : []
        }
      })
    }
  });

  return out;
};

var getSpecialDelegates = async function(test, params = {"resultsType": "l"}) {
  
  if (test) {
    params.resultsType = 't'
  }

  var output = {};
  var normalize = {
    delSuper: processSuperReport,
    delSum: processSumReport,
    delState: processStateReport
  }
  console.log("Getting special DNC delegate report...");
  reportTypes = {'summary':'delSum','state':'delState','super':'delSuper'}
  var reports = Object.entries(reportTypes).map(async function(type) {
    params['type'] = type[0]
    console.log(params)
    var response = await getAPIData(endpoint, params)
    var reportName = type[1]
    var report = {[reportName]: response[reportName]}

  
  
    for (var k in report) {
      var prop = k.replace(/del/, "").toLowerCase();
      var processed = normalize[k](report);
      output[prop] = processed;
    }
  });
  await Promise.all(reports);
  return output;
};

module.exports = { getSpecialDelegates }