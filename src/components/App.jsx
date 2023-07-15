import { Component } from 'react';
import { nanoid } from 'nanoid';
import React from 'react';
import './App.css';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

// comment to delete

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  constructor() {
    super();
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    this.state.contacts = parsedContacts || [];
  }

  addNewContact = event => {
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
      this.state.contacts.some(
        contact =>
          contact.name.toLowerCase() === newContact.name.toLowerCase() ||
          contact.number.toLowerCase() === newContact.number.toLowerCase()
      )
    ) {
      alert(`${newContact.name} already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
      event.target.reset();
    }
  };

  deleteContact = idToDelete => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idToDelete),
    }));
  };

  setStateInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  filterContacts = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  renderContacts = () => {
    const { filter, contacts } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts.map(contact => (
      <li key={contact.id}>
        {contact.name}: {contact.number}
        <button onClick={() => this.deleteContact(contact.id)}>delete</button>
      </li>
    ));
  };

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    return (
      <div className="wrapper">
        <ContactForm
          submit={this.addNewContact}
          contacts={this.state.contacts}
        />
        <ContactList list={this.renderContacts()}>
          <Filter filteredContacts={this.filterContacts} />
        </ContactList>
      </div>
    );
  }
}

export default App;
