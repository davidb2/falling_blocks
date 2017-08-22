import { Population } from "./neuroevolution/Population";
import { Bisect } from './utils/Bisect'
import { GameManager } from './GameManager'

let c: HTMLCanvasElement = <HTMLCanvasElement> window.document.getElementById('mainCanvas');


// let pop: Population = new Population(10, [2, 3], c);
// pop.nextGeneration(); 

// let gameManager: GameManager = new GameManager(c, 5, 3);
// gameManager.play(null, () => {console.log(gameManager.score);});

// window.addEventListener('keydown',onKeyPress,false);
// function onKeyPress(event: KeyboardEvent) {
//     if (event.keyCode === 37) {
//         gameManager.game.movePlayerLeft();
//     } else if (event.keyCode === 39) {
//         gameManager.game.movePlayerRight();
//     }
// }

let pop: Population = new Population(10, [15, 25, 50, 5, 3], c);
for (let idx: number = 0; idx < 5000; idx++) {
    pop.nextGeneration();
}