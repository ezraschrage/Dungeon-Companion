import axios from 'axios';

export const createGame = data => {
    return axios.post('/api/games/', data)
}

export const getGame = gameId =>{
    return axios.get(`/api/games/${gameId}`);
}

export const getDMGames = () =>{
    return axios.get(`/api/games/dm`);
}

export const searchGames = title =>{
    return axios.get(`/api/games/search`, title );
}

export const updateGame = (game, gameId) =>{
    return axios.patch(`/api/games/edit/${gameId}`, game);
}

export const addPlayerGame = (player, gameId) =>{
    return axios.post(`/api/games/addPlayer/${gameId}`, player);
}

export const addMonsterGame = (monster, gameId) =>{
    return axios.post(`/api/games/addMonster/${gameId}`, monster);
}

export const playTurnGame = (game, gameId) =>{
    return axios.patch(`/api/games/playturn/${gameId}`, game);
}

export const deleteGame = (gameId) =>{
    return axios.delete(`/api/games/${gameId}`);
}