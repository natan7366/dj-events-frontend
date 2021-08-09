import { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import styles from '@/styles/Modal.module.css'


export default function Modal({show, onClose, 
  children, title}) {

  const [isBrowser, setIsBrowser] = useState(false);
  useEffect( ()=>setIsBrowser(true) )
    
  return (
    <div>
      
    </div>
  )
}
