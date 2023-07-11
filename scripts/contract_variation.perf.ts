import { step, TestSettings, By, beforeAll, afterAll } from '@flood/element';
import assert from "assert";
import Constants from '../data/Constants';


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
		await browser.visit(Constants.URL)
		await browser.takeScreenshot()
	})

	//use a different var name each time switching frames even if the frame ID is the same
	//this will help with triage if something goes wrong or an identifier cannot be located
	step('Step 2 - Switch to outframe', async browser => {
		const target = await browser.switchTo()
		target.frame("outframe")
	})

	step('Step 3 - Login', async browser => {
		
		const login = await browser.findElement(By.css('#nme'))
		await browser.type(Constants.ITWOCXLOGIN)

		const password = await browser.findElement(By.css('#pwd'))
		await browser.type(Constants.ITWOPASS)

		await browser.takeScreenshot()

		const loginButton = await browser.findElement(By.css('#commit > input'))
		await loginButton.click()
	})

	step('Step 4 - Open Contract Admin', async browser => {

		const mainTarget = await browser.switchTo()
		mainTarget.frame("outframe")

		const mainButtonTarget = await browser.switchTo()
		mainButtonTarget.frame("mainbuttonFrame")

		const contractAdmin = await browser.findElement(By.css("#divMain > nobr:nth-child(3) > ul > li > span > a"))
		await contractAdmin.click()

		const listTarget = await browser.switchTo()
		listTarget.frame("listFrame")

		/*const docTarget = await browser.switchTo()
		docTarget.frame('DocRegRegFrame')*/

		const mpcConstructionArrow = await browser.findElement(By.css("#registerItems > tbody > tr:nth-child(3) > td:nth-child(2) > a"))
		

	})


}
