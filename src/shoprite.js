const { chromium } = require('playwright');
const { availability } = require('./model');

const ZIP_CODES = [
  '08201',
  '08244',
  '07631',
  '07662',
  '08055',
  '08054',
  '08009',
  '08021',
  '08223',
  '08242',
  '08332',
  '08302',
  '07103',
  '07039',
  '08028',
  '07103',
  '07039',
  '08028',
  '08062',
  '08809',
  '08822'
];

const APPOINTMENT_URL = 'https://shoprite.reportsonline.com/shopritesched1/program/Imm/Patient/Advisory';

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

async function loadIndex(page) {
  await page.goto(APPOINTMENT_URL);

  // After the page loads, it redirects to a scheduling queue to grab appointments.
  // The queue creates a session and a cookie, and then passes it back to the main
  // index URL page. We wait until the redirect happens before proceeding.
  let currentUrl = await page.url();

  if (currentUrl != APPOINTMENT_URL) {
    await page.waitForNavigation({
      timeout: 60000,
      url: APPOINTMENT_URL
    })
  }

  await page.click('css=[aria-label="COVID 1"]');
}

async function consume(page) {
  async function reload() {
    let url = await page.url();
    if (url != APPOINTMENT_URL) {
      await loadIndex(page);
    }
  }

  await reload();
  let i = 0;
  
  while (i < ZIP_CODES.length) {
    try {
      let result = await scrapeZip(page, ZIP_CODES[i]);
      console.log(ZIP_CODES[i], result);
      i += 1;
    } catch (e) {
      await reload(); // every so often this seems to log the user out.
    }
  }
}


async function scrapeZip(page, zipCode) {
  await page.fill('#zip-input', zipCode);
  await page.click('#btnGo');

  let err = await page.textContent('#errDiv', { timeout: 100 });
  if (err) {
    return availability.no;
  }

  return availability.yes;
}


/**
 * Scrape all zip codes
 */
async function scrape() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load the main shoprite appointment page
  await consume(page);

  await browser.close();
  return []
}

module.exports = scrape;