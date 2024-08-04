import React from "react";
import CreateContact from "../components/CreateContact";
import ContactList from "../components/ContactList";

const ContactListPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-800 text-white min-h-screen">
      <div className="p-4 md:w-1/3 sticky top-0 bg-gray-900">
        <h1 className="text-2xl mb-4">Create Contact</h1>
        <CreateContact />
      </div>
      <div className="p-4 md:w-2/3 bg-gray-800">
        <h1 className="text-2xl mb-4">Contacts</h1>
        <ContactList />
      </div>
    </div>
  );
};

export default ContactListPage;
