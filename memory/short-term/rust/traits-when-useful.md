> Memory: Define a Rust trait only when the abstraction is useful: several implementations, or testability.

Define a trait when the abstraction is useful (multiple implementations, or testability), and implement it on a concrete struct. Skip the trait when there is only one implementation and no swap is anticipated.
