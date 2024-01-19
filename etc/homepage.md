Special code for homepage use
-----------------------------

Options:
* [Liveblog headlines](#liveblog-headlines)
* [Liveblog headlines with live audio button](#liveblog-headlines-with-live-audio-button)
* [Election results table](#election-results-table)
* [Election results table with live audio button](#election-results-table-with-live-audio-button)
* [Banner headline above a lead image](#banner-headline-above-a-lead-image)


------

### Liveblog headlines

The new `theme=2024` parameter makes the “2024” branding appear next to the headline. More: [Liveblog headlines widget repo and documentation](https://github.com/nprapps/liveblog-headlines)

```
<p data-pym-loader data-child-src="https://apps.npr.org/liveblog-headlines/?feed=https://www.npr.org/live-updates/election-2024-nh-primary-results.rss&link=https://www.npr.org/live-updates/election-2024-nh-primary-results&headline=Latest%20election%20updates&limit=all&theme=2024" id="liveblog-headlines-elections24"> Loading... </p> <script src="https://pym.nprapps.org/npr-pym-loader.v2.min.js"></script>
```

------

### Liveblog headlines with live audio button

Note: Someone from News Apps will need to change the references to `story1223407223` in this snippet to match the actual homepage card it will be attached to.

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
<p data-pym-loader data-child-src="https://apps.npr.org/liveblog-headlines/?feed=https://www.npr.org/live-updates/election-2024-nh-primary-results.rss&link=https://www.npr.org/live-updates/election-2024-nh-primary-results&headline=Latest%20election%20updates&theme=2024" id="liveblog-headlines-elections24"> Loading... </p> <script src="https://pym.nprapps.org/npr-pym-loader.v2.min.js"></script>

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

**New Hampshire Primaries (GOP and Dem)**

If the homepage card is using the special label in the upper left ("live", "developing story", etc), up the padding to 50px.

```
<div style="padding-top: 20px;">
<p data-pym-loader data-child-src="https://apps.npr.org/primary-election-results-2024/embeds/?live=&race=P&data=NH_P_1_23_2024_All&link=https%3A%2F%2Fapps.npr.org%2Fprimary-election-results-2024%2Fstates%2FNH.html" id="responsive-embed-NH-P-1-23-2024"> Loading... </p> <script src="https://pym.nprapps.org/npr-pym-loader.v2.min.js"></script>
</div>
```

### Election results table with live audio button

**New Hampshire Primaries (GOP and Dem)**

If the homepage card is using the special label in the upper left ("live", "developing story", etc), up the padding to 50px.

```
<!-- results plus live audio button --> 

<div class="election-results-wrapper" style="padding-top: 20px;">
<p data-pym-loader data-child-src="https://apps.npr.org/primary-election-results-2024/embeds/?live=&race=P&data=NH_P_1_23_2024_All&link=https%3A%2F%2Fapps.npr.org%2Fprimary-election-results-2024%2Fstates%2FNH.html" id="responsive-embed-NH-P-1-23-2024"> Loading... </p> <script src="https://pym.nprapps.org/npr-pym-loader.v2.min.js"></script>
</div>

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

<style>
  .election-results-wrapper {
    margin-bottom: 15px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
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

----

### Banner headline above a lead image

```
<!-- big banner headline with photo -->

<!-- UPDATE LINK AND HEADLINE TEXT -->
<div id="election-banner-headline">
  <div class="bug"><a href="https://www.npr.org/sections/elections/"><img src="https://media.npr.org/assets/elections24/logo-2024.svg" alt="Elections 2024"></a></div>
  <h1><a href="TKTKTK URL">TKTKTK Big Hed Here</a></h1>
</div>

<figure class="head-image" id="election-banner-image">
  <div class="bucketwrap homeLarge">
    <div class="imagewrap has-source-dimensions" data-crop-type="wide" style="
        --source-width: 3000;
        --source-height: 1687;
      ">
      <a href="TKTK URL" data-metrics="{&quot;action&quot;:&quot;Click Story 8&quot;}">
        <picture>
          <source srcset="TKTKTK -- the webp default" class="img" type="image/webp">
          <source srcset="TKTKTK -- the jpg fallback" class="img" type="image/jpeg">
          <img src="TKTKTK -- the jpg fallback" class="img" alt="The Latest On Afghanistan" loading="lazy">
        </picture>
      </a>
    </div>
    <div class="credit-caption">
      <span class="credit" aria-label="Image credit">
        Photo credit goes here
      </span>
    </div>
  </div>
</figure>

<style type="text/css">
  #election-banner-headline { padding-top: 22px; }
  #election-banner-headline h1 {
    text-align: center;
    font-size: 36px;
    font-family: 'NPR Sans', sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.02em;
    margin: 0 0 20px 0;
  }
  @media screen and (min-width: 500px) {
    #election-banner-headline h1 {
      font-size: 48px;
      margin-bottom: 15px;
    }
  }
  @media screen and (min-width: 768px) {
    #election-banner-headline h1 { font-size: 64px; }
  }
  #election-banner-headline a { color: #333; }
  #election-banner-headline a:hover, #election-banner-headline a:active { color: #bccae5; }
  #election-banner-headline .bug { text-align: center; }
  #election-banner-headline .bug img {
    width: auto;
    height: 20px;
    display: inline-block;
  }
  #election-banner-image .credit {
    display: block; text-align: right; font-size: 1.2rem; padding: 3px 1px 0 0; line-height: 1.5; letter-spacing: .02em; color: #767676;
  }
</style>