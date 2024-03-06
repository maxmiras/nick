import '../styles/itemUser.css'
import tachito from '../assets/basura.png'
import { contextoGood } from '../App';
import { useContext, useState } from 'react';





function ItemUser({ data }) {

    const { usuario, cargarUsuarios,cargar,ruta, setCarg } = useContext(contextoGood)

    const [editing, setEditing] = useState(false);
    const [valor, setValor] = useState(data.DNI);
    const [editing2, setEditing2] = useState(false);
    const [valor2, setValor2] = useState(data.nombre);
    const [editing3, setEditing3] = useState(false);
    const [valor3, setValor3] = useState(data.Email);
    const [editing4, setEditing4] = useState(false);
    const [valor4, setValor4] = useState(data.fechaI);
    const [editing5, setEditing5] = useState(false);
    const [valor5, setValor5] = useState(data.rango);
    const [editing6, setEditing6] = useState(false);
    const [valor6, setValor6] = useState(data.tel);


    function eliminar(data2, nombre) {
        if (usuario.DNI == data2.DNI) {
            return
        } else {
            const confirm = window.confirm('seguro que quieres eliminar a :' + nombre)
            if (confirm) {
                fetch(`${ruta}/eliminar`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data2)
                });
            } else {
                // console.log(data2)
            }


        }
        setCarg(false)
        cargarUsuarios({ "DNI": usuario.DNI, "contrasena": usuario.contrasena })
        // setCarg(true)

    }


    async function actualizar(data2 = {
        "nombre": valor2,
        "Email": valor3,
        "rango": valor5,
        "tel": parseInt(valor6),
        "fechaI": valor4,
        "DNI": parseInt(data.DNI),
    }) {

        const confirm = window.confirm('seguro que quieres modificar este campo')
        if (confirm) {
            let res = await fetch('http://localhost:3000/updateUsers', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data2)
            });

            // console.log(await res.text())

        } else {
            console.log('-')
        }





        cargarUsuarios({ "DNI": usuario.DNI, "contrasena": usuario.contrasena })

    }





    return (
        <tr className='.tr1'>
            <td >{data.DNI}</td>
            <td onDoubleClick={() => {
                setEditing2(true);
            }}>
                {editing2 ? (
                    <input
                        type="text"
                        value={valor2}
                        onChange={(event) => {
                            setValor2(event.target.value);
                        }}
                        onBlur={() => {
                            setEditing2(false);
                            actualizar()
                        }}
                        autoFocus
                    />
                ) : (
                    valor2
                )}
            </td>
            <td onDoubleClick={() => {
                setEditing3(true);
            }}>
                {editing3 ? (
                    <input
                        type="text"
                        value={valor3}
                        onChange={(event) => {
                            setValor3(event.target.value);
                        }}
                        onBlur={() => {
                            setEditing3(false);
                            actualizar()

                        }}
                        autoFocus
                    />
                ) : (
                    valor3
                )}
            </td>
            <td onDoubleClick={() => {
                setEditing4(true);
            }}>
                {editing4 ? (
                    <input
                        type="text"
                        value={valor4}
                        onChange={(event) => {
                            setValor4(event.target.value);
                        }}
                        onBlur={() => {
                            setEditing4(false);
                            actualizar()

                        }}
                        autoFocus
                    />
                ) : (
                    valor4
                )}
            </td>
            <td onDoubleClick={() => {
                setEditing5(true);
            }}>
                {editing5 ? (
                    <input
                        type="text"
                        value={valor5}
                        onChange={(event) => {
                            setValor5(event.target.value);
                        }}
                        onBlur={() => {
                            setEditing5(false);
                            actualizar()

                        }}
                        autoFocus
                    />
                ) : (
                    valor5
                )}
            </td>
            <td onDoubleClick={() => {
                setEditing6(true);
            }}>
                {editing6 ? (
                    <input
                        type="text"
                        value={valor6}
                        onChange={(event) => {
                            setValor6(event.target.value);
                        }}
                        onBlur={() => {
                            setEditing6(false);
                            actualizar()

                        }}
                        autoFocus
                    />
                ) : (
                    valor6
                )}
            </td>
            <td>
                <img className="botton" src={tachito}
                    onClick={() => { eliminar({ "DNI": data.DNI, "contrasena": data.contrasena, "rango": data.rango }, data.nombre) }}
                />
            </td>

        </tr>
    );
}

export default ItemUser;