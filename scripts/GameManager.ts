import { Game } from './Game'
import { Color } from './utils/Color'
import { Obstacle } from './blocks/Obstacle'
import { Blank } from './blocks/Blank'
import { Player } from './blocks/Player'

export class GameManager {
    private readonly _canvasElement: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _game: Game;
    private _score: number;  

    constructor(canvasElement: HTMLCanvasElement, rows: number, cols: number) {
        this._canvasElement = canvasElement;
        this._context = canvasElement.getContext('2d');
        this._game = new Game(rows, cols);
        this.score = 0;
    }

    public play() {
        this.draw();
        let id: number = setInterval(() => 
            {
                this.draw();
                if (!this.game.playerIsAlive) {
                    clearInterval(id);
                }

                if (this.score % 15 == 0) {
                    this.moveDown();
                }
                if (this.score % 60 == 0) {
                    this.addObstacles();
                }
                this.score++;
            }, 10);
    }

    private addObstacles() {
        for (let col: number = 0; col < this.game.cols; col++) {
            if (Math.random() < 0.5) {
                this.game.board.board[0][col] = new Obstacle();
            }
        }
    }

    private moveDown() {
        for (let row: number = this.game.rows - 2; row >= 0; row--) {
            for (let col: number = 0; col < this.game.cols; col++) {
                if (this.game.board.board[row][col] instanceof Obstacle && 
                    this.game.board.board[row + 1][col] instanceof Player) {
                    this.game.board.playerPosition = null;
                    this.game.board.board[row + 1][col] = this.game.board.board[row][col];
                } else if (!(this.game.board.board[row][col] instanceof Blank &&
                            this.game.board.board[row + 1][col] instanceof Player)) {
                    this.game.board.board[row + 1][col] = this.game.board.board[row][col];
                }
            }
        }
        for (let col: number = 0; col < this.game.cols; col++) {
            this.game.board.board[0][col] = new Blank();
        }
    }

    private draw() {
        let width: number = this.canvasElement.width / this.game.cols;
        let height: number = this.canvasElement.height / this.game.rows;
        for (let row: number = 0; row < this.game.rows; row++) {
            for (let col: number = 0; col < this.game.cols; col++) {
                let x: number = col * width;
                let y: number = row * height;
                let color: Color = this.game.board.board[row][col].color;
                this.context.beginPath();
                this.context.rect(x, y, width, height);
                this.context.fillStyle = color.hexString;
                this.context.fill();
            }
        }
    }

    get canvasElement(): HTMLCanvasElement { return this._canvasElement; }

    get context(): CanvasRenderingContext2D { return this._context; }

    get game(): Game { return this._game; }

    get score(): number { return this._score; }

    set score(score: number) { this._score = score; }
}