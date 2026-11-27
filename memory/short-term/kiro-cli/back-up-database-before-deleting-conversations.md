> Memory: To delete Kiro conversations safely, back up the database first, then vacuum and check integrity.

To delete conversations safely: back up with `sqlite3 <db> ".backup <file>"`, delete rows, run `VACUUM`, then `pragma integrity_check`. Leave files of sessions whose `.lock` pid is still alive. The backup lets you undo a wrong delete, `VACUUM` returns the freed space to disk, the integrity check confirms Kiro can still open the database, and a session whose pid is alive is still using its files.
