import { io, Socket } from "socket.io-client";
import { ResponseObject, Tracker } from "../src/types";
import * as readline from 'node:readline/promises';

const socket: Socket = io('http://localhost:3000');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let results: ResponseObject[] = [];
let expectedResultsCount: number = 0;
let query: string;
const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
)
let isPrompting = false;
let resultsTracker: Tracker = {}

socket.on('connect', () => {
    console.log("✓ Connected to Star Wars API\n");
    promptUserInput()
})

async function promptUserInput() {
    const input = await rl.question("\nEnter your character name (or 'exit' to quit): ");
    isPrompting = false
    query = input.trim();

    if (query.toLowerCase() === 'exit') {
        console.log('\nGoodbye')
        socket.disconnect()
        rl.close()
        process.exit()
    }
    if (query.length === 0) {
        console.log('\nPlease enter a character name\n')
        promptUserInput()
        return;
    }

    results = []
    expectedResultsCount = 0

    console.log(`\nSearching for ${query}`)

    socket.emit("search", { query })
}

socket.on("search", async (data: ResponseObject) => {
    if (data.page == -1 && data.error) {
        console.error("No results found", data.error)
        if (!isPrompting) {
            isPrompting = true
            promptUserInput()
        }
    }

    results.push(data)
    expectedResultsCount = data.resultCount

    process.stdout.write(`\nReceived ${results.length} of ${expectedResultsCount} results...`)

    if (data.page === expectedResultsCount) {
        console.log("\n\nAll results returned")
        try {
            await displayResults()
        } catch (e) {
            console.error(e)
        }
        if (!isPrompting) {
            isPrompting = true
            promptUserInput()
        }
    }

})

async function displayResults(): Promise<void> {
    console.log(`\nFound ${results.length} results for Query: ${query}`)

    for (let result of results) {
        await sleep(Math.floor(Math.random() * (1000 - 250 + 1)) + 250)
        let filmsString = result.films!.join(", ")
        console.log(`\n${result.name} appears in the films: ${filmsString}`)
    }
}

socket.on("connect_error", (error) => {
    console.error("Connection failed", error.message)
    process.exit(1)
})

socket.on("disconnect", () => {
    console.log("Disconnected from local server");
});
