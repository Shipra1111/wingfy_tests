import { Builder, By, until } from 'selenium-webdriver';  // Importing required components
import LoginPage from "../pages/loginPage.cjs"; // Reuse the LoginPage class
import { expect } from 'chai';

describe('Login and Sorting Tests', function() {
    let driver;
    let loginPage;

    // Increase timeout for the 'before' hook
    this.timeout(10000); // Increase the timeout to 10 seconds for the 'before' hook

    // Before hook to set up the browser and login page
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
        await driver.get("https://sakshingp.github.io/assignment/login.html");
    });

    // Test case: should log in successfully with valid credentials
    it("should log in successfully with valid credentials", async function () {
        await loginPage.enterUsername("testuser");
        await loginPage.enterPassword("testpass");
        await loginPage.clickLogin();
        await loginPage.waitForHomePage();

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include("home");
    });

    // Test case: should sort the Amount column
    it("should sort the Amount column", async function () {
        this.timeout(5000); // Increase the timeout to 5 seconds for this test case

        await driver.findElement(By.id('amount')).click(); // Click the "Amount" header to sort
        await driver.sleep(1000); // Wait for the table to reload

        let amountsBeforeSort = await driver.findElements(By.css('td.text-right bolder nowrap span.text-danger'));
        let amountTextBeforeSort = [];
        for (let amount of amountsBeforeSort) {
            let text = await amount.getText();
            amountTextBeforeSort.push(parseFloat(text.replace(/[^\d.-]/g, '')));
        }

        // Click again to sort in descending order
        await driver.findElement(By.id('amount')).click();
        await driver.sleep(1000); // Wait for the table to reload again

        let amountsAfterSort = await driver.findElements(By.css('td.text-right bolder nowrap span.text-danger'));
        let amountTextAfterSort = [];
        for (let amount of amountsAfterSort) {
            let text = await amount.getText();
            amountTextAfterSort.push(parseFloat(text.replace(/[^\d.-]/g, '')));
        }

        let isSortedAscending = amountTextBeforeSort.every((val, i, arr) => !i || val >= arr[i - 1]);
        let isSortedDescending = amountTextBeforeSort.every((val, i, arr) => !i || val <= arr[i - 1]);

        expect(isSortedAscending || isSortedDescending).to.be.true;
    });

    // After hook to close the browser
    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});
