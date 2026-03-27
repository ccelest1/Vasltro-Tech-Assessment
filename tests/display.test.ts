import { describe, it, expect, vi } from 'vitest'
import { displayResults } from '../src/utils/display'
import { ResponseObject } from '../src/types'

describe('displayResults', () => {
    it('should display single result', async () => {
        const consoleSpy = vi.spyOn(console, 'log')
        const mockResults = [{
            name: 'Luke Skywalker',
            films: ['A New Hope']
        }] as ResponseObject[]
        await displayResults(mockResults, 'luke')
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('1 results'))
    })
    it('should display multiple results', async () => {
        const consoleSpy = vi.spyOn(console, 'log')
        const mockResults = [{
            name: 'Darth Vader',
            films: [
                'A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'Revenge of the Sith'
            ]
        }, {
            name: 'Darth Maul',
            films: [
                'The Phantom Menace'
            ]
        }] as ResponseObject[]
        await displayResults(mockResults, 'darth')
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('2 results'))
    })

    it('should filter results without films', async () => {
        const consoleSpy = vi.spyOn(console, 'log')
        const mockResults = [
            { name: 'Luke Skywalker', films: ['A New Hope'] },
            { name: 'No Film Character', films: undefined }
        ] as ResponseObject[]
        await displayResults(mockResults, 'luke')
        expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('No Film Character'))
    })

    it('should handle zero results', async () => {
        const consoleSpy = vi.spyOn(console, 'log')
        await displayResults([], 'wrwerewrwe')
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('0 results'))
    })
})
