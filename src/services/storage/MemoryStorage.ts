import {Service} from "@tsed/common";

@Service()
export class MemoryStorage {

    private states: Map<string, string> = new Map<string, string>();

    constructor() {

    }

    /**
     * Return the value stored.
     * @param key
     */
    public get<T>(key: string): T {
        var data = this.states.get(key);
        return typeof data === "string" ? JSON.parse(data) : data;
    }

    /**
     * Serialize value and store it.
     * @param key
     * @param value
     */
    public set = (key: string, value: any) => this.states.set(key, JSON.stringify(value));
}
