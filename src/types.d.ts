interface Array<T> {
    last: () => T;
    groupBy: (key: string) => T[][];
}