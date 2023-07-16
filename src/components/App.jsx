import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import React from 'react';
import './App.css';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState();
  const [filter, setFilter] = useState();

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      setContacts({ contacts: parsedContacts });
    }
  }, []);

  const addNewContact = event => {
    event.preventDefault();

    const nameValue = event.target.elements.name.value;
    const numberValue = event.target.elements.number.value;
    const namePattern = new RegExp(event.target.elements.name.pattern);
    const numberPattern = new RegExp(event.target.elements.number.pattern);

    const newContact = {
      id: nanoid(),
      name: event.target.elements.name.value,
      number: event.target.elements.number.value,
    };

    const isNameValid = namePattern.test(nameValue);
    const isNumberValid = numberPattern.test(numberValue);

    let errorMessage = '';

    if (!isNameValid) {
      errorMessage += 'Invalid name input. ';
    }
    if (!isNumberValid) {
      errorMessage += 'Invalid number input.';
    }
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase() === newContact.name.toLowerCase() ||
          contact.number.toLowerCase() === newContact.number.toLowerCase()
      )
    ) {
      alert(`${newContact.name} already in contacts`);
    } else {
      setContacts(prevContacts => ({
        contacts: [...prevContacts.contacts, newContact],
      }));
      event.target.reset();
    }
  };

  const deleteContact = idToDelete => {
    setContacts(prevContacts => ({
      contacts: prevContacts.contacts.filter(
        contact => contact.id !== idToDelete
      ),
    }));
  };

  const filterContacts = event => {
    setFilter({
      filter: event.target.value,
    });
  };

  const renderContacts = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts.map(contact => (
      <li key={contact.id}>
        {contact.name}: {contact.number}
        <button onClick={() => deleteContact(contact.id)}>delete</button>
      </li>
    ));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }, [contacts]);

  return (
    <div className="wrapper">
      <ContactForm submit={addNewContact()} contacts={contacts} />
      <ContactList list={renderContacts()}>
        <Filter filteredContacts={filterContacts()} />
      </ContactList>
    </div>
  );
};
