const meow = require("meow");

const cli = meow(
  `
  Usage:
    --data, -d  Path to the CSV file with data that will be uploaded
    --server, -s  vsDesk server address

  Both of the command-line options are required. You also need to set VSDESK_USERNAME and VSDESK_PASSWORD environment variables for this script to work.
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
    },
    autoHelp: true,
  }
);

if (!process.env.VSDESK_USERNAME || !process.env.VSDESK_PASSWORD)
  throw new Error(
    "You need to set VSDESK_USERNAME and VSDESK_PASSWORD for this script to work"
  );
