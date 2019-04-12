const BOARD_SIZE = 9;
const SQUARE_SIZE = BOARD_SIZE / 3;
const EMPTY = '.';
const ALL_POSSIBLE_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Coordinate {rowNum: 0, colNum: 1}
 */

const testCase = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

const printSudoku = board => {
    console.log(board);
};

const intersectArrays = (a1, a2) => {
    return a1.filter(n => a2.indexOf(n) > -1);
};

const getSquareBasedOnCoordinates = ({ rowNum, colNum }) => {
    const squareRowNum = Math.floor(rowNum / SQUARE_SIZE);
    const squareColNum = Math.floor(colNum / SQUARE_SIZE);
    return { squareRowNum, squareColNum };
};

const getOptionsInRow = row => {
    const currentNumbers = row.filter(n => n !== EMPTY);
    return ALL_POSSIBLE_NUMBERS.filter(n => currentNumbers.indexOf(n) === -1);
};

const getOptionsInCol = (board, colNum) => {
    const currentNumbers = [];
    for (let rowNum = 0; rowNum < BOARD_SIZE; rowNum++) {
        if (board[rowNum][colNum] !== EMPTY) {
            currentNumbers.push(board[rowNum][colNum]);
        }
    }
    return ALL_POSSIBLE_NUMBERS.filter(n => currentNumbers.indexOf(n) === -1);
};

const getOptionsInSquare = ({ board, rowNum, colNum }) => {
    const { squareRowNum, squareColNum } = getSquareBasedOnCoordinates({ rowNum, colNum });
    const currentNumbers = [];

    for (let rowNum = squareRowNum * 3; rowNum < squareRowNum * 3 + 3; rowNum++) {
        for (let colNum = squareColNum * 3; colNum < squareColNum * 3 + 3; colNum++) {
            if (board[rowNum][colNum] !== EMPTY) {
                currentNumbers.push(board[rowNum][colNum]);
            }
        }
    }

    return ALL_POSSIBLE_NUMBERS.filter(n => currentNumbers.indexOf(n) === -1);
};

const createOptionsArray = board => {
    const options = [];
    for (let rowNum = 0; rowNum < BOARD_SIZE; rowNum++) {
        options[rowNum] = [];
        for (let colNum = 0; colNum < BOARD_SIZE; colNum++) {
            if (board[rowNum][colNum] === EMPTY) {
                const availableNumbers = intersectArrays(
                    intersectArrays(getOptionsInRow(board[rowNum]), getOptionsInCol(board, colNum)),
                    getOptionsInSquare({ board, colNum, rowNum }),
                ).sort();
                options[rowNum][colNum] = availableNumbers;
            } else {
                options[rowNum][colNum] = EMPTY;
            }
        }
    }
    return options;
};

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    const options = createOptionsArray(board);

    console.log('options', options);
};

const solvedSudoku = solveSudoku(testCase);
printSudoku(solvedSudoku);