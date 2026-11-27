> Topic: how to write code in Rust

# Rust

- Define a trait when the abstraction is useful (multiple implementations, or testability), and implement it on a concrete struct. Skip the trait when there is only one implementation and no swap is anticipated.
- Use traits at architectural boundaries where the implementation may change (data sources, storage backends, external services), so swapping means providing a new concrete type.
