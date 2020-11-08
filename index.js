const fs = require("fs");
const path = require("path");
// eslint-disable-next-line no-unused-vars
const url = require("url");
const meow = require("meow");
const csv = require("csv-parser");

const cli = meow(
  `
  Usage:
    --data, -d  Path to the CSV file with data that will be uploaded
    --url, -u  URL to submit data to. If HTTP PUT method is used then ID is added to this string
    --method, -m  HTTP method to use when sending data to the server. It should be either 'post' or 'put'. The latter is default

  The first two command-line options are required. You also need to set VSDESK_USERNAME and VSDESK_PASSWORD environment variables for this script to work.
`,
  {
    flags: {
      data: {
        type: "string",
        alias: "d",
        isRequired: true,
      },
      url: {
        type: "string",
        alias: "u",
        isRequired: true,
      },
      method: {
        type: "string",
        alias: "m",
        default: "put",
      },
    },
    autoHelp: true,
  }
);

if (!process.env.VSDESK_USERNAME || !process.env.VSDESK_PASSWORD)
  throw new Error(
    "You need to set VSDESK_USERNAME and VSDESK_PASSWORD for this script to work"
  );

if (cli.flags.method !== "put" && cli.flags.method !== "post")
  throw new Error("Wrong method type. It must be either 'post' or 'put'");

const credentials = {
  username: process.env.VSDESK_USERNAME,
  password: process.env.VSDESK_PASSWORD,
};
const dataFile = path.resolve(cli.flags.data);
const ApiURL = new URL(cli.flags.url);
const method = cli.flags.method;

fs.createReadStream(dataFile)
  .pipe(csv())
  .on("data", (data) => console.log(data));
