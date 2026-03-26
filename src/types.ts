interface ResponseObject {
    page: number,
    resultCount: number;
    name?: string;
    films?: Array<string>
    error?: string
}

interface SearchQuery {
    query: string
}

export { ResponseObject, SearchQuery };
