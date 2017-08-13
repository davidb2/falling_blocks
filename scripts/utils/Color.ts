class Color {
    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;
    private _hexString: string;
    private _rgbaString: string;

    private static _red: Color = new Color(0xf4, 0x43, 0x36);
    private static _orange: Color = new Color(0xff, 0x98, 0x00);
    private static _yellow: Color = new Color(0xff, 0xeb, 0x3b);
    private static _green: Color = new Color(0x4c, 0xaf, 0x50);
    private static _blue: Color = new Color(0x21, 0x96, 0xf3);
    private static _indigo: Color = new Color(0x3f, 0x51, 0xb5);
    private static _violet: Color = new Color(0x9c, 0x27, 0xb0);
    private static _white: Color = new Color(0xff, 0xff, 0xff);
    private static _black: Color = new Color(0x00, 0x00, 0x00);

    static get Red(): Color { return Color._red; }
    static get Orange(): Color { return Color._orange; }
    static get Yellow(): Color { return Color._yellow; }
    static get Green(): Color { return Color._green; }
    static get Blue(): Color { return Color._blue; }
    static get Indigo(): Color { return Color._indigo; }
    static get Violet(): Color { return Color._violet; }
    static get White(): Color { return Color._white; }
    static get Black(): Color { return Color._black; }

    constructor(r: number, g: number, b: number, a: number = 0xff) {
        [r, g, b, a].forEach(color => 
            console.assert(
                0 <= color && color <= 0xff,
                'Hues must be in the interval [0, 255].'
            )
        );
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;

        this._hexString = '#' + 
            [this._r, this._b, this._g]
                .map((c) => this.pad(c.toString(16)))
                .join('');
        
        this._rgbaString = 'rgba(' + 
            [this._r, this._b, this._g, this._a]
                .join() + ')';
    }

    public get hexString(): string {
        return this._hexString;
    }

    public get rgbaString(): string {
        return this._rgbaString;
    }

    private pad(num: string): string {
        return num.length === 2 ? num : '0' + num;
    }
}