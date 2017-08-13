/// <reference path="Matrix.ts" />

/** Class representing a Neural Network. */
class NeuralNetwork {
    private _layers: number[];
    private _weights: Matrix[];
    private _biases: Matrix[];

    /**
     * Initializes a Neural Network.
     * 
     * @param {number[]} layers - The number of neurons in each layer.
     */
    constructor(layers: number[]) {
        console.assert(
            layers.length > 1,
            'A neural network must consist of at least two layers (i.e. input and output layer).'
        );

        layers.forEach(layer => {
            console.assert(
                layer > 0,
                'Each layer must be of size 1 or larger.' 
            );
        });

        this._layers = layers;

        this._weights = [];
        this._biases = [];
        for (let layer: number = 1; layer < layers.length; layer++) {
            this._weights[layer - 1] = Matrix.random(layers[layer], layers[layer - 1]);
            this._biases[layer - 1] = Matrix.random(layers[layer], 1);
        }
    }

    /** The number of neurons in each layer. */
    get layers(): number[] { return this._layers; }

    /** The network weights. */
    get weights(): Matrix[] { return this._weights; }

    /** The network biases. */
    get biases(): Matrix[] {return this._biases; }

    /**
     * The activation function used during feed-forward. 
     * In this case, sigmoid (1 / (1 - e^(-x)) is used.
     * 
     * @param {number} x - The input number.
     * @returns {number} - The activation function applied to the given number.
     */
    private activationFunction(x: number): number {
        return 1.0 / (1.0 + Math.exp(-x));
    }

    /**
     * Makes a prediction from the input.
     * 
     * @param {number[]} input - Neural Network input.
     * @returns {number[]} - The prediction. 
     */
    public feedForward(input: number[]): number[] {
        console.assert(
            input.length === this.layers[0],
            `Input size is incorrect: ${input.length} vs ${this.layers[0]}.`
        );

        let accumulation: Matrix = Matrix.fromArray(input);
        for (let layer: number = 0; layer < this.layers.length - 1; layer++) {
            accumulation = 
                // x_{n+1} = sigmoid(W_n * x_n + b_n)
                Matrix.add(Matrix.multiply(this.weights[layer], accumulation), this.biases[layer])
                    .map(this.activationFunction);
        }
        return accumulation.toArray();
    }
}