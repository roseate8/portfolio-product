# Antigravity Rules & Guidelines

## End of Conversation Protocol: Substantial Commits

At the conclusion of every conversation, please adhere to the following workflow regarding version control:

1. **Evaluate for Substantiality**: 
   Assess the changes successfully executed during our session. A "substantial" change constitutes a completed feature, a bug fix, structural/taxonomical shifts, or meaningful UI changes. 
   *Do NOT trigger this workflow for minor typos, micro-tweaks, or incomplete debug iterations.*

2. **Commit Local Changes**: 
   If the work is substantial, automatically bundle and commit the changes to the current active git branch before finishing the conversation. 
   - Use `git add` for the modified files.
   - Use `git commit -m ""` with a clear, concise, conventional commit message summarizing the session's work.

3. **Do NOT Push**: 
   Never run `git push` automatically. Keep the commit local so it acts as a safe save-point that I can review and push when ready.

4. **Brief Dialog Notification**: 
   When you complete the commit, explicitly mention in your final message to me that you have secured the changes via a local commit, and briefly summarize what was included in that commit.
