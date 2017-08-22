import { NeuralNetwork } from '../utils/NeuralNetwork'
import { Game } from '../Game'

export class Brain {
    private readonly _brain: NeuralNetwork;

    constructor(layers: number[]) {
        // for this particular game
        console.assert(layers[layers.length - 1] === 3);

        this._brain = new NeuralNetwork(layers);
    }

    public static crossover(brain1: Brain, brain2: Brain): Brain {
        let toReturn: Brain = new Brain(brain1.brain.layers);

        for (let layer: number = 0; layer < brain1.brain.layers.length - 1; layer++) {
            for (let row: number = 0; row < brain1.brain.weights[layer].rows; row++) {
                for (let col: number = 0; col < brain1.brain.weights[layer].cols; col++) {
                    toReturn.brain.weights[layer].matrix[row][col] = 
                        Math.random() < 0.5 ? 
                            brain1.brain.weights[layer].matrix[row][col] : brain2.brain.weights[layer].matrix[row][col];
                }
            }

            for (let row: number = 0; row < brain1.brain.biases[layer].rows; row++) {
                for (let col: number = 0; col < brain1.brain.biases[layer].cols; col++) {
                    toReturn.brain.biases[layer].matrix[row][col] = 
                        Math.random() < 0.5 ? 
                            brain1.brain.biases[layer].matrix[row][col] : brain2.brain.biases[layer].matrix[row][col];
                }
            }
        }
        return toReturn;
    }

    public static mutate(brain: Brain): Brain {
        let toReturn: Brain = new Brain(brain.brain.layers);

        for (let layer: number = 0; layer < brain.brain.layers.length - 1; layer++) {
            for (let row: number = 0; row < brain.brain.weights[layer].rows; row++) {
                for (let col: number = 0; col < brain.brain.weights[layer].cols; col++) {
                    toReturn.brain.weights[layer].matrix[row][col] += 5 * (Math.random() < 0.5 ? Math.random() - 0.5 : 0);
                }
            }

            for (let row: number = 0; row < brain.brain.biases[layer].rows; row++) {
                for (let col: number = 0; col < brain.brain.biases[layer].cols; col++) {
                    toReturn.brain.biases[layer].matrix[row][col] += 5 * (Math.random() < 0.5 ? Math.random() - 0.5 : 0);
                }
            }
        }

        return toReturn;
    }

    public move(game: Game) {
        let move: number[] = this.brain.feedForward(game.board.vectorize());
        let maxNum: number = Math.max.apply(this, move);
        if (move[0] === maxNum) game.movePlayerLeft();
        else if (move[2] === maxNum) game.movePlayerRight();
    }

    get brain(): NeuralNetwork { return this._brain; }
}