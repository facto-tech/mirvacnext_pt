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

	step('Step 5 - Switch to new Iframe', async browser => {
		
		const docNewNewFrame = await browser.switchTo()
		docNewNewFrame.frame('DocNewNewFrame')

	})

	step('Step 6 - Fill in the Title', async browser => {

		const nameTitile = await browser.findElement(By.xpath('/html/body/div[4]/div/div[1]/form/table/tbody/tr[1]/td/div[2]/table/tbody/tr[1]/td[2]/input[1]'))
		await browser.type(nameTitile, Constants.FORMTITLE)
		await browser.takeScreenshot()

	})
}
