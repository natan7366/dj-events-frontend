import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import styles from '@/styles/Search.module.css'

export default function Search() {
  const router = useRouter();
  const [term, SetTerm] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    SetTerm('');
  }

  return (
    <div>
      <div className={styles.search}>
        <form onSubmit={handleSubmit}>
          <input 
            type = "text"
            value={term}
            onChange={e => SetTerm(e.target.value)}
            placeholder='Search Events'
          />
        </form>
      </div>
    </div>
  )
}
