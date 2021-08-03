import React, { useState, useContext } from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

import { useForm } from '../util/hooks'

import { AuthContext } from '../context/auth'

function Login(props) {

    const context = useContext(AuthContext)

    const [errors, setErrors] = useState({})

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''

    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, initialState)



    const [login, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            //console.log(result)
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.errors)
            setErrors(err.graphQLErrors[0].extensions.errors)
        }
        ,
        variables: values
    })



    function loginUserCallback() {
        login()
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Log in</h1>

                <Form.Input label="Username" placeholder="Username.." name="username" type="text" value={values.username} error={errors.username ? true : false} onChange={onChange} />
                <Form.Input label="Password" placeholder="Password.." name="password" type="password" value={values.password} error={errors.password ? true : false} onChange={onChange} />

                <Button type="submit" primary>Log in</Button>

            </Form>

            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}> {value} </li>
                        ))}
                    </ul>
                </div>

            )}


        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username:String!
        $password:String!      
    ){
        login(            
            username:$username
            password:$password            
        )
        {
                id
                email
                username
                createdAt
                token
        }
    }
`

export default Login;