import { step, TestSettings, By, beforeAll, afterAll, Until, Key } from '@flood/element';
import assert from "assert";
import Constants from '../data/Constants';
import dataGeneration from '../data/dataGeneration';
import dataGeneration from '../data/dataGeneration';

	
	export const settings: TestSettings = {
		userAgent: 'flood-facto-test',
		waitUntil: 'visible',
		description: 'iTwoCX Contract ',
		screenshotOnFailure: true,
		disableCache: true,
		clearCache: true,
		clearCookies: true,
		actionDelay: 1.5,
		stepDelay: 2.5,
		browser: 'chromium', 
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
			await browser.visit(Constants.ALTURL)
			await browser.takeScreenshot()
		})
	
		step('Step 2 - Switch to outframe', async browser => {
			const target = await browser.switchTo()
			target.frame("outframe")
		})
	
		step('Step 3 - Log into iTwocx as a Contracts Admin', async browser => {
			
			//Find the element 
			const username = By.css('#nme')
			await browser.wait(Until.elementIsVisible(username))
			
			const password = By.css('#pwd')
			await browser.wait(Until.elementIsVisible(password))
			
			await browser.type(username, Constants.ITWOCXUSERNAME)
			await browser.type(password, Constants.ITWOCXPASSWORD)
	
			await browser.takeScreenshot()
	
			const loginButton = await browser.findElement(By.css('#commit > input'))
			await loginButton.click()
	
		})
		step('Step 4 -Navigate to A&C Construction Forms', async browser => {
		
			const mainTarget = await browser.switchTo()
			mainTarget.frame("outframe")
	
			const mainButtonFrame = await browser.switchTo()
			mainButtonFrame.frame("mainbuttonFrame")
			
			const contractAdmin = await browser.findElement(By.css('#divMain > nobr:nth-child(3) > ul > li > span > a'))
			await contractAdmin.click()
	
			await browser.takeScreenshot()
				
			//Select A&CFORMS
			const listTarget = await browser.switchTo()
			listTarget.frame("DocRegRegFrame")
	
			const acforms = await browser.findElement(By.css('#registerItems > tbody > tr:nth-child(3) > td:nth-child(2) > a'))
			await acforms.click()
	
			await browser.takeScreenshot()
		})

		step('Step 5 - Select CTRA&C', async browser => {
		
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocRegRegFrame'))
			let title = '//*[@id="registerItems"]/tbody/tr[3]/td[2]/a'
			await frame1.waitForSelector(title)
			await frame1.hover(title)
			await frame1.click(title)
		})	

		step('Step 6 - Show subcontract List', async browser => {
		
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocRegRegFrame'))
			let subcontractList = '//*[@id="registerItems"]/tbody/tr[4]/td[2]/a'
			await frame1.waitForSelector(subcontractList)
			await frame1.hover(subcontractList)
			await frame1.click(subcontractList)
		})

		/*
		Assume that out environment is AUTO APPROVAL
		We will select the first subcontract that has a state of APPROVED - ISSUED. 
		*/
		step('Step 7 - Select APPROVED subcontract and create subcontract variation', async browser => {
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocRegRegFrame'))
			let subcontract = '#GridReport_1502395747 > div.k-grid-content.k-auto-scrollable.exclude-footer > table > tbody > tr:nth-child(17)'
			await frame1.waitForSelector(subcontract)
			await frame1.click(subcontract)

			let subcontractVariation = '#titidMenu120'
			await frame1.waitForSelector(subcontractVariation)
			await frame1.click(subcontractVariation)
		})

		step('Step 10 - Create subcontractor variation for: CTRC: AP-10169#0007 ', async browser => {
			
			await browser.visit(Constants.CONTRACTVARIATIONFORM)
			await browser.takeScreenshot()	
		})

		step('Step 11 - Enter Title', async browser => {
			
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
			let title = '#tt'
			await frame1.waitForSelector(title)
			await frame1.type(title, 'Flood Test - ' + dataGeneration.randomNumber)
			await browser.takeScreenshot()
			
		})

		step('Step 12 - Change the Due Date', async browser => {
		
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
			
			let  dueDate = '#dueDate > img'
			await frame1.waitForSelector(dueDate)
			await frame1.click(dueDate)
	
			let chooseDate = '#cal_content > table > tbody > tr:nth-child(5) > td:nth-child(6) > a'
			await frame1.waitForSelector(chooseDate)
			await frame1.click(chooseDate) 
	
			await browser.takeScreenshot()
		})	

		step('Step 13 - Fill in Description of Variation', async browser => {
			
			const signature = `
			L         OOO        L
			L        O   O       L
			L        O   O       L
			L        O   O       L
			L        O   O       L
			LLLLL     OOO        LLLLL   			
			`

			const frame1 = browser.page.frames().find((frame) => frame.name().includes('USR_VARDES_ifr'))
			
			let descriptionBox = '//*[@id="tinymce"]'
			await frame1.waitForSelector(descriptionBox)
			await frame1.type(descriptionBox, 'The script is written by @Duy. :)')
			await browser.sendKeys(Key.ENTER)
			await frame1.type(descriptionBox, signature)	
			await browser.takeScreenshot()
		})

		step('Step 14 - Selection of Dropdown Menu Options', async browser => {
			
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))	
			
			let variationImpactButton = '//*[@id="DT912SPN"]/div/table/tbody/tr'
			await frame1.waitForSelector(variationImpactButton)
			await frame1.click(variationImpactButton)
			await browser.sendKeys(Key.DOWN)
			await browser.sendKeys(Key.ENTER)

			let warrantiesImpactedButton = '//*[@id="DT914SPN"]/div/table/tbody/tr'
			await frame1.waitForSelector(warrantiesImpactedButton)
			await frame1.click(warrantiesImpactedButton)
			await browser.sendKeys(Key.DOWN)
			await browser.sendKeys(Key.ENTER)

			let substantialImpactedButton = '//*[@id="DT916SPN"]/div/table/tbody/tr'
			await frame1.waitForSelector(substantialImpactedButton)
			await frame1.click(substantialImpactedButton)
			await browser.sendKeys(Key.DOWN)
			await browser.sendKeys(Key.ENTER)

			let scheduleRateButton = '//*[@id="DT918SPN"]/div/table/tbody/tr'
			await frame1.waitForSelector(scheduleRateButton)
			await frame1?.click(scheduleRateButton)
			await browser.sendKeys(Key.DOWN)
			await browser.sendKeys(Key.ENTER)

			await browser.takeScreenshot()
		})
		
		step('Step 15 - Select Budget Line', async browser => {
			
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
			let arrowList = '//*[@id="tr.001"]/td[10]/span/span/span[2]'
			await frame1.waitForSelector(arrowList)
			await frame1.click(arrowList)
			await browser.sendKeys(Key.DOWN)
			await browser.sendKeys(Key.ENTER)
		})

		step('Step 10 - Set Rate', async browser => {
			
			const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocNewNewFrame'))
			
			let rate = '//*[@id="tr.001"]/td[14]'
			await frame1.waitForSelector(rate)
			await frame1.click(rate)

			let inputForm = '//*[@id="caEditTable"]/tbody/tr/td/table/tbody/tr[2]/td[6]/input'
			await frame1.waitForSelector(inputForm)
			await frame1.type(inputForm, dataGeneration.randomNumber.toString())

			let insertButton = '//*[@id="rowsEditor"]/tbody/tr/td[2]/input[2]'
			await frame1.waitForSelector(insertButton)
			await frame1.click(insertButton)

			await browser.takeScreenshot()
		})

		step('Step 11 - Submit for Approval', async browser => {
	
			const frame1 = browser.page.frames().find((frame ) => frame.name().includes('DocNewButFrame'))
			let submitButton = '#idMenu271958'
			await frame1.waitForSelector(submitButton)
			await frame1.click(submitButton)
			
			await browser.wait('8000ms') //Wait for 8 seconds for the result to appear

			await browser.takeScreenshot()
			})
}


