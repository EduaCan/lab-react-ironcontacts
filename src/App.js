import "./App.css";
import contacts from "./contacts.json";
import { useState } from "react";

function App() {
  const contactsFirstFive = contacts.slice(0, 5);
  const [contactList, setContactList] = useState(contactsFirstFive);

  const addRandomContact = () => {
    const contactListClone = structuredClone(contactList);

    const noDuplicates = () => {
      let randomContact = contacts[Math.floor(Math.random() * contacts.length)];
      if (
        contactListClone.some((contact) => {
          return contact.name === randomContact.name;
        })
      ) {
        return noDuplicates();
      } else {
        return randomContact;
      }
    };
    contactListClone.push(noDuplicates());
    setContactList(contactListClone);
  };

  const sortContacts = () => {
    const contactListClone = structuredClone(contactList) 
    contactListClone.sort((elem2, elem1)=>elem2.name>elem1.name ? 1 : -1)
    setContactList(contactListClone)
  }

  const deleteContact = (contactName) => {
    const contactListClone = structuredClone(contactList) 
    const filteredContacts = contactListClone.filter((eachContact)=> {
      return eachContact.name === contactName ? false : true
    })
    setContactList(filteredContacts)
  }

  return (
    <div className="App">
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortContacts}>Sort Contacts</button>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th></th>
        </tr>
        {contactList.map((eachContact, index) => {
          return (
            <tr key={index}>
              <td>
                <img src={eachContact.pictureUrl} alt="" width="50px" />
              </td>
              <td>{eachContact.name}</td>
              <td>{eachContact.popularity}</td>
              <td>{eachContact.wonOscar ? "🏆" : ""}</td>
              <td>{eachContact.wonEmmy ? "🏆" : ""}</td>
              <td><button onClick={()=>deleteContact(eachContact.name)}>Delete Contact</button></td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
