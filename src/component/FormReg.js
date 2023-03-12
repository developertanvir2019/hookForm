import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import app from './Firebase.init';
import { useState } from 'react';
const auth = getAuth(app)

const FormReg = () => {
    const [success, setSuccess] = useState(false)
    const handleReg = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        if (!/(?=.*[A-z].*[A-Z])/.test(password)) {
            alert('Your password is very week')
            return;
        }
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setSuccess(true);
                form.reset()
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <Form onSubmit={handleReg} className='w-50 mx-auto'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" required />
            </Form.Group>
            {
                success && <h4>user log in successFull</h4>

            }
            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    );
}

export default FormReg;