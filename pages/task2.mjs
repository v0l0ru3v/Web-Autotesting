import BasePage from "./basepage.mjs";
import { By } from "selenium-webdriver";

class SchedulePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.driver = driver;
  }
  async open() {
    await this.driver.get('https://mospolytech.ru/');
    await this.driver.manage().window().maximize();
  }
  async clickSchedule() {
    await this.driver.findElement(By.xpath("//a[@href='/obuchauschimsya/raspisaniya/']")).click();
  }
  async clickSeeOnWebsite() {
    await this.driver.findElement(By.xpath("//a[@href='https://rasp.dmami.ru/']")).click();
  }
  async checkTabs() {
    const initialWindowHandle = await this.driver.getWindowHandle();
    const newWindowHandle = await this.driver.wait(async () => {
      const handlesAfterAction = await this.driver.getAllWindowHandles();
      return handlesAfterAction.find(handle => handle !== initialWindowHandle);
    }, 3000);
    if (newWindowHandle) {
      await this.driver.switchTo().window(newWindowHandle);
    }
  }
  async getTitle() {
    return await this.driver.findElement(By.xpath('//h1')).getText();
  }
  async checkGroups() {
    const groupNumber = '221-323';
    const searchField = await this.driver.findElement(By.className('groups'));
    await searchField.sendKeys(groupNumber);
    const resultElements = await this.driver.findElements(By.className('group'));
    const groupTexts = await Promise.all(resultElements.map(async (element) => {
      return await element.getText();
    }));
    if (groupTexts.length === 1 && groupTexts[0] === groupNumber) {
      await this.driver.findElement(By.id(groupNumber)).click();
    }
    await this.driver.sleep(1000);
  }
  async clickGroup() {
    const groupNumber = '221-323';
    await this.driver.findElement(By.id(groupNumber)).click()
    await this.driver.sleep(1000);
  }
  async checkColor() {
    await this.driver.findElement(By.className('goToToday')).click();
    const parentElements = await this.driver.findElements(By.className("schedule-day_today"));
    if (parentElements.length === 0) {
      return [];
    }
    const data = await Promise.all(parentElements.map(async (element) => {
      const titleElements = await element.findElements(By.className("schedule-day__title"));
      if (titleElements.length > 0) {
        const title = await titleElements[0].getText();
        return title;
      }
      return null;
    }));
    return data.filter(title => title !== null);
  }
}

export default SchedulePage;
