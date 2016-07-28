# draft-js-youtube-plugin
A plugin for draft-js which dynamically converts YouTube URLs into YouTube embeds


## Known Issue
The carat misbehaves when you backspace (delete) up to the right edge of a YouTube embed. The carat jumps up to the top right corner of the editor. Expected behavior is that the carat would be the full-height of the video blinking on the right side of it.

This may be an draft-js editor internal issue. It might be able to be fixed by the draft-js-plugin-editor.
