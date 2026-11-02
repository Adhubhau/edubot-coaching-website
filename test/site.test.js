const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const SITE = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(SITE, "index.html"), "utf8");
const js = fs.readFileSync(path.join(SITE, "script.js"), "utf8");

test("title, viewport and demo labelling", () => {
  assert.match(html, /<title>[^<]*Pinnacle Academy[^<]*<\/title>/);
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1/);
  assert.match(html, /fictional sample institute/);
  assert.match(html, /Built by AB Studio/);
  assert.ok((html.match(/class="sample"/g) || []).length >= 7, "results + testimonials marked sample");
});

test("required sections exist", () => {
  for (const id of ["courses", "results", "faculty", "fees", "gallery", "testimonials", "admission"]) {
    assert.match(html, new RegExp(`id="${id}"`), id);
  }
});

test("WhatsApp click-to-chat goes to the agency number", () => {
  assert.match(html, /href="https:\/\/wa\.me\/919307643461\?text=/);
  assert.match(html, /Get this for your class/);
});

test("local assets referenced exist; no remote assets, no inline scripts", () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"#:]+?)"/g)].map(m => m[1]).filter(r => !r.startsWith("http") && !r.startsWith("mailto"));
  assert.ok(refs.length >= 8);
  for (const r of refs) assert.ok(fs.existsSync(path.join(SITE, r)), "missing " + r);
  assert.doesNotMatch(html, /<script(?![^>]*src=)[^>]*>/);
  assert.doesNotMatch(html, /<link[^>]+href="https?:/);
  assert.doesNotMatch(html + js, /TODO|lorem ipsum|undefined<\//i);
});

test("chatbot answers in EN / MR / HI by keyword", () => {
  const elStub = () => ({ addEventListener(){}, setAttribute(){}, appendChild(){}, classList:{toggle(){},remove(){}}, style:{}, dataset:{} });
  const ctx = { window: {}, document: { getElementById: elStub, querySelectorAll: () => [], addEventListener(){}, createElement: elStub }, localStorage: { getItem(){return null}, setItem(){} }, setTimeout };
  ctx.window = ctx; vm.createContext(ctx); vm.runInContext(js, ctx);
  const A = ctx.EduBot.answer;
  assert.equal(A("What are the fees for JEE?").id, "fees");
  assert.equal(A("फी किती आहे?").id, "fees");
  assert.equal(A("फीस कितनी है").id, "fees");
  assert.equal(A("batch timings please").id, "timings");
  assert.equal(A("प्रवेश प्रक्रिया काय आहे").id, "admission");
  assert.equal(A("एडमिशन कैसे लें").id, "admission");
  assert.equal(A("which courses do you have").id, "courses");
  assert.equal(A("free demo lecture?").id, "demo");
  assert.equal(A("xyzzy qwerty"), null);
  for (const it of ctx.EduBot.KB) for (const l of ["en", "mr", "hi"]) assert.ok(it.a[l] && it.a[l].length > 10, it.id + " " + l);
});
