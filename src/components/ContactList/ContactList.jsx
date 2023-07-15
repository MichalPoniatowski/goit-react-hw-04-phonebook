import css from './ContactList.module.css';

const ContactList = ({ list, children }) => {
  return (
    <div className={css.list}>
      <h2>Contacts</h2>
      {children}
      <ul>{list}</ul>
    </div>
  );
};

export default ContactList;
