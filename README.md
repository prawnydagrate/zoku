# zoku
#### A sudoku-solving web app

zoku is a web app written with [Svelte](https://svelte.dev), hosted using [Vercel](https://vercel.com) at https://zoku319.vercel.app.

## Features
zoku has two main functionalities:
* editing a sudoku grid
* solving a sudoku puzzle

Each URL, e.g. [this one](https://zoku319.vercel.app/edit/100080006020400070003000500004007010500030008060200900007000200080009030900060004), holds information about each of the 81 cells of a sudoku grid.

### Editing a grid
Edit a grid by selecting a cell using the mouse cursor and:
* pressing a digit (<kbd>1</kbd> through <kbd>9</kbd>) on the keyboard to enter a number into the cell
* pressing <kbd>Backspace</kbd> or <kbd>Delete</kbd> on the keyboard to clear the cell
* using the arrow keys (<kbd>↑</kbd>, <kbd>→</kbd>, <kbd>↓</kbd>, <kbd>←</kbd>) to navigate between cells
* pressing <kbd>Escape</kbd> on the keyboard to clear the selection

Then click the 'Analyze' button to solve the sudoku.

### Analysis
Click the 'Solve' button to solve a sudoku. To view each step of the algorithm, select 'Show steps' before solving.

## Algorithm
zoku uses a technique called [Recursive Backtracking](https://en.wikipedia.org/wiki/Backtracking). Explained simply, it searches for the next empty cell of the grid, and tries all the valid numbers 1-9. It searches recursively down a 'tree' of possibilities, returning to the start of a 'branch' once it determines that a 'branchlet' doesn't work (hence the name _**back**tracking_),  indicated by none of the nine digits being valid in a cell.