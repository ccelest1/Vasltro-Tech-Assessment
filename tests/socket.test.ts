import { describe, it, expect, vi } from 'vitest'
import { socketSetup } from '../src/utils/socket'

vi.mock('socket.io-client', () => {
    // i don't get it, guess its mocking all function that socket can do
    const socket = {
        on: vi.fn(),
        off: vi.fn(),
        connect: vi.fn(),
        disconnect: vi.fn(),
        emit: vi.fn()
    }
    return {
        io: vi.fn(() => socket)
    }
})

import { io } from 'socket.io-client'
import { beforeEach } from 'node:test'
const mockSocket = io()
describe('socketSetup', async () => {
    it('should call onConnect when connect fires', () => {
        const onConnect = vi.fn()
        socketSetup(onConnect)

        // grab the connect handler that was registered and invoke it

        const socket = io()
        const connectHandler = (mockSocket.on as ReturnType<typeof vi.fn>).mock.calls.find(([event]) => event === 'connect')?.[1]
        connectHandler?.()

        expect(onConnect).toHaveBeenCalledOnce()
    })
    beforeEach(() => {
        vi.clearAllMocks()
        socketSetup(vi.fn())
    })
    it('should call process.exit on connect_error', () => {
        const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
        const errorHandler = (mockSocket.on as ReturnType<typeof vi.fn>).mock.calls.find(([event]) => event === 'connect_error')?.[1]
        errorHandler?.(new Error('failed'))

        expect(exitSpy).toHaveBeenCalledWith(1)
    })
    it('should emit search with sanitized query', () => {
        socketSetup(vi.fn())
        const emitSpy = (mockSocket.emit as ReturnType<typeof vi.fn>)
        mockSocket.emit('search', {
            query: 'luke'
        })
        expect(emitSpy).toHaveBeenCalledWith('search', {
            query: 'luke'
        })
    })
    it('should disconnect cleanly on exit', () => {
        socketSetup(vi.fn())
        mockSocket.disconnect()
        expect((mockSocket.disconnect as ReturnType<typeof vi.fn>)).toHaveBeenCalledOnce()
    })
})
