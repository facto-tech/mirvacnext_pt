import { step, TestSettings, By, beforeAll, afterAll, Until, Browser } from '@flood/element';
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
	browser: 'firefox', 
	loopCount: 1, //remove this before publishing to PT run
}

export default () => {
	
	beforeAll(async browser => {
		await browser.wait('1500ms')
	})

	afterAll(async browser => {
		await browser.wait('1500ms')
	})

	step('Step 1 - Load URL', async browser => {
		await browser.visit('https://mirvac.itwocx.com/cxR/cx.aspx?page=Docs/docnew2tree&j=MIRVAC_AC_TMP_03&dsid=67349&mdu=CTR&t=67349&m=&i=&transID=&reportId=&due=')
		await browser.takeScreenshot()
	})

	//use a different var name each time switching frames even if the frame ID is the same
	//this will help with triage if something goes wrong or an identifier cannot be located

    step('Step 2 - Switch to outframe', async browser => {
		const target = await browser.switchTo()
        target.frame("DocNewNewFrame")
	})

    step('Step 3 - Log into iTwocx as a Contracts Administrator', async browser => {
		
        //Find the element 
        const username = By.css('#tt')
        await browser.wait(Until.elementIsVisible(username))
    
        
        await browser.type(username, Constants.ITWOCXUSERNAME)

        await browser.takeScreenshot()
	})
}
