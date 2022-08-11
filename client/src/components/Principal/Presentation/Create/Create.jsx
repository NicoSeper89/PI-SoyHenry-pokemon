import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import style from './Create.module.css';
import NumberInput from './NumberInput/NumberInput.jsx';
import { callToBackend } from '../../../../actions/index.js'

export default function Create() {
    //State locales de Create
    const [info, setInfo] = useState({
        name: '',
        img: '',
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        height: 1,
        weight: 1,
        types: []
    });

    const [boxesDisabled, setBoxesDisabled] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [newCreated, setNewCreated] = useState(false);
    //State arrTypes de redux 
    const arrTypes = useSelector((state) => state.arrTypes)

    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {

        let arr = [info.hp, info.attack, info.defense, info.speed, info.height, info.weight]

        if (!!info.name && !!info.img && (info.types.length > 0) && !(arr.some((e) => (e < 1 || e > 1000)))) {
            return setSubmitDisabled(false)
        }
        setSubmitDisabled(true)
    }, [info])

    useEffect(() => {

        return () => {
            newCreated && dispatch(callToBackend())
        }

    })


    const textChangeHandler = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const numberChangeHandler = (e) => {
        setInfo({ ...info, [e.target.name]: Number(e.target.value) })
    }

    const typesChangeHandler = (e) => {
        // si un imput checkbox se desmarca
        if (e.target.checked === false) {
            setBoxesDisabled(false);
            return setInfo({
                ...info,
                types: [...info.types].filter(type => type !== e.target.value)
            });
        }
        // si un imput checkbox se marca
        if (info.types.length < 2) {
            setBoxesDisabled((info.types.length === 1) ? true : false)
            return setInfo({ ...info, types: [...info.types, e.target.value] });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data } = await axios.post("http://localhost:3001/pokemons", info);

        data && setNewCreated(true);

        const createAgain = window.confirm("¿Quieres crear otro pokemon?");

        !createAgain ? history.push('/pokemons') : setInfo({name: '',
                                                            img: '',
                                                            hp: 1,
                                                            attack: 1,
                                                            defense: 1,
                                                            speed: 1,
                                                            height: 1,
                                                            weight: 1,
                                                            types: []
        });

    }

    return (<div className={style.conteiner}>

        <form className={style.form} onSubmit={handleSubmit} >

            <div className={style.infoPrincipal}>
                <label ><p>Nombre:</p>
                    <input name="name" value={info.name} onChange={textChangeHandler} autoComplete="off" type="text" placeholder="Nombre" />
                </label>

                <label ><p>Imagen:</p>
                    <input name="img" value={info.img} onChange={textChangeHandler} autoComplete="off" type="text" placeholder="Url imagen" />
                </label>

                <label ><p>Salud:</p>
                    <NumberInput name={"hp"} value={info.hp} onChangeProps={numberChangeHandler} />
                </label>

                <label ><p>Ataque:</p>
                    <NumberInput name={"attack"} value={info.attack} onChangeProps={numberChangeHandler} />
                </label>

                <label ><p>Defensa:</p>
                    <NumberInput name={"defense"} value={info.defense} onChangeProps={numberChangeHandler} />
                </label>

                <label ><p>Velocidad:</p>
                    <NumberInput name={"speed"} value={info.speed} onChangeProps={numberChangeHandler} />
                </label>

                <label ><p>Altura:</p>
                    <NumberInput name={"height"} value={info.height} onChangeProps={numberChangeHandler} />
                </label>

                <label ><p>Peso:</p>
                    <NumberInput name={"weight"} value={info.weight} onChangeProps={numberChangeHandler} />
                </label>

            </div>

            <div className={style.checkboxContainer}>
                {arrTypes.map((t) => {
                    return (<label key={t.id} >
                        <input key={t.id}
                            type="checkbox"
                            value={t.name}
                            onChange={typesChangeHandler}
                            disabled={(boxesDisabled && !(t.name === info.types[0] || t.name === info.types[1])) ? true : false}
                        />{t.name}
                    </label>)
                })
                }
            </div>

            <input disabled={submitDisabled} type="submit" />

        </form>

    </div>
    )
}

/* "types": ["electric"],
"name": "donvito",
"hp": 45, 
"attack": 45, 
"defense": 45, 
"speed": 45, 
"height": 45,
"weight": 45,
"img" */