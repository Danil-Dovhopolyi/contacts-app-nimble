import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../store/contactsSlice";
import { ICreateContactPayload } from "../types/ICreateContactPayload";
import { AppDispatch } from "../store";

const CreateContact: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("First name is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      })}
      onSubmit={(values, { resetForm }) => {
        const newContact: ICreateContactPayload = {
          "first name": [
            { value: values.firstName, modifier: "", label: "first name" },
          ],
          "last name": values.lastName
            ? [{ value: values.lastName, modifier: "", label: "last name" }]
            : undefined,
          email: [{ value: values.email, modifier: "", label: "email" }],
          record_type: "person",
          privacy: { edit: null, read: null },
          owner_id: null,
        };
        dispatch(addContact(newContact));
        resetForm();
      }}
    >
      <Form className="flex flex-col space-y-4">
        <div>
          <Field
            name="firstName"
            type="text"
            placeholder="First Name"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div>
          <Field
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
        </div>
        <div>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <button
          type="submit"
          className="p-2 rounded-md bg-blue-600 hover:bg-blue-700"
        >
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default CreateContact;
