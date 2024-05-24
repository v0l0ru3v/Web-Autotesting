import BasePage from "./basepage.mjs";
import { By } from "selenium-webdriver";

class TodoPage extends BasePage {
  constructor(remaining, total) {
    super();
    this.remaining = remaining;
    this.total = total;
  }

  async open() {
    await this.goToUrl("https://lambdatest.github.io/sample-todo-app/");
  }

  async checkElement() {
    return (
      (await this.getText(By.xpath('//span[@class="ng-binding"]'))) ===
      `${this.remaining} of ${this.total} remaining`
    );
  }

  async getItem(i) {
    return await driver.findElement(
      By.xpath(`//input[@name='li${i}']/following-sibling::span`)
    );
  }

  async isItemNotActive(item) {
    return (await item.getAttribute("class")) === "done-false";
  }

  async clickItem(item) {
    let input = await driver.findElement(By.name("li" + item));
    await input.click();
    this.remaining--;
  }

  async isItemActive(item) {
    return (await item.getAttribute("class")) === "done-true";
  }

  async addItem(text) {
    await this.enterText(By.id("sampletodotext"), text);
    await this.click(By.id("addbutton"));
    this.remaining++;
    this.total++;
  }
}

export default TodoPage;