import * as React from 'react';
import Rooms from "./rooms/Rooms";
import style from './../styles/PlaceItem.module.css'

interface Props {
    place: any,
    setSelected: (id: any) => void,
    selected: string
    setChosenRoom: (chosenRoom: string) => void,
    chosenRoom: string,
}

function PlaceItem({chosenRoom, selected, place, setSelected, setChosenRoom }: Props) {
    const onSelect = () => {
        setSelected(place.id)
    }

    return (
        <div className={style.wrapper}>
            <button
                className={style.button}
                onClick={ onSelect }>
                { place.id }
            </button>
            <Rooms
                setChosenRoom={setChosenRoom}
                building={ selected }
                place={ place }
                chosenRoom={chosenRoom}/>
        </div>
    )
}

export default PlaceItem;