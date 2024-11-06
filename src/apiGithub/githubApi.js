const axios = require("axios");

const githubApi = axios.create({
  baseURL: "https://api.github.com"
})

module.exports = githubApi;