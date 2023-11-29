var { google } = require("googleapis");
var async = require("async");
var os = require("os");
var path = require("path");
var { authenticate } = require("./googleauth");

module.exports = function(grunt) {

  grunt.registerTask("docs", "Load Google Docs into the data folder", function() {

    var config = grunt.file.readJSON("project.json");
    var auth = null;
    try {
      auth = authenticate();
    } catch (err) {
      console.log(err);
      return grunt.fail.warn("Couldn't load access token for Docs, try running `grunt google-auth`");
    }

    var done = this.async();

    var docs = google.docs({ auth, version: "v1" }).documents;

    var formatters = {
      link: (text, style) => `[${text}](${style.link.url})`,
      bold: text => `**${text}**`,
      italic: text => `*${text}*`,
      underline: text => `_${text}_`
    };

    /*
     * Large document sets may hit rate limits; you can find details on your quota at:
     * https://console.developers.google.com/apis/api/drive.googleapis.com/quotas?project=<project>
     * where <project> is the project you authenticated with using `grunt google-auth`
     */
    async.eachLimit(
      Object.keys(config.docs),
      2, // adjust this up or down based on rate limiting
      async function(key) {
        var documentId = config.docs[key];
        var docResponse = await docs.get({ documentId });
        var name = key + ".docs.txt";
        var body = docResponse.data.body.content;
        var text = "";

        body.forEach(function(block) {
          if (!block.paragraph) return;
          block.paragraph.elements.forEach(function(element) {
            var { content, textStyle } = element.textRun;
            if (content.trim()) for (var f in formatters) {
              if (textStyle[f]) {
                content = formatters[f](content, textStyle);
              }
            }
            text += content;
          });
        });

        // force fields to be lower-case
        text = text.replace(/^[A-Z]\w+\:/m, w => w[0].toLowerCase() + w.slice(1));
        console.log(`Writing document as data/${name}`);
        grunt.file.write(path.join("data", name), text);
      },
      done
    );

  });
}
