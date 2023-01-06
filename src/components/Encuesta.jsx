import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import app from '../firebase/config'
import { getFirestore, updateDoc, doc, collection, setDoc } from 'firebase/firestore'
import { Redirect } from "react-router-dom"

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
        const docRef = doc(collectionRef, "formcompleted")
        await setDoc(docRef, input)
        setInput({
            full_name: "",
            email: "",
            birth_date: "",
            country_of_origin: [],
            terms_and_conditions: "",
        })
        alert("Formulario enviado")
        // history.push("/respuestas")
        return <Redirect to="/respuestas" />
    }

    return (
        <div>
            <form onSubmit={e => handleOnSubmit(e)}>
                {enc.items?.map(item => {
                    const renderItem = () => {
                        switch (item.type) {
                            case 'text':
                                return (
                                    <div>
                                        <label> {item.label}</label>
                                        <input
                                            type={item.type}
                                            name={item.name}
                                            required={item.required}
                                            onChange={e => handleInputChange(e)}
                                        />
                                    </div>
                                );
                            case "email":
                                return (
                                    <div>
                                        <label> {item.label}</label>
                                        <input
                                            type={item.type}
                                            name={item.name}
                                            required={item.required}
                                            onChange={e => handleInputChange(e)}
                                        />
                                    </div>
                                );
                            case "date":
                                return (
                                    <div>
                                        <label> {item.label}</label>
                                        <input
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
                                        <label> {item.label}</label>
                                        <select multiple required onChange={e => handleCountryChange(e)}>
                                            {
                                                item.options.map((el, i) =>
                                                    <option key={i} name={el.name}>{el.label}</option>
                                                )
                                            }
                                        </select>

                                    </div>
                                );
                            case "checkbox":
                                return (
                                    <div>
                                        <label> {item.label}</label>
                                        <input
                                            type={item.type}
                                            name={item.name}
                                            required={item.required}
                                            onChange={e => handleInputChange(e)}
                                        />
                                    </div>
                                );
                            case "submit":
                                return (
                                    <div>
                                        <button>{item.label}</button>
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

