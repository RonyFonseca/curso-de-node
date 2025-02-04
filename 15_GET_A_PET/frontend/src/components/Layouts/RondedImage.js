import styles from "./RondedImage.module.css"

function RoundedImage({src, width}){
    return (
        <img src={src} className={`${styles.rounded_image} ${styles[width]}`}/>
    )
}

export default RoundedImage