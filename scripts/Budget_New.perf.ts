import { step, TestSettings, By, beforeAll, afterAll, Until, Key } from '@flood/element';
import assert from "assert";
import Constants from '../data/Constants';


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
	browser: 'chromium',
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

	step('Step 5 - Enter Title budget transfer description', async browser => {

		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		let title = '#tt'

		await frame1.waitForSelector(title)
		await frame1.type(title, 'Flood Test -' + randomNumber)

		await browser.takeScreenshot()
	})

	step('Step 6 - Enter supporting doc fields - doc name  ', async browser => {
	
	//doc name

		let title = '#tblPCTB149\/DOCNM_1'
		await frame1.type('TESTDOCNAME')
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
	await title.type(numberRange(1000,100000))
	await browser.takeScreenshot()
		
})
	

step('Step 10 - Submit to Mirvac for approval', async browser => {

	await browser.click(By.css('#idMenu271984'))
	await browser.takeScreenshot()	
	
})
}
