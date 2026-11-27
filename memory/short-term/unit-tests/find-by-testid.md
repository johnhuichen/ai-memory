> Memory: In tests, find elements only by `data-testid`.

Find elements only by `data-testid`, never by class name, id, tag, role, label or text. `data-testid` exists only for tests, while the others exist for other reasons, so coupling tests to them makes the tests brittle.
