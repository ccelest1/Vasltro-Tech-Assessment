interface ResponseObject {
    page: number,
    resultCount: number;
    name?: string;
    films?: Array<string>
    error?: string
}

interface Tracker {
    name?: Array<string>
}

export { ResponseObject, Tracker };
