import axios from 'axios';

export const fetchGameState = async () => {
    const response = await axios.get('/api/game-state');
    return response.data;
};
