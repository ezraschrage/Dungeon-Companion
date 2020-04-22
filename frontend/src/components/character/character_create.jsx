import React from 'react';
import createImg from '../../assets/images/create-cut.jpg';

class CharacterCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            race: "Dragonborn",
            klass: "Barbarian",
            hitPoints: 1,
            armorClass: 10,
            str: 8,
            dex: 8,
            con: 8,
            int: 8,
            wis: 8,
            cha: 8,
            lvl: 1,
            allowMagic: false,
            proficiencies: []
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.determineArmorClass = this.determineArmorClass.bind(this);
        this.determineStartHp = this.determineStartHp.bind(this);
        this.randomizeStats = this.randomizeStats.bind(this);
        this.statRoller = this.statRoller.bind(this);
        this.handleProfCheckbox = this.handleProfCheckbox.bind(this)
    }

    handleInput(type){
        return (e) => {
            if (type === 'klass'){
                switch(e.target.value){
                    case "Monk":
                    case "Fighter":
                    case "Rogue":
                    case "Barbarian":
                        this.setState({ allowMagic: false })
                        break
                    default:
                        this.setState({ allowMagic: true })
                }
            }

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

    statRoller(){
        let numbers = [Math.floor((Math.random()*6) + 1),
            Math.floor((Math.random()*6) + 1), 
            Math.floor((Math.random()*6) + 1), 
            Math.floor((Math.random()*6) + 1)
        ];
        let topThree = numbers.sort().slice(1);
        return topThree.reduce((a, b) => a + b)
    }

    randomizeStats(e){
        e.preventDefault();
        this.setState({str: this.statRoller()})
        this.setState({dex: this.statRoller()})
        this.setState({con: this.statRoller()})
        this.setState({int: this.statRoller()})
        this.setState({wis: this.statRoller()})
        this.setState({cha: this.statRoller()})
    }

    handleProfCheckbox(skill){
        let { proficiencies }= this.state;
        let skillAlreadyInProfs = false;
        let profIdx = 0;
        proficiencies.forEach((pro, idx) => {
            if (skill === pro){
                skillAlreadyInProfs = true;
                profIdx = idx;
            }
        })

        if (skillAlreadyInProfs) {
            // create first half, second half, and concat
            let cutFirstHalf = proficiencies.slice(0, profIdx);
            let cutSecondHalf = proficiencies.slice(profIdx + 1);
            this.setState({proficiencies: cutFirstHalf.concat(cutSecondHalf)})
        } else {
            proficiencies.push(skill)
        }
        // console.log(this.state.proficiencies)
    }

    handleSubmit(e) {
        e.preventDefault();
        const { con } = this.state;
        // Change AC to be 10 + dex modifier when submitting char
        this.setState({armorClass: this.determineArmorClass()});
        // Set Hitpoints 
        this.setState({hitPoints: this.determineStartHp() + Math.floor((con - 10)/2)});

        // Where do we send the user after the submission? User dashboard? 
        this.props.createCharacter(this.state)
        .then((data) => this.props.history.push(`/characters/${data.character._id}`) );
    }

    render(){
        const races = ["Dragonborn", "Dwarf", "Elf", "Half-Elf", "Halfling", "Human", "Gnome", 
        "Tiefling"]
        const klasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", 
                        "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]
        const skills = ["Athletics", "Acrobatics", "Animal Handling", "Arcana", "Deception", 
                    "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", 
                    "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"]

        return(
            <div className="character-create">
                <div className="character-create-img-container">
                    <img src={createImg} />
                </div>

                <div className="character-create-form">
                    <h1>Create a Character</h1>
                    <hr />
                    <form onSubmit={this.handleSubmit}> 

                    <label className="form-sub-header">Vitals: </label>
                    <div className="vitals-container">
                        <div className="create-field">
                            <label>Name: </label>
                            <br />
                                <input
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleInput('name')}
                                    className="create-form-input"
                                />
                        </div>
                        <br />

                        <div className="create-field">
                            <label>Race: </label>
                            <br />
                            <div>
                                <select id="race" name="race" onChange={this.handleInput('race')}>
                                    {races.map((race, i) => (
                                        <option key={i} value={race}>{race}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <br />

                        <div className="create-field">
                            <label>Class: </label>
                            <br />
                            <div>
                                <select id="klass" name="klass" onChange={this.handleInput('klass')}>
                                    {klasses.map(klass => (
                                        <option key={klass} value={klass}>{klass}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <br />

                        <button onClick={this.randomizeStats} id="stats-roll-button">Roll for Stats!</button>
                        <br />

                        <div className="create-field">
                            <label>Strength: </label>
                            <br />
                            <input 
                                value={this.state.str} 
                                onChange={this.handleInput('str')} 
                                type="number" 
                                id="str" 
                                name="str" 
                                step="1" min="3" max="18"
                                className="create-form-input"/>
                        </div>
                        <br />

                        <div className="create-field">
                            <label>Dexterity: </label>
                            <br />
                            <input 
                                value={this.state.dex} 
                                onChange={this.handleInput('dex')} 
                                type="number" 
                                id="dex" 
                                name="dex" 
                                step="1" min="3" max="18"
                                className="create-form-input"/>
                        </div>
                        <br />

                        <div className="create-field">
                            <label>Constitution: </label>
                            <br />
                            <input 
                                value={this.state.con} 
                                onChange={this.handleInput('con')} 
                                type="number" 
                                id="con" 
                                name="con" 
                                step="1" min="3" max="18"
                                className="create-form-input"/>
                        </div>
                        <br />

                        <div className="create-field">
                            <label>Intelligence: </label>
                            <br />
                            <input 
                                value={this.state.int} 
                                onChange={this.handleInput('int')} 
                                type="number" 
                                id="int" 
                                name="int" 
                                step="1" min="3" max="18"
                                className="create-form-input"/>
                        </div>
                        <br />

                        <div className="create-field">
                            <label>Wisdom: </label>
                            <br />
                            <input 
                                value={this.state.wis} 
                                onChange={this.handleInput('wis')} 
                                type="number" 
                                id="wis" 
                                name="wis" 
                                step="1" min="3" max="18"
                                className="create-form-input"/>
                        </div>
                        <br />

                        <div className="create-field">
                            <label>Charisma: </label>
                            <br />
                            <input 
                                value={this.state.cha} 
                                onChange={this.handleInput('cha')} 
                                type="number" 
                                id="cha" 
                                name="cha" 
                                step="1" min="3" max="18"
                                className="create-form-input"/>
                        </div>
                    </div>
                        <br />

                        <hr />

                        <label className="form-sub-header">Proficiencies &#40;choose two&#41;: </label>
                            <div className="proficiencies-checkbox-container">
                                <ul>
                                {  
                                    skills.map(skill => (
                                        <li key={skill}>
                                            <input 
                                                className="sub-prof"
                                                type="checkbox" 
                                                id={skill} 
                                                name={skill} 
                                                value={skill} 
                                                onChange={() => this.handleProfCheckbox(skill)}
                                            />
                                            <label>{skill}</label><br />
                                        </li>
                                    ))
                                }
                                </ul>
                            </div>
                            <hr />
                            <div className="submit-container">
                                <input 
                                    id="create-button" 
                                    type="submit"  
                                    value="Create Character" 
                                />
                            </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CharacterCreateForm;


