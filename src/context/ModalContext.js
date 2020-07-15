import React, {createContext , useState, useEffect} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    const [idreceta, setidreceta] = useState(null);
    const [descripcion, setdescripcion] = useState({})

    useEffect(() => {
        
        const obtenerDescripcion = async() => {
            
            if(!idreceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`
            const resultado = await axios.get(url);

            setdescripcion(resultado.data.drinks[0]);
        }
       
        obtenerDescripcion();
    }, [idreceta])

    return ( 
        <ModalContext.Provider
            value={{
                descripcion,
                setidreceta,
                setdescripcion
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;