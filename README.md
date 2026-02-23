# Playwright API Tests

This project contains Playwright tests for retrieving and validating Chuck Norris jokes from the [Chuck Norris API](https://api.chucknorris.io/).

## Prerequisites

- Node.js (>= 12.x)
- npm or yarn
- Playwright

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/a-mamlouk/PlayWright-API.git
    cd PlayWright-API
    ```

2. Install the dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Initialize Playwright configuration:
    ```sh
    npm init playwright@latest
    ```

## Running the Tests

### Available Scripts

- **Run all tests in UI mode:**
  ```sh
  npm run ui
  ```

- **Run tests headlessly:**
  ```sh
  npm test
  ```

- **View the last test report:**
  ```sh
  npm run show-report
  ``` 