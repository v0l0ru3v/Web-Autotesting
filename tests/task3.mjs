import SortedMarketPage from "../pages/l3.mjs";
import { describe } from "mocha";
import { assert } from "chai";
import { writeFile } from 'fs/promises';
import { driver } from 'your-webdriver-instance';

describe("Тест сортировки", async () => {
  const ybp = new SortedMarketPage();

  before(async () => {
    await ybp.open();
  });

  after(async () => {
    await ybp.closeBrowser();
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
        const screenshot = await driver.takeScreenshot();
        const testCaseName = this.currentTest.title.replace(/\s+/g, '-').toLowerCase();
        const dateTime = new Date().toISOString().replace(/[-:.]/g, '');
        const fileName = `${testCaseName}-${dateTime}.png`;
        await writeFile(fileName, screenshot, 'base64');
    }
  });

  it("Open category", async () => {
    await ybp.catalogButton();
    await ybp.catalogLaptops();
    await ybp.catalogHardDrivers();
  });

  it("Five elements", async () => {
    await ybp.catalogFiveElements();
  });

  it("Sorting", async () => {
    await ybp.listSorting();
    await ybp.listTenElements();

    const productPrices = await ybp.getProductPrices();
    const isSorted = productPrices.every((price, index, array) => {
      return index === 0 || array[index - 1] <= price;
    });

    assert.isTrue(isSorted, "Товары не отсортированы по возрастанию цены.");
  });
});
