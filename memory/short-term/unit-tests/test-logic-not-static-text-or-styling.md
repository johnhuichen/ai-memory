> Memory: Test behavior that comes from logic, not static text or styling.

Test behavior that comes from logic, not what a quick look at the page would show. Assert the state the logic sets (`disabled`, not the disabled button's background class), text the logic produces, and the effects of user actions; one cheap render test per component is enough. Static text and styling are checked by people using the app, and tests of them break on every copy or style change without catching bugs.
