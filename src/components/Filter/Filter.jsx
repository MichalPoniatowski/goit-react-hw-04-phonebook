import css from './Filter.module.css';

const Filter = ({ filteredContacts }) => {
  return (
    <div className={css.filter}>
      <span>Find contacts by name: </span>
      <input
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={filteredContacts}
        placeholder="Type name"
      />
    </div>
  );
};

export default Filter;
