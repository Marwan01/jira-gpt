import { FunctionFiber } from './reconcile';
import { ProductContext, RenderState, LegacyActionEffect, ExtensionConfiguration } from './types';
import { Effect, ChangeEffect } from './backend-runtime';
declare type SideEffect = LegacyActionEffect | ChangeEffect;
export declare class ReconcilerState {
    private _wipFiber?;
    private _currentEffect?;
    private _previousState?;
    private _queueEnabled;
    private _queuedSideEffects;
    private _productContext;
    private _config?;
    get wipFiber(): FunctionFiber;
    set wipFiber(fiber: FunctionFiber);
    clearWipFiber(): void;
    get currentEffect(): Effect;
    set currentEffect(effect: Effect);
    get previousState(): RenderState;
    set previousState(state: RenderState);
    get productContext(): ProductContext;
    set productContext(context: ProductContext);
    get config(): ExtensionConfiguration | undefined;
    set config(config: ExtensionConfiguration | undefined);
    get queuedSideEffects(): SideEffect[];
    clearSideEffectsQueue(): void;
    enableSideEffectsQueue(): void;
    disableSideEffectsQueue(): void;
    enqueueSideEffectIfEnabled(effect: SideEffect): void;
}
declare const _default: ReconcilerState;
export default _default;
//# sourceMappingURL=reconcilerState.d.ts.map