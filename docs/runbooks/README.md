# Runbooks

These runbooks describe the minimum response steps for the portfolio site.

## Deployment verification

1. Confirm the Vercel deployment is marked Ready.
2. Open the deployment URL and load the homepage.
3. Open a graph node and verify its content page.
4. Check the browser console for unexpected errors.
5. Inspect `window.__portfolio` and confirm the data source and node count.

## Supabase data failure

1. Check Supabase project availability and the browser network panel.
2. Inspect `window.__portfolio.error` and `window.__portfolio.dataSource`.
3. Confirm the generated snapshot exists in the build artifact.
4. Do not expose credentials or raw database errors in the UI.
5. Restore Supabase access and redeploy to refresh the snapshot.

## Rollback

Use the hosting provider's deployment history to promote the last known-good
deployment. Then repeat the deployment verification steps above. For a data
schema issue, pause the related SQL migration and restore the previous
application deployment before investigating.
