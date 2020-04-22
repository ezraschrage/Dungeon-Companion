import * as APIUtil from '../util/game_api_util';

export const RECEIVE_GAME = "RECEIVE_GAME";
export const REMOVE_GAME = "REMOVE_GAME";
export const RECEIVE_GAMES = "RECEIVE_GAMES";
export const RECEIVE_ENTITIES_ERRORS = "RECEIVE_ENTITIES_ERRORS";

export const receiveGame = game => ({
    type: RECEIVE_GAME,
    game
});

export const receiveGames = games => ({
    type: RECEIVE_GAMES,
    games
});

export const removeGame = gameId => ({
    type: REMOVE_GAME,
    gameId
});

export const receiveErrors = errors => ({
    type: RECEIVE_ENTITIES_ERRORS,
    errors
});

export const createGame = data => dispatch => (
    APIUtil.createGame(data)
        .then(game => dispatch(receiveGame(game.data)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const getGame = gameId => dispatch => (
    APIUtil.getGame(gameId)
        .then(game => dispatch(receiveGame(game.data)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const getDMGames = () => dispatch => (
    APIUtil.getDMGames()
        .then(games => dispatch(receiveGames(games.data)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const searchGames = (title) => dispatch => (
    APIUtil.searchGames(title)
        .then(games => dispatch(receiveGames(games.data)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const updateGame = (game, gameId) => dispatch => (
    APIUtil.updateGame(game, gameId)
        .then(game => dispatch(receiveGame(game.data)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const playTurnGame = (game, gameId) => dispatch => (
    APIUtil.playTurnGame(game, gameId)
        .then(game => dispatch(receiveGame(game.data)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const addPlayerGame = (player, gameId) => dispatch => (
    APIUtil.addPlayerGame(player, gameId)
        .then(game => dispatch(receiveGame(game.data)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const addMonsterGame = (monster, gameId) => dispatch => (
    APIUtil.addMonsterGame(monster, gameId)
        .then(game => dispatch(receiveGame(game.data)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

export const deleteGame = (gameId) => dispatch => (
    APIUtil.deleteGame(gameId)
        .then(gameId => dispatch(removeGame(gameId.data)))
        .catch(err => dispatch(receiveErrors(err.response.data)))
);

