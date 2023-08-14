import { step, TestSettings, By, beforeAll, afterAll, Until, Key } from '@flood/element';
import assert from "assert";
import Constants from 'c:/Users/darcy_batterham_love/Desktop/CurrentDev/mirvacnext_pt/data/Constants';
import DataGeneration from '../data/DataGeneration';
import * as fs from "fs";

function numberRange(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min + 1)) + min;

}

	export const settings: TestSettings = {
		userAgent: 'flood-facto-test',
		waitUntil: 'visible',
		description: 'iTwoCX Contract ',
		screenshotOnFailure: true,
		disableCache: true,
		clearCache: true,
		clearCookies: true,
		actionDelay: 1.5,
		stepDelay: 2.5,
		browser: 'chromium', 
		loopCount: 1,
		waitTimeout: '60s',
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
	
		step('Step 3 - Log into iTwocx as a Contracts Admin', async browser => {
			
			//Find the element 
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


		step('Step 4 - Create subcontractor variation', async browser => {
			
			await browser.visit('https://mirvac-uat.itwocx.com/cxR/cx.aspx?page=docs/DocNew0&j=MGR-UAT-20131&dsid=69958&i=1981144&m=f&d=&mdu=CTR&f=CTRC&questionLogId=&tenderPackageId=')
			await browser.takeScreenshot()	
		})

		step('Step 5 - Enter Title', async browser => {
			const randNum = numberRange(100, 10000) 
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
			let title = '#tt'
			await frame1.waitForSelector(title)
			await frame1.type(title, 'Variation - ' + numberRange(100,10000).toString() +' ')

			await browser.takeScreenshot()
			
		})

		step('Step 6 - Change the Due Date', async browser => {
		
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
			
			let  dueDate = '#dueDate > img'
			await frame1.waitForSelector(dueDate)
			await frame1.click(dueDate)
	
			let chooseDate = '#cal_content > table > tbody > tr:nth-child(6) > td:nth-child(3) > a'
			await frame1.waitForSelector(chooseDate)
			await frame1.click(chooseDate) 
	
			await browser.takeScreenshot()
		})	

		step('Step 7 - Selection of Dropdown Menu Options', async browser => {
			
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))	
			
			let variationReason = '//*[@id="USR_BRFV"]'
			await frame1.waitForSelector(variationReason)
			await frame1.click(variationReason)
			await browser.sendKeys(Key.DOWN)
			await browser.sendKeys(Key.DOWN)
			await browser.sendKeys(Key.ENTER)

			let warrantiesImpacted = '//*[@id="TreeSel_USR_WARIMP"]'
			await frame1.waitForSelector(warrantiesImpacted) 
			await frame1.click(warrantiesImpacted)
			await browser.sendKeys(Key.DOWN)
			await browser.sendKeys(Key.ENTER)

			let substantialCompletion = '//*[@id="TreeSel_USR_SUBCOMIMP"]'
			await frame1.waitForSelector(substantialCompletion)
			await frame1.click(substantialCompletion)
			await browser.sendKeys(Key.DOWN)
			await browser.sendKeys(Key.ENTER)

			let scheduleRate = '//*[@id="TreeSel_USR_SORAPP"]'
			await frame1.waitForSelector(scheduleRate)
			await frame1.click(scheduleRate)
			await browser.sendKeys(Key.DOWN)
			await browser.sendKeys(Key.ENTER)

			await browser.takeScreenshot()
		})
		
		step('Step 8 - Fill in Description of Variation', async browser => {
			
			const signature = 'Facto Mirvac PT'		
			

			const frame1 = browser.page.frames().find((frame) => frame.name().includes('USR_VARDES_ifr'))
			
			let descriptionBox = '//*[@id="tinymce"]'
			await frame1.waitForSelector(descriptionBox)
			await browser.sendKeys(Key.ENTER)
			await frame1.type(descriptionBox, signature)	

			await browser.takeScreenshot()
		})

		step('Step 9 - Set Rate', async browser => {
			const randRate = numberRange(1, 100) 
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
			


			let arrowList = '//*[@id="tr.001"]/td[10]/span/span/span[2]'
			await frame1.waitForSelector(arrowList)
			await frame1.click(arrowList)
			await browser.sendKeys(Key.DOWN)
			await browser.sendKeys(Key.ENTER)

			let rate = '//*[@id="tr.001"]/td[14]'
			await frame1.waitForSelector(rate)
			await frame1.click(rate)

			let inputForm = '//*[@id="caEditTable"]/tbody/tr/td/table/tbody/tr[2]/td[6]/input'
			await frame1.waitForSelector(inputForm)
			await frame1.type(inputForm, numberRange(1,100).toString())
			await browser.sendKeys(Key.ENTER)

			// let insertButton = '//*[@id="rowsEditor"]/tbody/tr/td[2]/input[2]'
			// await frame1.waitForSelector(insertButton)
			// await frame1.click(insertButton)

			await browser.takeScreenshot()
		})

		step('Step 10 - Submit for Approval', async browser => {
			await browser.page.waitForSelector('#DocNewButFrameDiv > iframe')
			const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewButFrame'))
			let submitButton = '//*[@id="titidMenu471581"]'
			await frame1.waitForSelector(submitButton)
			await frame1.click(submitButton)
			await browser.wait('15000ms') //Wait for 15 seconds for the result to appear

		
			await browser.takeScreenshot()
			

});

// Define global variables
type JsonValueType = {
  value: string;
};

let jsonValue: JsonValueType = { value: "" }; // only store referenceID
let jsonData: JsonValueType[] = []; // hold array of data

step('Step 11 - Rip referenceID', async browser => {
    const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocDetDetFrame'));
    let referenceID = '#pcr_mRef > span';
    const title = await frame1.waitForSelector(referenceID);
    const textValue = String(await title.textContent());
    await browser.takeScreenshot();

    // Assign value to the global variable
    jsonValue = { value: textValue };
    const jsonFileName = "results.json";
    fs.writeFileSync(jsonFileName, JSON.stringify(jsonValue));
    console.log(`Value exported to ${jsonFileName}`);
    await browser.takeScreenshot();
});

step("Step 12 - Read and Append Data", async (browser) => {
    // Try to read the existing data from the file
    try {
        const dataFromFile = JSON.parse(fs.readFileSync("results.json", "utf-8"));
        
        // Check if the data is an array
        if (Array.isArray(dataFromFile)) {
            jsonData = dataFromFile;
        } else {
            console.log("Error: Data from results.json is not an array. Using default value.");
            jsonData = [];
        }
    } catch (error) {
        console.log("JSON file not found or other error reading the file.");
        jsonData = [];  // Default to an empty array if there's an issue with the file
    }

    // Append the current jsonValue to jsonData
    jsonData.push(jsonValue);
});


step("Step 13 - Write data back to file", async (browser) => {
    // Write the updated data back to the file
    fs.writeFileSync("results.json", JSON.stringify(jsonData, null, 2));
    console.log(`Value appended to results.json`);
    await browser.takeScreenshot();
});

	