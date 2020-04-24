import React from 'react'

export default ({monster}) =>{

    return (
        <>
                <h2>More Monster Info</h2>
            <ul>
                <h3>Name: {monster.name}</h3>
                <h3>Armor Class: {monster.armor_class}</h3>
                <h3>Challenge Rating: {monster.challenge_rating}</h3>
                <h3>Hit Points: {monster.hit_points} </h3>
                {monster.actions ? (
                <>
                    <h3>Actions</h3> 
                    {monster.actions.map(action => (<div key={action.name}>
                        <h4>{action.name}</h4>
                       <p >{action.desc}</p> 
                    </div>))}
                </>
                 ) : (<h3>No Actions</h3>)} 
                
                

            </ul>
        </>
    );
}