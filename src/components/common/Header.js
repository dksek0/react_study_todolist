import styles from './Header.module.css';

function Header ({header}) {
  return (
    <h1 className={styles.header}>{header}</h1>
  )
}

export default Header;