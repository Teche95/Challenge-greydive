import React, { useEffect, useState } from 'react'
import { getFirestore, updateDoc, doc, collection, setDoc, getDoc } from 'firebase/firestore'
import app from '../firebase/config'
const firestore = getFirestore(app)

const Respuestas = () => {
    const [info, setInfo] = useState(null)

    useEffect(() => {
        async function buscar() {
            const docuRef = doc(firestore, "respuestas/formcompleted")
            const documento = await getDoc(docuRef)
            setInfo(documento.data())
        }
        buscar()
    }, [])


    console.log(info)
    return (
        <div>
            {info ?
                <div>
                    <p>Nombre completo: {info.full_name}</p>
                    <p>Correo electrónico: {info.email}</p>
                    <p>Fecha de nacimiento: {info.birth_date}</p>
                    <p>¿Cuál es tu país de origen?: {info.country_of_origin}</p>
                    <p>¿Acepta los términos y condiciones?: {info.terms_and_conditions}</p>
                </div>
                : <h3>Cargando...</h3>
            }
        </div >




    )
}

export default Respuestas

// export async function getUserInfo(uid) {
//     const docRef = doc(db, "users", uid);
//     const docSnap = await getDoc(docRef);
//     return docSnap.data();
// }


// const collectionRef = collection(firestore, "respuestas")
//         const docRef = doc(collectionRef, "formcompleted")
//         await setDoc(docRef, input)