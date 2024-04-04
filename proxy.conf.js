var winston = require("winston");

function logProvider() {
  return winston.createLogger({
    level: "debug",
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
  });
}

const PROXY_CONF = [
  {
    context: ["/dts/**"],
    target: "https://combio-dts-prod-prime.totvscloud.com.br",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    logProvider: logProvider,
    cookiePathRewrite: "/local/",
    headers: {
        "Authorization": "Basic ci5yYWltdW5kbzpBbmluaEAxMzMxMTkxOA=="

      }
  },
];

module.exports = PROXY_CONF;