import { step, TestSettings, By, beforeAll, afterAll } from '@flood/element';
import assert from "assert";
import constants from '../data/constants';


export const settings: TestSettings = {
	userAgent: 'flood-facto-test',
	waitUntil: 'visible',
	description: 'iTwoCX Budget Variation',
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
		await browser.visit(constants.URL)
		await browser.takeScreenshot()
	})

	step('Step 2 - Switch to outframe', async browser => {
		const target = await browser.switchTo()
		target.frame("outframe")
	})

	step('Step 3 - Login', async browser => {
		
		const login = await browser.findElement(By.css('#nme'))
		await login.type(constants.ITWOCXUSERNAME)

		const password = await browser.findElement(By.css('#pwd'))
		await password.type(constants.ITWOCXPASSWORD)

		await browser.takeScreenshot()

		const loginButton = await browser.findElement(By.css('#commit > input'))
		await login.click()

		const listTarget = await browser.switchTo()
		listTarget.frame("listFrame")
	})

	step('Step 4 - Open BVRC > New ', async browser => {

			await browser.visit(constants.URL4)
			await browser.takeScreenshot()	

	})

	step('Step 5 - Enter Title on new budget variation', async browser => {

		const title = await browser.findElement(By.css('#tt'))
		await title.type('TESTTITLE')
		await browser.takeScreenshot()	
	})

	step('Step 6 - Enter mandatory fields under admin reference ', async browser => {

	//reference

		const title = await browser.findElement(By.css('#USR_BVRREF'))
		await title.type('TESTREFERENCE')
		await browser.takeScreenshot()	
	})

	step('Step 7 - Enter mandatory fields under admin source ', async browser => {
	
	//source

	const triggerElement = By.css('#USR_BSRC')
	await browser.click(triggerElement)
	await browser.click(By.visibleText('Purchaser Options'))
	await browser.takeScreenshot()	
	})

	step('Step 8 - Enter mandatory fields under admin variation ', async browser => {
	
	//variation

	const triggerElement = By.css('#USR_BVRRCOM')
	await browser.click(triggerElement)
	await browser.click(By.visibleText('Client Direction'))
	await browser.takeScreenshot()
	
	})

	step('Step 9 - Add a budget variation description ', async browser => {
	const title = await browser.findElement(By.css('#tinymce'))
	await title.type('TESTVARIATIONDESCRIPTION')
	await browser.takeScreenshot()	

	})



	step('Step 10 - Add a budget variation description ', async browser => {
	const title = await browser.findElement(By.css('#tinymce'))
	await title.type('TESTVARIATIONDESCRIPTION')
	await browser.takeScreenshot()	

})

step('Step 11 - Submit to Mirvac for approval', async browser => {

	await browser.click(By.css('#idMenu271984'))
	await browser.takeScreenshot()	
})


}