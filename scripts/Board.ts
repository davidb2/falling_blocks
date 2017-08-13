class Board {
    private _rows: number;
    private _cols: number;
    private _playerPosition: [number, number];
    private _board: Block[][];

    constructor(rows: number, cols: number, playerPosition: [number, number]) {
        console.assert(
            rows > 0,
            'Number of rows must be a positive integer.'
        );

        console.assert(
            cols > 0, 
            'Number of columns must be a positive integer.'
        );

        console.assert(
            0 <= playerPosition[0] && playerPosition[0] < rows,
            'Player row position must be a non-negative integer less than the number of rows on the board.'
        );

        console.assert(
            0 <= playerPosition[1] && playerPosition[1] < cols,
            'Player column position must be a non-negative integer less than the number of columns on the board.'
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

    get rows(): number { return this._rows; }

    get cols(): number { return this._cols; }

    get playerPosition(): [number, number] { return this._playerPosition; }

    get board(): Block[][] { return this._board; }

    public movePlayerLeft() {
        if (this._playerPosition[1] > 0) {
            this._board[this._board.length - 1][this._playerPosition[1]] = new Blank();
            if (this._board[this._board.length - 1][this._playerPosition[1] - 1] instanceof Obstacle) {
                // Player has crashed into an obstacle.
                this._playerPosition = null;
            } else if (this._board[this._board.length - 1][this._playerPosition[1] - 1] instanceof Blank) {
                // Player has made a safe move.
                this._board[this._board.length - 1][this._playerPosition[1] - 1] = new Player();
                this._playerPosition = [this._playerPosition[0], this._playerPosition[1] - 1];
            } else {
                console.error('Impossible state: Player has run into another player.');
            }
        }
    }

    public movePlayerRight() {
        if (this._playerPosition[1] < this._cols - 1) {
            this._board[this._board.length - 1][this._playerPosition[1]] = new Blank();
            if (this._board[this._board.length - 1][this._playerPosition[1] + 1] instanceof Obstacle) {
                // Player has crashed into an obstacle.
                this._playerPosition = null;
            } else if (this._board[this._board.length - 1][this._playerPosition[1] + 1] instanceof Blank) {
                // Player has made a safe move.
                this._board[this._board.length - 1][this._playerPosition[1] + 1] = new Player();
                this._playerPosition = [this._playerPosition[0], this._playerPosition[1] + 1];
            } else {
                console.error('Impossible state: Player has run into another player.');
            }
        }
    }
}