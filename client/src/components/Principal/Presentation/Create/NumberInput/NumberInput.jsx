import React from "react";
import style from "./NumberInput.module.css";

export default function NumberInput({name, value, onChangeProps}) {

    return (<>
        <input className={(value < 1 || value > 1000)? style.incorrectData: style.correctData} name={name} value={value} onChange={onChangeProps} type="number" />

        {(value < 1 || value > 1000)? <span className={style.msgError}>Valor incorrecto</span> : null}
    </>)
}