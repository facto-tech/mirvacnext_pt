import { step, TestSettings, By, beforeAll, afterAll, Until, Key } from '@flood/element';
import assert from "assert";
import Constants from '../data/Constants';

function numberRange(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min + 1)) + min;
}

export const settings: TestSettings = {
	userAgent: 'flood-facto-test',
	waitUntil: 'visible',
	description: 'iTwoCX Progress Claim',
	screenshotOnFailure: true,
	disableCache: true,
	clearCache: true,
	clearCookies: true,
	actionDelay: 1.5,
	stepDelay: 2.5,
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
		await browser.wait('10000ms')
		await browser.visit(Constants.UATURL)
		await browser.takeScreenshot()
	})

	step('Step 2 - Switch to outframe', async browser => {
		const target = await browser.switchTo()
		target.frame("outframe")
	})

	step('Step 3 - Login', async browser => {
		
		const username = By.css('#nme')
        await browser.wait(Until.elementIsVisible(username))
        
        const password = By.css('#pwd')
        await browser.wait(Until.elementIsVisible(password))
        
        await browser.type(username, Constants.UATUSERNAME)
        await browser.type(password, Constants.UATPASSWORD)

        await browser.takeScreenshot()

        const loginButton = await browser.findElement(By.css('#commit > input'))
        await loginButton.click()

	})

	step('Step 4 - Open Subcontractor Payment Claim', async browser => {

		await browser.visit(Constants.UATPROGRESSCLAIM)
		await browser.takeScreenshot()	
	})

	step('Step 5 - Click on PC line item', async browser => {
		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		let percentageClickable = '#tr\\.001 > td:nth-child(15)'

		await frame1.waitForSelector(percentageClickable)
		await frame1.click(percentageClickable)
	})

	step('Step 6 - Enter PC line item 1%', async browser => {
		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		let percent = '#lineItemUpdaterInputRow > td:nth-child(10) > input'
		await frame1.click(percent)
		await browser.sendKeys(Key.BACK_SPACE)
		await browser.sendKeys(Key.BACK_SPACE)
		await browser.sendKeys(Key.BACK_SPACE)
		await browser.sendKeys(Key.BACK_SPACE)
		await frame1.type(percent, numberRange(1,99).toString())
		
	})

	step('Step 7 - Submit to Mirvac for approval', async browser => {
		const frame2 = browser.page.frames().find((frame) => frame.name().includes('DocNewButFrame'))
		let submissionButton = '//*[@id="idMenu471579"]/div'
		//let submissionButton = '//*[@id="idMenu471579"]/div'
		await frame2.waitForSelector(submissionButton)
		await frame2.click(submissionButton)
		
	})

	step('Step 8 - Capture result', async browser => {
		await browser.wait('30000ms')
		await browser.takeScreenshot()
	})

}