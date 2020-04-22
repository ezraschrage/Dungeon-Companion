import axios from 'axios';

export const createCharacter = data => {
    return axios.post('/api/characters/', data)
}