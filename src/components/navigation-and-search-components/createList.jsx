import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { createList } from "../../actions/user"

export const CreateList = (props) => {
    const [name, setName] = useState({
        name: "",
    })

    const createFormList = (event) => {
        setName({
            ...name, [event.target.name]: event.target.value
        })
    }

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.currentUser.user)

    return <div>

         <div className="card  darken-1 black-text">
            <div className="row">
                <div className="col s6 offset-s3">
                   <h3>Create list</h3>
                      <div className="card blue darken-1">
                         <div className="card-content white-text">
                             <div>
                                 <div className="input-field ">
                                    <input
                                        // placeholder="name"
                                        id="name"
                                        type="text"
                                        name="name"
                                        onChange={createFormList}
                                    />
                                    <label className="text-white" >Name</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">

                        {name.name !== "" && <NavLink to="/trello">
                                <button
                                    className="btn yellow"
                                    onClick={() => {
                                         dispatch(createList(
                                             user.id,
                                             name.name,
                                           ))
                                    }} >
                                    Add
                                </button>
                            </NavLink>}

                            <NavLink to="/trello">
                                <button className="btn">
                                    Close
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}