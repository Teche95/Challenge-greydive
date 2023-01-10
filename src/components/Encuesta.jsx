import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import app from '../firebase/config'
import { getFirestore, doc, collection, addDoc } from 'firebase/firestore'
import s from "../styles/encuesta.module.css"
import swal from 'sweetalert';

const Encuesta = () => {
    const firestore = getFirestore(app)
    const history = useHistory();

    const [enc, setEnc] = useState({})
    const [input, setInput] = useState({
        full_name: "",
        email: "",
        birth_date: "",
        country_of_origin: [],
        terms_and_conditions: "",
    })

    useEffect(() => {
        async function getData() {
            const res = await axios.get("json/items.json")
            setEnc(res.data)
        }
        getData()
    }, [])

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleCountryChange = (e) => {
        setInput({
            ...input,
            country_of_origin: [e.target.value]
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const collectionRef = collection(firestore, "respuestas")
        await addDoc(collectionRef, input)
        setInput({
            full_name: "",
            email: "",
            birth_date: "",
            country_of_origin: [],
            terms_and_conditions: "",
        })
        swal("Formulario enviado","","success")
        return history.push("/respuestas")
    }

    return (
        <div >
            <form className={s.form} onSubmit={e => handleOnSubmit(e)} >
                <h1 className={s.h1}>Greydive Challenge</h1>
                {enc.items?.map(item => {
                    const renderItem = () => {
                        switch (item.type) {
                            case 'text':
                                return (
                                    <div >
                                        <label className={s.label}> {item.label}</label>
                                        <input
                                            className={s.controls}
                                            type={item.type}
                                            name={item.name}
                                            required={item.required}
                                            onChange={e => handleInputChange(e)}
                                        />
                                    </div>
                                );
                            case "email":
                                return (
                                    <div >
                                        <label> {item.label}</label>
                                        <input
                                            className={s.controls}
                                            type={item.type}
                                            name={item.name}
                                            required={item.required}
                                            onChange={e => handleInputChange(e)}
                                        />
                                    </div>
                                );
                            case "date":
                                return (
                                    <div className={s.blanco}>
                                        <label  >  {item.label} *</label>
                                        <input
                                            className={s.controls}
                                            type={item.type}
                                            name={item.name}
                                            required={item.required}
                                            onChange={e => handleInputChange(e)}
                                        />
                                    </div>
                                );
                            case "select":
                                return (
                                    <div>
                                        <div className={s.select}>
                                            <select required={item.required} onChange={e => handleCountryChange(e)}>
                                                <option value="" selected disabled>{item.label}</option>
                                                {
                                                    item.options.map((el, i) =>
                                                        <option key={i} name={el.name}>{el.label}</option>
                                                    )
                                                }
                                            </select>

                                        </div>
                                    </div>
                                );
                            case "checkbox":
                                return (
                                    <div className={s.blanco}>
                                        <label> {item.label} *</label>
                                        <input
                                            className={s.controls}
                                            type={item.type}
                                            name={item.name}
                                            required={item.required}
                                            onChange={e => handleInputChange(e)}
                                        />
                                    </div>
                                );
                            case "submit":
                                return (
                                    <div >
                                        <input className={s.boton} type={item.type} value="Enviar"></input>
                                    </div>
                                );

                            default:
                                return null;
                        }
                    };
                    return renderItem();
                })}
            </form>
        </div>
    )
}

export default Encuesta

