> Memory: Use Rust traits at architectural boundaries where the implementation may change.

Use traits at architectural boundaries where the implementation may change (data sources, storage backends, external services), so swapping means providing a new concrete type.

Example: `trait PriceSource { fn price(&self, ticker: &str) -> Result<f64>; }`, implemented by `YahooPriceSource` in production and `FixedPriceSource` in tests. Moving to another data provider means writing one new struct, with no change to the code that calls `price`.
