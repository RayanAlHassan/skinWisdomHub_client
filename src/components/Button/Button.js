import style from './Button.module.css'
const Button=({text})=>{

    return (
<button className={style.btnStyle}>
{text}
</button>
    )

}
export default Button