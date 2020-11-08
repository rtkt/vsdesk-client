const https = require("https");
const querystring = require("querystring");
// eslint-disable-next-line no-unused-vars
const url = require("url");

function modifyURL(base, entry) {
  if (!entry.id)
    throw new Error(
      "ID field must be set for every entry in the table when using HTTP PUT method"
    );
  return new URL(base, entry.id);
}

function request(entry, url, method, creds) {
  console.log(entry, url, method, creds);
  const data = querystring.stringify(entry);
  const options = {
    auth: `${creds.username}:${creds.password}`,
    hostname: url.hostname,
    method: method === "put" ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(data),
    },
    path: method === "put" ? modifyURL(url, entry) : url,
  };
  const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });

    req.on("error", (e) => {
      throw new Error(`problem with request: ${e.message}`);
    });
  });

  req.write(data);
  req.end();
}

module.exports = {
  request,
};
