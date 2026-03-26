import { io } from "socket.io-client";
const socket = io('http://localhost:3000');
import { ResponseObject, SearchQuery } from "../src/types";

socket.on("connect", () => {
    console.log("Connected to local server");
    console.log("Socket ID: ", socket.id);
});

socket.on("disconnect", () => {
    console.log("Disconnected from local server");
});


function performSearch(searchInput: SearchQuery) {
    socket.emit("search", searchInput)
}

function returnSearchQuery(query: string) {
    socket.on("search", (data: ResponseObject) => {
        // no results returned
        if (data.page == -1 && data.error) {
            console.error("No results found", data.error)
        }

        // got results back
        let dataPage = data.page;
        let dataResultCount = data.resultCount;
        let dataName = data.name
        let dataFilms = data.films?.join(", ")

        console.log(`\nPage ${dataPage} of Results for Query: ${query} \n\nReturned: ${dataName}\n${dataFilms}`)

        // all results received
        if (dataPage == dataResultCount) {
            console.log("\nAll Results Received")
        }
    });
}

socket.on('connect', () => {
    performSearch({ query: 'Luke' })
    returnSearchQuery('Luke')
})

socket.on('connect', () => {
    performSearch({ query: 'Darth' })
    returnSearchQuery('Darth')
})


/**


Page 1 of Results for Query: Darth Vader

Returned: A New Hope, The Empire Strikes Back, Return of the Jedi, Revenge of the Sith

Page 1 of Results for Query: Luke Skywalker

Returned: A New Hope, The Empire Strikes Back, Return of the Jedi, Revenge of the Sith

All Results Received

Page 2 of Results for Query: Darth Maul

Returned: The Phantom Menace

 */
