import { ResponseObject } from "../types"

const sleep = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms)
)

async function displayResults(results: Array<ResponseObject>, input: string): Promise<void> {
    console.log(`\nFound ${results.length} results for Query: ${input}`)
    const filteredResults = results.filter(result => result.films)
    for (let result of filteredResults) {
        await sleep(Math.floor(Math.random() * (1000 - 250 + 1)) + 250)
        console.log(`\n${result.name} appears in the films:\n`)
        result.films?.forEach((film) => {
            console.log(film)
        })
    }
}

export {
    displayResults
}
