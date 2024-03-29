require("../analytics");

// load custom element shim
var Sidechain = require("@nprapps/sidechain");
var guest = Sidechain.Sidechain.registerGuest();

// load the various result elements
require("../components/president-results-multiple");
require("../components/delegate-total");
