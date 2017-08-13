/// <reference path="NeuralNetwork.ts" />

let nn: NeuralNetwork = new NeuralNetwork([4, 3, 2]);
console.log(nn.feedForward([2 ,4, 2, 1]));