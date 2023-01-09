import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import app from '../firebase/config'
import { getFirestore, doc, collection, setDoc } from 'firebase/firestore'
import s from "../styles/encuesta.module.css"
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { validateArgCount } from '@firebase/util';


const Encuesta = () => {
    const firestore = getFirestore(app)
    const history = useHistory();
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

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
        // console.log(e.target.value);
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
        return history.push("/respuestas")
    }

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (

        <div className={s.container}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>


                <form className={s.form} onSubmit={e => handleOnSubmit(e)} >
                    {enc.items?.map(item => {
                        const renderItem = () => {
                            switch (item.type) {
                                case 'text':
                                    return (
                                        <div >
                                            <TextField id="standard-basic" label={item.label} variant="standard"
                                                className={s.blanco}
                                                type={item.type}
                                                name={item.name}
                                                required={item.required}
                                                onChange={e => handleInputChange(e)}
                                            />
                                            {/* <label> {item.label}</label>
                                        <input
                                            type={item.type}
                                            name={item.name}
                                            required={item.required}
                                            onChange={e => handleInputChange(e)}
                                        /> */}
                                        </div>
                                    );
                                case "email":
                                    return (
                                        <div >
                                            <TextField id="standard-basic" label={item.label} variant="standard"
                                                className={s.blanco}
                                                type={item.type}
                                                name={item.name}
                                                required={item.required}
                                                onChange={e => handleInputChange(e)}
                                            />
                                            {/* <label> {item.label}</label>
                                        <input
                                            type={item.type}
                                            name={item.name}
                                            required={item.required}
                                            onChange={e => handleInputChange(e)}
                                        /> */}
                                        </div>
                                    );
                                case "date":
                                    return (
                                        <div className={s.blanco}>
                                            {/* <DesktopDatePicker
                                                type={item.type}
                                                name={item.name}
                                                required={item.required}
                                                onChange={e => console.log(e.d)}
                                                label={item.label}
                                                inputFormat="DD/MM/YYYY"
                                                value={value}
                                                // onChange={handleChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            /> */}

                                            <label  >  {item.label} *</label>
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
                                        <div className={s.blanco}>
                                            <label > {item.label} *</label>
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
                                        <div className={s.blanco}>
                                            <label> {item.label} *</label>
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
                                        <div >
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

            </LocalizationProvider>
        </div>
    )
}

export default Encuesta

