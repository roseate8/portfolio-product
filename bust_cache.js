import fs from 'fs';
import path from 'path';

const filesToUpdate = [
    path.join(process.cwd(), 'assets', 'css', 'components', '_map.scss'),
    path.join(process.cwd(), 'assets', 'css', 'components', '_page.scss')
];

for (const file of filesToUpdate) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Replace .svg) with .svg?v=2) 
        // If it already has ?v=, update it.
        content = content.replace(/\.svg(\?v=\d+)?\)/g, '.svg?v=2)');
        content = content.replace(/\.png(\?v=\d+)?\)/g, '.png?v=2)');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
