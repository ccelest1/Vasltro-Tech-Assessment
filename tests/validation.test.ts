import {
    describe,
    it,
    expect
} from 'vitest'
import { isValidQuery } from '../src/utils/validation'

describe('isValidQuery', () => {
    it('should reject empty input', () => {
        expect(isValidQuery("")).toBe('0-length')
    })
    it('should reject whitespace only', () => {
        expect(isValidQuery("   ")).toBe('0-length')
    })
    it('should reject special characters', () => {
        expect(isValidQuery("#")).toBe('non-valid-chars')
        expect(isValidQuery("$")).toBe('non-valid-chars')
    })
    it('should return exit', () => {
        expect(isValidQuery("exit")).toBe('exit')
        expect(isValidQuery("EXIT")).toBe('exit')
    })
    it('should return sanitized query for valid input', () => {
        expect(isValidQuery("Luke")).toBe('luke')
        expect(isValidQuery("R2-D2")).toBe('r2-d2')
        expect(isValidQuery("Obi-Wan Kenobi")).toBe('obi-wan kenobi')
        expect(isValidQuery("'s")).toBe('s')
    })
    it('should return sanitized partial match', () => {
        expect(isValidQuery("dar")).toBe('dar')
    })
})
