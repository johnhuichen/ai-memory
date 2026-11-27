> Memory: In a parent component's tests, mock child components and test only the parent's own logic.

In a parent component's tests, mock child components by default and test only the parent's own logic, including the props it passes and how it handles the child's events. Each child's logic belongs in the child's own tests; testing it again through the parent duplicates tests, and a child change then breaks tests in several places. Render the real child only when there is a genuine reason for an integration test, decided case by case.

Example: in `OrderPage` tests, mock `PaymentForm`, then check that `OrderPage` passes it the order total and shows the receipt when the mock fires `onPaid`. Card number validation is tested only in `PaymentForm`'s own tests.
