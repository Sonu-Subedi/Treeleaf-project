import { useState, useRef } from "react";
import "./styles/App.css";
import InputForm from "./components/InputForm";
import RecordTable from "./components/RecordTable";
import EditModal from "./components/EditModal";

const App = () => {
  const [values, setValues] = useState({
    name: "",
    emailAddress: "",
    phoneNumber: "",
    birthday: "",
    city: "",
    district: "",
    province: "",
    country: "",
  });

  const [records, setRecords] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const formRef = useRef(null);
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
      errorMessage: "Please enter Name",
      required: true,
    },
    {
      id: 2,
      name: "emailAddress",
      type: "text",
      placeholder: "name@example.com",
      label: "Email",
      errorMessage: "Please enter an email address in a valid format",
      required: true,
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "text",
      placeholder: "Phone Number",
      label: "Phone Number",
      errorMessage: "Phone number must be only number and at least 7 digits",
      pattern: "[0-9]{7,10}",
    },
    {
      id: 4,
      name: "birthday",
      type: "date",
      placeholder: "DOB",
      label: "DOB",
      errorMessage: "Please select a birth date",
    },

    {
      id: 5,
      name: "city",
      type: "text",
      placeholder: "City",
      label: "City",
      errorMessage: "Please enter your city",
      required: true,
    },
    {
      id: 6,
      name: "district",
      type: "text",
      placeholder: "District",
      label: "District",
      errorMessage: "Please enter your district",
      required: true,
    },
    {
      id: 7,
      name: "province",
      type: "select",
      label: "Province",
      options: [
        { value: 1, label: "Province 1" },
        { value: 2, label: "Province 2" },
        { value: 3, label: "Province 3" },
        { value: 4, label: "Province 4" },
        { value: 5, label: "Province 5" },
        { value: 6, label: "Province 6" },
        { value: 7, label: "Province 7" },
      ],
      errorMessage: "Please select your province",
      required: true,
    },
    {
      id: 8,
      name: "country",
      type: "text",
      placeholder: "Country",
      label: "Country",
      value: "Nepal",
      disabled: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      name: values.name,
      emailAddress: values.emailAddress,
      phoneNumber: values.phoneNumber,
      birthday: values.birthday,
      city: values.city,
      district: values.district,
      province: values.province,
      country: values.country,
    };
    setRecords([...records, newRecord]);

    setValues({
      name: "",
      emailAddress: "",
      phoneNumber: "",
      birthday: "",
      city: "",
      district: "",
      province: "",
      country: "",
    });
  };

  const handleDelete = (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (isConfirmed) {
      const updatedRecords = [...records];
      updatedRecords.splice(index, 1);
      setRecords(updatedRecords);
    }
  };

  const handleEdit = (index) => {
    window.scrollTo(0, formRef.current.offsetTop);
    setValues(records[index]);
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    const editedRecord = {
      name: values.name,
      emailAddress: values.emailAddress,
      phoneNumber: values.phoneNumber,
      birthday: values.birthday,
      city: values.city,
      district: values.district,
      province: values.province,
      country: values.country,
    };

    const indexToUpdate = records.findIndex(
      (record) => record.emailAddress === values.emailAddress
    );

    if (indexToUpdate !== -1) {
      const updatedRecords = [...records];
      updatedRecords[indexToUpdate] = editedRecord;
      setRecords(updatedRecords);
      setIsEditModalOpen(false);
      clearForm();
    }
  };

  const clearForm = () => {
    setValues({
      name: "",
      emailAddress: "",
      phoneNumber: "",
      birthday: "",
      city: "",
      district: "",
      province: "",
      country: "",
    });
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <InputForm
            key={input.id}
            {...input}
            value={input.name === "country" ? "Nepal" : values[input.name]}
            onChange={onChange}
            options={input.options}
            required={
              input.required &&
              input.name !== "city" &&
              input.name !== "district" &&
              input.name !== "province"
            }
          />
        ))}
        <button>SUBMIT</button>
      </form>

      <RecordTable
        records={records}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {isEditModalOpen && (
        <EditModal
          values={values}
          onSave={handleSave}
          onCancel={() => {
            setIsEditModalOpen(false);
            clearForm();
          }}
        />
      )}
    </>
  );
};

export default App;
