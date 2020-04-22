import axios from 'axios';

export const createCharacter = data => {
    return axios.post('/api/characters/', data)
}

export const getCharacter = charId =>{
    return axios.get(`/api/characters/${charId}`);
}

export const getCharacters = () =>{
    return axios.get(`/api/characters/`);
}

export const searchCharacters = name =>{
    return axios.get(`/api/characters/search`, name );
}

export const updateCharacter = (character, charId) =>{
    return axios.patch(`/api/characters/${charId}`, character);
}

export const deleteCharacter = (charId) =>{
    return axios.delete(`/api/characters/${charId}`);
}