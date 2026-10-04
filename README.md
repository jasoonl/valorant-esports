# VALORANT Esports Tracker

Single-file tracker for VALORANT Champions Tour events: live brackets, results, local Pick'Em, schedule filters, calendar export and Twitch streams. Open `index.html` over http(s) (stream embeds need a real web address).

## Events
The page is driven by the `DEFS` registry in `index.html`. The nav is built from it (series switcher + event tabs), and saved data is kept per event.

| `format` | What you get |
|---|---|
| `tracker` | Full tracker: schedule, groups, standings, playoffs, Pick'Em, stream, Riot auto-sync. The engine models 4 GSL groups of 4 teams feeding an 8-team double-elimination playoff. |
| `results` | A completed-event page. `layout:'regions'` (one winner card per league) or `layout:'podium'` (placements, final, teams). |

Included: Kickoff, Stage 1, Stage 2, Masters Santiago, Masters London, Champions Shanghai.

### Add an event
Add one object to `DEFS`:

```js
{ id:'masters-2027-x', series:'masters', format:'results', layout:'podium',
  short:'City', name:'Masters City', year:2027, start:'2027-02-20', end:'2027-03-08', dates:'Feb 20 – Mar 8, 2027',
  venue:'…', blurb:'…', podium:[['Team','prize'],…], final:{text:'A 3–1 B', maps:[['Map','13–9']]},
  mvp:'…', pool:'…', teams:{Americas:[…]}, teamsNote:'…', src:'https://…' }
```

For a `tracker` event supply `teams`, `groups`, `seed`, `schedule`, `playoffDates`, `aliases`, `window` (Riot sync date range), `links.bracket` and `snapshot`, as the Shanghai entry does. `series` is any string; known ones are `stages`, `masters`, `champions`. Status (Upcoming / Live / Completed) is computed from `start` and `end`.

## Notes
- Unofficial fan tool, not affiliated with Riot Games. Results data is a snapshot; some scores are unconfirmed and labelled so.
- Auto-sync reads Riot's public esports feed from the browser and falls back to the bundled snapshot and local edits if blocked.

## Accounts
- **Site login = Twitch** ("Sign in with Twitch"). There is no server, so this identifies which Twitch account is signed in on this browser and keeps each account's picks and Riot ID separate. It does not protect against someone using your browser profile. Sessions last 7 days.
- **Riot ID** is self-reported and saved to the signed-in account, labelled "not verified by Riot". See `RIOT-INTEGRATION.md` for the path to verified Riot sign-in.
- **Setup:** create a Public app at dev.twitch.tv/console, add the redirect URL shown in the Account dialog (for GitHub Pages: `https://jasoonl.github.io/valorant-esports/`), and paste the Client ID into the dialog or set `TWITCH_CLIENT_ID`.
- Guests can use everything; their data stays in this browser. First sign-in starts from the guest picks.

## Automatic playoffs

Playoffs now work like the group stage: no manual input needed.

- **Bracket**: Round 1 is filled from the official draw bundled with the event (`playoffDraw`). When the Riot schedule feed publishes the real Round 1 pairings, those override the bundled draw.
- **Results**: winners and losers advance through the double-elimination bracket automatically as series complete. Grand final and lower final are Bo5; everything else is Bo3.
- **Schedule**: all 14 playoff matches appear in Schedule, Up Next, and the LIVE count. Until a start time is published they show the day (e.g. "Oct 7–8 · time TBA"); the feed fills in exact times, live scores, and finals.
- **Manual edits** still win over the feed, and

Limits: match times were not published when this was written, and the Riot feed could not be exercised against the real API from the build environment.

## Interaction polish

Plain CSS/JS, no framework. Apple-style: instant press feedback (scale on pointer-down), sliding tab indicator and pane transitions on a critically damped ease, translucent blurred header. React Bits-style: cursor spotlight on match and group cards (mouse only). Honors `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast`. React Bits itself is a React library, so its components are not used directly.

## React Bits

Three [React Bits](https://reactbits.dev) components are inlined into `index.html` (between the `RB-START`/`RB-END` markers), so the site stays a single file: **BlurText** (hero title), **CountUp** (playoff-spots counter), **ShinyText** (live-match pill). Sources are in `reactbits-src/`; to change them run `cd reactbits-src && npm install && npm run build`, which rebuilds the bundle and re-inlines it. If the bundle fails to run, or the viewer prefers reduced motion, the page shows plain text. React Bits is MIT + Commons Clause (see `LICENSE-REACTBITS.md`): fine inside an app, not for reselling the components.
