# Overview

This project provides 3 automation test cases for the Clip4Sale website using WebdriverIO and Mocha with POM pattern.

## Setup

1. Ensure you have Node.js installed.
2. Navigate to the project directory:

```bash
cd clip4sale-test
```

3. Install the dependencies:

```bash
npm install
```

## Running Tests

To run the tests, execute the following command:

```bash
npm test
```

or

```bash
npx wdio run ./wdio.conf.js
```

This will initiate the WebdriverIO runner and execute the tests as per the configurations in wdio.conf.js.

## Project Structure

pageObjects/: Contains the Page Object Models of the website.

specs/: Contains the Mocha test specifications.

wdio.conf.js: WebdriverIO configuration file.
