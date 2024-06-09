import Link from 'next/link'

import styles from '@/page.module.css'

export default function Home() {
  return (
    <main>
      <h2>Choose the Range Mode</h2>
      <section className={styles.links}>
        <Link className={styles.link} href="/exercise1">
          Normal
        </Link>
        <Link className={styles.link} href="/exercise2">
          Fixed values
        </Link>
      </section>
    </main>
  )
}
