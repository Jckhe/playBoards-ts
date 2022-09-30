import { SetStateAction, Dispatch } from "react";
declare type ReadOnlyRefObject<T> = {
    readonly current: T;
};
declare type UseStateRef = {
    <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, ReadOnlyRefObject<S>];
    <S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>, ReadOnlyRefObject<S | undefined>];
};
declare const useStateRef: UseStateRef;
export = useStateRef;
