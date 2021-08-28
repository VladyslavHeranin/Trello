import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../actions/user"
import { NavLink } from "react-router-dom"

export const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const changeHandler = event => {
        setForm({
            ...form, [event.target.name]: event.target.value
        })
    }

    const dispatch = useDispatch()

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h3>Hello!</h3>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <div>
                            <div className="input-field ">
                                <input
                                    placeholder="email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field ">
                                <input
                                    placeholder="password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">


                        {form.password.length < 6 ? <button
                            className=" btn greey "
                        >
                            log in
                        </button> : <NavLink to="/createList">
                            <button
                                className=" btn yellow "
                                onClick={() => dispatch(login(form.email, form.password))}
                            >
                                log in
                            </button></NavLink>}
                    </div>
                </div>
            </div>
        </div>
    )
}

