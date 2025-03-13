const https = require('https');
const fs = require('fs');
const path = require('path');

const countries = [
  { name: 'france', url: 'https://raw.githubusercontent.com/your-username/your-repo/main/images/countries/france.png' },
  { name: 'germany', url: 'https://raw.githubusercontent.com/your-username/your-repo/main/images/countries/germany.png' },
  { name: 'spain', url: 'https://raw.githubusercontent.com/your-username/your-repo/main/images/countries/spain.png' },
  { name: 'italy', url: 'https://raw.githubusercontent.com/your-username/your-repo/main/images/countries/italy.png' },
  { name: 'netherlands', url: 'https://raw.githubusercontent.com/your-username/your-repo/main/images/countries/netherlands.png' },
  { name: 'belgium', url: 'https://raw.githubusercontent.com/your-username/your-repo/main/images/countries/belgium.png' },
  { name: 'switzerland', url: 'https://raw.githubusercontent.com/your-username/your-repo/main/images/countries/switzerland.png' },
  { name: 'austria', url: 'https://raw.githubusercontent.com/your-username/your-repo/main/images/countries/austria.png' },
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
};

const main = async () => {
  const imageDir = path.join(__dirname, '../public/images/countries');
  
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  for (const country of countries) {
    const filepath = path.join(imageDir, `${country.name}.png`);
    try {
      await downloadImage(country.url, filepath);
      console.log(`Downloaded ${country.name}`);
    } catch (error) {
      console.error(`Failed to download ${country.name}:`, error.message);
    }
  }
};

main().catch(console.error); 