//add to PT scripts w/ relevant element/selector values based on script function. 
})

// Define global variables
type JsonValueType = {
  value: string;
};

let jsonValue: JsonValueType = { value: "" }; // only store referenceID
let jsonData: JsonValueType[] = []; // hold array of data

step('Step 13 - Rip referenceID', async browser => {
    const frame1 = browser.page.frames().find((frame) => frame.name().includes('DocDetDetFrame'));
    let referenceID = '#pcr_mRef > span';
    const title = await frame1.waitForSelector(referenceID);
    const textValue = String(await title.textContent());
    await browser.takeScreenshot();

    // Assign value to the global variable
    jsonValue = { value: textValue };
    const jsonFileName = "results.json";
    fs.writeFileSync(jsonFileName, JSON.stringify(jsonValue));
    console.log(`Value exported to ${jsonFileName}`);
    await browser.takeScreenshot();
});

step("Step 14 - Read and Append Data", async (browser) => {
    // Try to read the existing data from the file
    try {
        const dataFromFile = JSON.parse(fs.readFileSync("results.json", "utf-8"));
        
        // Check if the data is an array
        if (Array.isArray(dataFromFile)) {
            jsonData = dataFromFile;
        } else {
            console.log("Error: Data from results.json is not an array. Using default value.");
            jsonData = [];
        }
    } catch (error) {
        console.log("JSON file not found or other error reading the file.");
        jsonData = [];  // Default to an empty array if there's an issue with the file
    }

    // Append the current jsonValue to jsonData
    jsonData.push(jsonValue);
});


step("Step 15 - Write data back to file", async (browser) => {
    // Write the updated data back to the file
    fs.writeFileSync("results.json", JSON.stringify(jsonData, null, 2));
    console.log(`Value appended to results.json`);
    await browser.takeScreenshot();
});

	};