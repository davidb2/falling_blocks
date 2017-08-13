import { Block } from './Block';
import { Color } from '../utils/Color';

export class Blank extends Block {
    get color(): Color { return Color.White; }
    get number(): number { return 0; }
}