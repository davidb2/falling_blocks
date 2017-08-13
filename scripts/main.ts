// <reference path="utils/NeuralNetwork.ts" /> 

import { NeuralNetwork } from "./utils/NeuralNetwork";

let nn: NeuralNetwork = new NeuralNetwork([4, 3, 2]);
console.log(nn.feedForward([2 ,4, 2, 4]));