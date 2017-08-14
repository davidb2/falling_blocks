import { Board } from './Board';
import { Block } from "./blocks/Block";
import { Player } from "./blocks/Player";
import { Blank } from "./blocks/Blank";
import { Obstacle } from "./blocks/Obstacle";

export class Game {
    private readonly _rows: number;
    private readonly _cols: number;
    private readonly _board: Board;

    constructor(rows: number, cols: number) {
        this._rows = rows;
        this._cols = cols;
        this._board = new Board(rows, cols, [rows - 1, Math.floor(cols / 2)]);
    }

    public movePlayerLeft() {
        if (this.board.playerPosition !== null && this.board.playerPosition[1] > 0) {
            this.board.board[this.board.rows - 1][this.board.playerPosition[1]] = new Blank();
            if (this.board.board[this.board.rows - 1][this.board.playerPosition[1] - 1] instanceof Obstacle) {
                // Player has crashed into an obstacle.
                this.board.playerPosition = null;
            } else if (this.board.board[this.board.rows - 1][this.board.playerPosition[1] - 1] instanceof Blank) {
                // Player has made a safe move.
                this.board.board[this.board.rows - 1][this.board.playerPosition[1] - 1] = new Player();
                this.board.playerPosition = [this.board.playerPosition[0], this.board.playerPosition[1] - 1];
            } else {
                console.error('Impossible state: Player has run into another player.');
            }
        }
    }

    public movePlayerRight() {
        if (this.board.playerPosition !== null && this.board.playerPosition[1] < this.board.cols - 1) {
            this.board.board[this.board.rows - 1][this.board.playerPosition[1]] = new Blank();
            if (this.board.board[this.board.rows - 1][this.board.playerPosition[1] + 1] instanceof Obstacle) {
                // Player has crashed into an obstacle.
                this.board.playerPosition = null;
            } else if (this.board.board[this.board.rows - 1][this.board.playerPosition[1] + 1] instanceof Blank) {
                // Player has made a safe move.
                this.board.board[this.board.rows - 1][this.board.playerPosition[1] + 1] = new Player();
                this.board.playerPosition = [this.board.playerPosition[0], this.board.playerPosition[1] + 1];
            } else {
                console.error('Impossible state: Player has run into another player.');
            }
        }
    }

    get playerIsAlive(): boolean { return this.board.playerPosition !== null; }

    get rows(): number { return this._rows; }

    get cols(): number { return this._cols; }

    get board(): Board { return this._board; }
}