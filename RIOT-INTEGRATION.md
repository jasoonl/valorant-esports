# Riot integration plan (verified Riot sign-in)

Today the Riot ID is **self-reported**: you type `Name#TAG`, it is saved to your Twitch-signed-in account in this browser and labelled "not verified by Riot". It is used for links (official Pick'Em, tracker.gg stats) and labels only. Nothing here proves you own that Riot ID.

## What Riot's docs say (read Oct 1, 2026)
- Production access: sign in to the [Riot Developer Portal](https://developer.riotgames.com/docs/portal) with a Riot account → **Register Product** → choose project type → fill in the product form → verify you are the developer → wait for Developer Relations review. They typically want a **working prototype** first, and the product must follow Riot's policies and show a clear player benefit.
- **Riot Sign On (RSO) is only available to developers with a production-level key.**
- RSO uses an OAuth 2.0 authorization-code flow (`https://auth.riotgames.com/authorize?client_id=…&redirect_uri=…&response_type=code&scope=openid+offline_access`) and supports "Client Secret Basic" or "Private Key JWT" client authentication.
- With a player's RSO access token, `/riot/account/v1/accounts/me` on a regional host (americas / europe / asia) returns their **PUUID, gameName and tagLine**. That is what turns a typed Riot ID into a verified one.

Not confirmed in the pages I could read: the exact token endpoint URL and any extra scopes. Check the current RSO docs when you have portal access.

## Why this needs a server
Client-secret authentication means the secret cannot live in this static page (anyone could read it). You need a small backend that:
1. receives the redirect with `?code=…`,
2. exchanges it at Riot's token endpoint using the client secret (or a signed JWT),
3. calls `accounts/me`, and
4. gives the page back only `{puuid, gameName, tagLine}` in a signed, short-lived session.

A serverless function (Vercel, Cloudflare Workers, Netlify) is enough. It would also be the natural place to store accounts across devices, which a static page cannot do.

## Steps for you
1. Make sure the tracker works as a prototype for real users (this repo, on GitHub Pages).
2. Log in at developer.riotgames.com and click **Register Product**; describe it as a free, non-commercial fan tracker for VCT events; include the live site URL and repo.
3. Wait for approval, then request RSO access for the product and register the redirect URL of your backend.
4. Tell me when you have the client ID and where the backend will run. I will build the callback function and wire the button.

## Where it plugs in (already prepared)
- `RIOT_RSO = {enabled:false}` and the disabled **Verify with Riot** button in the account dialog.
- Profile records are per Twitch user: `vct26:profile:<twitchId>` = `{riot}`. A verified record would add `{puuid, verified:true}` and the "self-reported" tag switches to "verified".
- Pick'Em and rewards cards already read the Riot ID from the profile, so they need no change.

## Limits that stay true even after verification
- Riot has no public API for Pick'Em picks or Twitch drop progress, so those still cannot be synced. Picks stay local; submit them on valorantesports.com.
- Don't scrape or automate Riot's logged-in pages; use only documented endpoints.
