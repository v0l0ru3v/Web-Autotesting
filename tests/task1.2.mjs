import TodoPage from "../pages/task1.2.mjs";
import { describe, it, before, after } from "mocha";
import { assert } from "chai";

describe('Todo App', () => {
  let driver;

  before(async () => {
    driver = new TodoPage(5, 5);
    await driver.open();
  });

  after(async () => {
    await driver.closeBrowser();
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      const screenshot = await driver.takeScreenshot();
      const testCaseName = this.currentTest.title.replace(/\s+/g, '-').toLowerCase();
      const dateTime = new Date().toISOString().replace(/[-:.]/g, '');
      const fileName = `${testCaseName}-${dateTime}.png`;
      await writeFileAsync(fileName, screenshot, 'base64');
    }
  });

  it("Checking remaining text", async () => {
    assert.isTrue(
      await driver.checkElement(),
      "Remaining text does not match expected"
    );
  });

  it("Checking first item", async () => {
    const firstItem = await driver.getItem(1);
    assert.isTrue(
      await driver.isItemNotActive(firstItem),
      "First item should not be active"
    );
    await driver.clickItem(1);
    assert.isTrue(
      await driver.isItemActive(firstItem),
      "First item did not become active after click"
    );
    assert.isTrue(
      await driver.checkElement(),
      "Remaining text did not update correctly"
    );
  });

  it("Checking other items", async () => {
    for (let i = 2; i <= driver.total; i++) {
      const item = await driver.getItem(i);
      assert.isFalse(
        await driver.isItemActive(item),
        `Item ${i} should initially be inactive`
      );
      await driver.clickItem(i);
      assert.isTrue(
        await driver.isItemActive(item),
        `Item ${i} did not become active after click`
      );
      assert.isTrue(
        await driver.checkElement(),
        "Remaining text did not update correctly"
      );
    }
  });

  it("Adding new item", async () => {
    await driver.addItem("Sixth item");
    const newItem = await driver.getItem(driver.total);
    assert.isFalse(
      await driver.isItemActive(newItem),
      "Newly added item should initially be inactive"
    );
    assert.isTrue(
      await driver.checkElement(),
      "Remaining text did not update correctly after adding an item"
    );
    await driver.clickItem(driver.total);
    assert.isTrue(
      await driver.checkElement(),
      "Remaining text did not update correctly after clicking new item"
    );
  });
});