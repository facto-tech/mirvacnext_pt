import { step, TestSettings, By, beforeAll, afterAll } from '@flood/element';
import assert from "assert";
import Constants from '../data/Constants';


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
}

export default () => {
	beforeAll(async browser => {
		await browser.wait('1500ms')
	})

	afterAll(async browser => {
		await browser.wait('1500ms')
	})

	step('Step 1 - Load URL', async browser => {
		await browser.visit(Constants.UATURL)
		await browser.takeScreenshot()
	})

	step('Step 2 - Switch to outframe', async browser => {
		const target = await browser.switchTo()
		target.frame("outframe")
	})

	step('Step 3 - Login', async browser => {
		
		const login = await browser.findElement(By.css('#nme'))
		await login.type(Constants.UATUSERNAME)

		const password = await browser.findElement(By.css('#pwd'))
		await password.type(Constants.UATPASSWORD)

		await browser.takeScreenshot()

		const loginButton = await browser.findElement(By.css('#commit > input'))
		await login.click()

	})

	step('Step 4 - Open Subcontractor Payment Claim', async browser => {

		await browser.visit(Constants.FORMURL)
		await browser.takeScreenshot()	
	})

	step('Step 5 - Click on PC line item', async browser => {

		await browser.click(By.css('#tableData > tbody > tr.pcCaHeaderRow > th.H1.expandCollapseContainer.itemNo'))
		await browser.takeScreenshot()	
	})

	step('Step 6 - Enter PC line item 60%', async browser => {

		await browser.click(By.css('#tableData > tbody > tr.pcCaHeaderRow > th.H1.expandCollapseContainer.itemNo'))
		const percentage = await browser.findElement(By.css('#lineItemUpdaterInputRow > td:nth-child(10) > input'))
		await percentage.type('60%')
		await browser.takeScreenshot()	
	})

	step('Step 7 - Submit to Mirvac for approval', async browser => {

		await browser.click(By.css('#idMenu271984'))
		await browser.takeScreenshot()	
	})

}