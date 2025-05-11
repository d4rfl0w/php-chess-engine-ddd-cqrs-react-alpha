import React, { useEffect, useState, useRef } from 'react';

const pieces = {
    'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔',
    'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚'
};

const ChessBoard = () => {
    const [board, setBoard] = useState(initialBoard);
    const selectedCanvas = useRef(null);

    useEffect(() => {
        const cells = document.querySelectorAll('td canvas');
        drawBoard(cells, board);
    }, [board]);

    const drawBoard = (cells, board) => {
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                const canvas = cells[y * 8 + x];
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const piece = board[y][x];
                if (piece) {
                    const type = piece.type || '';
                    const color = piece.color || '';
                    const symbol = pieces[color === 'white' ? type.toUpperCase() : type.toLowerCase()];
                    if (symbol) {
                        ctx.font = '64px serif';
                        ctx.fillText(symbol, 10, 70);
                    }
                }
            }
        }
    };

    const handleCellClick = (cell, x, y) => {
        if (selectedCanvas.current) {
            selectedCanvas.current.style.border = null;
        }
        selectedCanvas.current = cell.querySelector('canvas');
        selectedCanvas.current.style.border = '2px solid red';

        const fromX = x;
        const fromY = y;
        const figure = selectedCanvas.current.dataset.piece;

        document.querySelectorAll('td').forEach((targetCell, index) => {
            targetCell.addEventListener('click', () => handleTargetCellClick(targetCell, fromX, fromY, figure), { once: true });
        });
    };

    const handleTargetCellClick = (targetCell, fromX, fromY, figure) => {
        const toX = targetCell.cellIndex;
        const toY = targetCell.parentElement.rowIndex;
        console.log(`Move to ${toX}, ${toY}`);

        fetch('/chess/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromX: fromX,
                fromY: fromY,
                toX: toX,
                toY: toY,
                figure: figure
            })
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Move failed');
            }
        }).then(data => {
            if (data.status === 'error') {
                console.log('Move failed');
            } else {
                console.log('Move successful');
                setBoard(data.board);
            }
            if (selectedCanvas.current) {
                document.querySelectorAll('td canvas').forEach(canvas => {
                    canvas.style.border = null;
                });
                selectedCanvas.current = null;
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    const renderBoard = () => {
        const rows = [];
        for (let y = 0; y < 8; y++) {
            const cells = [];
            for (let x = 0; x < 8; x++) {
                const cellKey = `cell-${x}-${y}`;
                cells.push(
                    <td key={cellKey} onClick={() => handleCellClick(x, y)}>
                        <canvas data-piece={board[y][x] ? board[y][x].type : '.'} width="80" height="80"></canvas>
                    </td>
                );
            }
            rows.push(<tr key={`row-${y}`}>{cells}</tr>);
        }
        return rows;
    };

    return (
        <table>
            <tbody>
            {renderBoard()}
            </tbody>
        </table>
    );
};

const initialBoard = [
];

export default ChessBoard;
