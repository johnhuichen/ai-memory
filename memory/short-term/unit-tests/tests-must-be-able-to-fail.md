> Memory: Make sure each test fails if the code it covers is removed or broken.

Make sure each test can fail: if the code it covers were removed or broken, the test must fail. Asserting an element that is never rendered, or a state that another code path also produces, passes no matter what the code does.
