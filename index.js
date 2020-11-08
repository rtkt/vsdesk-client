const meow = require("meow");

const cli = meow(
  `
  Usage:
    --data, -d  Path to the CSV file with data that will be uploaded
    --url, -s  URL to submit data to. If HTTP PUT method is used then ID is added to this string
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
      server: {
        type: "string",
        alias: "s",
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
