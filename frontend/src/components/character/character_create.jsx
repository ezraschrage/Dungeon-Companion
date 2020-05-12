import React from 'react';
import createImg from '../../assets/images/create-cut.jpg';

class CharacterCreateForm extends React.Component {
    constructor(props) {
        super(props);
        const proficienciesList = {} 
        if(this.props.character){
            this.props.character.proficiencies.forEach(pro => {
                proficienciesList[pro] = pro;
            });
        }
        this.state = { 
            ...this.props.character,
            proficienciesList,
            proficienciesAmount: 2,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.determineArmorClass = this.determineArmorClass.bind(this);
        this.determineStartHp = this.determineStartHp.bind(this);
        this.randomizeStats = this.randomizeStats.bind(this);
        this.statRoller = this.statRoller.bind(this);
        this.handleProfCheckbox = this.handleProfCheckbox.bind(this)
    }

    componentDidMount(){
        if(!this.props.character){
            if(this.props.formType === 'Edit'){
                this.props.getCharacter(this.props.match.params.charId)
                .then(({character}) => {
                    const proficienciesList = {} 
                    character.proficiencies.forEach(pro => {
                        proficienciesList[pro] = pro;
                    });
                    this.setState({ 
                        ...character,
                        proficienciesList,
                        proficienciesAmount: 2,
                    });
                })
               
            }
        }
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

    handleInputStat(type){
        return (e) => {
            this.setState({ [type]: parseInt(e.target.value)});
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
        const newProf = Object.assign({}, this.state.proficienciesList);
        if(this.state.proficienciesList[skill]){
            delete newProf[skill];
            this.setState({proficienciesList: newProf});
        }
        else{
            if(Object.values(this.state.proficienciesList).length < this.state.proficienciesAmount){
                newProf[skill] = skill;
                this.setState({proficienciesList: newProf});
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { con } = this.state;
        // Change AC to be 10 + dex modifier when submitting char
        // Set Hitpoints 
        const character = {
            ...this.state,
            proficiencies: Object.values(this.state.proficienciesList),
            hitPoints: this.determineStartHp() + Math.floor((con - 10)/2),
            armorClass: this.determineArmorClass(),
        }
        if(this.props.formType === 'Edit'){
            this.props.updateCharacter(character, character._id)
            .then((data) => this.props.history.push(`/characters/${data.character._id}`) )
            .catch((err) => (err));
        }else{
            this.props.createCharacter(character)
            .then((data) => this.props.history.push(`/characters/${data.character._id}`) )
            .catch((err) => (err));
        }
    }

    render(){
        const races = ["Dragonborn", "Dwarf", "Elf", "Half-Elf", "Half-Orc", "Halfling", "Human", "Gnome", 
        "Tiefling"]
        const klasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", 
                        "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]
        const skills = ["Athletics", "Acrobatics", "Animal Handling", "Arcana", "Deception", 
                    "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", 
                    "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"]
        if(!this.props.character) return (<div>loading</div>)
        return(
            <div className="character-create">
                <div className="character-create-img-container">
                    <img src={createImg} />
                </div>

                <div className="character-create-form">
        <h1>{this.props.formType === 'Edit' ? 'Edit a Character' : 'Create a Character'}</h1>
                    <hr />
                    <form onSubmit={this.handleSubmit}> 

                    <label className="form-sub-header">Vitals: </label>
                    <div className="vitals-container">
                        <div className="create-field">
                            <label>Name: </label>
                                <input
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleInput('name')}
                                    className="create-form-input"
                                />
                        </div>

                        <div className="create-field">
                            <label>Race: </label>
                            <div>
                                <select id="race" name="race" onChange={this.handleInput('race')}>
                                    {races.map((race, i) => (
                                        <option key={race} selected={this.props.character.race === race ? 'selected': '' } value={race}>{race}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="create-field">
                            <label>Class: </label>
                            <br />
                            <div>
                                <select id="klass" name="klass" onChange={this.handleInput('klass')}>
                                    {klasses.map(klass => (
                                        <option key={klass} selected={this.props.character.klass === klass ? 'selected': '' }  value={klass}>{klass}</option>
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
                                onChange={this.handleInputStat('str')} 
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
                                onChange={this.handleInputStat('dex')} 
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
                                onChange={this.handleInputStat('con')} 
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
                                onChange={this.handleInputStat('int')} 
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
                                onChange={this.handleInputStat('wis')} 
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
                                onChange={this.handleInputStat('cha')} 
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
                                           
                                            <label htmlFor={skill} className={'sub-prof '+ (!!this.state.proficienciesList[skill] ? 'prof-checked' : '')} onClick={() => this.handleProfCheckbox(skill)} >{skill}</label><br />
                                        </li>
                                    ))
                                }
                                </ul>
                            </div>
                            <hr />
                            <div className="submit-container">
                                <button id='create-button'>{this.props.formType === 'Edit' ? 'Edit Character' : 'Create Character'} </button>
                                
                            </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CharacterCreateForm;


