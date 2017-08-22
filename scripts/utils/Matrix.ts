/** Class representing a matrix. */
export class Matrix {
    private _rows: number;
    private _cols: number;
    private _matrix: number[][];

    /** 
     * Initializes the matrix. 
     * 
     * @param {number[][]} matrix - The matrix represented as a 2D array.
     */
    constructor(matrix: number[][]) {
        for (let row: number = 1; row < matrix.length; row++) {
            console.assert(
                matrix[row-1].length === matrix[row].length,
                'The matrix must not be jagged (i.e. every row should have the same length).'
            );
        }

        this._rows = matrix.length;
        this._cols = matrix[0].length;

        this._matrix = matrix;
    }

    /** The number of rows. */
    get rows(): number { return this._rows; }

    /** The number of columns. */
    get cols(): number { return this._cols; }

    /** The internal matrix. */
    get matrix(): number[][] { return this._matrix; }

    public toArray(): number[] {
        console.assert(
            this.cols === 1,
            'Matrix must have of shape n x 1.'
        );

        let toReturn: number[] = [];
        for (let row: number = 0; row < this.rows; row++) {
            toReturn[row] = this.matrix[row][0];
        }
        
        return toReturn;
    }

    /**
     * Maps a function onto a matrix.
     * 
     * @param {number => number} f - The mapping function.
     * @returns {Matrix} - Matrix where matrix[i][j] is now f(matrix[i][j]). 
     */
    public map(f: (num: number) => number): Matrix {
        let toReturn: number[][] = [];
        for (let row: number = 0; row < this.rows; row++) {
            toReturn[row] = [];
            for (let col: number = 0; col < this.cols; col++) {
                toReturn[row][col] = f(this.matrix[row][col]);
            }
        }
        return new Matrix(toReturn);
    }

    /**
     * Transforms an array into an n x 1 matrix.
     * 
     * @param {number[]} arr - The array to transform.
     * @returns {Matrix} - The n x 1 matrix. 
     */
    public static fromArray(arr: number[]): Matrix {
        return new Matrix(arr.map(x => [x]));
    }

    /** 
     * Creates a random matrix where all values are in the interval
     * [0, 1).
     * 
     * @param {number} rows - Number of rows.
     * @param {number} cols - Number of columns.
     * @returns {number[][]} - A random matrix of the given dimensions.
     */
    public static random(rows: number, cols: number): Matrix {
        console.assert(rows > 0, 'Number of rows must be a positive integer.');
        console.assert(cols > 0, 'Number of columns must be a positive integer.');

        let toReturn: number[][] = [];
        for (let row: number = 0; row < rows; row++) {
            toReturn[row] = [];
            for (let col: number = 0; col < cols; col++) {
                toReturn[row][col] = 40 * (Math.random() - 0.5);
            }
        }
        return new Matrix(toReturn);
    }

    /**
     * Creates the identity matrix.
     * 
     * @param {number} size - number of rows and columns of the resulting
     *               matrix.
     * @returns {number[][]} - The identity matrix of the given size.
     */
    public static identity(size: number): number[][] {
        console.assert(size > 0, 'The size of the resulting matrix must be a positive integer.');

        let toReturn: number[][] = [];
        for (let row: number = 0; row < size; row++) {
            toReturn[row] = [];
            for (let col: number = 0; col < size; col++) {
                toReturn[row][col] = row === col ? 1 : 0;
            }
        }
        return toReturn;
    }

    /**
     * Negates a matrix.
     * 
     * @param {Matrix} matrix - The matrix to negate.
     * @returns {Matrix} - The negated matrix.
     */
    public static negate(matrix: Matrix): Matrix {
        return matrix.map(x => -x);
    }

    /**
     * Transposes a matrix.
     * 
     * @param {Matrix} matrix - The matrix to transpose.
     * @returns {Matrix} - The transposed matrix 
     */
    public static transpose(matrix: Matrix): Matrix {
        let toReturn: number[][] = [];
        for (let col: number = 0; col < matrix.cols; col++) {
            toReturn[col] = [];
            for (let row: number = 0; row < matrix.rows; row++) {
                toReturn[col][row] = matrix.matrix[row][col];
            }
        }
        return new Matrix(toReturn);
    }

    /**
     * Adds two matrices.
     * 
     * @param {Matrix} matrix1 - The first matrix.
     * @param {Matrix} matrix2 - The second matrix.
     * @returns {Matrix} - matrix1 + matrix2.
     */
    public static add(matrix1: Matrix, matrix2: Matrix): Matrix {
        console.assert(
            matrix1.rows === matrix2.rows, 
            `Matrices have different number of rows: 
                ${matrix1.rows} vs. ${matrix2.rows}`
        );
        
        console.assert(
            matrix1.cols === matrix2.cols, 
            `Matrices have different number of columns: 
                ${matrix1.cols} vs. ${matrix2.cols}`
        );

        let toReturn: number[][] = [];
        for (let row: number = 0; row < matrix1.rows; row++) {
            toReturn[row] = [];
            for (let col: number = 0; col < matrix1.cols; col++) {
                toReturn[row][col] = 
                    matrix1.matrix[row][col] + matrix2.matrix[row][col];
            }
        }
        return new Matrix(toReturn);
    }

    /**
     * Subtracts two matrices.
     * 
     * @param {Matrix} matrix1 - The first matrix.
     * @param {Matrix} matrix2 - The second matrix.
     * @returns {Matrix} - matrix1 - matrix2.
     */
    public static subtract(matrix1: Matrix, matrix2: Matrix): Matrix {
        return Matrix.add(matrix1, Matrix.negate(matrix2));
    }

    /**
     * Multiplies two matrices.
     * 
     * @param {Matrix} matrix1 - The first matrix. 
     * @param {Matrix} matrix2 - The second matrix.
     * @returns {Matrix} - matrix1 * matrix2.
     */
    public static multiply(matrix1: Matrix, matrix2: Matrix): Matrix {
        console.assert(
            matrix1.cols === matrix2.rows, 
            `Matrix #1 column count is not the same as matrix #2 row counts: 
                ${matrix1.cols} vs. ${matrix2.rows}`);
        
        let toReturn: number[][] = [];
        for (let row: number = 0; row < matrix1.rows; row++) {
            toReturn[row] = [];
            for (let col: number = 0; col < matrix2.cols; col++) {
                toReturn[row][col] = 0;
                for (let k: number = 0; k < matrix1.cols; k++) {
                    toReturn[row][col] += 
                        matrix1.matrix[row][k] * matrix2.matrix[k][col];
                }
            }
        }
        return new Matrix(toReturn);
    }
}