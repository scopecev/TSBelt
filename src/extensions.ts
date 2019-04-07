Array.prototype.last = function<T>() : T {
    return this[this.length-1];
}

Array.prototype.groupBy =  function<T>(key:string) : T[][] {
    let me: T[] = this;
    let g = me.reduce( (group, current, []) => {
        group[current[key]] = group[current[key]] || [];
        group[current[key]].push(current);
        return group
    }, [] );
    return g;
}