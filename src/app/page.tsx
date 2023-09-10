
import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div>
      hello
      <div>
        <Link href='/player'> PLayer</Link>
      </div>
    </div>
  )
}
