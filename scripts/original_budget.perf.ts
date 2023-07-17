import { step, TestSettings, By, beforeAll, afterAll } from '@flood/element';
import assert from "assert";
import Constants from '../data/Constants';
//import DataGeneration from '../data/DataGeneration';
import {numberRange} from '../data/random.js';

export const settings: TestSettings = {
	userAgent: 'flood-facto-test',
	waitUntil: 'visible',
	description: 'iTwoCX Original Budget',
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

    step('Step 1 - Load URL', async browser =>{
        await browser.visit(Constants.URL)
        await browser.takeScreenshot()
    })

    step('Step 2 - Switch to outframe', async browser => {
		const target = await browser.switchTo()
		target.frame("outframe")
	})

    step('Step 3 - Login', async browser => {
		
		const login = await browser.findElement(By.css('#nme'))
		await login.type(Constants.ITWOCXLOGIN)

		const password = await browser.findElement(By.css('#pwd'))
		await password.type(Constants.ITWOPASS)

		await browser.takeScreenshot()

		const loginButton = await browser.findElement(By.css('#commit > input'))
		await login.click()
	})

    step('Step 4 - Click "new" menu', async browser => {

        const projectFrame = await browser.switchTo()
        projectFrame.frame("projectBar")

        const plusButton = await browser.findElement(By.css('#img > img'))
        plusButton.click()

    })

    step('Step 5 - Navigate to new construction budget', async browser => {
        await browser.takeScreenshot()
        
        const formFrame = await browser.switchTo()
        formFrame.frame("newFormSection")

        const budgetVariation = await browser.findElement(By.css("#createAnotherPartialView > div > div:nth-child(3) > a > div > img"))
        budgetVariation.click()


    })
}