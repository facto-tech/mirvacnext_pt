import { step, TestSettings, By, beforeAll, afterAll, Until, Key } from '@flood/element';
import assert from "assert";
import Constants from '../../data/Constants';


export const settings: TestSettings = {
	userAgent: 'flood-facto-test',
	waitUntil: 'visible',
	description: 'iTwoCX Budget New',
	screenshotOnFailure: true,
	disableCache: true,
	clearCache: true,
	clearCookies: true,
	actionDelay: 1.5,
	stepDelay: 2.5,
	loopCount: 10, 
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

		/*const listTarget = await browser.switchTo()
		listTarget.frame("listFrame")*/
	})

	step('Step 4 - Open BGTNBC > New ', async browser => {

			await browser.visit(Constants.UATNEWBUDGET)
			await browser.takeScreenshot()	

	})

	step('Step 5 - Enter Title budget description', async browser => {

		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		let title = '#tt'

		await frame1.waitForSelector(title)
		await frame1.type(title, 'Flood Test -' + randomNumber)

		await browser.takeScreenshot()
	})

	step('Step 6 - Enter supporting fields - approver details  ', async browser => {
	
	//approver details

	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
	let arrowButton = '#USR_ZONE'
	await frame1.waitForSelector(arrowButton)
	await frame1.click(arrowButton)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.ENTER)
	
	let arrowButton2 = '#USR_JOBCODE'
	await frame1.waitForSelector(arrowButton2)
	await frame1.click(arrowButton2)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.ENTER)



	await browser.takeScreenshot()		

    })

	step('Step 7 - Enter fields - cost code  ', async browser => {

	//cost code

	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
	let openContract = '//*[@id="tr.001"]/td[8]'
	await frame1.click(openContract)
	let arrowButton1 = '#caEditTable'
	await frame1.click(arrowButton1)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.ENTER)
		
	//const title = await browser.findElement(By.css('#caEditTable > tbody > tr:nth-child(2) > td.buttonsTd > input:nth-child(1)'))
	//await title.type('TESTCATCODE')
	await browser.takeScreenshot()
				
		})

	step('Step 8 - Enter fields - budget  ', async browser => {

	//budget
	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
	let openContract = '//*[@id="tr.001"]/td[8]'
	await frame1.click(openContract)
	let description = '#Description'
	await frame1.type(description, 'Test')
	let costCode = '//*[@id="caEditTable"]/tbody/tr/td/table/tbody/tr[2]/td[4]/span/span/span[2]'
	await frame1.click(costCode)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.ENTER)
	let inputBudget = '//*[@id="Budget"]'
	await frame1.type(inputBudget, numberRange(100,25000).toString())


	//const title = await browser.findElement(By.css('#Budget'))
	//await title.type(numberRange(1000,100000))
	await browser.takeScreenshot()
		
})
	

step('Step 9 - Submit to Mirvac for approval', async browser => {

	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewButFrame'))
	let submitButton = '#titidMenu471578'
	await frame1.waitForSelector(submitButton)
	await frame1.click(submitButton)
	await browser.wait('45000ms') 

	await browser.takeScreenshot()
	
})
}
