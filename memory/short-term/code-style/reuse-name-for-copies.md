> Memory: For an owned copy or a rebinding, reuse the same name.

For an owned copy or a rebinding, reuse the same name: `let ticker = ticker.to_owned();` and `let client = self.client.clone();`, not `let sym = ...` or `let c = ...`. A new name suggests a different value.
