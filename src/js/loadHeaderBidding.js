const { initializeAdConfigVariables } = require("./lib/adUtil");
const {registerPSGoogleDfpAd} = require("./lib/googleDfp")


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeAdConfigVariables(document)
      registerPSGoogleDfpAd()

    })
  } else {
    initializeAdConfigVariables(document)
    registerPSGoogleDfpAd()

  }