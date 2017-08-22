import { Brain } from './Brain'
import { GameManager } from '../GameManager'
import { Status } from '../Status'
import { Bisect } from '../utils/Bisect'

export class Population {
    private static readonly UPDATE_INTERVAL = 5;
    private static readonly IMMEDIATE_INTERVAL = 0;

    private readonly _size: number;
    private _population: Brain[];
    private _fitnesses: number[];
    private _callQueue: Status[];
    private _gameManager: GameManager;
    private _generation: number;
    private _currBrainIndex: number;
    private readonly _canvasElement: HTMLCanvasElement;
    private _id: number;

    constructor(size: number, layers: number[], canvasElement: HTMLCanvasElement) {
        this._size = size;
        this._population = [];
        for (let idx: number = 0; idx < size; idx++) {
            this._population[idx] = new Brain(layers);
        }
        this.callQueue = [];
        this._gameManager = null;
        this._canvasElement = canvasElement;
        this._id = null;
        this._generation = 0;
        this._currBrainIndex = 0;
        this._fitnesses = [];

        this.detectEvaluateFitness();
        this.detectCrossover();
        this.detectMutation();
        this.detectUpdateGeneration();
    }

    private detectCrossover() {
        setInterval(() => {
            if (this.callQueue !== null && this.callQueue.length > 0 && this.callQueue[0] === Status.CROSSOVER) {
                this.callQueue[0] = Status.PENDING;
                setTimeout(() => {this.crossover()}, Population.IMMEDIATE_INTERVAL);
            }
        }, Population.UPDATE_INTERVAL);
    }

    private detectMutation() {
        setInterval(() => {
            // console.log(this.callQueue);
            if (this.callQueue !== null && this.callQueue.length > 0 && this.callQueue[0] === Status.MUTATE) {
                this.callQueue[0] = Status.PENDING;
                setTimeout(() => {this.mutate()}, Population.IMMEDIATE_INTERVAL);
            }
        }, Population.UPDATE_INTERVAL);
    }

    private detectUpdateGeneration() {
        setInterval(() => {
            if (this.callQueue !== null && this.callQueue.length > 0 && this.callQueue[0] === Status.UPDATE_GENERATION) {
                this.callQueue[0] = Status.PENDING;
                setTimeout(() => {this.updateGeneration()}, Population.IMMEDIATE_INTERVAL);
            }
        }, Population.UPDATE_INTERVAL);
    }

    private detectEvaluateFitness() {
        setInterval(() => {
            if (this.callQueue !== null && this.callQueue.length > 0 && this.callQueue[0] === Status.EVALUATE_FITNESS) {
                this.callQueue[0] = Status.PENDING;
                setTimeout(() => {this.evaluateFitness()}, Population.IMMEDIATE_INTERVAL);
            }
        }, Population.UPDATE_INTERVAL);
    }

    private updateGeneration() {
        // console.log('updateGeneration called');
        console.log(`\tmax fitness for generation ${this._generation}: ${Math.max.apply(this, this._fitnesses)}`);
        console.log(this.population[0].brain);
        this._generation++;
        this.callQueue = this.callQueue.slice(1, this.callQueue.length);
    }

    private crossover() {
        // console.log('crossover called');
        // normalize fitnesses
        let fitnessSum = this._fitnesses.reduce((x, y) => x + y);
        let normFitnesses = this._fitnesses.map(fitness => fitness / fitnessSum);

        // create the roulette wheel
        let cumSum: number = 0;
        let probs: number[] = [];
        for (let idx: number = 0; idx < this.size; idx++) {
            cumSum += normFitnesses[idx];
            probs[idx] = cumSum;
        }

        // crossover weighted random parents
        let children: Brain[] = [];
        for (let idx: number = 0; idx < this.size; idx++) {
            let parent1 = this._population[Bisect.findIndex(Math.random(), probs)];
            let parent2 = this._population[Bisect.findIndex(Math.random(), probs)];
            children[idx] = Brain.crossover(parent1, parent2);
        }
        this._population = children;
        this.callQueue[0] = Status.MUTATE;
    }

    private mutate() {
        this._population = this._population.map(brain => Brain.mutate(brain));
        this.callQueue[0] = Status.UPDATE_GENERATION;
    }

    private onFinishGame() {
        // console.log('onFinishGame called');
        console.log(`generation ${this._generation} species ${this._currBrainIndex} scored ${this.gameManager.score}`);
        this._fitnesses[this.currBrainIndex++] = this.gameManager.score;
        this.callQueue[0] = Status.EVALUATE_FITNESS;
    }

    private evaluateFitness() {
        // console.log('evaluateFitness called');
        if (this.currBrainIndex === this.size) {
            this.currBrainIndex = 0;
            this.callQueue[0] = Status.CROSSOVER;
            return;
        }

        // TODO(ljeabmreosn):
        // include the evaluate fitness function.
        this._callQueue[0] = Status.PENDING;
        this._gameManager = new GameManager(this._canvasElement, 5, 3);
        this._gameManager.play(
            this._population[this.currBrainIndex], 
            () => {this.onFinishGame()});
    }

    public nextGeneration() {
        // console.log('nextGeneration called');
        this._callQueue[this._callQueue.length] = Status.EVALUATE_FITNESS;
    }

    get size(): number { return this._size; }

    get callQueue(): Status[] { return this._callQueue; }

    get gameManager(): GameManager { return this._gameManager; }

    get currBrainIndex(): number { return this._currBrainIndex; }

    get population(): Brain[] { return this._population; }

    set callQueue(callQueue: Status[]) { this._callQueue = callQueue; } 

    set currBrainIndex(idx: number) { this._currBrainIndex = idx; }

}