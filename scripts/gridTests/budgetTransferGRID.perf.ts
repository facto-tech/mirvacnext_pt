import { step, TestSettings, By, beforeAll, afterAll, Until, Key } from '@flood/element';
import assert from "assert";
import Constants from '../../data/Constants';


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
	loopCount: 150, 
	waitTimeout: '60s',
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
	})

	step('Step 4 - Open BTRC > New ', async browser => {

			await browser.visit(Constants.UATBUDGETTRAN)
			await browser.takeScreenshot()	

	})

	step('Step 5 - Enter Title budget transfer description', async browser => {

		const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
		let title = '#tt'

		await frame1.waitForSelector(title)
		await frame1.type(title, 'Flood Test -' + numberRange(1000,100000).toString())

		await browser.takeScreenshot()	
	})

	step('Step 6 - Enter budget fields - Zone  ', async browser => {
	
	//ZONE

	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
	let arrowButton = '#USR_ZONE'
	await frame1.waitForSelector(arrowButton)
	await frame1.click(arrowButton)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.ENTER)

    })

	step('Step 7 - Enter budget fields - budgets  ', async browser => {
	
    //budgets

    const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
	let arrowButton = '#Budget'
	await frame1.waitForSelector(arrowButton)
	await frame1.click(arrowButton)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.ENTER)

    //const triggerElement = By.css('#FromLineItems')
    //await browser.click(triggerElement)
    //await browser.click(By.visibleText('001:WAGES - SALARY'))
    await browser.takeScreenshot()	
    
    })

    step('Step 8 - Enter budget fields - from line item  ', async browser => {
	
    //from line item
        
	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
	let arrowButton = '#FromLineItems'
	await frame1.waitForSelector(arrowButton)
	await frame1.click(arrowButton)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.DOWN)
	await browser.sendKeys(Key.ENTER)

    //const triggerElement = By.css('#ToLineItems')
    //await browser.click(triggerElement)
    //await browser.click(By.visibleText('001:WAGES - SALARY'))
    await browser.takeScreenshot()	
        
    })

	step('Step 9 - Enter budget fields - to line item  ', async browser => {
	
		//to line item
			
		const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
		let arrowButton = '#ToLineItems'
		await frame1.waitForSelector(arrowButton)
		await frame1.click(arrowButton)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.DOWN)
		await browser.sendKeys(Key.ENTER)
	
		//const triggerElement = By.css('#ToLineItems')
		//await browser.click(triggerElement)
		//await browser.click(By.visibleText('001:WAGES - SALARY'))
		await browser.takeScreenshot()	
			
		})


    step('Step 10 - Enter budget fields - transfer amount  ', async browser => {
	
    //transfer amount
		const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewNewFrame'))
		let transferAmount = '#ValueTransfered'
		await frame1.type(transferAmount, numberRange(1000,35000).toString())


    //const triggerElement = By.css('#ValueTransfered')
    //await browser.click(triggerElement)
    //await browser.type(('1000'))
    await browser.takeScreenshot()	
            
    })


step('Step 10 - Submit to Mirvac for approval', async browser => {

	const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewButFrame'))
	let submitButton = '#titidMenu471575'
	await frame1.waitForSelector(submitButton)
	await frame1.click(submitButton)
	await browser.wait('45000ms') 


	//await browser.click(By.css('#idMenu271984'))
	await browser.takeScreenshot()	
	
})

}