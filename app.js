const express = require("express");
const path = require("path");
const wait = require("wait.for");
const fs = require("fs");
const puppeteer = require("puppeteer");

const app = express();

function waitFor5Seconds(param, callback) {
  setTimeout(function() {}, 5000);
}

function handleGet(req, res) {
  wait.for(waitFor5Seconds);
  res.sendFile(path.resolve(__dirname, `files/${req.params.id}.pdf`));
}

app.get("/download/:id", function(req, res) {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.baidu.com.hk", { waitUntil: "networkidle" });
    await page.pdf({
      path: `files/${req.params.id}.pdf`,
      format: "A4",
      printBackground: true
    });
    browser.close();
  })();
  wait.launchFiber(handleGet, req, res);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
