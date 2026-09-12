import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const ignored = new Set([
    'docs/readiness-report-sample/SKILL.md',
    'scripts/check-tech-debt.mjs',
]);
// Match standalone TODO/FIXME/HACK markers but not documentation references
// like "TODO/FIXME/HACK markers" where multiple appear in a slash-separated list.
const marker = /\b(TODO|FIXME|HACK)\b/;
const docReference = /\bTODO\/FIXME\/HACK\b/;
const linkedMarker = /\b(?:TODO|FIXME|HACK)\([A-Z][A-Z0-9_-]*-\d+\)/;

const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
    .split('\0')
    .filter(Boolean)
    .filter(file => !ignored.has(file));

const findings = [];

for (const file of files) {
    if (/\.(?:png|jpg|jpeg|gif|webp|svg|ttf|woff2?)$/i.test(file)) continue;
    const lines = readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, index) => {
        if (marker.test(line) && !linkedMarker.test(line) && !docReference.test(line)) {
            findings.push(`${file}:${index + 1}: ${line.trim()}`);
        }
    });
}

if (findings.length > 0) {
    console.error('Untracked technical-debt markers found. Link them to an issue:');
    for (const finding of findings) console.error(`- ${finding}`);
    process.exit(1);
}

console.log(`Scanned ${files.length} tracked files; no unlinked TODO/FIXME/HACK markers found.`);
