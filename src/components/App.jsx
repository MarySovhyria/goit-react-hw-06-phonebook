import { Component } from 'react';
import ContactForm from './phoneBook/contactForm';
import ContactList from './phoneBook/contactList';
import Filter from './phoneBook/filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddNewContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const contactsName = contacts.map(contact => contact.name);

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleAddNewContact}
          contactsName={contactsName}
        />

        <h2>Contacts</h2>
        <div>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            visibleContacts={visibleContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;