import { step, TestSettings, By, beforeAll, afterAll, Until, Mouse, Key } from '@flood/element';
import assert from "assert";
import Constants from '../data/Constants';

	
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
			
			await browser.type(username, Constants.TESTUSERNAME)
			await browser.type(password, Constants.TESTPASSWORD)
	
			await browser.takeScreenshot()
	
			const loginButton = await browser.findElement(By.css('#commit > input'))
			await loginButton.click()
	
		})

		step('Step 4 - Click on Contact Admin', async browser => {
			const mainTarget = await browser.switchTo()
			mainTarget.frame("outframe")
	
			const mainButtonFrame = await browser.switchTo()
			mainButtonFrame.frame("mainbuttonFrame")
			
			const contractAdmin = await browser.findElement(By.css('#divMain > nobr:nth-child(3) > ul > li > span > a'))
			await contractAdmin.click()
	
			const newFrame = await browser.switchTo()
			await newFrame.frame("DocRegRegFrame")

			const acfroms = await browser.findElement(By.css('//*[@id="registerItems"]/tbody/tr[3]/td[2]/a'))
			await acfroms.click()
		})

	}


