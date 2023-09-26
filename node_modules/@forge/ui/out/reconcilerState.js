"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReconcilerState = void 0;
class ReconcilerState {
    constructor() {
        this._queueEnabled = false;
        this._queuedSideEffects = [];
        this._productContext = {};
        this._config = undefined;
    }
    get wipFiber() {
        if (!this._wipFiber) {
            throw new Error('cannot use a hook outside of a component');
        }
        return this._wipFiber;
    }
    set wipFiber(fiber) {
        this._wipFiber = fiber;
    }
    clearWipFiber() {
        this._wipFiber = undefined;
    }
    get currentEffect() {
        if (!this._currentEffect) {
            throw new Error('this hook cannot run outside of an effect');
        }
        return this._currentEffect;
    }
    set currentEffect(effect) {
        this._currentEffect = effect;
    }
    get previousState() {
        if (!this._previousState) {
            throw new Error('action effects must be run with previous state');
        }
        return this._previousState;
    }
    set previousState(state) {
        this._previousState = state;
    }
    get productContext() {
        return this._productContext;
    }
    set productContext(context) {
        this._productContext = context;
    }
    get config() {
        return this._config;
    }
    set config(config) {
        this._config = config;
    }
    get queuedSideEffects() {
        return this._queuedSideEffects;
    }
    clearSideEffectsQueue() {
        this._queuedSideEffects = [];
    }
    enableSideEffectsQueue() {
        this._queueEnabled = true;
    }
    disableSideEffectsQueue() {
        this._queueEnabled = false;
    }
    enqueueSideEffectIfEnabled(effect) {
        if (!this._queueEnabled) {
            throw new Error('dispatch must be called inside of an event handler or within the function arguments of useAction, useState or useContentProperty');
        }
        this._queuedSideEffects.push(effect);
    }
}
exports.ReconcilerState = ReconcilerState;
exports.default = new ReconcilerState();
