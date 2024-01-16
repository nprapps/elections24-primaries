---
name: New election checklist
about: A boilerplate set of tasks for each election date
title: 'Election checklist: [STATE or DATE]'
labels: 'Priority: High'
assignees: ''

---

Administrative
- [ ] Find out when/if special coverage is scheduled
- [ ] Staffing plan

Results
- [ ] Make sure races are represented correctly in the site config
- [ ] Test results on staging
- [ ] If this is a multi-state election: Create any needed custom results embeds, and think through how they'd play on the homepage and liveblog

Station comms
- [ ] Coordinate with Wash and Member Partnership on messaging
- [ ] Pull relevant embed code(s) from customizer

Homepage and internal comms
- [ ] Update [homepage code snippets](https://github.com/nprapps/elections24-primaries/blob/main/etc/homepage.md) with relevant results embeds, liveblog links, etc.
- [ ] Update all relevant documentation (engagement doc, homepage tick-tock, liveblog strategy)

Liveblog
- [ ] Coordinate with liveblog crew to make sure special branding makes it to the new blog(s)
- [ ] Preload results embed(s) and any other relevant graphics into the liveblog tool. Preface each with `Election 2024:` in the asset name. Log in the [spreadsheet](https://docs.google.com/spreadsheets/d/1Elnl4JarzsK2JH5Jmr7vxSTDT9NobyVZTvMP3KNrDPs/edit#gid=869878592).
- [ ] Add results embed to `Body` section of the liveblog

Seamus pages
- [ ] Coordinate with Washington on redirect pages for the liveblog(s) and state results page(s)
- [ ] If needed, create [state shape promo image](https://github.com/nprapps/elections24-primaries/issues/47). Add to [promo images folder](https://drive.google.com/drive/u/1/folders/1FCj47_lohCPI-kaU0R5NalQZLXKcAnml).
- [ ] Liveblog redirects: Add liveblog headlines embed and "live updates" promo image
- [ ] Results redirects: Add results embed and state promo image

Mobile apps
- [ ] Coordinate with mobile team that they have the correct embeds (remember that the liveblog headlines module for mobile additionally uses the `pjax=false` param)

On election day
- [ ] Add liveblog link to results site topnav and footer
