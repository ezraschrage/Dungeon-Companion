import React from 'react'

export default ({monster}) =>{

    return (
        <div>
            <ul>
                <h2>More Monster Info</h2>
                <h3>Name: {monster.name}</h3>
                <h3>Armor Class: {monster.armor_class}</h3>
                <h3>Challenge Rating: {monster.challenge_rating}</h3>
                <ul>
                    Actions
                    {monster.actions.map(action => (
                       <li>{action.name} : {action.desc}</li> 
                    ))}
                </ul>
                <h3>Hit Points: {monster.hit_points} </h3>

            </ul>
        </div> 
    );
}