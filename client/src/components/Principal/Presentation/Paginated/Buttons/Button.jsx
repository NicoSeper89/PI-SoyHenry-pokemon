import React from 'react';
import {useDispatch} from 'react-redux';
import {changePagination} from '../../../../../actions/index.js';
import style from './Button.module.css';

export default function Button({id}) {

    const dispatch = useDispatch();

    const changePage = (e) => {
        dispatch(changePagination(e.target.name));
    }


    return (
        <button className={style.button} name={id} onClick={changePage} >{id}</button>
    )
}