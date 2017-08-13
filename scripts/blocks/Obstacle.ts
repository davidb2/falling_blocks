import { Block } from './Block';
import { Color } from '../utils/Color';

export class Obstacle extends Block {
    get color(): Color { return Color.Red; }
    get number(): number { return -1; }
}