document.addEventListener('DOMContentLoaded', function () {

    const pieces = {
        'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔',
        'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚'
    };

    let count = 0;

    const eventListeners = [];

    function addEventListenerWithTracking(element, event, handler) {
        element.addEventListener(event, handler);
        eventListeners.push({ element, event, handler });
    }

    function removeEventListeners() {
        eventListeners.forEach(listener => {
            listener.element.removeEventListener(listener.event, listener.handler);
        });
        eventListeners.length = 0;
    }

    function showActiveEventListeners() {
        console.log('Active Event Listeners:');
        eventListeners.forEach(listener => {
            console.log(`Element: ${listener.element}, Event: ${listener.event}`);
        });
    }

    function handleClick(event) {
        console.log(`Clicked on cell at ${event.currentTarget.cellIndex}, ${event.currentTarget.parentElement.rowIndex}`);
    }

    // document.querySelectorAll('td').forEach(function (cell) {
    //     addEventListenerWithTracking(cell, 'click', handleClick);
    // });

    // showActiveEventListeners();

    document.querySelectorAll('canvas').forEach(function (canvas) {
        const ctx = canvas.getContext('2d');
        const piece = canvas.dataset.piece;
        if (pieces[piece]) {
            ctx.font = '64px serif';
            ctx.fillText(pieces[piece], 10, 70);
        }
    });

    function updateBoard(board) {
        const cells = document.querySelectorAll('td canvas');
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                cells[y * 8 + x].dataset.piece = board[y][x] ? board[y][x].type : '.';
            }
        }
        drawBoard(cells, board);
    }

    function drawBoard(cells, board) {
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                const canvas = cells[y * 8 + x];
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

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
    }

    let selectedCanvas = null;

    document.querySelectorAll('td').forEach(function (cell) {
        cell.addEventListener('click', function () {
            selectedCanvas = cell.querySelector('canvas');
            selectedCanvas.style.border = '2px solid red';
            console.log(`Clicked on ${selectedCanvas.dataset.piece} at ${cell.cellIndex}, ${cell.parentElement.rowIndex}`);
            console.log('piece ' + selectedCanvas.dataset.piece);

            if ((selectedCanvas.dataset.piece !== '') && (selectedCanvas.dataset.piece !== '.')) {
                const fromX = cell.cellIndex;
                const fromY = cell.parentElement.rowIndex;
                const figure = selectedCanvas.dataset.piece;

                document.querySelectorAll('td').forEach(function (targetCell) {
                    addEventListenerWithTracking(targetCell,'click', function () {
                        if ((selectedCanvas.dataset.piece === '') || (selectedCanvas.dataset.piece === '.')) {
                            const toX = targetCell.cellIndex;
                            const toY = targetCell.parentElement.rowIndex;
                            console.log(`Move to ${toX}, ${toY}`);

                            // Send POST request to backend
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
                                console.log(response);
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
                                    console.log(data);
                                    updateBoard(data.board);
                                }

                                if (selectedCanvas) {
                                    document.querySelectorAll('td').forEach(function (targetCell) {
                                        targetCell.querySelector('canvas').style.border = null;
                                    });
                                    selectedCanvas = null
                                    targetCell = null;
                                    removeEventListeners();
                                    showActiveEventListeners()
                                }

                            }).catch(error => {
                                console.error('Error:', error);
                            });
                        }
                    }, { once: true });
                });
            }
        });
    });
});
