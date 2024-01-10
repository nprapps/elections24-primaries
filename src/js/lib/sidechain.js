(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=g||self,f(g.Sidechain={}));}(this,(function(exports){'use strict';var decodeLegacy = function(message) {
  var matcher = /pymxPYMx(.*?)xPYMx(.*?)xPYMx(.*)/;
  var matched = message.match(matcher);
  if (!matched) return {};
  var [ _, id, type, value ] = matched;
  return { type, value, sentinel: "pym" };
};

var decode = function(message) {
  if (message.match(/^pym/)) {
    return decodeLegacy(message);
  }
  return JSON.stringify(message);
};

var encodeLegacy = function(id, param, value) {
  return ["pym", id, param, value].join("xPYMx");
};class SidechainGuest {
  constructor(options = {}) {
    var here = new URL(window.location);
    this.id = options.id || here.searchParams.get("childId");
    this.options = options;

    this.lastHeight = 0;
    this.listeners = {};

    this.sendHeight = this.sendHeight.bind(this);
    this.onMessage = this.onMessage.bind(this);

    window.addEventListener("resize", this.sendHeight);
    window.addEventListener("message", this.onMessage);

    if (!options.disablePolling) {
      this.interval = setInterval(() => this.sendHeight(), options.polling || 300);
    }

    this.sendHeight();
  }

  unregister() {
    window.removeEventListener("resize", this.sendHeight);
    window.removeEventListener("message", this.onMessage);
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  sendMessage(message) {
    if (typeof message == "object" && !(message instanceof Array)) {
      if (this.options.sentinel && !message.sentinel) {
        message.sentinel = this.options.sentinel;
      }
    }
    window.parent.postMessage(message, "*");
  }

  sendLegacy(param, value) {
    var pymFormatted = encodeLegacy(this.id, param, value);
    window.parent.postMessage(pymFormatted, "*");
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!callback) {
      delete this.listeners[event];
    } else {
      this.listeners[event] = this.listeners[event].filter(c => c != callback);
    }
  }

  onMessage(e) {
    var decoded = typeof e.data == "string" ? decode(e.data) : e.data;
    if (decoded.sentinel == "pym" && decoded.type in this.listeners) {
      this.listeners[decoded.type].forEach(cb => cb(decoded.value));
    }
  }

  sendHeight() {
    var height = document.documentElement.offsetHeight;
    if (this.lastHeight == height) return;
    this.lastHeight = height;
    var pymFormatted = encodeLegacy(this.id, "height", height);
    // for convenience, we just use the same format as AMP
    var ampFormatted = {
      sentinel: "amp",
      type: "embed-size",
      height
    };
    this.sendMessage(pymFormatted);
    this.sendMessage(ampFormatted);
  }
}var template = `
<style>
:host {
  display: block;
}

:host[hidden] {
  display: none;
}

iframe {
  width: 100%;
  border: none;
}
</style>
<iframe seamless="true" scrolling="no"></iframe>`;

class Sidechain extends HTMLElement {
  constructor() {
    super();

    var root = this.attachShadow({ mode: "open" });
    root.innerHTML = template;
    this.iframe = root.querySelector("iframe");

    this.onMessage = this.onMessage.bind(this);
  }

  connectedCallback() {
    // prevent duplicate listeners
    window.removeEventListener("message", this.onMessage);
    window.addEventListener("message", this.onMessage);
  }

  disconnectedCallback() {
    window.removeEventListener("message", this.onMessage);
  }

  static get observedAttributes() {
    return ["src", "id"];
  }

  attributeChangedCallback(attribute, was, value) {
    switch (attribute) {
      case "src":
        // support cross-origin permission setting
        if (this.hasAttribute("allow")) {
          var permissions = this.getAttribute("allow");
          this.iframe.setAttribute("allow", permissions);
        }
        this.iframe.src = value;
        break;

      case "id":
        this.iframe.id = value;
    }
  }

  onMessage(e) {
    // ignore other iframes
    if (e.source != this.iframe.contentWindow) return;
    var decoded = typeof e.data == "string" ? decode(e.data) : e.data;
    if (decoded.type == "embed-size" || decoded.type == "height") {
      this.iframe.height = decoded.value || decoded.height;
    }
  }

  sendMessage(message) {
    if (typeof message == "object" && !(message instanceof Array) && this.hasAttribute("sentinel")) {
      message.sentinel = message.sentinel || this.getAttribute("sentinel");
    }
    this.iframe.contentWindow.postMessage(message, "*");
  }

  sendLegacy(param, value) {
    var pymFormatted = encodeLegacy(this.id, param, value);
    this.sendMessage(pymFormatted);
  }

  static registerGuest(options) {
    return new SidechainGuest(options);
  }

  static matchMessage(pattern, callback) {
    return function(e) {
      var { data } = e;
      for (var k in pattern) {
        if (data[k] !== pattern[k]) return;
      }
      callback(e.data, e);
    }
  }

  get src() {
    return this.getAttribute("src");
  }

  set src(value) {
    return this.setAttribute("src", value);
  }

  get sentinel() {
    return this.getAttribute("sentinel");
  }

  set sentinel(value) {
    return this.setAttribute("sentinel", value);
  }

}

Sidechain.Guest = SidechainGuest;

try {
  window.customElements.define("side-chain", Sidechain);
} catch (err) {
  console.log("Sidechain couldn't be (re)defined");
}exports.Sidechain=Sidechain;exports.default=Sidechain;Object.defineProperty(exports,'__esModule',{value:true});})));