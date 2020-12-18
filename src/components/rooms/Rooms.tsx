import * as React from 'react';
import style from './../../styles/PlaceItem.module.css'

interface Props {
    building: string,
    place: any,
    setChosenRoom: (chosenRoom: string) => void,
    chosenRoom: string
}

function Rooms({building, place, setChosenRoom, chosenRoom}: Props) {
    return (
        <div>
            {
                building == place.id ? (
                    <>
                        {
                            place.parts != undefined ? (
                                <>
                                    {
                                        place.parts.length > 1 ? (
                                            <select
                                                className={style.selectRoom}
                                                value={chosenRoom}
                                                onChange={e => setChosenRoom(e.target.value)}>
                                                {
                                                    place.parts.map((part: string) => (
                                                        <option
                                                            value={part}
                                                            key={part}>
                                                            {part}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        ) : (
                                            <>
                                                {
                                                    place.parts.map((part: string) => (
                                                        <button
                                                            key={part}
                                                            onClick={() => setChosenRoom(part)}>
                                                            {part}
                                                        </button>))
                                                }
                                            </>
                                        )
                                    }

                                </>
                            ) : (
                                <div>
                                    No rooms in building
                                </div>
                            )
                        }
                    </>
                ) : null
            }
        </div>
    )
}

export default Rooms