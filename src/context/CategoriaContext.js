import React, {createContext, useState , useEffect} from 'react';
import axios from 'axios';

// CREAR EL CONTEXT
export const CategoriaContext = createContext();

// PROVIDER ES DONDE SE ENCUENTRAN LAS FUNCIONES Y EL STATE

const CategoriasProvider = (props) => {

    // crear el state del context
    const [categorias, setcategorias] = useState([]);

    //Ejecutamos el llamado a la api

    useEffect(() => {
        const obtenerCategorias = async() => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const categorias = await axios.get(url);
            setcategorias(categorias.data.drinks)
        };

        obtenerCategorias();
    }, [])

    return(
        <CategoriaContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriaContext.Provider>
    )
}

export default CategoriasProvider;