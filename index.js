const PORT = 8000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const URL =
  "https://www.amazon.co.jp/s?k=%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=2DSJQ8ECAVYL0&sprefix=%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89%2Caps%2C241&ref=nb_sb_noss_1";
const data = [];

axios(URL)
  .then((response) => {
    const htmlParser = response.data;

    const $ = cheerio.load(htmlParser);
    $(".s-result-item", htmlParser).each(function () {
      const title = $(this).find(".s-title-instructions-style").text();
      const price = $(this).find(".a-price-whole").text();
      data.push({ title, price });
      console.log(data);
    });
  })
  .catch((error) => console.log(error));

const app = express();

app.listen(PORT, console.log("server run"));
