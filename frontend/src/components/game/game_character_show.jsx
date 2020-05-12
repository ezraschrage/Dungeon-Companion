import React from 'react'

export default ({character}) =>{

    return (
        <>
            <ul className="character-details">
                <h3>Name: {character.name}</h3>
                <h3>Level: {character.lvl}</h3>
                <h3>Race: {character.race}</h3>
                <h3>Class: {character.klass}</h3>
                <h3>Hit Points: {character.hitPoints}</h3>
                <h4>Strength: {character.str}</h4>
                <h4>Dexterity: {character.dex}</h4>
                <h4>Constitution: {character.con}</h4>
                <h4>Intelligence: {character.int}</h4>
                <h4>Wisdom: {character.wis}</h4>
                <h4>Charisma: {character.cha}</h4>
                {/* <h3>Allow Magic: {character.allowMagic}</h3> */}
                <h3>Proficiencies:</h3> {character.proficiencies.map(prof => (<h4 key={prof}>{prof}</h4>))}
            </ul>
        </>
    );
}