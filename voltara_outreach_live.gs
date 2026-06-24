/**
 * Voltara outreach — builds personalised Gmail DRAFTS from a compact sheet.
 *
 * The sheet has columns: Email | Business | City | Category | Gap | HasWebsite | Status
 * This script writes the actual email (subject + body) itself, so the sheet
 * stays small and you can tweak the wording in ONE place (below).
 *
 * RUN:
 *  1. Extensions > Apps Script (from the sheet). Paste this. Save.
 *  2. Run "createDrafts". First time, approve the Gmail permission
 *     (click Advanced > "Go to project (unsafe)" — it's your own script).
 *  3. Gmail > Drafts to review, then send. Re-run for the next 40.
 */

var SENDER_NAME = "Billy";
var SENDER_CO   = "Voltara Digital";
var BATCH_LIMIT = 40;          // drafts per run
var SEND_MODE   = "draft";     // "draft" (review first) or "send"

function catLabel(cat) {
  cat = (cat || "").toLowerCase().trim();
  var fix = {
    "driveway and paving":"driveway & paving company","personal trainers":"personal training business",
    "cleaning companies":"cleaning company","aesthetic clinics":"aesthetic clinic",
    "driving schools":"driving school","mortgage brokers":"mortgage broker",
    "kitchen fitters":"kitchen-fitting business","bathroom fitters":"bathroom-fitting business"};
  if (fix[cat]) return fix[cat];
  return cat.charAt(cat.length-1) === "s" ? cat.slice(0,-1) : cat;
}

function hook(biz, city, cat, gap, hasWeb) {
  var g = (gap||"").toLowerCase();
  var noSite = g.indexOf("no website") > -1 && hasWeb !== "yes";
  var rev = null;
  if (g.indexOf("no reviews") > -1) rev = 0;
  else { var m = g.match(/only (\d+) review/); if (m) rev = parseInt(m[1],10); }
  var lab = catLabel(cat), where = city || "your area";
  if (noSite && rev === 0)
    return "I came across "+biz+" while looking at "+lab+"s in "+where+" and noticed you don't have a website yet and very little showing on Google — which usually means ready-to-buy customers are finding competitors first.";
  if (noSite)
    return "I came across "+biz+" while looking at "+lab+"s in "+where+" — you've clearly got happy customers, but with no website and only a handful of Google reviews you're probably invisible to a lot of people searching right now.";
  if (rev === 0)
    return "I found "+biz+" while looking at "+lab+"s in "+where+". You've got a website, but almost no Google reviews showing — often the one thing stopping a business outranking bigger competitors.";
  return "I found "+biz+" while looking at "+lab+"s in "+where+". You're set up online, but only a handful of Google reviews showing — usually the main thing holding back where you rank in local search.";
}

function buildBody(biz, city, cat, gap, hasWeb) {
  var lab = catLabel(cat), where = city || "your area";
  return "Hi,\n\n" + hook(biz,city,cat,gap,hasWeb) + "\n\n" +
    "I run " + SENDER_CO + " — we help " + where + " " + lab + "s get found online and turn more of those Google searches into booked jobs: a clean website, a stronger Google profile, and a bit of AI automation to chase reviews and answer enquiries automatically.\n\n" +
    "Worth a quick 10-minute call to show you exactly what I'd change? I'll put together a free audit either way.\n\n" +
    "Cheers,\n" + SENDER_NAME + "\n" + SENDER_CO + "\n\n" +
    "P.S. If this isn't relevant just reply \"no thanks\" and I won't follow up.";
}

function createDrafts() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data  = sheet.getDataRange().getValues();
  var headers = data[0].map(function(h){return String(h).trim();});
  var col = {};
  headers.forEach(function(h,idx){col[h]=idx;});
  var statusCol = col["Status"] + 1;
  var done = 0;

  for (var i=1; i<data.length; i++) {
    if (done >= BATCH_LIMIT) break;
    var email = String(data[i][col["Email"]]).trim();
    var status = String(data[i][col["Status"]]).trim();
    if (!email || status) continue;
    var biz = String(data[i][col["Business"]]).trim();
    var subject = "Quick idea for " + biz;
    var body = buildBody(biz, String(data[i][col["City"]]).trim(),
                         String(data[i][col["Category"]]).trim(),
                         String(data[i][col["Gap"]]).trim(),
                         String(data[i][col["HasWebsite"]]).trim());
    if (SEND_MODE === "send") GmailApp.sendEmail(email, subject, body);
    else GmailApp.createDraft(email, subject, body);
    sheet.getRange(i+1, statusCol).setValue(SEND_MODE === "send" ? "sent" : "drafted");
    done++;
  }
  SpreadsheetApp.getActive().toast(done + " " + (SEND_MODE==="send"?"sent":"drafts created") + ". Check Gmail.");
}
