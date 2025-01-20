import React from 'react';
import ChessBoard from '../components/ChessBoard';
import { fetchGameState } from '../services/gameService';

const HomePage = () => {
    const [gameState, setGameState] = React.useState(null);

    React.useEffect(() => {
        fetchGameState().then(state => setGameState(state));
    }, []);

    return (
        <div>
            <h1>Chess Game</h1>
            {gameState ? <ChessBoard state={gameState} /> : <p>Loading...</p>}
        </div>
    );
};

export default HomePage;
