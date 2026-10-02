# Make the tracker event-agnostic (Oct 1, 2026)

Base: aar0n's `index.html` (commit 2398df2). The previous event tabs, Twitch sign-in and backup code live in history (e9938da) and are NOT being ported, except the Stages/Masters results data.

## Problem
Teams, groups, seed, schedule, playoff dates, Riot sync window, bracket link, title, header text, backup/calendar names were all hard-coded to Champions Shanghai.

## Design
- `DEFS`: one registry entry per event (`id, series, name, short, start, end, dates, format`).
- `format:'tracker'` = full interactive tracker (4 GSL groups of 4 + 8-team double-elim playoff, schedule, Pick'Em, stream, Riot auto-sync). Config lives in the def: `teams, groups, seed, schedule, playoffDates, window, aliases, links, snapshot`.
- `format:'results'` = completed-event page (Stage and Masters events), rendered from the def.
- Event nav: series switcher (Champions / Masters / Stages, derived from DEFS) + event sub-tabs. Status badge (Live / Upcoming / Completed) is computed from `start`/`end`, not stored.
- Tracker config is rebound by `useDef()` (TEAMS, GROUPS, SEED, SCHEDULE, windows, aliases). Saved data is per event (`tracker:<id>`); old `tracker` key migrates to the first tracker event.
- Stream, auto-sync and tracker-only header controls stop when a results event is open.
- Backups carry the event id; restoring into another event is refused.
- Adding an event = add one object to `DEFS` (documented in README).

## Limits
- The tracker engine only understands the Champions format. Other formats (Swiss, regional leagues) are shown as results pages until someone supplies data.
- Results data is the Sep 30, 2026 snapshot gathered earlier; some scores are unconfirmed and labelled so.

## Tests
- Every event opens without console errors; tracker UI hidden on results events; Twitch iframe absent there.
- Champions regression (state, sync fallback, backup round trip).
- A second synthetic tracker event proves switching rebinds teams/groups and keeps data separate.
- Legacy `vct26:tracker` data still loads.
