> Memory: Use Rust traits at architectural boundaries where the implementation may change.

Use traits at architectural boundaries where the implementation may change (data sources, storage backends, external services), so swapping means providing a new concrete type.
