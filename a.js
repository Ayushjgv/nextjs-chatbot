const { getJson } = require("serpapi");

getJson({
  engine: "google",
  q: "Coffee",
  location: "Austin, Texas, United States",
  google_domain: "google.com",
  hl: "en",
  gl: "us",
  api_key: "api key here"
}, (json) => {
  console.log(json);
});
