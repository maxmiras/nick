import '../styles/itemUser.css'
import tachito from '../assets/basura.png'
import { contextoGood } from '../App';
import { useContext } from 'react';



function ItemUser3({ data }) {

    const {cargarEntrenamiento,ruta}= useContext(contextoGood)



    function eliminar2(data2) {
        const confirm = window.confirm('seguro que quieres eliminar este entrenamiento')
        if (confirm) {
            fetch(`${ruta}/eliminarEntrenamiento`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data2)
            });
        cargarEntrenamiento()
        // {"userDNI":data.UsuarioDNI}
        } else {
            // console.log(data2)
        }

    }




    console.log(data)
    return (
        <tr>
            <td> {data.dia} </td>
            <td> {data.hs} </td>
            <td> {data.entrenamientos} </td>
            <td>
                <img className="botton" src={tachito}
                    onClick={() => { eliminar2({"id": data.id})}}
                />
            </td>

        </tr>
    );
}

export default ItemUser3;