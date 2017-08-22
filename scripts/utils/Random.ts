// https://gist.github.com/lsenta/15d7f6fcfc2987176b54
export class Random {
    private _seed: number;

    constructor(seed: number) {
        this._seed = seed;
    }

    private next(min: number, max: number): number {
        max = max || 0;
        min = min || 0;

        this._seed = (this._seed * 9301 + 49297) % 233280;
        let rnd: number = this._seed / 233281;

        return min + rnd * (max - min);
    }

    // http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    public nextInt(min: number, max: number): number {
        return Math.floor(this.next(min, max));
    }

    public nextDouble(): number {
        return this.next(0, 1);
    }

    public choice(collection: any[]): any {
        return collection[this.nextInt(0, collection.length - 1)];
    }
}