/** Class representing a matrix. */
class Matrix {
    private _rows: number;
    private _cols: number;
    private _matrix: number[][];

    constructor(matrix: number[][]) {
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

    /** 
     * Creates a random matrix where all values are in the interval
     * [0, 1).
     * 
     * @param {number} rows - Number of rows.
     * @param {number} cols - Number of columns.
     * @returns {number[][]} - A random matrix of the given dimensions.
    */
    public static random(rows: number, cols: number): Matrix {
        let toReturn: number[][] = [];
        for (let row: number = 0; row < rows; row++) {
            toReturn[row] = [];
            for (let col: number = 0; col < cols; col++) {
                toReturn[row][col] = Math.random();
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
        let toReturn: number[][] = [];
        for (let row: number = 0; row < size; row++) {
            toReturn[row] = [];
            for (let col: number = 0; col < size; col++) {
                toReturn[row][col] = row == col ? 1 : 0;
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
        let toReturn: number[][] = [];
        for (let row: number = 0; row < matrix.rows; row++) {
            toReturn[row] = [];
            for (let col: number = 0; col < matrix.cols; col++) {
                toReturn[row][col] = - matrix.matrix[row][col];
            }
        }
        return new Matrix(toReturn);
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
            matrix1.rows == matrix2.rows, 
            `Matrices have different number of rows: 
                ${matrix1.rows} vs. ${matrix2.rows}`);
        
        console.assert(
            matrix1.cols == matrix2.cols, 
            `Matrices have different number of columns: 
                ${matrix1.cols} vs. ${matrix2.cols}`);

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
            matrix1.cols == matrix2.rows, 
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