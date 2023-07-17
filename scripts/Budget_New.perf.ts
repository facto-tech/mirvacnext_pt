import { step, TestSettings, By, beforeAll, afterAll } from '@flood/element';
import assert from "assert";
import constants from '../data/constants';


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

	step('Step 4 - Open BGTNBC > New ', async browser => {

			await browser.visit(constants.URL5)
			await browser.takeScreenshot()	

	})

	step('Step 5 - Enter Title budget transfer description', async browser => {

		const title = await browser.findElement(By.css('#tt'))
		await title.type('TESTTITLE')
		await browser.takeScreenshot()	
	})

	step('Step 6 - Enter supporting doc fields - doc name  ', async browser => {
	
	//doc name

		const title = await browser.findElement(By.css('#tblPCTB149\/DOCNM_1'))
		await title.type('TESTDOCNAME')
		await browser.takeScreenshot()		

    })

	step('Step 7 - Enter budget fields - doc type  ', async browser => {
	
    //doc type
    
    const triggerElement = By.css('#tblPCTB149\/BGTDOCTYP_1')
    await browser.click(triggerElement)
    await browser.click(By.visibleText('Head Contract'))
    await browser.takeScreenshot()	
    
    })

    //step('Step 8 - Enter budget fields - attachments  ', async browser => {
	
    //attachments
        
    //const triggerElement = By.css('#BUTTON_tblPCTB149\/DOCATT_1 > img')
    //await browser.click(triggerElement)
    //await browser.click(By.visibleText('Select files...'))
    //await browser.takeScreenshot()	
        
    //})


	step('Step 8 - Enter fields - cat code  ', async browser => {

	//cat code
		
	const title = await browser.findElement(By.css('#caEditTable > tbody > tr:nth-child(2) > td.buttonsTd > input:nth-child(1)'))
	await title.type('TESTCATCODE')
	await browser.takeScreenshot()
				
		})

	step('Step 9 - Enter fields - quantity  ', async browser => {

	//quantity

	const title = await browser.findElement(By.css('#caEditTable > tbody > tr:nth-child(2) > td.buttonsTd > input:nth-child(2)'))
	await title.type('300000')
	await browser.takeScreenshot()
		
})
	

step('Step 10 - Submit to Mirvac for approval', async browser => {

	await browser.click(By.css('#idMenu271984'))
	await browser.takeScreenshot()	
	
})
}
