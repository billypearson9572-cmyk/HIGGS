/**
 * Voltara outreach — creates personalised Gmail DRAFTS from a Google Sheet.
 *
 * SETUP (one-time, ~2 min):
 *  1. Upload outreach_drafts.csv to Google Drive, open it as a Google Sheet.
 *     (Drive > New > File upload > right-click > Open with > Google Sheets, or
 *      File > Import into a blank sheet.)  Columns must be: Email | Business |
 *      Subject | Body  (row 1 = headers).
 *  2. In that sheet: Extensions > Apps Script. Delete any code, paste this file.
 *  3. Run "createDrafts". Approve the Gmail permission prompt the first time.
 *  4. Open Gmail > Drafts to review. Edit/delete any, then send when ready.
 *
 * Re-running is safe: it writes "drafted" in column E and skips those rows,
 * so you can do it in batches over several days.
 */

var BATCH_LIMIT = 40;   // max drafts to create per run (keeps volume sane)
var STATUS_COL  = 5;    // column E holds the per-row status marker

function createDrafts() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data  = sheet.getDataRange().getValues();
  var made  = 0;

  for (var i = 1; i < data.length; i++) {          // i=1 skips the header row
    if (made >= BATCH_LIMIT) break;
    var email   = String(data[i][0]).trim();
    var subject = String(data[i][2]).trim();
    var body    = String(data[i][3]);
    var status  = String(data[i][STATUS_COL - 1]).trim();
    if (!email || status) continue;                // already done or no email

    GmailApp.createDraft(email, subject, body);
    sheet.getRange(i + 1, STATUS_COL).setValue("drafted");
    made++;
  }
  SpreadsheetApp.getActive().toast(made + " drafts created. Check Gmail > Drafts.");
}

/**
 * OPTIONAL — actually SEND (instead of drafting). Sends rows not yet sent,
 * up to BATCH_LIMIT, marks column E "sent". Use only after you're happy with
 * the drafts. Gmail free accounts cap at ~500 recipients/day.
 */
function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data  = sheet.getDataRange().getValues();
  var sent  = 0;

  for (var i = 1; i < data.length; i++) {
    if (sent >= BATCH_LIMIT) break;
    var email   = String(data[i][0]).trim();
    var subject = String(data[i][2]).trim();
    var body    = String(data[i][3]);
    var status  = String(data[i][STATUS_COL - 1]).trim();
    if (!email || status === "sent") continue;

    GmailApp.sendEmail(email, subject, body);
    sheet.getRange(i + 1, STATUS_COL).setValue("sent");
    sent++;
  }
  SpreadsheetApp.getActive().toast(sent + " emails sent.");
}
