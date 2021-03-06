import React, { useState, useEffect } from 'react'
import personService from './services/personService'


const Notification = ({message}) => {
  
  const style = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 20,
    background: 'lightgrey',
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "solid",
    borderStyle: "solid"
  }
  
  if(message === null){
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )

}

const ErrorNotification = ({message}) => {
  
  const style = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 20,
    background: 'lightgrey',
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "solid",
    borderStyle: "solid"
  }
  
  if(message === null){
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )

}


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

const Persons = ({personsToShow, handleDelete}) => {
  return(
  <ul>
    {personsToShow.map(person=>{
      return (
      <li key={person.name}>
        {person.name}
        {" "} {person.number}
        {" "} <button onClick={() => handleDelete(person.id)}>delete</button>
      </li>
      )
    })}
  </ul>
  )
}



const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ addMessage, setAddMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)


  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  },[])


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


  const handleDelete = (id) => {
    const person = persons
      .find(person => person.id===id)

    if(window.confirm(`Delete ${person.name} ?`)){
      const newPersons = persons
      .filter(person => person.id !== id)

      personService
        .deletePerson(id)
        .then(() => {
          setPersons(newPersons)
          setAddMessage(`${person.name} succesfully deleted`)
          setTimeout(() => {
            setAddMessage(null)
          }, 3000)
        })
    }  
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

    const newPerson = {name: newName, number: newNumber}
    
    if(!nameList.includes(newName)){
      personService
        .postNew(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName("")
          setNewNumber("")
          setAddMessage(`${response.name} was added to the phonebook`)
          setTimeout(() => {
            setAddMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })

    } else {
      if(window.confirm("Chosen person is already added, replace old number with a new one?")){
        const oldPerson = persons.find(person => person.name === newName)
        
        personService
          .changeNumber(oldPerson.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => person === oldPerson ? response : person))
            setNewName("")
            setNewNumber("")
            setAddMessage(`Number of ${response.name} was changed to ${response.number}`)
            setTimeout(() => {
              setAddMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`${oldPerson.name} was already removed from the list`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      }
    }
  }
  console.log(addMessage)


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} />
      <ErrorNotification message={errorMessage} />

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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )

}

export default App