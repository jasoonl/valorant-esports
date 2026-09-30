# Valorant Esports Tracker — Champions Shanghai 2026

## Facts established (as of Wed Sep 30, 2026)
- Event: VALORANT Champions 2026, Shanghai. Sep 24 – Oct 18. Group stage Sep 24 – Oct 4, playoffs Oct 7 – 18.
- Format: 4 GSL double-elim groups of 4 (all Bo3), top 2 per group advance, then 8-team double-elim playoffs (LB Final + Grand Final Bo5).
- Groups: A 100T/JDG/FUT/T1 · B GE/LOUD/EDG/VIT · C TYLOO/TL/PRX/G2 · D KC/NS/NRG/XLG
- Official broadcast: twitch.tv/valorant (English). Other languages exist on valorant_es, valorant_br, valorant_fr, valorant_jpn, valorant_tur.
- Results so far: PRX + NRG already qualified. Remaining group matches still pending.
- Official bracket/standings page: valorantesports.com/en-SG/tournament/115576361459045501

## Hard constraints (be honest about these in the UI)
1. valorantesports.com pick'ems require a Riot login and the site cannot be iframed -> the app links out and mirrors picks locally, it cannot embed the official pick'em.
2. Twitch drops / channel points are only granted to the logged-in Twitch account. The embed works with a logged-in Twitch session; safest path is a one-click "open on twitch.tv" fallback plus a drops checklist.
3. Twitch embed needs `parent=<hostname of the page>`. Must be served over http(s), not file://. Page sets parent dynamically from location.hostname.
4. No live data API available from a static page (CORS) -> results are a data object that can be edited in-page (click a match, set score). Standings/advancement recompute from that.

## Architecture
Single self-contained `index.html`, no build step, no external deps except the Twitch iframes.
- `DATA`: teams, groups, seed results (12 series so far)
- `state`: results override map, picks, stream channel; persisted in localStorage (try/catch guarded)
- GSL engine per group: opening A, opening B -> winners match (opening winners) + elimination (opening losers) -> decider (loser of winners vs winner of elimination). Advancers = winners-match winner + decider winner.
- Views (tabs): Groups (mini GSL brackets, click to set result) · Standings (table, W-L, map diff, status) · Playoffs (8-team double-elim skeleton, fills in as teams qualify) · Pick'Em (advancer picks per group with live correct/wrong/pending + link-out) · Rewards (drops checklist + links)
- Stream panel: language selector, chat toggle, "Open on Twitch" fallback, dynamic parent list.

## Build/test checklist
- [ ] JS engine unit-tested in node (standings + advancement with seed data)
- [ ] Serve on localhost, load in headless browser if available, zero console errors
- [ ] Twitch iframe src contains parent=localhost
- [ ] Mobile width layout check
- [ ] Deliver index.html
