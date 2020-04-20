import React from 'react';


// Change AC to be 10 + dex modifier when submitting char

class CharacterCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            race: "Dragonborn",
            class: "Barbarian",
            hit_points: 1,
            armor_class: 10,
            str: 8,
            dex: 8,
            con: 8,
            int: 8,
            wis: 8,
            cha: 8,
            lvl: 1,
            allow_magic: false,
            proficiencies: []
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.determineArmorClass = this.determineArmorClass.bind(this);
        this.determineStartHp = this.determineStartHp.bind(this);
    }

    rollStats(){
        // Randomize stats with 4d6 drop 1 
    }

    handleInput(type){
        if (type === 'class'){
            switch(e.target.value){
                case "Monk":
                    this.setState({ allow_magic: false })
                case "Fighter":
                    this.setState({ allow_magic: false })
                case "Rogue":
                    this.setState({ allow_magic: false })
                case "Barbarian":
                    this.setState({ allow_magic: false })
                default:
                    this.setState({ allow_magic: true })
            }
        }

        return (e) => {
            this.setState({ [type]: e.target.value });
        };
    }

    determineArmorClass(){
        const { dex } = this.state;
        return 10 + Math.floor((dex - 10)/2)
    }

    determineStartHp(klass){
        if (klass === "Barbarian"){
            return 12
        } else if (klass === "Fighter" || klass === "Paladin" || klass === "Ranger"){
            return 10
        } else if (klass === "Wizard" || klass === "Sorcerer"){
            return 6
        } else {
            return 8
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { con } = this.state;

        // Change AC to be 10 + dex modifier when submitting char
        this.setState({armor_class: this.determineArmorClass()});
        // Set Hitpoints 
        this.setState({hit_points: this.determineStartHp() + Math.floor((con - 10)/2)});

        // 
        // Check with Rory about whether "character" is the right input
        // 
        // 
        // 
        let formData = new FormData();
        Object.keys(this.state).forEach(attribute => {
            formData.append(`character[${attribute}]`, this.state[attribute]);
        });

        // Where do we send the user after the submission? User dashboard? 
        // this.props.createCharacter(formData)
        //     .then(() => this.props.history.push(`/areas/${area}`));
    }

    render(){
        const races = ["Dragonborn", "Dwarf", "Elf", "Half-Elf", "Halfling", "Human", "Gnome", "Tiefling"]
        const klasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]

        return(
            <div className="create-form">
                <h1>New Character</h1>
                <hr />
                <form>
                    <label>Name:</label>
                    <br />
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.handleInput('name')}
                            className="create-form-input"
                        />
                    <br />

                    <label>Race:</label>
                    <br />
                        <div>
                            <select id="race" name="race" onChange={this.handleInput('race')}>
                                {races.map(race => (
                                    <option key={race} value={race}>{race}</option>
                                ))}
                            </select>
                        </div>
                    <br />

                    <label>Class:</label>
                    <br />
                        <div>
                            <select id="class" name="class" onChange={this.handleInput('class')}>
                                {klasses.map(klass => (
                                    <option key={klass} value={klass}>{klass}</option>
                                ))}
                            </select>
                        </div>
                    <br />

                    <label>Strength:</label>
                    <br />
                        <input 
                            value={this.state.str} 
                            onChange={this.handleInput('str')} 
                            type="number" 
                            id="str" 
                            name="str" 
                            step="1" min="3" max="18"
                            className="create-form-input"/>
                    <br />

                    <label>Dexterity:</label>
                    <br />
                        <input 
                            value={this.state.dex} 
                            onChange={this.handleInput('dex')} 
                            type="number" 
                            id="dex" 
                            name="dex" 
                            step="1" min="3" max="18"
                            className="create-form-input"/>
                    <br />

                    <label>Constitution:</label>
                    <br />
                        <input 
                            value={this.state.con} 
                            onChange={this.handleInput('con')} 
                            type="number" 
                            id="con" 
                            name="con" 
                            step="1" min="3" max="18"
                            className="create-form-input"/>
                    <br />

                    <label>Intelligence:</label>
                    <br />
                        <input 
                            value={this.state.int} 
                            onChange={this.handleInput('int')} 
                            type="number" 
                            id="int" 
                            name="int" 
                            step="1" min="3" max="18"
                            className="create-form-input"/>
                    <br />

                    <label>Wisdom:</label>
                    <br />
                        <input 
                            value={this.state.wis} 
                            onChange={this.handleInput('wis')} 
                            type="number" 
                            id="wis" 
                            name="wis" 
                            step="1" min="3" max="18"
                            className="create-form-input"/>
                    <br />

                    <label>Charisma:</label>
                    <br />
                        <input 
                            value={this.state.cha} 
                            onChange={this.handleInput('cha')} 
                            type="number" 
                            id="cha" 
                            name="cha" 
                            step="1" min="3" max="18"
                            className="create-form-input"/>
                    <br />

                    {
                    
                    
                    /* add backgrounds and proficiencies */
                    
                    
                    
                    
                    
                    }

                    <input type="submit" onClick={this.handleSubmit} value="Create Character" />
                </form>
            </div>
        )
    }
}

export default CharacterCreateForm;


