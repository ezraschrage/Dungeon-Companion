import React from 'react'

export default ({character}) =>{

    return (

        <>

            <h2>Character Stats:</h2>
            <ul>
            <h3>Name: {character.name}</h3>
            <h3>Race: {character.race}</h3>
            <h3>Class: {character.klass}</h3>
            <h3>Hit Points: {character.hitPoints}</h3>
            <h3>Strength: {character.str}</h3>
            <h3>Dexterity: {character.dex}</h3>
            <h3>Constitution: {character.con}</h3>
            <h3>Intelligence: {character.int}</h3>
            <h3>Wisdom: {character.wis}</h3>
            <h3>Charisma: {character.cha}</h3>
            <h3>Level: {character.lvl}</h3>
            <h3>Allow Magic: {character.allowMagic}</h3>
            <h3>Proficiencies: {character.proficiencies.map(prof => (<p key={prof}>{prof}</p>))}</h3>
        </ul>

        </>

    );
}