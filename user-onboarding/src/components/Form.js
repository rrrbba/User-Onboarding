import React, { useState, useEffect } from "react";
import { withFormik, Form, Field} from "formik";
import axios from 'axios';
import * as Yup from 'yup';
import styled from "styled-components";


const StyledField = styled(Field)`
    padding: 1.5%;
    margin-left:43%;
    border-radius: 4px;
    display: flex;
    margin-bottom: 5%;
    color: lightpink;
    
`

const StyledP = styled.p`
    font-size: 1rem;
    margin-top: -4%;
    margin-bottom: 5%;
    font-weight: bold;

`

const StyledButton = styled.button`
    width: 10%;
    padding: 2%;
    border-radius: 3px;
    font-weight: bold;
    font-size: 1.1rem;
    display: flex;
    margin-left 45%;
    margin-top: 3%;
    color: lightpink;
    
`
const StyledLabel = styled.label`
    margin-bottom: 40%;
    padding-bottom: 20%;
    font-weight: bold;
`

const UserForm = ({values, errors, touched, status}) => {
    
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status])



    return (
        
        <div className = "userF">
       
        <Form>

            <StyledField
            type = "text"
            name = "name"
            placeholder = "Name" 
            />

            {touched.name && errors.name && (
                <StyledP>{errors.name}</StyledP>
            )}

            <StyledField
            type = "text"
            name = "email"
            placeholder = "Email"
            />

            {touched.email && errors.email && (
                <StyledP>{errors.email}</StyledP>
            )}

            <StyledField
            type = "password"
            name = "password"
            placeholder = "Password"
            />

            {touched.password && errors.password && (
                <StyledP>{errors.password}</StyledP>
            )}


            <StyledLabel className = "service">
            Agree to our Terms of Service
            <Field
            type = "checkbox"
            name = "terms"
            checked = {values.terms}
            />
            <span className = "checkmark"></span>
            </StyledLabel>

            <StyledButton type="submit">Submit</StyledButton>

        </Form>

            {users.map(user => (
                <ul key = {users.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}

        </div>
    );
};

const FormikUserForm = withFormik ({
    
    mapPropsToValues({name, email, password, terms}){

        return{

            name: name || "",

            email: email || "",

            password: password || "",

            terms: terms || false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
        .min(2, "Please enter a name that is more than 1 character in length")
        .required("Please enter your name"),

        email: Yup.string()
        .email("Please enter a valid email address")
        .required("Please enter your email address"),

        password: Yup.string()
        .min(7, "Password must be at least 7 characters long")
        .max(20, "Password must be between 7-20 characters")
        .required("A password is required"),
    }),


    handleSubmit(values, { setStatus, resetForm }) {
        axios
        .post("https://reqres.in/api/users/", values)
        .then (response => {
            setStatus(response.data);
            resetForm();
        })
        .catch(error =>
            console.log(error.response))
    }
})(UserForm)





export default FormikUserForm