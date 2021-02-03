const { chromium } = require('playwright');
const { availability } = require('./model');

const ZIP_CODES = [
  '08201',
  '08244',
  '07631',
];

/**
 * Scrapes an individual zipCode
 * @param {Browser} browser 
 * @param {String} zipCode
 */
async function scrapeZip(browser, zipCode) {
  const url = `https://shoprite.reportsonline.com/shopritesched1/program/Imm/Patient/Schedule?zip=${zipCode}&appointmentType=5949`;

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  let availableStatus;

  // check to see whether there's an indication that there are no appointments
  const missing = await page.$(':text("no COVID-19 vaccine appointments available")');
  if (missing) availableStatus = availability.no;

  return {
    name: '',
    operated_by: 'Shoprite',
    available: availableStatus,
    checked_at: (new Date()).toISOString(),
    official: '',
  }
}

/**
 * Scrape all zip codes
 */
async function scrape() {
  const browser = await chromium.launch();
  let result = [];
  try {
    result = await Promise.all(ZIP_CODES.map(zipCode => scrapeZip(browser, zipCode)));
  } catch (e) {
    console.warn("Error", e);
  }
  finally {
    await browser.close();
  }

  return result;
}

module.exports = scrape;