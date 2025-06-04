import app from '../src/app.js';

let server = null;

export async function startTestServer(port = 9999) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`🟢 Test server running on port ${port}`);
      resolve(server);
    });
    server.on('error', reject);
  });
}

export async function stopTestServer() {
  if (server && server.close) {
    return new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) return reject(err);
        console.log('🔴 Test server closed');
        resolve();
      });
    });
  }
}

export { app };