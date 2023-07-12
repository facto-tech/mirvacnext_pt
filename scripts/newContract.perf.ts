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

	
}
