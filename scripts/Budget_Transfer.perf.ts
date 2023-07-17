import { step, TestSettings, By, beforeAll, afterAll } from '@flood/element';
import assert from "assert";
import constants from '../data/constants';


export const settings: TestSettings = {
	userAgent: 'flood-facto-test',
	waitUntil: 'visible',
	description: 'iTwoCX Budget Transfer',
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

	step('Step 4 - Open BTCR > New ', async browser => {

			await browser.visit(constants.URL4)
			await browser.takeScreenshot()	

	})

	step('Step 5 - Enter Title budget transfer description', async browser => {

		const title = await browser.findElement(By.css('#tt'))
		await title.type('TESTTITLE')
		await browser.takeScreenshot()	
	})

	step('Step 6 - Enter budget fields - budget  ', async browser => {
	
	//budget

	const triggerElement = By.css('#Budget')
	await browser.click(triggerElement)
	await browser.click(By.visibleText('BGTC#0001 - Test 0001'))
	await browser.takeScreenshot()	

    })

	step('Step 7 - Enter budget fields - from line item  ', async browser => {
	
    //line item
    
    const triggerElement = By.css('#FromLineItems')
    await browser.click(triggerElement)
    await browser.click(By.visibleText('001:WAGES - SALARY'))
    await browser.takeScreenshot()	
    
    })

    step('Step 8 - Enter budget fields - to line item  ', async browser => {
	
    //to line item
        
    const triggerElement = By.css('#ToLineItems')
    await browser.click(triggerElement)
    await browser.click(By.visibleText('001:WAGES - SALARY'))
    await browser.takeScreenshot()	
        
    })

    step('Step 9 - Enter budget fields - transfer amount  ', async browser => {
	
    //transfer amount

    const triggerElement = By.css('#ValueTransfered')
    await browser.click(triggerElement)
    await browser.type(('1000'))
    await browser.takeScreenshot()	
            
    })


step('Step 10 - Submit to Mirvac for approval', async browser => {

	await browser.click(By.css('#idMenu271984'))
	await browser.takeScreenshot()	
	
})

}