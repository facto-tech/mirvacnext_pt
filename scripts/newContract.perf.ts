import { step, TestSettings, By, beforeAll, afterAll, Until, Browser } from '@flood/element';
import assert from "assert";
import Constants from '../data/Constants';


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
	loopCount: 1, //remove this before publishing to PT run
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

	//use a different var name each time switching frames even if the frame ID is the same
	//this will help with triage if something goes wrong or an identifier cannot be located

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


	step('Step 5 - Enter title for the new contract', async browser => {

		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		let title = '#tt'

		await frame1.waitForSelector(title)
		await frame1.type(title, 'DN BP-T5261')

		await browser.takeScreenshot()
	})

	step('Step 6 - Change the due date of the contract ', async browser => {
		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		
		let  dueDate = '#dueDate > img'
		await frame1.waitForSelector(dueDate)
		await frame1.click(dueDate)

		let chooseDate = '#cal_content > table > tbody > tr:nth-child(5) > td:nth-child(4) > a'
		await frame1.waitForSelector(chooseDate)
		await frame1.click(chooseDate) 

		await browser.takeScreenshot()
	})	
	
	step('Step 7 - Fill in the information under Administration', async browser => {
		/**80% - Have not selected the dropdown menu yet */
		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		
		//const commitmentType = '#USR_CTRCOMTYPE'; // Replace with the actual selector for the <select> element
		//const optionValue = 'Ad hoc Order'; // Replace with the desired option value
		
		// await frame1.waitForSelector(commitmentType)
		// await frame1.click(commitmentType)
		
		

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
		
		// Press ArrowDown key
		//await frame1.selectOption(commitmentType, { value: 'Ad hoc Order' });



	})

	step('Step 8 - Fill in the information under Contract', async browser => {
		/*Haven't link SUBCONTRACT CATEGORY*/
		const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))

		let subcontractorRepresentative = '#USR_CLMREPN'	
		await frame1.waitForSelector(subcontractorRepresentative)
		await frame1.type(subcontractorRepresentative, 'V0003213-USER')

		let mirvacRepresentative  = '#USR_RESPREPN'	
		await frame1.waitForSelector(mirvacRepresentative)
		await frame1.type(mirvacRepresentative, 'MRC1-PM1')
	})

	/*step('Step 9 - Linked budget line', async browser => {}*/

	step('Step 10 - Send For Approval', async browser => {
	
	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
	let submitButton = '#titidMenu271844'
	await frame1.waitForSelector(submitButton)
	await frame1.click(submitButton)

	})
}
