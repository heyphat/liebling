require('dotenv').config();
const { exec } = require('child_process');
const GhostAdminApi = require('@tryghost/admin-api');

(async function main() {
  try {
    const stage = exec(
      'git rev-parse --abbrev-ref HEAD',
      (err, stdout, stderr) => {
        if (err) {
          consle.log(err);
          process.exit(1);
        }
        if (typeof stdout === 'string' && stdout.trim() === 'prod') {
          const api = new GhostAdminApi({
            url: process.env.STAGING_GHOST_ADMIN_API_URL,
            key: process.env.STAGING_GHOST_ADMIN_API_KEY,
            version: 'canary',
          });
          //await api.themes.upload({ file: '../liebling.zip' });
          api.themes.upload({ file: '../liebling.zip' });
          console.log('Theme successfully uploaded.');
        } else if (typeof stdout === 'string' && stdout.trim() === 'staging') {
          const api = new GhostAdminApi({
            url: process.env.GHOST_ADMIN_API_URL,
            key: process.env.GHOST_ADMIN_API_KEY,
            version: 'canary',
          });
          api.themes.upload({ file: '../liebling.zip' });
          console.log('Theme successfully uploaded.');
        }
      }
    );
    console.log('Completed!!!!');
    // Deploy it to the configured site
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
