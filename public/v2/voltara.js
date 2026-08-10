/**
 * Progressive enhancement for the exported static site.
 *
 * The pages in this folder come out of the design tool as a client-rendered
 * bundle: markup is built in the browser, so anything we add has to wait for
 * the render to finish rather than run at parse time. Everything below is
 * therefore keyed off `whenReady`, which polls for a selector and gives up
 * quietly instead of throwing if the element never appears.
 *
 * Two jobs:
 *   1. Make the contact form actually submit (the export ships inert fields).
 *   2. Add the Privacy Policy link to the footer.
 */
(function () {
  "use strict";

  /**
   * Where contact submissions go. Mirrors src/config/site.ts, but this is a
   * static page so there is no build step to inline `process.env` for us —
   * the key has to live here as a literal.
   *
   * Web3Forms access keys are designed to be public (they sit in client-side
   * JS on every site that uses them), so this is safe to commit. Paste yours
   * from web3forms.com and submissions start emailing through. Leave it blank
   * and the form falls back to opening the visitor's email client, which is
   * exactly what the live React site does today.
   */
  var CONFIG = {
    web3formsKey: "",
    contactEndpoint: "",
    email: "info@voltaradigital.com",
  };

  var BRAND_INK = "#04121f";
  var MUTED = "#93a3c0";

  function whenReady(selector, callback, timeoutMs) {
    var deadline = Date.now() + (timeoutMs || 15000);
    (function poll() {
      var el = document.querySelector(selector);
      if (el) return callback(el);
      if (Date.now() > deadline) return;
      requestAnimationFrame(poll);
    })();
  }

  // ---------------------------------------------------------------- contact

  var FIELDS = ["name", "email", "website", "service", "message"];
  var REQUIRED = ["name", "email", "website"];

  function findSubmitButton() {
    var buttons = [].slice.call(document.querySelectorAll("button"));
    return (
      buttons.filter(function (b) {
        return /audit|send|submit|get in touch/i.test(b.innerText || "");
      })[0] || buttons[0]
    );
  }

  /** Nearest element that contains both the first field and the button. */
  function findFormContainer(button) {
    var first = document.getElementById("name");
    if (!first || !button) return null;
    var ancestors = [];
    for (var e = first; e; e = e.parentElement) ancestors.push(e);
    for (var c = button; c; c = c.parentElement) {
      if (ancestors.indexOf(c) !== -1) return c;
    }
    return null;
  }

  function readValues() {
    var out = {};
    FIELDS.forEach(function (id) {
      var el = document.getElementById(id);
      out[id] = el ? String(el.value || "").trim() : "";
    });
    return out;
  }

  function showMessage(button, text, isError) {
    var id = "voltara-form-msg";
    var p = document.getElementById(id);
    if (!p) {
      p = document.createElement("p");
      p.id = id;
      p.style.cssText =
        "margin:12px 0 0;font-family:Geist,ui-sans-serif,sans-serif;font-size:13px;line-height:1.5";
      button.parentNode.insertBefore(p, button.nextSibling);
    }
    p.style.color = isError ? "#f87171" : MUTED;
    p.textContent = text;
  }

  function clearMessage() {
    var p = document.getElementById("voltara-form-msg");
    if (p) p.remove();
  }

  function markInvalid(id, bad) {
    var el = document.getElementById(id);
    if (el) el.style.borderColor = bad ? "#f87171" : "";
  }

  function validate(values, button) {
    var missing = REQUIRED.filter(function (id) {
      return !values[id];
    });
    REQUIRED.forEach(function (id) {
      markInvalid(id, missing.indexOf(id) !== -1);
    });
    if (missing.length) {
      showMessage(button, "Please fill in your name, email and website.", true);
      var el = document.getElementById(missing[0]);
      if (el) el.focus();
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
      markInvalid("email", true);
      showMessage(button, "That email address doesn't look right.", true);
      document.getElementById("email").focus();
      return false;
    }
    return true;
  }

  function renderSuccess(container) {
    container.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;' +
      "border:1px solid rgba(30,42,68,0.6);border-radius:16px;background:rgba(11,17,32,0.6);" +
      'padding:40px 28px;text-align:center">' +
      '<span style="display:flex;height:56px;width:56px;align-items:center;justify-content:center;' +
      "border-radius:999px;background:linear-gradient(120deg,#8ae04b 0%,#34c7c9 50%,#1e8fe6 100%);" +
      'color:' + BRAND_INK + ';font-size:26px;line-height:1">&#10003;</span>' +
      '<h3 style="margin:20px 0 0;font-family:\'Space Grotesk\',sans-serif;font-size:20px;' +
      'font-weight:600;color:#e9eef7">Thanks! Message on its way.</h3>' +
      '<p style="margin:8px 0 0;max-width:24rem;font-family:Geist,ui-sans-serif,sans-serif;' +
      'font-size:14px;line-height:1.6;color:' + MUTED + '">We typically reply within one business ' +
      "day, usually with a first look at your consult and clear next steps.</p></div>";
  }

  /**
   * Submit order matches ContactForm.tsx so behaviour does not change when the
   * site swaps over: Web3Forms, then a generic JSON endpoint, then mailto.
   * The mailto fallback means a blank config degrades to "opens your email
   * client" rather than silently swallowing the enquiry.
   */
  function submit(values) {
    var subject = "New enquiry from " + (values.name || "the website");

    if (CONFIG.web3formsKey) {
      return fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: CONFIG.web3formsKey,
          subject: subject,
          from_name: "Voltara Digital website",
          botcheck: "",
          name: values.name,
          email: values.email,
          website: values.website,
          service: values.service,
          message: values.message,
        }),
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          if (!data.success) throw new Error("Request failed");
        });
    }

    if (CONFIG.contactEndpoint) {
      return fetch(CONFIG.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      }).then(function (res) {
        if (!res.ok) throw new Error("Request failed");
      });
    }

    var body = [
      "Name: " + values.name,
      "Email: " + values.email,
      "Website: " + values.website,
      "Interested in: " + values.service,
      "",
      values.message,
    ].join("\n");
    window.location.href =
      "mailto:" + CONFIG.email +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    return Promise.resolve();
  }

  var sending = false;

  function handleSubmit(button) {
    if (sending) return;

    var values = readValues();
    if (!validate(values, button)) return;

    var container = findFormContainer(button);
    var label = button.innerHTML;

    sending = true;
    button.style.opacity = "0.6";
    button.style.pointerEvents = "none";
    button.textContent = "Sending…";
    clearMessage();

    submit(values)
      .then(function () {
        if (container) renderSuccess(container);
        else showMessage(button, "Thanks! Message on its way.", false);
      })
      .catch(function () {
        sending = false;
        button.style.opacity = "";
        button.style.pointerEvents = "";
        button.innerHTML = label;
        showMessage(
          button,
          "Something went wrong. Please email us directly at " + CONFIG.email + ".",
          true
        );
      });
  }

  /**
   * Bound on `document` in the capture phase rather than on the button itself.
   * The page re-renders from its own template after load, which quietly drops
   * listeners attached directly to elements; delegation survives that.
   */
  function wireContactForm() {
    if (document.documentElement.dataset.voltaraContactWired === "1") return;
    document.documentElement.dataset.voltaraContactWired = "1";

    document.addEventListener(
      "click",
      function (event) {
        if (!document.getElementById("name")) return;
        var target = event.target;
        var button = target && target.closest ? target.closest("button") : null;
        if (!button || button !== findSubmitButton()) return;
        event.preventDefault();
        event.stopPropagation();
        handleSubmit(button);
      },
      true
    );

    // Enter in any single-line field submits, as it would in a real form.
    document.addEventListener(
      "keydown",
      function (event) {
        if (event.key !== "Enter") return;
        var el = event.target;
        if (!el || !el.id || FIELDS.indexOf(el.id) === -1) return;
        if (el.tagName === "TEXTAREA") return;
        event.preventDefault();
        var button = findSubmitButton();
        if (button) handleSubmit(button);
      },
      true
    );

    // Typing clears the previous error so the form stops nagging.
    document.addEventListener(
      "input",
      function (event) {
        var el = event.target;
        if (!el || !el.id || FIELDS.indexOf(el.id) === -1) return;
        markInvalid(el.id, false);
        clearMessage();
      },
      true
    );
  }

  // ----------------------------------------------------------------- footer

  function addPrivacyLink() {
    whenReady("footer", function (footer) {
      if (footer.querySelector("[data-voltara-privacy]")) return;
      var copyright = [].slice
        .call(footer.querySelectorAll("p"))
        .filter(function (p) {
          return /©|all rights reserved/i.test(p.textContent);
        })[0];
      if (!copyright) return;

      var sep = document.createTextNode(" · ");
      var link = document.createElement("a");
      link.setAttribute("data-voltara-privacy", "1");
      link.href = "privacy.html";
      link.textContent = "Privacy Policy";
      link.style.cssText = "color:inherit;text-decoration:underline;text-underline-offset:2px";
      copyright.appendChild(sep);
      copyright.appendChild(link);
    });
  }

  function init() {
    addPrivacyLink();
    // Delegated, so it can bind before the form has rendered.
    wireContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
