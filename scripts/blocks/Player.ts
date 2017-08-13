import { Block } from './Block';
import { Color } from '../utils/Color';

export class Player extends Block {
    get color(): Color { return Color.Green; }
    get number(): number { return 1; }
}