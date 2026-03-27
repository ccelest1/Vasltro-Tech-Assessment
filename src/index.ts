import { ResponseObject, ErrorObject, isError } from "../src/types";
import * as readline from 'node:readline/promises';
import { isValidQuery } from "./utils/validation";
import { displayResults } from "./utils/display";
import { socket, socketSetup } from "./utils/socket";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let results: ResponseObject[] = [];
let expectedResultsCount: number = 0;
let input: string;
let isPrompting: boolean = false;
let isExiting: boolean = false;

socketSetup(promptUserInput)

async function promptUserInput() {
    input = await rl.question("\nEnter your character name (or 'exit' to quit): ");
    isPrompting = false

    const queryReturn = isValidQuery(input)

    switch (queryReturn) {
        case 'exit':
            isExiting = true
            console.log('\nGoodbye')
            rl.removeAllListeners()
            rl.close()
            socket.off()
            socket.disconnect()
            break;
        case '0-length':
            console.log('\nPlease enter a character name\n')
            promptUserInput()
            return;
        case 'non-valid-chars':
            console.log('\nPlease enter a valid character name\n')
            promptUserInput()
            return;
        default:
            results = []
            expectedResultsCount = 0
            console.log(`\nSearching for ${input}`)
            socket.emit("search", { query: queryReturn })
    }
}

socket.on("search", async (data: ResponseObject | ErrorObject) => {
    if (isExiting) return;
    if (isError(data)) {
        console.log(`\nNo matches found for query: ${input}\nPlease try a different name.`)
        if (!isPrompting) {
            isPrompting = true
            promptUserInput()
        }
    } else {
        results.push(data)
        expectedResultsCount = data.resultCount
        process.stdout.write(`\nReceived ${results.length} of ${expectedResultsCount} results...`)

        if (data.page === expectedResultsCount) {
            console.log("\n\nAll results returned")
            try {
                await displayResults(results, input)
            } catch (e) {
                console.error('An error occurred:', e)
                console.log('Please try a different entry!')
                isPrompting = true
                promptUserInput()
            }
            if (!isPrompting) {
                isPrompting = true
                promptUserInput()
            }
        }
    }
})
