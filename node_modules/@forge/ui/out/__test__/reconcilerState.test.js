"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reconcilerState_1 = require("../reconcilerState");
describe('ReconcilerState', () => {
    let reconcilerState = new reconcilerState_1.ReconcilerState();
    beforeEach(() => (reconcilerState = new reconcilerState_1.ReconcilerState()));
    describe('state variables', () => {
        it('should throw an error when trying to access an undefined wipFiber', () => {
            expect(() => reconcilerState.wipFiber).toThrowError();
        });
        it('should throw an error when trying to access an undefined currentEffect', () => {
            expect(() => reconcilerState.currentEffect).toThrowError();
        });
        it('should throw an error when trying to access undefined previousState', () => {
            expect(() => reconcilerState.previousState).toThrowError();
        });
    });
    describe('side effects queue', () => {
        const effect = {
            componentKey: '',
            hookIndex: 0,
            type: 'action'
        };
        const otherEffect = { ...effect, hookIndex: 1 };
        it('should throw an error when trying to enqueue side effects if the queue has not been enabled', () => {
            expect(() => reconcilerState.enqueueSideEffectIfEnabled({})).toThrowError();
        });
        it('should enqueue an effect if the queue is enabled', () => {
            reconcilerState.enableSideEffectsQueue();
            reconcilerState.enqueueSideEffectIfEnabled(effect);
            expect(reconcilerState.queuedSideEffects).toEqual([effect]);
        });
        it('should return the queued effects in the correct order', () => {
            reconcilerState.enableSideEffectsQueue();
            reconcilerState.enqueueSideEffectIfEnabled(effect);
            reconcilerState.enqueueSideEffectIfEnabled(otherEffect);
            expect(reconcilerState.queuedSideEffects).toEqual([effect, otherEffect]);
        });
        it('should clear the side effects queue', () => {
            reconcilerState.enableSideEffectsQueue();
            reconcilerState.enqueueSideEffectIfEnabled(effect);
            expect(reconcilerState.queuedSideEffects).toEqual([effect]);
            reconcilerState.clearSideEffectsQueue();
            expect(reconcilerState.queuedSideEffects).toEqual([]);
        });
    });
});
