import { step, TestSettings, By, beforeAll, afterAll, Until, Key } from '@flood/element';
import assert from "assert";
import Constants from '../data/Constants';
import dataGeneration from '../data/dataGeneration';


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
}

export default () => {
	
	beforeAll(async browser => {
		await browser.wait('1500ms')
	})

	afterAll(async browser => {
		await browser.wait('1500ms')
	})

	step('Step 1 - Load URL', async browser => {
		await browser.visit(Constants.ALTURL)
		await browser.takeScreenshot()
	})

    step('Step 2 - Switch to outframe', async browser => {
		const target = await browser.switchTo()
        target.frame("outframe")
	})

    step('Step 3 - Log into iTwocx as a Contracts Administrator', async browser => {
		
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

    step('Step 4 - Redirect to the form link', async browser => {

		await browser.visit(Constants.FORMURL)
		await browser.takeScreenshot()	
	})


	step('Step 5 - Enter title', async browser => {

		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		let title = '#tt'

		await frame1.waitForSelector(title)
		await frame1.type(title, 'Flood Test - ' + dataGeneration.randomNumber)

		await browser.takeScreenshot()
	})


	step('Step 6 - Change the due date', async browser => {
		
		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		
		let  dueDate = '#dueDate > img'
		await frame1.waitForSelector(dueDate)
		await frame1.click(dueDate)

		let chooseDate = '#cal_content > table > tbody > tr:nth-child(6) > td:nth-child(2) > a'
		await frame1.waitForSelector(chooseDate)
		await frame1.click(chooseDate) 

		await browser.takeScreenshot()
	})	
	
	step('Step 7 - Enter the Administration Details', async browser => {
		
		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
	
		// await frame1.evaluate(({ selector, value }) => {
		// 	const selectElement = document.querySelector(selector);
		// 	const option = Array.from(selectElement.options).find((opt) => opt.value === value);
		// 	if (option) {
		// 	  option.selected = true;
		// 	  selectElement.dispatchEvent(new Event('change', { bubbles: true }));
		// 	}
		//   }, { selector: selectSelector, value: optionValue });

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
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.ENTER)

		await browser.takeScreenshot()

	})

	step('Step 8 - Enter the Contract Details', async browser => {
		
		const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))

		let subcontractorRepresentative = '#USR_CLMREPN'	
		await frame1.waitForSelector(subcontractorRepresentative)
		await frame1.type(subcontractorRepresentative, 'V0003213-USER')

		let mirvacRepresentative  = '#USR_RESPREPN'	
		await frame1.waitForSelector(mirvacRepresentative)
		await frame1.type(mirvacRepresentative, 'MRC1-PM1')

		//select SUBCONTRACT CATEGORY

		let subcontractCatergory = '#USR_SCCAT'
		await frame1.waitForSelector(subcontractCatergory)
		await frame1.click(subcontractCatergory)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.ENTER)

		await browser.takeScreenshot()
	})

	step('Step 9 - Link Budget', async browser => {
		
		const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
		let arrowButton = '#divUsrForm > div.selectLinkedBudget'
		await frame1.waitForSelector(arrowButton)
		await frame1.click(arrowButton)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.ENTER)

		let insertButton = '#rowsEditor > tbody > tr > td.buttonsTd > input:nth-child(2)'
		await frame1.waitForSelector(insertButton)
		await frame1.click(insertButton)

		let arrowList = '//*[@id="tr.001"]/td[10]/span/span/span[2]'
		await frame1.waitForSelector(arrowList)
		await frame1.click(arrowList)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.ENTER)

		await browser.takeScreenshot()
	})

	step('Step 10 - Set Rate', async browser => {
			
		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		
		let rate = '//*[@id="tr.001"]/td[15]'
		await frame1.waitForSelector(rate)
		await frame1.click(rate)

		let inputForm = '//*[@id="caEditTable"]/tbody/tr/td/table/tbody/tr[2]/td[7]/input'
		await frame1.waitForSelector(inputForm)
		await frame1.type(inputForm, dataGeneration.randomNumber.toString())

		let insertButton = '//*[@id="rowsEditor"]/tbody/tr/td[2]/input[2]'
		await frame1.waitForSelector(insertButton)
		await frame1.click(insertButton)

		await browser.takeScreenshot()
	})

	step('Step 11 - Submit for Approval', async browser => {
	
	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewButFrame'))
	let submitButton = '#titidMenu271844'
	await frame1.waitForSelector(submitButton)
	await frame1.click(submitButton)
	await browser.wait('8000ms') //Wait for 8 seconds for the result to appear

	await browser.takeScreenshot()
	
	
	})
}
