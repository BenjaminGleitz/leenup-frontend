import https from 'node:https';

export default {
  '/api': {
    target: 'https://host.docker.internal',
    secure: false,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    agent: new https.Agent({ rejectUnauthorized: false, servername: 'localhost' }),
  },
};
