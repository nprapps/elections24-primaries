Special code for homepage use
-----------------------------

* [Liveblog headlines](#liveblog-headlines)
* [Liveblog headlines with live audio button](#liveblog-headlines-with-live-audio-button)
* [Election results table](#election-results-table)


### Liveblog headlines

The new `theme=2024` parameter makes the “2024” branding appear next to the headline. More: [Liveblog headlines widget repo and documentation](https://github.com/nprapps/liveblog-headlines)

**Monday Jan. 15**

```
<p data-pym-loader data-child-src="https://apps.npr.org/liveblog-headlines/?feed=https://www.npr.org/live-updates/iowa-caucus.rss&link=https://www.npr.org/live-updates/iowa-caucus&headline=Latest%20Updates:%202024%20Elections&theme=2024" id="liveblog-headlines-elections24"> Loading... </p> <script src="https://pym.nprapps.org/npr-pym-loader.v2.min.js"></script>
```

**Tuesday Jan. 16**

```
<p data-pym-loader data-child-src="https://apps.npr.org/liveblog-headlines/?feed=https://www.npr.org/live-updates/iowa-caucus-results.rss&link=https://www.npr.org/live-updates/iowa-caucus-results&headline=Latest%20Updates:%202024%20Elections&theme=2024" id="liveblog-headlines-elections24"> Loading... </p> <script src="https://pym.nprapps.org/npr-pym-loader.v2.min.js"></script>
```

------

### Liveblog headlines with live audio button

Note: Someone from News Apps will need to change the references to `story1223407223` in this snippet to match the actual homepage card it will be attached to.

**Monday Jan. 15**

```
<!-- live audio button plus liveblog headlines widget --> 

<!-- audio module for program stream -->
<article id="res472586072" class="bucketwrap resaudio stream-module secondary" aria-label="audio-module">
    <div class="audio-module">
        <div class="audio-module-controls-wrap" data-stream-audio='{"uid":"472557877:472586072","available":true,"audioUrl":"https:\/\/npr-ice.streamguys1.com\/live.mp3","storyUrl":"","title":"NPR Program Stream","type":"stream","subtype":"other"}' data-audio-metrics='[]'>
            <div class="audio-module-controls">
                <button class="audio-module-listen">
                    <b class="audio-module-listen-inner">
                        <b class="audio-module-listen-icon icn-play"></b>
                        <b class="audio-module-listen-text">
                            <b class="audio-module-cta">Listen</b>
                        </b>f
                    </b>
                </button>
            </div>
        </div>
    </div>
</article>
<!-- end audio module for program stream -->

<!-- headlines module -->
<p data-pym-loader data-child-src="https://apps.npr.org/liveblog-headlines/?feed=https://www.npr.org/live-updates/iowa-caucus.rss&link=https://www.npr.org/live-updates/iowa-caucus&headline=Latest%20Updates:%202024%20Elections&theme=2024" id="liveblog-headlines-elections24"> Loading... </p> <script src="https://pym.nprapps.org/npr-pym-loader.v2.min.js"></script>

<style>
  #res472586072.bucketwrap.resaudio {
    margin-bottom: 30px;
  }
  
  /* custom text inside the "play" button */
  #res472586072.bucketwrap.resaudio .audio-module-listen-inner:after {
    content: 'Listen to NPR live coverage';

    font-size: 1.4rem;
    font-family: "NPRSans",sans-serif;
    color: #fff;
    line-height: 1;
  }

  /* hide default text inside the "play" button */
  #res472586072.bucketwrap.resaudio .audio-module-cta {
    display: none;
  }

  /* ADJUSTMENT NEEDED - change "story1223407223" to utilize the actual Seamus Id in the markup */
  #story1223407223.hp-item.has-status:not(.hp-item-basic) .story-text {
    padding-top: 0;
  }

  /* ADJUSTMENT NEEDED - change "story1223407223" to utilize the actual Seamus Id in the markup */
  #story1223407223 .bucketwrap.statichtml { padding-top: 5px; }

  @media screen and (min-width: 768px) {
    #res472586072 {
      margin-left: 0;
      margin-bottom: 15px;
    }

    /* ADJUSTMENT NEEDED - change "story1223407223" to utilize the actual Seamus Id in the markup */
    #story1223407223 .bucketwrap.statichtml {
      padding-top: 5px;
    }

    /* ADJUSTMENT NEEDED - change "story1223407223" to utilize the actual Seamus Id in the markup */
    #story1223407223.hp-item.volume-high.has-status.no-image .story-text {
        padding-top: 20px;
    }
  }
</style>
```

-----

### Election results table

**Iowa GOP Caucuses**

If the homepage card is using the special label in the upper left ("live", "developing story", etc), up the padding to 50px.

```
<div style="padding-top: 20px;">
<p data-pym-loader data-child-src="https://apps.npr.org/primary-election-results-2024/embeds/?live=&race=C&data=IA_P_1_15_2024_All&party=GOP&link=https%3A%2F%2Fapps.npr.org%2Fprimary-election-results-2024%2Fstates%2FIA.html" id="responsive-embed-IA-C-1-15-2024"> Loading... </p> <script src="https://pym.nprapps.org/npr-pym-loader.v2.min.js"></script>
</div>
```