import { Builder, By, until } from 'selenium-webdriver';  // Importing required components
import LoginPage from "../pages/loginPage.cjs"; // Reuse the LoginPage class
import { expect } from 'chai';

describe('Login and Sorting Tests', function() {
    let driver;
    let loginPage;

    this.timeout(10000); 

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
        this.timeout(5000); // Increase timeout to 5 seconds
    
        // Click the "Amount" header to sort
        await driver.findElement(By.id('amount')).click();
        await driver.sleep(2000); // Wait for sorting to complete
    
        // Get the amounts after sorting
        let amounts = await driver.findElements(By.css('td.text-right bolder nowrap span.text-danger'));
        let amountValues = [];
        
        for (let amount of amounts) {
            let text = await amount.getText();
            amountValues.push(parseFloat(text.replace(/[^\d.-]/g, ''))); // Extract numerical values
        }
    
        // Check if the values are sorted in ascending order
        let isSortedAscending = amountValues.every((val, i, arr) => i === 0 || val >= arr[i - 1]);
    
        expect(isSortedAscending).to.be.true; // Test should pass if sorted correctly
    });
    

    // After hook to close the browser
    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});

//npx mocha test/tests/loginTest.js