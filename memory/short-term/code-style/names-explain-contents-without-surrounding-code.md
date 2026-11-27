> Memory: Name things so a reader understands what they hold without reading surrounding code.

Name things after what they hold, so a reader understands them without reading surrounding code. A type name, a shortened alias or a generic word like `result` makes the reader trace back to the declaration.

Example: `unpaid_invoices`, not `filtered`, `list` or `invs`. `retry_delay_ms`, not `int_val`. A reader who sees `for invoice in unpaid_invoices` knows what the loop goes through without finding the filter that built the list.
