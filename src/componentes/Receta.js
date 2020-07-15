import React, {useContext , useState} from 'react';
import {ModalContext} from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    // Configuracion del Modal de Material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setopen] = useState(false);
    const {descripcion , setidreceta, setdescripcion} = useContext(ModalContext);

    const {strDrink, strDrinkThumb, idDrink } = receta;

    const clases = useStyles();

    const handleOpen = () => {
        setopen(true);
    }

    const handleClose = () => {
        setopen(false);
    }

    const mostrarIngredientes = informacion => {
        // let ingredientes = [];
        // for(let i =1; i<16; i++){
        //     if(informacion[`
        //     strIngredient${i}`]){
        //         ingredientes.push(
        //             <li>{informacion[`
        //             strIngredient${i}`]} </li>
        //          )
        //     }
        // }
        console.log('mostrarIngredientes')
    } 
    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{strDrink}</h2>
                <img className="card-img-top" src={strDrinkThumb} alt={`Imagen de ${strDrink}`} />

                <div className="card-body">
                    <button 
                        className="btn btn-block btn-primary"
                        type="button"
                        onClick={() => {
                            setidreceta(idDrink);
                            handleOpen();
                        }}
                    >
                        Ver Receta
                    </button>

                    <Modal
                        open={open}
                        onClose={() => {
                            setidreceta(null);
                            handleClose();
                            setdescripcion({});
                        }}
                    >
                        <div style={modalStyle} className={clases.paper}>
                                <h2>{descripcion.strDrink}</h2>
                                <h3 className="mt-4">Instrucciones</h3>
                                <p>
                                    {descripcion.strInstructions}
                                </p>
                                <img className="img-fluid my-4" src={descripcion.strDrinkThumb} alt={descripcion.strDrink}/>
                                <h3>Ingredientes y Cantidades</h3>
                                <ul>
                                    { mostrarIngredientes(descripcion) }
                                </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
       
     );
}
 
export default Receta;