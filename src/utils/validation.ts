function isValidQuery(input: string): string {
    const query = input.trim().toLowerCase().replace(
        /^'+/, ''
    )
    if (query === 'exit') return 'exit'
    if (query.length === 0) return '0-length'
    const testQuery = /^[a-z0-9\s\-'\.]+$/i.test(query)
    if (
        !testQuery
    ) {
        return 'non-valid-chars'
    }
    return query
}

export {
    isValidQuery
}
