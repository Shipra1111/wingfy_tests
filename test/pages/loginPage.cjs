const { By, until } = require("selenium-webdriver");

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameInput = By.id("username");  // Change as per actual locator
        this.passwordInput = By.id("password");  // Change as per actual locator
        this.loginButton = By.css("button[id ='log-in']"); // Change as per actual locator
    }

    async enterUsername(username) {
        await this.driver.findElement(this.usernameInput).sendKeys(username);
    }

    async enterPassword(password) {
        await this.driver.findElement(this.passwordInput).sendKeys(password);
    }

    async clickLogin() {
        await this.driver.findElement(this.loginButton).click();
    }

    async waitForHomePage() {
        await this.driver.wait(until.urlContains("home"), 5000); 
}
}
module.exports = LoginPage;


