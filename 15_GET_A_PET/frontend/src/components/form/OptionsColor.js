import styles from "./OptionsColor.module.css"

function OptionsColor({text,name,options,handleOnChange,value}){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} onChange={handleOnChange} value={value ||""} id={name}>
                <option>Selecione uma opção</option>
                {options.map((option, index) => (
                    <option value={option} key={index}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default OptionsColor