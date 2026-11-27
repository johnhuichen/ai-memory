> Memory: Define a Rust trait only when the abstraction is useful: several implementations, or testability.

Define a trait when the abstraction is useful (multiple implementations, or testability), and implement it on a concrete struct. Skip the trait when there is only one implementation and no swap is anticipated. A trait with one implementation adds a layer the reader must follow, for no benefit.

Example: a `Formatter` trait whose only implementation is `DefaultFormatter`, which tests never replace, should just be the `DefaultFormatter` struct.
