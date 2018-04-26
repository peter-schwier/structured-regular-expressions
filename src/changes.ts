
export interface Change { }
export class Print implements Change {
    constructor(public readonly text: string) { }
}
export class Insert implements Change {
    constructor(public readonly position: number, public readonly text: string) { }
}
