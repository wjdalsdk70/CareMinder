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
    const [offset, setOffset] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 })
  
    const handleCheckboxChange = (event) => {
        setSelectedOptions({
            ...selectedOptions,
            [event.target.name]: event.target.checked
        })
    }

    const handleMouseDown = (i, s) => { setSelItem({ i, s }) }
    const handleMouseUp = () => { setSelItem({ i: null, s: null }) }

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp)

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

        return () => document.removeEventListener('mouseup', handleMouseUp)
    }, [])

    useEffect(() => {
        if (leftRef.current && rightRef.current) {
            const leftRect = leftRef.current.getBoundingClientRect()
            const rightRect = rightRef.current.getBoundingClientRect()

            setOffset({ x1: leftRect.left, y1: leftRect.top, x2: rightRect.left, y2: rightRect.top })
        }

        const handleMouseMove = (e) => {
            const item = document.querySelector('.follow')

            if (item) {
                const x = e.clientX - item.offsetWidth / 2
                const y = e.clientY - item.offsetHeight / 2

                const keyframes = {
                    transform: `translate(${selItem.s == 0 ? x - offset.x1 : x - offset.x2}px, ${selItem.s == 0 ? y - offset.y1 : y - offset.y2}px)`,
                }
        
                item.animate([keyframes], {
                    duration: 800,
                    fill: 'forwards'
                })
            }
        }
    
        window.addEventListener('mousemove', handleMouseMove)
    
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className={styles.wrapper} onMouseLeave={handleMouseUp}>
            <div>
                <div className={styles.title}>
                    <BiLoaderCircle />
                    <h2>대기 중인 환자 요청</h2>
                </div>
                <div className={styles.left}>
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
                    <div className={styles.waiting} ref={leftRef}>
                        {waiting.map((item, i) => (
                            <div key={i} onMouseDown={() => handleMouseDown(i, 0)} className={selItem.i == i && selItem.s == 0 ? 'follow' : ''}>
                                <Request
                                    isQuestion={item.is_question}
                                    text={item. text}
                                    date={new Date(item.time)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: '16px' }}>
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
                    <div className={styles.ongoing} ref={rightRef}>
                        {ongoing.map((item, i) => (
                            <div key={i} onMouseDown={() => handleMouseDown(i, 1)} className={selItem.i == i && selItem.s == 1 ? 'follow' : ''}>
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
    )
}