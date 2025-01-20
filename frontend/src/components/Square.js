import React from "react";

const Square = ({ piece, isSelected, onClick }) => {
    const backgroundColor = isSelected ? "yellow" : piece && piece.color === "black" ? "#b58863" : "#f0d9b5";

    return (
        <div
            onClick={onClick}
            style={{
                width: "80px",
                height: "80px",
                backgroundColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid black",
                cursor: "pointer", // Hand cursor
                boxShadow: "inset 0 0 8px rgba(0,0,0,0.6)",
            }}
        >
            {piece && (
                <span
                    style={{
                        fontSize: "36px",
                        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)",
                    }}
                >
                    {piece.symbol}
                </span>
            )}
        </div>
    );
};

export default Square;
