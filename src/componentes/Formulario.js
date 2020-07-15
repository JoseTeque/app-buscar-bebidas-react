import React, {useContext, useState} from 'react';
import { CategoriaContext } from '../context/CategoriaContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {
    const {categorias} = useContext(CategoriaContext);
    const {setReceta, setconsultar} = useContext(RecetasContext);

    const [busqueda, setbusqueda] = useState({
        nombre:'',
        categoria:''
    });

    const [error, seterror] = useState(false)

    const {nombre , categoria} = busqueda;

    // funcion de seleccion del usuario
    const handleChange = e => {
        setbusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        if(nombre.trim() === '' || categoria.trim() === ''){
            setTimeout(() => {
                seterror(true);
                setTimeout(() => {
                    seterror(false);
                },4000)
            },50)
            return;
        }

        setReceta(busqueda);
        setconsultar(true);
        

    }


    return ( 
        <form 
            onSubmit={handleSubmit}
        className="col-12">
            <fieldset className="text-center">
                <legend>Busca Bebidas por Categoria o Ingredientes</legend>
            </fieldset>
            {error ? <p className="alert alert-danger text-center">Todos los campos son obligatorios</p> : null}
            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Busca por Ingrediente"
                        onChange = {handleChange}

                    />
                </div>
                <div className="col-md-4">
                    <select 
                        className="form-control"
                        name="categoria"
                        onChange={handleChange}
                    >
                       <option value="">- Selecciona Categoria -</option>
                        {categorias.map(categoria => (
                            <option 
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                               
                            >{categoria.strCategory}</option>
                        )
                        )}
                    </select>
                </div>

                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Busca Recetas"
                    />
                </div>

            </div>
        </form>
     );
}
 
export default Formulario;