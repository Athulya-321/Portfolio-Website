const fs = require('fs');
const path = require('path');

const imgPath = path.join(__dirname, '../public/dp.jpg');
const outPath = path.join(__dirname, '../public/favicon.svg');

try {
  const img = fs.readFileSync(imgPath);
  const base64 = img.toString('base64');
  
  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <clipPath id="circle">
    <circle cx="50" cy="50" r="50"/>
  </clipPath>
  <image href="data:image/jpeg;base64,${base64}" x="0" y="0" width="100" height="100" clip-path="url(#circle)" preserveAspectRatio="xMidYMid slice"/>
</svg>`;

  fs.writeFileSync(outPath, svg);
  console.log('Successfully created favicon.svg!');
} catch(e) {
  console.error('Error generating favicon:', e);
}
