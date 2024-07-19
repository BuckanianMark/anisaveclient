// import {env} from 'process'

// const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
// env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:5055';

// const PROXY_CONFIG = [
//     {
//       context: [
//         "/graphql",
//         "/Poster",
//       ],
//       target: target,
//       secure: false,
//       headers: {
//         Connection: 'Keep-Alive'
//       }
//     }
//   ]

// module.exports = PROXY_CONFIG;

var winston =require("winston") 

function logProvider() {
  return winston.createLogger({
    level:"debug",
    format:winston.format.combine(
      winston.format.splat(),
      winston.format.simple()
    ),
    transports:[new winston.transports.Console()]
  })
}

const PROXY_CONF = [
  {
    context:[
      "/graphql",
       "/Poster",
    ],
    target:"http://localhost:5068",
    secure:false,
    changeOrigin:true,
    logLevel:"debug",
    logProvider:logProvider,
    cookiePathRewrite:"/local/"

  },
];

module.exports = PROXY_CONF;