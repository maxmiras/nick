import '../styles/itemUser.css'
// import { contextoGood } from '../App';
// import { useContext } from 'react';



function ItemUser4({ data }) {

    // const {cargarEntrenamiento}= useContext(contextoGood)








    console.log(data)
    return (
        <tr>
            <td> {data.dia} </td>
            <td> {data.hs} </td>
            <td> {data.entrenamientos} </td>

        </tr>
    );
}

export default ItemUser4;