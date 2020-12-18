import * as React from 'react';
import FIRE from "../../firebase/fire";
import AddItemToInventory from "./AddItemToInventory";

interface Props {
    chosenRoom: string,
    selected: string
}

function InventoryTable({chosenRoom, selected}: Props) {
    const [inventory, setInventory] = React.useState<Array<any>>([])
    const [count, setCount] = React.useState<string>('')
    console.log(chosenRoom)
    React.useEffect(() => {
        FIRE.firestore().collection("inventory")
            .get()
            .then(response => {
                const docs = response.docs.map(x => ({
                    id: x.id,
                    data: x.data,
                    name: x.data().name,
                    count: x.data().count,
                    placeId: x.data().place.id
                }));
                setInventory(docs)
                console.info(docs)
            })
            .catch(function (e) {
                    console.log(e.message)
                }
            )
    }, [])

    const onEdit = (id: string) => {
        FIRE.firestore().collection("inventory").doc(id).set({
            count: count
        }).then(() => {
            console.info('Done')
        })
    }

    const onDelete = (id: string) => {
        FIRE.firestore().collection("inventory").doc(id).delete().then(() => {
            console.info("Done")
        })
    }

    return (
        <div>
            {
                inventory.map(item => (
                    <div key={item.id}>
                        {item.name}
                        <button
                            onClick={() => onEdit(item.id)}>
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(item.id)}>
                            Delete
                        </button>
                    </div>
                ))
            }
            <AddItemToInventory
                place={chosenRoom}
                count={setCount}/>
        </div>
    )
}

export default InventoryTable;