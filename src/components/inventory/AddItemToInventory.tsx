import * as React from 'react';
import style from './../../styles/AddItemToInventory.module.css'
import FIRE from "../../firebase/fire";

interface Props {
    place: string,
    count: (count: string) => void,
}

function AddItemToInventory({ place, count }: Props) {
    const formState = {
        name: '',
        count: '',
    }
    const [item, setItem] = React.useState(formState)
    console.log(place)
    const onSubmit = () => {
        let filestore = FIRE.firestore();
        filestore.collection("inventory").doc().set({
            name: item.name,
            count: item.count,
            place: filestore.collection("places").doc(place)
        })
        count(item.count)
    }

    const inputChange = (event: any) => {
        const {name, value} = event.currentTarget;
        setItem({...item, [name]: value})
    }

    return (
        <>
            {
                place != '' ? (
                    <div>
                        <h3>Add item to {place}: </h3>
                        <div className={style.formInputs}>
                            <input
                                className={style.singleInput}
                                type='text'
                                placeholder='name:'
                                name='name'
                                value={item.name}
                                onChange={inputChange}
                            />
                            <input
                                className={style.singleInput}
                                type='text'
                                placeholder='count:'
                                name='count'
                                value={item.count}
                                onChange={inputChange}
                            />
                        </div>
                        <button onClick={onSubmit}>
                            Save
                        </button>
                    </div>
                ) : null

            }
        </>
    )
}

export default AddItemToInventory;