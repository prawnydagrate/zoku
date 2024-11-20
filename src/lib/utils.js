import { error } from '@sveltejs/kit';

export function loadGridstr(gridstr, validate) {
    if (gridstr.length !== 81 || Array.from(gridstr).reduce((prev, curr) => Array.from("0123456789").includes(curr) ? prev : prev + 1, 0) !== 0) {
        error(400, { valid: false, legal: false });
    }
    const grid = [];
    let ptr = 0;
    while (ptr < 81) {
        let newPtr = ptr + 9;
        grid.push(gridstr.substring(ptr, newPtr).split("").map(digit => parseInt(digit)));
        ptr = newPtr;
    }
    if (validate && !validateGrid(grid)) error(400, { valid: true, legal: false, gridstr });
    const zeroes = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 0) {
                zeroes.push([y, x]);
            }
        }
    }
    return { grid, zeroes, gridstr };
}

function validateGrid(grid) {
    const cols = [];
    const subgrids = [];
    for (let row = 0; row < 9; row++) {
        // validate row
        if (!validateArray(grid[row])) return false;
        for (let col = 0; col < 9; col++) {
            const n = grid[row][col];
            // save column to validate later
            if (cols[col] == null)
                cols[col] = [n];
            else
                cols[col].push(n);
            // save subgrid to validate later
            const subgridIndex = Math.floor(col / 3) + Math.floor(row / 3) * 3; // magical math i came up with
            if (subgrids[subgridIndex] == null)
                subgrids[subgridIndex] = [n];
            else subgrids[subgridIndex].push(n);
        }
    }
    // validate columns
    if (cols.filter(col => !validateArray(col)).length !== 0) return false;
    // validate subgrids
    if (subgrids.filter(subgrid => !validateArray(subgrid)).length !== 0) return false;
    return true;
}

function validateArray(arr) {
    const dup = [];
    for (let n of arr) {
        if (n === 0) continue;
        if (dup.includes(n))
            return false;
        dup.push(n);
    } return true;
}

function isValid(
    n,
    grid,
    row,
    col,
) {
    if (grid[row].includes(n)) {
        return false;
    } else if (grid.map((row) => row[col]).includes(n)) {
        return false;
    }
    const subgridRowStart = Math.floor(row / 3) * 3;
    const subgridColStart = Math.floor(col / 3) * 3;
    return !grid
        .slice(subgridRowStart, subgridRowStart + 3)
        .flatMap((row) => row.slice(subgridColStart, subgridColStart + 3))
        .includes(n);
}

export function solveSudoku(
    grid,
    row,
    col,
) {
    if (row == 9) {
        return grid;
    } else if (col == 9) {
        return solveSudoku(grid, row + 1, 0);
    } else if (grid[row][col] != 0) {
        return solveSudoku(grid, row, col + 1);
    }
    for (let n = 1; n <= 9; n++) {
        if (isValid(n, grid, row, col)) {
            grid[row][col] = n;
            const res = solveSudoku(grid, row, col);
            if (res != null) {
                return res;
            }
            grid[row][col] = 0;
        }
    }
    return null;
}

export const rerenderTime = async () =>
    await new Promise(r => setTimeout(r, 0));

export async function solveSudokuDetailed(
    grid,
    row,
    col,
    updateGrid,
    updateNcalls,
) {
    updateNcalls();
    if (row == 9) {
        return grid;
    } else if (col == 9) {
        return await solveSudokuDetailed(grid, row + 1, 0, updateGrid, updateNcalls);
    } else if (grid[row][col] != 0) {
        return await solveSudokuDetailed(grid, row, col + 1, updateGrid, updateNcalls);
    }
    for (let n = 1; n <= 9; n++) {
        if (isValid(n, grid, row, col)) {
            grid[row][col] = n;
            updateGrid(grid);
            await rerenderTime();
            const res = await solveSudokuDetailed(grid, row, col, updateGrid, updateNcalls);
            if (res != null) {
                return res;
            }
            grid[row][col] = 0;
            updateGrid(grid);
        }
    }
    return null;
}

export function emptyGrid() {
    const newGrid = [];
    for (let _ = 0; _ < 9; _++) {
        newGrid.push(Array(9).fill(0));
    }
    const newZeroes = [];
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            newZeroes.push([y, x]);
        }
    }
    return [newGrid, newZeroes];
}