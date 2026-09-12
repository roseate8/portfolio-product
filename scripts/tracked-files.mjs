import { execFileSync } from 'node:child_process';

function gitFiles(...args) {
    return new Set(
        execFileSync('git', ['ls-files', '-z', ...args], { encoding: 'utf8' })
            .split('\0')
            .filter(Boolean)
    );
}

/** Returns tracked files that still exist in the working tree. */
export function listTrackedFiles() {
    const deleted = gitFiles('--deleted');
    return [...gitFiles()].filter(file => !deleted.has(file));
}
