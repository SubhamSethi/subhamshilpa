# Connecting the Google Sheet

The sheet **#Sushi registry** in Google Drive runs the site's gifts, funds, events and sticker wall.
`Code.gs` is the small script that serves it to the website.

## One-time setup (about 5 minutes)

1. Open the sheet, then **Extensions → Apps Script**.
2. Delete the placeholder code, paste all of `Code.gs`, and click **Save**.
3. Click **Deploy → New deployment**. Click the gear next to "Select type" and choose **Web app**.
   - Description: `registry`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**, then **Authorize access**, pick your Google account, and allow it.
   Google may warn that the app isn't verified: click **Advanced → Go to (project name)**. It's your own script.
5. Copy the **Web app URL** (it ends in `/exec`) and put it in `config.js` as `apiUrl`.

## Changing the script later

Edit the code, then **Deploy → Manage deployments → pencil icon → Version: New version → Deploy**.
Using "New version" keeps the same URL, so the site keeps working.
