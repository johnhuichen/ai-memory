> Memory: In zsh, pipe literal text with `print -r --` or `printf '%s'`, not `echo`.

In zsh, pipe literal text such as a JSON test payload with `print -r -- "$text"` or `printf '%s' "$text"`, not `echo`. zsh's `echo` turns `\n` into a real newline, which breaks a JSON string and makes a test fail for a reason unrelated to the code.

Example: `echo '{"msg":"a\nb"}' | node parse.js` hands the script a broken JSON string, while `print -r -- '{"msg":"a\nb"}' | node parse.js` hands it the text as written.
