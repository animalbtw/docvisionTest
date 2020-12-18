import * as React from 'react';
import FIRE from "../firebase/fire";
import PlaceItem from "./PlaceItem";
import InventoryTable from "./inventory/InventoryTable";
import style from '../styles/BuildingsTable.module.css'


function BuildingsTable() {
    const [place, setPlace] = React.useState<Array<any>>([])
    const [selected, setSelected] = React.useState<any>()
    const [chosenRoom, setChosenRoom] = React.useState('')
    const [isMain, setIsMain] = React.useState(false)
    const [isProd, setIsProd] = React.useState(false)
    React.useEffect(() => {
        FIRE.firestore().collection("places")
            .get()
            .then(response => {
                let docs = response.docs.map(x => ({
                    id: x.id,
                    data: x.data(),
                    parts: x.data().parts && x.data().parts.map((part: any) => part.id)
                }))
                setPlace(docs)
            })
    }, [])

    return (
        <div className={style.mainWrapper}>
            <div className={style.items}>
                <div className={style.buttonsChecker}>
                    <button
                        className={style.singleButtonCheck}
                        onClick={() => setIsMain(!isMain)}>Main</button>
                    <button
                        className={style.singleButtonCheck}
                        onClick={() => setIsProd(!isProd)}>Production</button>
                </div>
                {
                    isMain ? (
                        <>
                            {place.filter(it => it.id.includes('main') ? (it.id) : null
                            ).map(location => (
                                <div
                                    className={style.singleItem}
                                    key={location.id}>
                                    <PlaceItem
                                        setSelected={setSelected}
                                        place={location}
                                        selected={selected}
                                        setChosenRoom={setChosenRoom}
                                        chosenRoom={chosenRoom}/>
                                </div>
                            ))}
                        </>
                    ) : null
                }
                {
                    isProd ? (
                        <>
                            {place.filter(it => it.id.includes('production') ? (it.id) : null
                            ).map(location => (
                                <div
                                    className={style.singleItem}
                                    key={location.id}>
                                    <PlaceItem
                                        setSelected={setSelected}
                                        place={location}
                                        selected={selected}
                                        setChosenRoom={setChosenRoom}
                                        chosenRoom={chosenRoom}/>
                                </div>
                            ))}
                        </>
                    ) : null
                }

            </div>
            <InventoryTable chosenRoom={chosenRoom} selected={selected}/>
        </div>
    )
}

export default BuildingsTable;