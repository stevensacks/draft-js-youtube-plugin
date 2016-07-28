# draft-js-youtube-plugin
A plugin for draft-js which dynamically converts YouTube URLs into YouTube embeds


## Known Issues

### Carat Bug
The carat misbehaves when you backspace (delete) up to the right edge of a YouTube embed. The carat jumps up to the top right corner of the editor. Expected behavior is that the carat would be the full-height of the video blinking on the right side of it.

This may be an draft-js editor internal issue. It might be able to be fixed by the draft-js-plugin-editor.

### YouTube URL detection does not work when surrounded by text
Right now, a YouTube url must be by itself on its own line. If you have text before and/or after, it won't convert to a YouTube entity.

I'm not fluent in regex (I found detection regex online) so this can probably be fixed by somebody who is.
