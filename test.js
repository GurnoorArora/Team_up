import { Builder, By, Key, until } from 'selenium-webdriver';

(async function teamCreationTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the team creation page
        await driver.get('http://localhost:3000/createTeam');
        console.log('✅ Test Case Passed - Navigated to Team Creation Page');

        // Wait until the 'Create a Team' button is clickable
        await driver.wait(until.elementLocated(By.xpath("//h1[text()='Create a Team']")), 10000);
        console.log('✅ Test Case Passed - Team Creation Page Loaded');

        // Input Team Name
        await driver.wait(until.elementLocated(By.id('name')), 10000);
        await driver.findElement(By.id('name')).sendKeys('Test Team');
        console.log('✅ Test Case Passed - Team Name Entered');

        // Input Event Names
        await driver.findElement(By.id('events')).sendKeys('hack1,hack2');
        console.log('✅ Test Case Passed - Event Names Entered');  

        // Input Password
        await driver.findElement(By.id('password')).sendKeys('teamPassword123');
        console.log('✅ Test Case Passed - Password Entered');

        // Click Create a Team Button
        await driver.findElement(By.xpath("//button[text()='Create a Team']")).click();
        console.log('✅ Test Case Passed - Create a Team Button Clicked');

        // Wait for success message
        await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Team created successfully')]")), 10000);
        console.log('✅ Test Case Passed - Team Created Successfully');
    } catch (err) {
        console.error('❌ Team Creation Test Failed', err);
    } finally {
        await driver.quit();
    }
})();
