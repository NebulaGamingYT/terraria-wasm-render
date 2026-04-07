const fs = require('fs');
const path = require('path');

const files = [
    'dist/index.html',
    'dist/assets/index.js',
    'dist/assets/index.css',
    'dist/autodownload.js'
];

let allExist = true;
files.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} is missing`);
        allExist = false;
    }
});

if (allExist) {
    const htmlContent = fs.readFileSync('dist/index.html', 'utf8');
    if (htmlContent.includes('assets/index.js') && htmlContent.includes('assets/index.css') && htmlContent.includes('autodownload.js')) {
        console.log('✅ index.html contains correct references');
    } else {
        console.log('❌ index.html has incorrect references');
        allExist = false;
    }
}

process.exit(allExist ? 0 : 1);
