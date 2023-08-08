
//Add to PT scripts
step('Step 1 - Rip value from form', async browser => {

    const title = await browser.findElement(By.css('#tt'))
    await title.text('TEXTVALUE')
    await browser.takeScreenshot()	

// Export the value to a JSON file 
  const jsonValue = { value: title }; 
  const jsonFileName = 'results.json'; 
  await browser.writeTextFile(jsonFileName, JSON.stringify(jsonValue)); 
  console.log(`Value exported to ${jsonFileName}`); 
  await browser.takeScreenshot()
}); 