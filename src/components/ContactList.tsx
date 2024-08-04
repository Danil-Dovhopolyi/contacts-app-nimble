import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../store/contactsSlice";
import { RootState, AppDispatch } from "../store";
import ContactCard from "./ContactCard";

const ContactList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const status = useSelector((state: RootState) => state.contacts.status);
  const error = useSelector((state: RootState) => state.contacts.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContacts());
    }
  }, [status, dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="space-y-4">
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;
