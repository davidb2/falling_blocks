import { Color } from '../utils/Color';

export abstract class Block {
    abstract get color(): Color;
    abstract get number(): number;
}