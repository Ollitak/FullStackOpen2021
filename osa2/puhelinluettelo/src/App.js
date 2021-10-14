import React, { useState } from 'react'


const Filter = (props) => {
return(
  <div>
    filter shown with <input value={props.filter} onChange={props.makeFilter}/>
  </div>
)
}

const PersonForm = ({savePerson,newName,handleNameChange,newNumber,handleNumberChange}) => {
return(
  <form onSubmit={savePerson}>
      name: <input value={newName} onChange={handleNameChange} />
      <br />
      number: <input value={newNumber} onChange={handleNumberChange} />
      <br />
      <button type="submit">add</button>
  </form>
)
}

const Persons = ({personsToShow}) => {
  return(
  <ul>
    {personsToShow.map((person)=> <li key={person.name}> {person.name} {person.number} </li>)}
  </ul>
  )
}




const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const personsToShow = persons.filter(person =>
     person.name.toLowerCase().includes(filter.toLowerCase()))


  const handleNameChange = (event) => {
    console.log("name log: " + event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log("number log: " + event.target.value)
    setNewNumber(event.target.value)
  }

  const makeFilter = (event) => {
    setFilter(event.target.value)
  }


  const savePerson = (event) => {
    event.preventDefault()
    
    // Create array of strings in order to use Array.includes method correctly
    let nameList = []
    persons.forEach((person) => {
      nameList = nameList.concat(person.name)
    })
    
    if(!nameList.includes(newName)){
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName("")
      setNewNumber("")
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter makeFilter={makeFilter} filter={filter} />
      

      <h2> add a new </h2>
      <PersonForm 
        savePerson={savePerson} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
       />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App