import { step, TestSettings, By, beforeAll, afterAll, Until, Key } from '@flood/element';
import assert from "assert";
import Constants from '../../data/constants';
import * as fs from "fs";

// Define global variables
// Json Value only store referenceID
// Json Data hold array of data
type JsonValueType = {
    value: string;
  };
  
  let jsonValue: JsonValueType = { value: "" }; 
  let jsonData: JsonValueType[] = []; 

// Function to generate random value between Min and Max 
function numberRange(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min + 1)) + min;
}

export const settings: TestSettings = {
	userAgent: 'flood-facto-test',
	waitUntil: 'visible',
	description: 'iTwoCX Contract New',
	screenshotOnFailure: true,
	disableCache: true,
	clearCache: true,
	clearCookies: true,
	actionDelay: 1.5,
	stepDelay: 2.5,
	browser: 'chromium', 
	loopCount: 100,
	waitTimeout: '160s',
}



export default () => {
	
	beforeAll(async browser => {
		await browser.wait('1500ms')
	})

	afterAll(async browser => {
		await browser.wait('1500ms')
	})

	step('Step 1 - Load URL', async browser => {
		await browser.visit('https://mirvac-uat.itwocx.com/MGR-UAT-20131')
		await browser.takeScreenshot()
	})

    step('Step 2 - Switch to outframe', async browser => {
		const target = await browser.switchTo()
        target.frame("outframe")
	})

    step('Step 3 - Log into iTwocx as a Contracts Administrator', async browser => {
        const username = By.css('#nme')
        await browser.wait(Until.elementIsVisible(username))
        const password = By.css('#pwd')
        await browser.wait(Until.elementIsVisible(password))
        await browser.type(username, Constants.ITWOCXUSERNAME)
        await browser.type(password, Constants.ITWOCXPASSWORD)
        await browser.takeScreenshot()
        const loginButton = await browser.findElement(By.css('#commit > input'))
        await loginButton.click()
	})

    step('Step 4 - Redirect to the form link', async browser => {
		await browser.visit('https://mirvac-uat.itwocx.com/cxR/cx.aspx?page=Docs/docnew2tree&j=MGR-UAT-20131&dsid=69903&mdu=CTR&t=69903&m=&i=&transID=&reportId=&due=')				
		await browser.takeScreenshot()	
	})

    // Generating a dynamic title with random number 'Flood Test - [randNum]'
	step('Step 5 - Enter title', async browser => {
		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		let title = '#tt'
		await frame1.waitForSelector(title)
		await frame1.type(title, 'Flood Test - ' + numberRange(100,20000).toString())
		await browser.takeScreenshot()
	})

    // Filling in multiple fields in the Administration section
	step('Step 6 - Enter the Administration Details', async browser => {
		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		let packageManager = '#USR_PACKM'	
		await frame1.waitForSelector(packageManager)
		await frame1.type(packageManager, 'MRC1-SEPE1')
		let contractAdministrator = '#USR_CTRA'
		await frame1.waitForSelector(contractAdministrator)
		await frame1.type(contractAdministrator, 'MRC1-CA1')
		let vendor = '#USR_VEN'
		await frame1.waitForSelector(vendor)
		await frame1.type(vendor, 'V0003213-USER')
		let commitmentType  = '#USR_CTRCOMTYPE'
		let option = '#USR_CTRCOMTYPE > option:nth-child(2)'
		await frame1.waitForSelector(commitmentType)
		await frame1.click(commitmentType)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.ENTER)
		let paymentTerms = '#USR_PAYTN'
		await frame1.waitForSelector(paymentTerms)
		await frame1.click(paymentTerms)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.ENTER)
		await browser.takeScreenshot()
	})

    // Filling in multiple fields in the Contract section
	step('Step 7 - Enter the Contract Details', async browser => {
		const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
		let subcontractorRepresentative = '#USR_CLMREPN'	
		await frame1.waitForSelector(subcontractorRepresentative)
		await frame1.type(subcontractorRepresentative, 'V0003213-USER')
		let mirvacRepresentative  = '#USR_RESPREPN'	
		await frame1.waitForSelector(mirvacRepresentative)
		await frame1.type(mirvacRepresentative, 'MRC1-PM1')
		let subcontractCatergory = '#USR_SCCAT'
		await frame1.waitForSelector(subcontractCatergory)
		await frame1.click(subcontractCatergory)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.ENTER)
		await browser.takeScreenshot()
	})

	step('Step 8 - Link Budget', async browser => {
		const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
		let arrowList = '//*[@id="divUsrForm"]/div[1]/span/span'
		await frame1.waitForSelector(arrowList)
		await frame1.click(arrowList)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.ENTER)
		await browser.takeScreenshot()
	})

    // Setting rate and budget with dynamic values
	step('Step 9 - Set Rate & Budget Line', async browser => {
		const randNum = numberRange(1000, 1000000)	
		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		let arrowButton = '//*[@id="tr.001"]/td[10]/span/span/span[2]'
		await frame1.waitForSelector(arrowButton)
		await frame1.click(arrowButton)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.ENTER)
		let rate = '//*[@id="tr.001"]/td[15]'
		await frame1.waitForSelector(rate)
		await frame1.click(rate)
		let inputForm = '//*[@id="caEditTable"]/tbody/tr/td/table/tbody/tr[2]/td[7]/input'
		await frame1.waitForSelector(inputForm)
		await frame1.type(inputForm, numberRange(1000,400000).toString())

	})

	step('Step 10 - Submit for Approval', async browser => {
	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewButFrame'))
	let submitButton = '//*[@id="idMenu471580"]/div'
	await frame1.waitForSelector(submitButton)
	await frame1.click(submitButton)
	await browser.wait('30000ms')
	await browser.takeScreenshot()
	})

	// Extracting referenceID [Fixed]
step('Step 11 - Rip referenceID', async browser => {
    const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocDetDetFrame'));
    let referenceID = '#pcr_mRef > span';
    const title = await frame1.waitForSelector(referenceID);
    const textValue = String(await title.textContent());
    await browser.takeScreenshot();
    jsonValue = { value: textValue };
    jsonData.push(jsonValue); // Append the current referenceID to jsonData
});

// Reading existing data from the JSON file and appending the new referenceID
step("Step 12 - Read and Append Data", async (browser) => {
    try {
        const dataFromFile = JSON.parse(fs.readFileSync("results.json", "utf-8"));
        if (Array.isArray(dataFromFile)) {
            jsonData = dataFromFile.concat(jsonData); // Append the current jsonData to the existing data
        }
    } catch (error) {
        console.log("JSON file not found or other error reading the file.");
        // If there's an error, we'll use the current jsonData as is
    }
});

// Saving the updated data back to the JSON file
step("Step 13 - Write data back to file", async (browser) => {
    fs.writeFileSync("results.json", JSON.stringify(jsonData, null, 2));
    console.log(`Values appended to results.json`);
    await browser.takeScreenshot();
    jsonData = []; // Clear jsonData for the next loop iteration
});


	};