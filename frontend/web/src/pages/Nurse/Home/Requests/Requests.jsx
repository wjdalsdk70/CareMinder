import { useState } from 'react'

import ViewRequest from './viewRequest/viewRequest'
import Progress from './progress/progress'
import NurseHeader from 'src/components/NurseHeader/NurseHeader'

import styles from './Requests.module.css'

export default function Requests({ session }) {
    const [toggle, setToggle] = useState(true)

    const handleToggle = (i) => {
        if (i == 1) return setToggle(false)
        setToggle(true)
    }

    return (
        <>
            <NurseHeader />
            <div className={styles.top}>
                <div className={`${styles.toggle} ${toggle ? styles.active : ''}`} onClick={() => handleToggle(0)}>View patient-specific requests</div>
                <div className={`${styles.toggle} ${!toggle ? styles.active : ''}`} onClick={() => handleToggle(1)}>Set progress by patient</div>
            </div>
            <div className={styles.bottom}>
                { toggle ?
                        <ViewRequest active={toggle}/> :
                        <Progress active={!toggle}/>
                }
            </div>
        </>
    )
}