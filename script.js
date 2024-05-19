const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
ё
(async function example() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build()
  try {
    await driver.get('https://www.google.com/ncr')
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
    await driver.wait(until.titleIs('webdriver - Google Search'), 5000)
  } finally {
    await driver.quit()
  }
})()