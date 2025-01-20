import React, { useState, useEffect } from "react";
import Square from "./Square";
import { initializeBoard, movePiece } from "./GameLogic";
import axios from "axios"; // Import Axios for API calls

const ChessBoard = () => {
    const [board, setBoard] = useState(initializeBoard());
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [moveLog, setMoveLog] = useState([]); // Stores the move notation
    const [turn, setTurn] = useState(null); // Current player's turn
    const [gameStatus, setGameStatus] = useState(null); // Current game status
    const gameId = 1; // Replace with dynamic game ID if needed

    const handleSquareClick = (row, col) => {
        if (selectedPiece) {
            console.log(JSON.stringify(board));
            const newBoard = movePiece(board, selectedPiece, { row, col });
            const fromNotation = `${String.fromCharCode(65 + selectedPiece.col)}${8 - selectedPiece.row}`;
            const toNotation = `${String.fromCharCode(65 + col)}${8 - row}`;
            setMoveLog([...moveLog, `${fromNotation} -> ${toNotation}`]); // Update the move log
            setBoard(newBoard);
            setSelectedPiece(null);
            // makeMove(selectedPiece, { row, col }); // progress
            // fetchBoardState();
        } else {
            setSelectedPiece({ row, col });
        }
    };

    // Fetch the board state from the backend (not working)
    const fetchBoardState = async () => {
        try {
            const response = await axios.get(`/api/games/${gameId}/board`);
            const { board, turn, status } = response.data;
            const jsBoard = transformPhpToJsBoard(board);
            setBoard(jsBoard);
            setTurn(turn);
            setGameStatus(status);
        } catch (error) {
            console.error("Error fetching board state:", error);
        }
    };

    // Make a move and update the board (not working)
    const makeMove = async (from, to) => {
        try {
            const response = await axios.post(`/api/games/${gameId}/board`, {
                from,
                to,
            });
            if (response.data.status === "success") {
                fetchBoardState(); // Refresh the board state
                const fromNotation = `${String.fromCharCode(65 + from.col)}${8 - from.row}`;
                const toNotation = `${String.fromCharCode(65 + to.col)}${8 - to.row}`;
                setMoveLog([...moveLog, `${fromNotation} -> ${toNotation}`]); // Update move log
            }
        } catch (error) {
            console.error("Error making move:", error);
        }
    };

    // useEffect(() => {
    //     fetchBoardState(); // Fetch the initial board state on component load
    // }, []);

    const pieceMapping = {
        R: { symbol: "♜", color: "black" },
        N: { symbol: "♞", color: "black" },
        B: { symbol: "♝", color: "black" },
        Q: { symbol: "♛", color: "black" },
        K: { symbol: "♚", color: "black" },
        P: { symbol: "♟", color: "black" },
        r: { symbol: "♖", color: "white" },
        n: { symbol: "♘", color: "white" },
        b: { symbol: "♗", color: "white" },
        q: { symbol: "♕", color: "white" },
        k: { symbol: "♔", color: "white" },
        p: { symbol: "♙", color: "white" },
        null: null // For empty squares
    };

    function transformPhpToJsBoard(phpBoard) {
        return phpBoard.map(row =>
            row.map(cell => (cell === null ? null : pieceMapping[cell]))
        );
    }

    const getColumnLabel = (col) => String.fromCharCode(65 + col); // Convert 0-7 to A-H

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "40px repeat(8, 80px)",
                    gridTemplateRows: "40px repeat(8, 80px)",
                    perspective: "800px",
                    transformStyle: "preserve-3d",
                    margin: "20px",
                    transform: "rotateX(30deg)",
                    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.5)",
                }}
            >
                {/* Column labels */}
                <div></div>
                {[...Array(8)].map((_, col) => (
                    <div
                        key={`col-label-${col}`}
                        style={{
                            textAlign: "center",
                            fontSize: "20px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {getColumnLabel(col)}
                    </div>
                ))}
                {board.map((row, rowIndex) => (
                    <>
                        {/* Row labels */}
                        <div
                            key={`row-label-${rowIndex}`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            {8 - rowIndex}
                        </div>
                        {row.map((square, colIndex) => (
                            <Square
                                key={`${rowIndex}-${colIndex}`}
                                piece={square}
                                isSelected={
                                    selectedPiece &&
                                    selectedPiece.row === rowIndex &&
                                    selectedPiece.col === colIndex
                                }
                                onClick={() => handleSquareClick(rowIndex, colIndex)}
                            />
                        ))}
                    </>
                ))}
            </div>
            {/* Move log */}
            <div
                style={{
                    marginLeft: "20px",
                    padding: "10px",
                    width: "200px",
                    border: "1px solid black",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <h3>Move Log</h3>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {moveLog.map((move, index) => (
                        <li key={index} style={{ padding: "5px 0", borderBottom: "1px solid #ddd" }}>
                            {index + 1}. {move}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChessBoard;
