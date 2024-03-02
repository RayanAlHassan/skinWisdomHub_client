import style from "./Button.module.css";
const Button = ({ text, onClick }) => {
  return (
    <button   type="submit" className={style.btnStyle} onClick={onClick}>
      {text}
    </button>
  );
};
export default Button;
