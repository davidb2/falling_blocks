class Board {
    private _rows: number;
    private _cols: number;
    private _playerPosition: [number, number];
    private _board: Block[][];

    constructor(
        rows: number, 
        cols: number, 
        playerPosition: [number, number]) {
        console.assert(
            rows > 0,
            'Number of rows must be a positive integer.'
        );

        console.assert(
            cols > 0, 
            'Number of columns must be a positive integer.'
        );

        this._rows = rows;
        this._cols = cols;
        this._playerPosition = playerPosition;

        this._board = [];
        for (let row: number = 0; row < rows; row++) {
            this._board[row] = [];
            for (let col: number = 0; col < cols; col++) {
                if ([row, col] === playerPosition) {
                    this._board[row][col] = new Player();
                } else {
                    this._board[row][col] = new Blank();
                }
            }
        }

    }

}