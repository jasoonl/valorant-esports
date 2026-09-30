# VALORANT Esports Tracker — restructure plan (Sep 30, 2026)

## Goal
Drop the "Champions Shanghai"-only branding. Make the page a general **VALORANT Esports Tracker** with sub-tabs per event:
- **Stages**: Kickoff · Stage 1 · Stage 2 (four regional leagues each: Americas, EMEA, Pacific, China)
- **Masters**: Santiago · London
- **Champions**: Shanghai (the existing live tracker, unchanged: schedule, groups, standings, playoffs, Pick'Em, Twitch, auto-sync)

## Interpretation notes
- "stage challenges" read as the Stage events (Kickoff / Stage 1 / Stage 2). Challengers/Ascension (tier 2) NOT included; offer as follow-up.
- Two-level nav: group tabs (Stages | Masters | Champions) -> event sub-tabs. Champions' own tabs act as its sub-tabs.

## Data (researched Sep 30, 2026; every card links its source)
Only fields that were confirmed by a fetched source are shown. Unconfirmed fields render as "not confirmed" or are omitted.
- Kickoff: Jan 15 – Feb 15. AM FURIA 3-2 MIBR; EMEA BBL Esports; PAC Nongshim RedForce (UB final 3-2 RRQ; seeds NS/T1/PRX); CN All Gamers 3-2 XLG.
- Stage 1: Mar 31 – May 24. AM G2 3-2 Leviatan (May 24); EMEA Heretics 3-2 Vitality (May 17, Berlin); PAC Paper Rex; CN EDG 3-2 XLG (May 10, Beijing).
- Stage 2: Jun 30 – Sep 6. AM 100T 3-2 LOUD (Sao Paulo); EMEA KC 3-1 TL (Aug 30, Madrid); PAC Global Esports 3-2 NS (Busan); CN TYLOO over JDG (Chengdu).
- Masters Santiago: Feb 28 – Mar 15. NS 3-0 PRX; 3 NRG, 4 G2.
- Masters London: Jun 6 – 21. Leviatan 3-2 PRX; 3 EDG, 4 Vitality. (Sources disagreed on the bracket path; only the final + placements are shown.)

## Implementation
1. Wrap current Champions UI in `#ev-champions` (unchanged behavior).
2. Add `#evGroups`, `#evSub`, `#ev-view`; render Stages/Masters from a static EVENTS object.
3. Champions-only header items (dates, playoff count, LIVE, auto-sync, bracket/Pick'Em buttons) show only on Champions.
4. Unload Twitch iframes when leaving Champions; reload on return.
5. Persist group + sub-tab in localStorage (`vct26:ev`, `vct26:sub`).

## Test checklist
- [ ] No console errors on every group/sub-tab; hash-free navigation works
- [ ] Champions regression (t2/t3 suites) still pass
- [ ] Twitch iframe absent off-Champions, present on return
- [ ] Mobile 390px: no horizontal scroll, sub-tabs scroll
- [ ] Push to jasoonl/valorant-esports as Jason L, no Claude trailer
