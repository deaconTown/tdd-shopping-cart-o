// var app = express();
// import { createProxyMiddleware } from 'http-proxy-middleware';

// export function setupReverseProxy(app) {
//   // Reverse proxy middleware
//   const apiProxy = createProxyMiddleware({
//     target: 'http://localhost:3001',
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api': '', // remove the /api prefix when forwarding requests
//     },
//   });

//   app.use('/api', apiProxy);
// }
