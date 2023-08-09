import {
    step,
    TestSettings,
    By,
    beforeAll,
    afterAll,
    Until,
    Key,
  } from "@flood/element";
  import assert from "assert";
  import Constants from "../data/Constants";
  import * as fs from "fs";
  
  //Add to PT scripts
  step("Step 1 - Rip value from form", async (browser) => {
    const title = await browser.findElement(By.css("#tt"));
    await title.text("TEXTVALUE");
    await browser.takeScreenshot();
    // Export the value to a JSON file
    
    const jsonValue = { value: title };
    const jsonFileName = "results.json";
    await browser.writeTextFile(jsonFileName, JSON.stringify(jsonValue));
    console.log(`Value exported to ${jsonFileName}`);
    await browser.takeScreenshot();
    step("Step 2 - Read existing data", async (browser) => {
    // Read existing JSON data
    let jsonData = [jsonValue];
    try {
      jsonData = JSON.parse(fs.readFileSync("results.json", "utf-8"));
    } catch (error) {
      console.log("JSON file not found.");
    }
    step("Step 3 - Append value in file", async (browser) => {
    // Append the new value to the existing JSON data
    jsonData.push(jsonValue);
    step("Step 4 - Write data back to file", async (browser) => {
    // Write the updated JSON data back to the file
    fs.writeFileSync("results.json", JSON.stringify(jsonData, null, 2));
    console.log(`Value appended to results.json`);
    await browser.takeScreenshot();
