import Link from 'next/link'
import styles from '@/styles/Footer.module.css'


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ events 2021</p>
      <Link href='/about'>
        About this project
      </Link>
    </footer>
  )
}
