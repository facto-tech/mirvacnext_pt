import { step, TestSettings, By, beforeAll, afterAll, Until } from '@flood/element';
import assert from "assert";
import Constants from '../data/Constants';
//import DataGeneration from '../data/DataGeneration';


export const settings: TestSettings = {
	userAgent: 'flood-facto-test',
	waitUntil: 'visible',
	description: 'iTwoCX Contract Variation',
	screenshotOnFailure: true,
	disableCache: true,
	clearCache: true,
	clearCookies: true,
	actionDelay: 1.5,
	stepDelay: 2.5,
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

	step('Step 3 - Login', async browser => {
		
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

	step('Step 4 - Switch to direct subcontract form', async browser => {

		await browser.visit(Constants.SUBCONTRACT_URL)
		await browser.takeScreenshot()
		
	})

	step('Step 5 - Fill out form', async browser => {

		/*const docFrame = await browser.switchTo()
		docFrame.frame('DocNewNewFrame')*/
		const newFrame = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		const title = '#tt'

		await newFrame.waitForSelector(title)
		await newFrame.type(title, 'Flood')
		
		
	})


}
