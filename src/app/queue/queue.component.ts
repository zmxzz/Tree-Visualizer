import { element } from "@angular/core/src/render3";

export class Queue<T> {
    elements: T[] = [];

    public push(val: T) {
        this.elements.push(val);
    }

    public pop(): T | null {
        return this.elements.length === 0 ? null : this.elements.shift();
    }

    public size(): number {
        return this.elements.length;
    }
}