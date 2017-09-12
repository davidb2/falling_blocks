import { Game } from './Game'
import { Color } from './utils/Color'
import { Obstacle } from './blocks/Obstacle'
import { Blank } from './blocks/Blank'
import { Player } from './blocks/Player'
import { Brain } from './neuroevolution/Brain'
import { Random } from './utils/Random'

export class GameManager {
    private static readonly SEED: number = 17;
    private readonly _canvasElement: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _game: Game;
    private readonly _random: Random;
    private _score: number;
    private _ticks: number;

    constructor(canvasElement: HTMLCanvasElement, rows: number, cols: number) {
        this._canvasElement = canvasElement;
        this._context = canvasElement.getContext('2d');
        this._game = new Game(rows, cols);
        this._random = new Random(GameManager.SEED);
        this.ticks = 0;
        this.score = 0;
    }

    public play(player: Brain = null, callback = () => {}) {
        this.draw();
        let id: number = setInterval(() => 
            {
                this.draw();
                if (!this.game.playerIsAlive) {
                    callback();
                    clearInterval(id);
                }

                if (this.ticks % 15 == 0) {
                    this.moveDown();
                }
                if (this.ticks % 60 == 0) {
                    this.addObstacles();
                    this.score++;
                }
                this.ticks++;
                if (player !== null) {
                    player.move(this.game);
                }
            }, 10);
    }

    private addObstacles() {
        for (let col: number = 0; col < this.game.cols; col++) {
            if (this._random.nextDouble() < 0.4) {
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

    get ticks(): number { return this._ticks; }

    set score(score: number) { this._score = score; }

    set ticks(ticks: number) { this._ticks = ticks; }
}