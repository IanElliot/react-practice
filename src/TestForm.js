import { useState } from "react";

const TestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onHandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      TestForm
      <input
        value={formData.name}
        onChange={onHandleChange}
        name="name"
      ></input>
      <input
        value={formData.email}
        onChange={onHandleChange}
        name="email"
      ></input>
      <input
        value={formData.password}
        onChange={onHandleChange}
        name="password"
      ></input>
      <input
        value={formData.confirmPassword}
        onChange={onHandleChange}
        name="confirmPassword"
      ></input>
      {formData.name}
      {formData.email}
      {formData.password}
      {formData.confirmPassword}
    </div>
  );
};

export default TestForm;
