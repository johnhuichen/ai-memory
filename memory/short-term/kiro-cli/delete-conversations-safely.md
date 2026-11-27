> Memory: To delete Kiro conversations safely, back up the database first, then vacuum and check integrity.

To delete conversations safely: back up with `sqlite3 <db> ".backup <file>"`, delete rows, run `VACUUM`, then `pragma integrity_check`. Leave files of sessions whose `.lock` pid is still alive.
