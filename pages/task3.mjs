import BasePage from "./basepage.mjs";
import { By, until } from "selenium-webdriver";

class SortedMarketPage extends BasePage {
  constructor() {
    super();
  }

  async open() {
    await this.goToUrl("https://market.yandex.ru/");
    await driver.manage().window().maximize();
    driver.manage().setTimeouts({ implicit: 3000 });
  }

  async catalogButton() {
    await this.click(By.xpath("//button[@class='_30-fz button-focus-ring Hkr1q _1pHod _2rdh3 _3rbM-']"));
    driver.manage().setTimeouts({ implicit: 3000 });
  }

  async catalogLaptops() {
    await this.click(By.xpath("//li//a[@href='/catalog--kompiuternaia-tekhnika/54425']"));
    driver.manage().setTimeouts({ implicit: 3000 });
  }

  async catalogHardDrivers() {
    await this.click(By.xpath("//div//a[@href='/catalog--vnutrennie-zhestkie-diski/18072776/list?hid=91033']"));
    driver.manage().setTimeouts({ implicit: 3000 });
  }
  async catalogFiveElements() {
    let productNames = await driver.findElements(
      By.xpath('//div[@data-auto-themename="listDetailed"]/child::div//div[@class="cia-cs"]//h3')
    );
    let productPrices = await driver.findElements(
      By.xpath('//div[@data-auto-themename="listDetailed"]/child::div//span[@class="_1ArMm"]')
    );

    this.productName = productNames[1];
    this.productPrice = productPrices[1];
    for (let i = 0; i < 5; i++) {
      console.log(
        `Product: ${await productNames[
          i
        ].getText()}, price: ${await productPrices[i].getText()} руб.`
      );
    }
  }
  async listSorting() {
    let clickableElement = By.xpath("//div[@class='_1fyfZ']");
    await driver.wait(until.elementLocated(clickableElement), 10000);
    await driver.wait(until.elementIsEnabled(await driver.findElement(clickableElement)), 10000); 
    await this.click(By.xpath("//div[@class='_2Ios3']//button[@data-autotest-id='aprice']"));
    await driver.sleep(10000);
    await this.listTenElements();
  }

  async listTenElements() {
    let productNamesSorted = await driver.findElements(By.xpath('//div[@data-auto-themename="listDetailed"]/child::div//div[@class="cia-cs"]//h3'));
    let productPricesSorted = await driver.findElements(By.xpath('//div[@data-auto-themename="listDetailed"]/child::div//span[@class="_1ArMm"]'));

    if (productNamesSorted.length < 10 || productPricesSorted.length < 10) {
        console.error('Not enough products found on the page.');
        return;
    }

    this.secondProductName = productNamesSorted[1];
    this.secondProductPrice = productPricesSorted[1];

    for (let i = 0; i < 10; i++) {
        if (productNamesSorted[i] && productPricesSorted[i]) {
            console.log(`Product: ${await productNamesSorted[i].getText()}, price: ${await productPricesSorted[i].getText()} руб.`);
        } else {
            console.error(`Missing product or price information for index ${i}`);
        }
    }
}
}

export default SortedMarketPage;