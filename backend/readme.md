# Coin Game Backend

## Testing the endpoint with postman

You can import the postman collection from this project to get the endpoints available. You will need a valid JWT. You can find that by doing the following:

- [Run the frontend project following the instructions](../frontend/README.md)
- Run the backend project using ```npm start``` within the backend directory
- Open the browser on the port the project it running
- In dev tools you can inspect local storage and copy the JWT from there

Note: There is a 1 hour expiry so you will need to refresh your token every hour.

## Running tests

You can run the tests in this project using the following command:

``` npm test ```

The integration tests are written to test the scenarios listed in the requirements document from PidWin. I haven't covered every test scenario e.g. consecutive wins, since we would need to mock that and maybe make the number generation another service which seemed out of scope for this task.

Side note: There are still improvements to be made, eslint etc.
