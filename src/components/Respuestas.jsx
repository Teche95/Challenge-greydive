import React, { useEffect, useState } from 'react'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import app from '../firebase/config'
import s from "../styles/encuesta.module.css"


const Respuestas = () => {
    const [info, setInfo] = useState(null)
    const firestore = getFirestore(app)

    useEffect(() => {
        async function buscar() {
            const docuRef = collection(firestore, "respuestas")
            const documento = await getDocs(docuRef)
            setInfo(documento.docs.map(prod => ({ id: prod.id, ...prod.data() })))
        }
        buscar()
    }, [])

    return (
        <div className={s.enc}>
            {
                info?.map(produ => (
                    <div className={s.resp}>
                        <p>Nombre completo: {produ.full_name}</p>
                        <p>Correo electrónico: {produ.email}</p>
                        <p>Fecha de nacimiento: {produ.birth_date}</p>
                        <p>¿Cuál es tu país de origen?: {produ.country_of_origin}</p>
                        <p>¿Acepta los términos y condiciones?: {produ.terms_and_conditions}</p>
                    </div>
                ))
            }
        </div >




    )
}

export default Respuestas

