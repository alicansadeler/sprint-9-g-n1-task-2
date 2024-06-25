import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
};

export default function Login({ notifySuccess, notifyError }) {
  const [form, setForm] = useState(initialForm);

  const history = useHistory();

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.terms) return;

    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          toast.success(`Merhaba ${user.name}, tekrar hoş geldin.`);
          history.push('/main');
        } else {
          toast.error(`Girdiğiniz bilgilerle bir kullanıcı bulamadık.`);
          history.push('/error');
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
        />
      </FormGroup>

      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button disabled={!form.terms} color="primary">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
