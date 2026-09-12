import { statSync, readFileSync } from 'node:fs';
import { listTrackedFiles } from './tracked-files.mjs';

const maxBytes = 1024 * 1024;
const maxLines = 2000;
const ignored = new Set([
    'public/assets/data/portfolio.json',
    'package-lock.json',
]);

const files = listTrackedFiles().filter(file => !ignored.has(file));

const violations = [];

for (const file of files) {
    const size = statSync(file).size;
    if (size > maxBytes) {
        violations.push(`${file}: ${size} bytes exceeds ${maxBytes}`);
        continue;
    }

    if (/\.(?:js|jsx|mjs|css|scss|html|md|json|sql|yml|yaml)$/.test(file)) {
        const lines = readFileSync(file, 'utf8').split(/\r?\n/).length;
        if (lines > maxLines) {
            violations.push(`${file}: ${lines} lines exceeds ${maxLines}`);
        }
    }
}

if (violations.length > 0) {
    console.error('File-size limits exceeded:');
    for (const violation of violations) console.error(`- ${violation}`);
    process.exit(1);
}

console.log(`Checked ${files.length} tracked files; no size limits exceeded.`);
