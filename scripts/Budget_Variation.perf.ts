import { step, TestSettings, By, beforeAll, afterAll, Until, Key } from '@flood/element';
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
	loopCount: 30, 
	browser: 'chromium',
	waitTimeout: '60s',
}

function numberRange(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min + 1)) + min;
}

let randomNumber = numberRange(1000,250000);


export default () => {
	beforeAll(async browser => {
		await browser.wait('1500ms')
	})

	afterAll(async browser => {
		await browser.wait('1500ms')
	})

	step('Step 1 - Load URL', async browser => {
		await browser.visit(constants.UATURL)
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
        
        await browser.type(username, constants.UATUSERNAME)
        await browser.type(password, constants.UATPASSWORD)

        await browser.takeScreenshot()

        const loginButton = await browser.findElement(By.css('#commit > input'))
        await loginButton.click()
	})

	step('Step 4 - Open BVRC > New ', async browser => {

			await browser.visit(constants.UATBUDGETVAR)
			await browser.takeScreenshot()	

	})

	step('Step 5 - Enter Title on new budget variation', async browser => {

		//budget
		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		let title = '#tt'
	
		await frame1.waitForSelector(title)
		await frame1.type(title, 'Flood Test -' + numberRange(1000,100000).toString())
	
		await browser.takeScreenshot()


		//const title = await browser.findElement(By.css('#tt'))
		//await title.type('TESTTITLE')
		//await browser.takeScreenshot()	
	})

	step('Step 6 - Enter mandatory fields under admin reference ', async browser => {

	//zone

	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
	let arrowButton = '#USR_ZONE'
	await frame1.waitForSelector(arrowButton)
	await frame1.click(arrowButton)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.ENTER)
	

	//source

	let arrowButton2 = '#USR_BSRC'
	await frame1.waitForSelector(arrowButton2)
	await frame1.click(arrowButton2)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.ENTER)

	//variation reason

	let arrowButton3 = '#USR_BVRRCOM'
	await frame1.waitForSelector(arrowButton3)
	await frame1.click(arrowButton3)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.ENTER)

	//variation code

	let budgetVariation = '#USR_BVRREF'
	await frame1.waitForSelector(budgetVariation)
	await frame1.type(budgetVariation, numberRange(1000,10000).toString())

	//construction reserve
	let constReserve = '#USR_CONTRDRES'
	await frame1.waitForSelector(constReserve)
	await frame1.type(constReserve, numberRange(1000,10000).toString())

	//budget description
	let budgetDescription = '#USR_BRFVDES_ifr'
	await frame1.waitForSelector(budgetDescription)
	await frame1.type(budgetDescription, 'Flood Test -' + numberRange(1000,10000).toString())

	})

	step('Step 7 - Enter mandatory fields under estimated budget ', async browser => {
	
	//estimated budget
	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
	let estimatedBudget = '#USR_EBVR'
	await frame1.waitForSelector(estimatedBudget)
	await frame1.type(estimatedBudget, numberRange(1000,10000).toString())


	//const triggerElement = By.css('#tinymce')
	//await browser.click(triggerElement)
	//await browser.click(By.visibleText('Client Direction'))
	await browser.takeScreenshot()
	
	})

	step('Step 8 - Select budget ', async browser => {
		
		const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
		let arrowButton4 = '#lstBudgets'
		await frame1.waitForSelector(arrowButton4)
		await frame1.click(arrowButton4)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.ENTER)

		const frame2 = browser.page.frames().find((frame) => frame.name().includes('USR_BRFVDES_ifr'))
		let budgetVariationDescription = '#tinymce'
		await frame2.type(budgetVariationDescription, 'This is a random variation - ' + numberRange(100,100000).toString())

	
	await browser.takeScreenshot()	

	})

	step('Step 9 - Add a budget estimation description ', async browser => {

		const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
		let descriptionBudget = '#caEditTable > tbody > tr:nth-child(2) > td:nth-child(2) > textarea'
		await frame1.waitForSelector(descriptionBudget)
		await frame1.type(descriptionBudget, numberRange(1000,10000).toString())


	//const title = await browser.findElement(By.css('#tinymce'))
	//await title.type('TESTVARIATIONDESCRIPTION')
	await browser.takeScreenshot()	

})


step('Step 10 - Add a budget estimation code ', async browser => {

	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
	let codeBudget = '#caEditTable > tbody > tr:nth-child(2) > td.buttonsTd > input:nth-child(1)'
	await frame1.waitForSelector(codeBudget)
	await frame1.type(codeBudget, numberRange(1000,10000).toString())


//const title = await browser.findElement(By.css('#tinymce'))
//await title.type('TESTVARIATIONDESCRIPTION')
await browser.takeScreenshot()	

})



step('Step 11 - Add a budget estimation rate ', async browser => {

	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
	let rateBudget = '#caEditTable > tbody > tr:nth-child(2) > td.buttonsTd > input:nth-child(3)'
	await frame1.waitForSelector(rateBudget)
	await frame1.type(rateBudget, numberRange(1000,10000).toString())


//const title = await browser.findElement(By.css('#tinymce'))
//await title.type('TESTVARIATIONDESCRIPTION')
await browser.takeScreenshot()	

})



step('Step 12 - Submit to Mirvac for approval', async browser => {

	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewButFrame'))
	let submitButton = '//*[@id="idMenu471577"]/div'
	await frame1.waitForSelector(submitButton)
	await frame1.click(submitButton)
	await browser.wait('30000ms') 

	await browser.takeScreenshot()


	//await browser.click(By.css('#idMenu271984'))
	//await browser.takeScreenshot()	
})


}