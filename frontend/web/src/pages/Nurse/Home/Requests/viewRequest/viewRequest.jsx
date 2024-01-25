import { useState, useEffect, useRef } from 'react'

import Filter from 'src/components/Filter/Filter'
import Request from 'src/components/Request/Request'

import { BiLoaderCircle } from 'react-icons/bi'
import { MdOutlineDownloading } from 'react-icons/md'

import styles from './viewRequest.module.css'
import flw from '../Requests.module.css'

export default function ViewRequest() {
    const [selectedOptions, setSelectedOptions] = useState({})
    const [waiting, setWaiting] = useState([])
    const [ongoing, setOngoing] = useState([])

    const [selItem, setSelItem] = useState({ i: null, s: null, item: { isQuestion: false, text: '', date: new Date() } })
    const [holding, setHolding] = useState(false)

    const pressTimer = useRef(null)
  
    const handleCheckboxChange = (event) => {
        setSelectedOptions({
            ...selectedOptions,
            [event.target.name]: event.target.checked
        })
    }

    const handleMouseDown = (i, s, item) => {
        pressTimer.current = setTimeout(() => {
            setHolding(true)
            setSelItem({ i, s, item })
        }, 500)
    }
    
    const handleMouseMove = (e) => {
        const item = document.querySelector(`.${styles.follow}`)
        
        if (item) {
            item.style.setProperty('--x', `${e.clientX}px`)
            item.style.setProperty('--y', `${e.clientY}px`)
        }
    }

    const handleMouseUp = (e) => {
        clearTimeout(pressTimer.current)
        if (!holding) return false

        setHolding(false)
        setSelItem({ i: null, s: null, item: { isQuestion: false, text: '', date: new Date() } })
        const targetElement = e.target.getAttribute('name')

        if (!targetElement) return false
        if (targetElement.charAt(0) !== selItem.s) {
            const item = selItem.s === 'r' ? ongoing[selItem.i] : waiting[selItem.i]
            if (selItem.s === 'l') {
                setWaiting(waiting.filter((_, i) => i !== selItem.i))
                setOngoing([...ongoing, item])
            } else {
                setOngoing(ongoing.filter((_, i) => i !== selItem.i))
                setWaiting([...waiting, item])
            }
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [holding])

    useEffect(() => {
        setWaiting([
            { is_question: true, text: "How does React handle state?", time: 1643038800000 },
            { is_question: false, text: "Exploring the useEffect hook", time: 1643042400000 },
            { is_question: true, text: "What are the key features of ES6?", time: 1643046000000 },
            { is_question: false, text: "Optimizing performance in React applications", time: 1643049600000 },
            { is_question: true, text: "Understanding the virtual DOM", time: 1643053200000 },
            { is_question: false, text: "Building responsive layouts with Flexbox", time: 1643056800000 },
            { is_question: true, text: "How to use React Router for navigation?", time: 1643060400000 },
            { is_question: false, text: "Securing your React app with JWT authentication", time: 1643064000000 },
            { is_question: true, text: "Common mistakes to avoid in React development", time: 1643067600000 },
            { is_question: false, text: "Introduction to Redux and state management", time: 1643071200000 }
        ])
      
        setOngoing([
            { is_question: true, text: "How to deploy a React app on GitHub Pages?", time: 1643074800000 },
            { is_question: false, text: "Best practices for styling in React using CSS-in-JS", time: 1643078400000 },
            { is_question: true, text: "Handling forms in React with controlled components", time: 1643082000000 },
            { is_question: false, text: "Exploring the new features in React 18", time: 1643085600000 },
            { is_question: true, text: "What is the role of Babel in a React project?", time: 1643089200000 },
            { is_question: false, text: "Introduction to server-side rendering (SSR) in React", time: 1643092800000 },
            { is_question: true, text: "Tips for effective debugging in React applications", time: 1643096400000 },
            { is_question: false, text: "Creating responsive images with the picture element", time: 1643100000000 },
            { is_question: true, text: "How to handle state in functional components?", time: 1643103600000 },
            { is_question: false, text: "Using hooks for global state management in React", time: 1643107200000 }
        ])
    }, [])

    return (
        <>
        <div className={`${styles.follow} ${flw.follow} ${holding ? '' : styles.hide}`}>
            <Request
                isQuestion={selItem.item.isQuestion}
                text={selItem.item.text}
                date={selItem.item.date}
            />
        </div>
        <div className={styles.wrapper}>
            <div>
                <div className={styles.title}>
                    <BiLoaderCircle />
                    <h2>대기 중인 환자 요청</h2>
                </div>
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
                { holding ? <div className={styles.area} name='leftArea'></div> : '' }
                <div className={styles.waiting} style={holding ? { transform: 'translateY(-100%)' } : {}}>
                    {waiting.map((item, i) => (
                        <div key={i} onMouseDown={(e) => handleMouseDown(i, 'l', {
                            isQuestion: item.is_question,
                            text: item.text,
                            date: new Date(item.time)
                        })} className={selItem.i === i && selItem.s === 'l' ? styles.hide : ''}>
                            <Request
                                isQuestion={item.is_question}
                                text={item.text}
                                date={new Date(item.time)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <span className={styles.line}></span>
            <div className={styles.right}>
                <div className={styles.title}>
                    <MdOutlineDownloading />
                    <h2>내가 진행 중인 요청사항</h2>
                </div>
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
                { holding ? <div className={styles.area} name='rightArea'></div> : '' }
                <div className={styles.ongoing} style={holding ? { transform: 'translateY(-100%)' } : {}}>
                    {ongoing.map((item, i) => (
                        <div key={i} onMouseDown={(e) => handleMouseDown(i, 'r', {
                            isQuestion: item.is_question,
                            text: item.text,
                            date: new Date(item.time)
                        })} className={selItem.i === i && selItem.s === 'r' ? styles.hide : ''}>
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
        </>
    )
}