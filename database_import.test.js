const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'src/app/api');

const excludedFiles = [
    'src/app/api/contact/route.js',
    'src/app/api/contactSociete/route.js'
]

function checkDbImport(filePath) {
    if (excludedFiles.includes(filePath.replace(/\\/g, '/'))) {
        return;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('connectToDb')) {
        if (!content.includes('import { database } from')) {
            console.error(`Missing database import in: ${filePath}`);
        }
    }
}

function traverseDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else {
            if (fullPath.endsWith('.js')) {
                checkDbImport(fullPath);
            }
        }
    });
}

traverseDir(apiDir);
console.log('Test completed.');
