import styles from './Button.module.css'

const Button: React.FunctionComponent<any> = ({ text, onClick, disabled, children, ...props }) => {
  return (
    <>
        <div className={styles.container}>
          <button 
            type='submit'
            onClick={onClick} 
            className={styles.title}
            disabled={disabled}
            {...props}
          >
            {text}
            {children}
          </button>
        </div>
    </>
  )
}

export default Button