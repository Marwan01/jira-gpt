import { ForgeDoc, ForgeElement, RenderState, JsxTextProps, FunctionElement, PrimitiveElement } from './types';
interface Hook {
    type: 'async' | 'action' | 'changeEffect';
    value: any;
}
export declare type AuxFiber<P = {
    [p: string]: any;
}> = FunctionFiber<P> | PrimitiveFiber<P> | TextFiber;
export interface PrimitiveFiber<P = {
    [p: string]: any;
}> {
    type: 'primitive';
    children: AuxFiber[];
    element: PrimitiveElement<P>;
    key: string;
}
export interface FunctionFiber<P = {
    [p: string]: any;
}> {
    type: 'function';
    children: AuxFiber[];
    element: FunctionElement<P>;
    hooks: Hook[];
    currentHookIndex: number;
    key: string;
}
export interface TextFiber {
    type: 'text';
    children: AuxFiber[];
    text: string;
}
export declare const isTextElement: (element: ForgeElement<any>) => element is ForgeElement<JsxTextProps>;
export declare const processAuxElement: (element: ForgeElement) => Promise<AuxFiber>;
export declare const getAuxFromFiber: (fiber: AuxFiber) => ForgeDoc[];
export declare const getStateFromFiber: <P>(fiber: AuxFiber<P>) => RenderState;
export {};
//# sourceMappingURL=reconcile.d.ts.map