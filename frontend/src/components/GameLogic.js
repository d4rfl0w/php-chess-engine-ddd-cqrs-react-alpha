import { pieces } from "./Piece";

export const initializeBoard = () => {
    const board = Array(8)
        .fill(null)
        .map(() => Array(8).fill(null));

    // Initialize pawns
    for (let i = 0; i < 8; i++) {
        board[1][i] = pieces.pawn;
        board[6][i] = pieces.pawnWhite;
    }

    // Initialize rooks
    board[0][0] = board[0][7] = pieces.rook;
    board[7][0] = board[7][7] = pieces.rookWhite;

    // Initialize knights
    board[0][1] = board[0][6] = pieces.knight;
    board[7][1] = board[7][6] = pieces.knightWhite;

    // Initialize bishops
    board[0][2] = board[0][5] = pieces.bishop;
    board[7][2] = board[7][5] = pieces.bishopWhite;

    // Initialize queens
    board[0][3] = pieces.queen;
    board[7][3] = pieces.queenWhite;

    // Initialize kings
    board[0][4] = pieces.king;
    board[7][4] = pieces.kingWhite;

    return board;
};

export const movePiece = (board, from, to) => {
    const newBoard = board.map((row) => row.slice());
    newBoard[to.row][to.col] = board[from.row][from.col];
    newBoard[from.row][from.col] = null;
    return newBoard;
};
