import React, {createContext, useState , useEffect} from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, buscarRecetas] = useState([]);
    const [busqueda, setReceta] = useState(
        {
            nombre:'',
            categoria:''
        }
    );

    const [consultar, setconsultar] = useState(false);

    useEffect(() => {

        if(consultar){
            const obtenerReceta = async () => {
    
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`;
    
                const resultado = await axios.get(url);
                buscarRecetas(resultado.data.drinks);
            };
    
            obtenerReceta();
        }
       
    }, [busqueda, consultar])

    return(
        <RecetasContext.Provider
            value={{
                recetas,
                setReceta,
                setconsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    )
};

export default RecetasProvider;