
# Login and Sorting Tests

This repository contains a Selenium WebDriver test suite for testing the login and sorting functionalities of a web application.

## Prerequisites

Before running the tests, ensure that you have the following installed:

- Node.js (version >= 16.0.0)
- NPM
- Chrome WebDriver (for running tests with Chrome)

## Installing Dependencies

1. Clone this repository to your local machine:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project_directory>
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

## Running the Tests

To run the tests, use the following command:

```bash
npx mocha test/tests/loginTest.js
```

### Test Reports

- Test reports will be generated in the `reports` folder as `mochawesome-report.html`.
- To view the report, open `reports/mochawesome-report.html` in your browser.

## Test Structure

The tests are divided into the following categories:

1. **Login Test**: Ensures successful login with valid credentials.
2. **Sorting Test**: Verifies that the amount column can be sorted correctly.

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
