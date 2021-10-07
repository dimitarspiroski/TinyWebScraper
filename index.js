const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const PORT = 3000;
const app = express();

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

const url =
  "https://setec.mk/index.php?route=product/category&path=10019_10038_10039&page=6";

axios(url)
  .then(response => {
    const html = response.data;
    const $html = cheerio.load(html);
    const itemArray = [];
    $html(".name", html).each(function () {
      const title = $html(this)
        .text()
        .replace("\n\t\t\t\t", "")
        .replace("\n\t\t", "");
      const url = $html(this).find("a").attr("href");
      itemArray.push({
        title,
        url,
      });
    });
    console.log(itemArray);
  })
  .catch(err => console.log(err));
