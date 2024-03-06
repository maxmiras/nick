import '../styles/registrarse.css'
import { useContext, useState } from 'react'
import { contextoGood } from '../App'









function Registrarse1() {

    const { getI, setI, cargarT,ruta} = useContext(contextoGood)


    const conseguirContraseña = async (data2) => {
        // console.log(data2);
        if (data2.DNI && data2.Email) {
            try {
                const response = await fetch(`${ruta}/obtenerContrasena`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data2)
                });


                let respuesta;

                try {
                    respuesta = await response.json()

                } catch (error) {
                    console.log(error)
                }

                // console.log(respuesta)

                alert(`la contraseña es : ${respuesta.contrasena}`)

            } catch (error) {
                console.log(error)
            }

        }

    }

    const conectarseConServer = async (data2) => {
        // console.log(data2);
        if (data2.DNI && data2.contrasena) {
            try {
                const response = await fetch(`${ruta}/iniciarSecion`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data2)
                });

                let respuesta;

                try {
                    respuesta = await response.json()

                } catch (error) {
                    console.log(error)
                }

                if (respuesta.error) {
                    if (respuesta.error == 404) {
                        alert('no esta registrado')

                    }
                }

                if (respuesta.error) {
                    console.log(respuesta.error)

                }
                // console.log(response)

                if (typeof respuesta == 'object') {
                    // console.log(respuesta);
                    window.localStorage.setItem('usuario', JSON.stringify(respuesta));

                    // usuario = await JSON.parse(localStorage.getItem('usuario'))
                    cargarT()
                    // window.location.reload();


                }


            } catch (error) {
                console.log(error)
            }

        }

    }







    const [valor1, setV1] = useState('')
    const [valor2, setV2] = useState('')
    const [cambiar, setCam] = useState(false)






    return (
        <>
            {
                !cambiar ?
                    <div className="container">
                        {/* <p className="pMail">DNI</p> */}
                        <input type="text" id="" className="input1 inp4" onChange={(e) => {
                            setV1(e.target.value)
                        }} value={valor1} placeholder="E-mali" name="gmail" />
                        {/* <p className="pAsunt">Contraseña</p> */}
                        <input type="password" onChange={(e) => {
                            setV2(e.target.value)
                            let termin = true;
                            document.getElementById('input').type = 'text';
                            if (termin) {
                                termin = false
                                setTimeout(() => {
                                    document.getElementById('input').type = 'password';
                                    termin = true

                                }, 1000)
                            }


                        }}
                            value={valor2} id="input" className="input2" placeholder="Contraseña" name="asunto"
                        />
                        <button className='btnOlv' onClick={() => {

                            setCam(true)
                            setV1('')
                            setV2('')
                            
                        }}> Olvide mi contraseña </button>
                        <div className="btnsEnviar">
                            <button className='inpSub2' onClick={() => {
                                setI(!getI)
                                setV1('')
                                setV2('')
                                
                                }}>Cancelar</button>
                            <button className='inpSub' onClick={() => {

                                const tester = /\w+\@gmail\.\w+/;
                                if (tester.test(valor1) && valor2.length >= 3) {
                                    conectarseConServer({ "DNI": valor1, "contrasena": `${valor2}` })

                                } else {
                                    alert('coloque parametros validos')
                                }

                            }}>Iniciar secion </button>
                        </div>
                    </div>
                    :
                    <div className="container">
                        {/* <p className="pMail">DNI</p> */}
                        <input type="number" id="" className="input1 inp4" onChange={(e) => {
                            setV1(e.target.value)
                        }} value={valor1} placeholder="DNI" name="gmail" />
                        {/* <p className="pAsunt">Contraseña</p> */}
                        <input type="email" onChange={(e) => {
                            setV2(e.target.value)
                            let termin = true;
                            document.getElementById('input').type = 'text';
                            if (termin) {
                                termin = false
                                setTimeout(() => {
                                    document.getElementById('input').type = 'password';
                                    termin = true

                                }, 1000)
                            }


                        }}
                            value={valor2} id="input" className="input2" placeholder="Email" name="asunto"
                        />

                        <div className="btnsEnviar">
                            <button className='inpSub2' onClick={() => {
                                setCam(false)
                                setV1('')
                                setV2('')
                                
                            
                            
                            }}>Cancelar</button>
                            <button className='inpSub' onClick={() => {

                                const tester = /\w+\@gmail\.\w+/;
                                if (tester.test(valor2) && valor1.length >= 3) {
                                    conseguirContraseña({ "DNI": valor1, "Email": `${valor2}` })

                                } else {
                                    alert('coloque parametros validos')
                                }

                            }}>Enviar </button>
                        </div>
                    </div>
            }

        </>
    );
}

export default Registrarse1;