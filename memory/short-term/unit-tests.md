> Topic: how to write unit tests

# Unit Tests

- Test behavior that comes from logic, not what a quick look at the page would show. Assert the state the logic sets (`disabled`, not the disabled button's background class), text the logic produces, and the effects of user actions; one cheap render test per component is enough. Static text and styling are checked by people using the app, and tests of them break on every copy or style change without catching bugs.
- Find elements only by `data-testid`, never by class name, id, tag, role, label or text. `data-testid` exists only for tests, while the others exist for other reasons, so coupling tests to them makes the tests brittle.
- Make sure each test can fail: if the code it covers were removed or broken, the test must fail. Asserting an element that is never rendered, or a state that another code path also produces, passes no matter what the code does.
- In a parent component's tests, mock child components by default and test only the parent's own logic, including the props it passes and how it handles the child's events. Each child's logic belongs in the child's own tests; testing it again through the parent duplicates tests, and a child change then breaks tests in several places. Render the real child only when there is a genuine reason for an integration test, decided case by case.
