import { useState, useEffect, useRef } from 'react'

import Filter from 'src/components/Filter/Filter'
import Request from 'src/components/Request/Request'

import { BiLoaderCircle } from 'react-icons/bi'
import { MdOutlineDownloading } from 'react-icons/md'

import styles from './viewRequest.module.css'

export default function ViewRequest() {
    const leftRef = useRef(null)
    const rightRef = useRef(null)

    const [selectedOptions, setSelectedOptions] = useState({})
    const [waiting, setWaiting] = useState([])
    const [ongoing, setOngoing] = useState([])

    const [selItem, setSelItem] = useState({ i: null, s: null })
  
    const handleCheckboxChange = (event) => {
        setSelectedOptions({
            ...selectedOptions,
            [event.target.name]: event.target.checked
        })
    }

    const handleMouseDown = (i, s) => {
        setSelItem({ i, s })
    }
    const handleMouseUp = (e) => {
        if (!selItem.i) return false

        const leftElement = leftRef.current
        const rightElement = rightRef.current

        const { clientX, clientY } = e

        const leftRect = leftElement.getBoundingClientRect()
        const rightRect = rightElement.getBoundingClientRect()

        if (
            clientX >= leftRect.left &&
            clientX <= leftRect.right &&
            clientY >= leftRect.top &&
            clientY <= leftRect.bottom
        ) {
            setWaiting(prev => [...prev, ongoing[selItem.i]])
            selItem.s === 0 ? setWaiting(prev => prev.filter((_, index) => index !== selItem.i)) : setOngoing(prev => prev.filter((_, index) => index !== selItem.i))
        }
        else if (
            clientX >= rightRect.left &&
            clientX <= rightRect.right &&
            clientY >= rightRect.top &&
            clientY <= rightRect.bottom
        ) {
            setOngoing(prev => [...prev, waiting[selItem.i]])
            selItem.s === 0 ? setWaiting(prev => prev.filter((_, index) => index !== selItem.i)) : setOngoing(prev => prev.filter((_, index) => index !== selItem.i))
        }
        
        setSelItem({ i: null, s: null })
    }
    
    const handleMouseMove = (e) => {
        const item = document.querySelector(`.${styles.follow}`)
        
        if (item) {
            item.style.setProperty('--x', `${e.clientX}px`)
            item.style.setProperty('--y', `${e.clientY}px`)
        }
    }

    useEffect(() => {
        // test data
        setWaiting([
            { is_question: false, text: '1', time: Date.now() },
            { is_question: true, text: '2', time: Date.now() },
            { is_question: false, text: '3', time: Date.now() }
        ])
      
        setOngoing([
            { is_question: false, text: '1', time: Date.now() },
            { is_question: true, text: '2', time: Date.now() },
            { is_question: false, text: '3', time: Date.now() }
        ])
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    
        return () => {
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [selItem])

    return (
        <>
        <div className={styles.wrapper} onMouseLeave={handleMouseUp}>
            <div ref={leftRef}>
                <div className={styles.title}>
                    <BiLoaderCircle />
                    <h2>대기 중인 환자 요청</h2>
                </div>
                <div className={styles.left} ref={leftRef}>
                    <div className={styles.filter}>
                    <Filter
                        title="By job"
                        options={[]}
                        selectedOptions={selectedOptions}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                    <Filter
                        title="By Patient"
                        options={[]}
                        selectedOptions={selectedOptions}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                    <Filter
                        title="District"
                        options={[]}
                        selectedOptions={selectedOptions}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                    </div>
                    <div className={styles.waiting}>
                        {waiting.map((item, i) => (
                            <div key={i} onMouseDown={() => handleMouseDown(i, 0)} className={selItem.i === i && selItem.s === 0 ? styles.follow : ''}>
                                <Request
                                    isQuestion={item.is_question}
                                    text={item.text}
                                    date={new Date(item.time)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: '16px' }} ref={rightRef}>
                <div className={styles.title}>
                    <MdOutlineDownloading />
                    <h2>내가 진행 중인 요청사항</h2>
                </div>
                <div className={styles.right}>
                    <div className={styles.filter}>
                        <Filter
                            title="By job"
                            options={[]}
                            selectedOptions={selectedOptions}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                        <Filter
                            title="By Patient"
                            options={[]}
                            selectedOptions={selectedOptions}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                        <Filter
                            title="District"
                            options={[]}
                            selectedOptions={selectedOptions}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    </div>
                    <div className={styles.ongoing}>
                        {ongoing.map((item, i) => (
                            <div key={i} onMouseDown={() => handleMouseDown(i, 1)} className={selItem.i === i && selItem.s === 1 ? styles.follow : ''}>
                                <Request
                                    isQuestion={item.is_question}
                                    text={item.text}
                                    date={new Date(item.time)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}