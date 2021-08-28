import { useSelector, useDispatch } from "react-redux"
import { delList, createItem, delItem ,Auth } from "../../actions/user"
import { useState , useEffect } from "react"


export const Trello = (props) => {

      const [itemControler , setItemControler] = useState(null)

      const [name , setName] = useState("")

      const test = useSelector(state => state.user.currentUser)

      const lists = test.lists

      const currentUser = test.user

        useEffect(() => {
               dispatch(Auth())
                }, [])


  const dragStartHendler = (e, list , item) => {
        setItemControler(item) 
        dispatch(delItem(item._id))
    }

    const dragLeaveHendler = (e) => {
    }

    const dragEndHendler = (e , card) => {
    }

    const dragOverHendler = (e) => {
        e.preventDefault()
    }

    const dragOnDroprHendler = (e, list) => {
        e.preventDefault()

        if(itemControler.name !== ""){
             dispatch(createItem(list, currentUser.id, itemControler.name))
        }
    }

    const dispatch = useDispatch()

    return (
        <div className="list">

            {lists.map((list, i) =>
            
                <div className="row" key={i} > 
    <div className="col s12 m12">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{list.name}</span> 
          {list.items.map((item, i) => <div key={i}

                        className="item"

                        onDragStart={(e) => dragStartHendler(e , list._id, item)}
                        onDragLeave={(e) => dragLeaveHendler(e)}
                        onDragEnd={(e) => dragEndHendler(e)}
                        onDragOver={(e) => dragOverHendler(e)}
                        onDrop={(e) => dragOnDroprHendler(e , list._id )}

                        draggable={true}
                    >
                        <p>{item.name}</p>

                        <button  className="btn-floating  waves-effect waves-light red-grey" onClick={() => dispatch(delItem(item._id))}>
                        &#x2716;
                          </button>
                    </div>
                    )
                }
               </div>
              <div className="card-action">
                            <div className="input-field ">
                                    <input
                                        // placeholder="Name item"
                                        id="name"
                                        type="text"
                                        name="name"
                                        onChange={(event) =>{
                                            setName(event.target.value)
                                        } }
                                    />
                                       <label className="text-white" >Name</label>
                                </div>

         {list.items.length === 0 && <button className="btn red" onClick={() => dispatch(delList(list._id))}>Delete</button>}    


         <button className="btn yello" onClick={() =>{
                   dispatch(createItem(list._id, currentUser.id, name))
           } }>
           Create
           </button>

        </div>
      </div>
    </div>
            </div>)}

        </div>
    )
}