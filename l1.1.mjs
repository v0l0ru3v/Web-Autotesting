import assert from 'assert';
import { Builder, Browser, By } from 'selenium-webdriver';
import fs from 'fs';

let total = 5;
let remaining = 5;

async function func() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        await driver.get("https://lambdatest.github.io/sample-todo-app/");
        const header = await driver.findElement(By.xpath("//h2")).getText();
        assert.equal(header, "LambdaTest Sample App");

        let text = await driver
            .findElement(By.xpath(`//span[text()='${remaining} of ${total} remaining']`))
            .getText();
        assert.equal(text, `${remaining} of ${total} remaining`);

        await driver.sleep(2000);

        for (let i = 1; i <= total; i++) {
            let item = await driver.findElement(By.xpath(`//li[${i}]//span[@class='done-false']`));
            assert.ok(item, "Item should initially have class 'done-false'");

            await driver.findElement(By.name(`li${i}`)).click();
            remaining--;

            let itemChecked = await driver.findElement(By.xpath(`//li[${i}]//span[@class='done-true']`));
            assert.ok(itemChecked, "Item should have class 'done-true' after being clicked");

            await driver.sleep(1000);
        }

        await driver.findElement(By.id("sampletodotext")).sendKeys("Sixth item");
        await driver.findElement(By.id("addbutton")).click();
        total++;
        remaining++;

        await driver.sleep(2000);

        await driver.findElement(By.name(`li6`)).click();
        remaining--;

        let text1 = await driver
            .findElement(By.xpath(`//span[text()='${remaining} of ${total} remaining']`))
            .getText();
        assert.equal(text1, `${remaining} of ${total} remaining`);

        remaining--;

        await driver.sleep(2000);

        let text2 = await driver
            .findElement(By.xpath(`//span[text()='${remaining} of ${total} remaining']`))
            .getText();
        assert.equal(text2, `${remaining} of ${total} remaining`);

        await driver.sleep(2000);
    } catch (err) {
        driver.takeScreenshot().then(function (image) {
            fs.writeFileSync('screenshot_err.png', image, 'base64');
        });
    } finally {
        await driver.quit();
    }
}

func();