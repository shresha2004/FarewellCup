import fs from 'fs';
import path from 'path';

const directoryPath = './src';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

const replacements = [
    // Shiny buttons gradient
    { regex: /from-\[#7f1d1d\] via-\[#ef4444\] to-\[#ef4444\]/g, replacement: 'from-[#5c0000] via-[#8b0000] to-[#5c0000]' },
    // General background replacements for cards and regular buttons
    { regex: /bg-\[#ef4444\]/g, replacement: 'bg-[#121212] border border-[#d4af37]' },
    // Another dark red used previously
    { regex: /bg-\[#2d0505\]/g, replacement: 'bg-[#18181b] border-2 border-[#d4af37]' },
    // Text accents
    { regex: /text-\[#ef4444\]/g, replacement: 'text-[#d4af37]' },
    // Border accents
    { regex: /border-\[#ef4444\]/g, replacement: 'border-[#d4af37]' },
    // Rings
    { regex: /ring-\[#ef4444\]/g, replacement: 'ring-[#d4af37]' },
    // Make shiny-button text gold instead of white
    { regex: /shiny-button[^>]*text-white/g, replacement: match => match.replace('text-white', 'text-[#d4af37]') }
];

let filesChanged = 0;

walkDir(directoryPath, function(filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content;

        replacements.forEach(rep => {
            newContent = newContent.replace(rep.regex, rep.replacement);
        });

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated: ${filePath}`);
            filesChanged++;
        }
    }
});

console.log(`\nDone! Total files updated: ${filesChanged}`);
