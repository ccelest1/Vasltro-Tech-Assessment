interface ResponseObject {
    page: number,
    resultCount: number;
    name: string;
    films: Array<string>
}
interface ErrorObject {
    page: number,
    resultCount: number,
    error: string
}
function isError(data: ResponseObject | ErrorObject): data is ErrorObject{
    return data.page === -1
}

export { ResponseObject, ErrorObject, isError };
