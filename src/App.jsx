import { createContext, useEffect, useState } from 'react';
import './App.css'
import BarraNav from './components/barraNav';
import PagCent from './components/paginaSentral';
import ItemUser from './components/itemUser';
import ItemUser2 from './components/itemUsuario2';
import ItemUser3 from './components/itemUsuario3';
import ItemUser4 from './components/añadirUsuario4';


import AñadirUsuario from './components/añadirUsuario';
import Cards from './components/cards';
import ItemUser5 from './components/itemHist';



export const contextoGood = createContext()

let usuario = undefined;

const ruta = "https://api-nick.vercel.app/"



if (localStorage.getItem('usuario') && usuario == undefined) {
  usuario = JSON.parse(localStorage.getItem('usuario'))
}


function App() {

  const [getI, setI] = useState(false)
  const [cerrar, setC] = useState(false)
  const [cargar, setCarg] = useState(false)
  const [carg2, setCarg2] = useState(false)
  const [res, setR] = useState([])
  const [agregar, setA] = useState(false)
  const [res2, setR2] = useState([])
  const [usuarioAC, setUAC] = useState(undefined)
  const [cargar3, setAU] = useState(false)
  const [entrenamientos, setEnt] = useState(undefined)
  const [cargado5, setCargado5] = useState(false)
  const [elijio, setElij] = useState(false)
  const [historial, setHist] = useState(false)
  const [historialInfo, setHistInfo] = useState(undefined)

  //nesesatios para el insert 
  const [N, SN] = useState('')
  const [N2, SN2] = useState('')
  const [N3, SN3] = useState('')
  const [N4, SN4] = useState('')
  const [N5, SN5] = useState('')
  const [N6, SN6] = useState('')
  const [N7, SN7] = useState('')
  const [N8, SN8] = useState('')
  //nesesario para el insert2
  const [N9, SN9] = useState('')
  const [N10, SN10] = useState('')
  const [N11, SN11] = useState('')


  async function cargarT(){
    if (localStorage.getItem('usuario') && usuario == undefined) {
        setI(false)
        usuario = await JSON.parse(localStorage.getItem('usuario'))
        setC(true)
    }
  }

  async function añadirEntrenamiento(info) {
    await fetch(`${ruta}/addEntrenamiento`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    });
    setAU(false)
    // console.log(usuarioAC)
    // alert(usuarioAC.clienteDNI)
    cargarEntrenamiento({ "userDNI": usuarioAC.clienteDNI })
  }



  async function inscribirUsuario(info) {
    const res = await fetch(`${ruta}/registrarse`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    });

    let res2 = await res.text()

    if (res2 == 'ya esta registrado') {
      alert("Ya se encuentra registrado ")
    }

    setElij(false)
  }


  async function cargarEntrenamiento(data2 = { "userDNI": usuarioAC.clienteDNI }) {
    const response = await fetch(`${ruta}/obtEnt`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data2)
    });


    const respuestaNes = new Promise(async (res, rej) => {
      try {
        res(response.json())

      } catch (error) {
        rej(error)
      }
    })

    setEnt(await respuestaNes)
    // console.log('esto es entrenamientos ' + entrenamientos)
  }


  async function cargarHistorialEnt(data2) {
    const response = await fetch(`${ruta}/obtHisEnt`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data2)
    });


    const respuestaNes = new Promise(async (res, rej) => {
      try {
        res(response.json())

      } catch (error) {
        rej(error)
      }
    })

    setHistInfo(await respuestaNes)
  }




  async function cargarClientes(data2) {
    const response = await fetch(`${ruta}/obtUE`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data2)
    });


    const respuestaNes = new Promise(async (res, rej) => {
      try {
        res(response.json())

      } catch (error) {
        rej(error)
      }
    })

    setR2(await respuestaNes)
    setCarg2(true)
  }



  async function cargarUsuarios(data2, si = true) {
    const response = await fetch(`${ruta}/obtenerUsuarios`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data2)
    });


    const respuestaNes = new Promise((res, rej) => {
      try {
        res(response.json())
      } catch (error) {
        // console.log(error)
        rej(error)
      }
    })

    setR(await respuestaNes)
    si = true ?
      setCarg(true)
      : console.log('.')

  }

  // console.log(res)

  if (usuario !== undefined) {
    if (usuario.rango == 'cliente' && cargado5 == false) {
      cargarEntrenamiento({ "userDNI": usuario.DNI })
      setCargado5(true)
    } else if (usuario.rango == 'entrenador' && !carg2) {
      cargarClientes({ "DNI": usuario.DNI, "contrasena": usuario.contrasena });
    }

  }





  usuarioAC !== undefined ? console.log('.2') : console.log('1')


  const [cargEntrenamientos, setcargEntrenamientos] = useState(false);


  // console.log(usuario)
  return (



    <contextoGood.Provider value={{ruta, getI, res, cargarT,cargar, setCarg,usuario, cerrar, N, N8, usuarioAC, cargarEntrenamiento, setUAC, SN8, SN, N2, SN2, N3, SN3, N4, SN4, N5, SN5, N6, SN6, N7, SN7, setI, setC, cargarUsuarios }}>
      {usuario !== undefined ?
        usuario.rango == 'administrador' && cerrar ? <div className='contenedorB2'>
          <div className='bloqueC2'>
            <BarraNav text={'cerrar secion'} />

            {elijio ? cargar && !agregar ?

              <>
                <div className='contenedorU'>
                  <button className='btSal' onClick={() => {
                    setElij(false)
                  }} ></button>
                  <table className='tabla'>
                    <thead>
                      <tr>
                        <th >DNI</th>
                        <th >nombre</th>
                        <th >Email</th>
                        <th >fecha de inscripcion </th>
                        <th >reango</th>
                        <th>Tel</th>
                        <th></th>
                      </tr>

                    </thead>
                    <tbody>
                      {
                        res.map((f, index) => {
                          return <ItemUser key={index} data={f} />

                        })
                      }
                    </tbody>


                  </table>


                </div>


              </>

              : !cargar && agregar ? <>
                <div className='contenedorU contU2'>
                  <button className='btSal' onClick={() => {
                    setElij(false)
                  }} ></button>
                  <AñadirUsuario />

                  <div className='contInp'>
                    <button className='btn1 Can' onClick={() => { setA(false); setCarg(true) }}>cancelar</button>
                    <button className='btn1 Acept' onClick={() => {
                      console.log('apretaste aceptar')
                      if (N.length >= 1
                        && N2.length >= 1
                        && N4.length >= 1
                        && N5.length >= 1
                        && N6.length >= 1
                        && N7.length >= 1
                      ) {
                        console.log('se cumplen los parametros')
                        const Fecha = new Date()
                        const fechaL = `${Fecha.getDate()}/${Fecha.getMonth()}/${Fecha.getFullYear()}`
                        let obj = {
                          "nombre": N,
                          "Email": N2,
                          "rango": N4,
                          "tel": parseInt(N5),
                          "fechaI": fechaL,
                          "DNI": parseInt(N6),
                          "contrasena": N7
                        }
                        const ned = /administrador/i;
                        const ned2 = /entrenador/i;

                        if (ned.test(obj.rango) || ned2.test(obj.rango)) {
                          console.log('es admin o entrenador')
                          obj = {
                            "nombre": N,
                            "Email": N2,
                            "rango": N4,
                            "tel": parseInt(N5),
                            "fechaI": fechaL,
                            "DNI": parseInt(N6),
                            "contrasena": N7
                          }
                          inscribirUsuario(obj)
                          // console.log(obj)
                        } else {
                          console.log('no es admin ni entrenador')
                          const ned = /cliente/i;
                          // console.log(obj.rango)
                          if (ned.test(obj.rango)) {
                            console.log(' es cliente');
                            obj = {
                              "nombre": N,
                              "Email": N2,
                              "rango": N4,
                              "tel": parseInt(N5),
                              "fechaI": fechaL,
                              "DNI": parseInt(N6),
                              "contrasena": N7,
                              "entrenadorDNI": parseInt(N8)
                            }
                            console.log('hasta ahora to good')
                            if (obj.entrenadorDNI) {
                              inscribirUsuario(obj)
                              // console.log(obj)
                              console.log('se envio el usuario')
                            }

                          } else {
                            alert('pon un objeto valido en el rango')
                          }
                        }


                      } else {
                        alert('rellena todos los campos')
                      }

                    }}>Aceptar</button>

                  </div>
                </div>


              </>

                : <></>
              :
              <div className='contCards2'>
                <button className='btC btC4' onClick={() => {
                  setElij(true)
                  cargarUsuarios({ "DNI": usuario.DNI, "contrasena": usuario.contrasena })
                  setA(false); setCarg(true)
                }}>Ver usuarios</button>
                <button className='btC btC3' onClick={() => {
                  setElij(true)
                  setA(true); setCarg(false)
                }}>Añadir usuario</button>
              </div>

            }

          </div>




        </div> :  usuario.rango == 'entrenador' && cerrar ?
          <div className='contenedorB2'>
            <div className='bloqueC2'>
              <BarraNav text={'cerrar secion'} />

              {
                usuarioAC !== undefined ? elijio ?     <>
              <div className='contenedorU'>
              <button className='btSal' onClick={() => {
                    setElij(false)
                    setEnt(undefined); setUAC(undefined)
                  }} ></button>
                {

                  cargar3 ?
                    <>
                      <p>Dia de la semana</p>
                      <input type="text" onChange={(e) => {

                        SN9(e.target.value)

                      }} value={N9} className='input1' />

                      <p>HS</p>

                      <input type="text" className='input1' onChange={(e) => {

                        SN10(e.target.value)
                      }} value={N10} />

                      <p>entrenamiento</p>

                      <textarea type="text" className='texA' onChange={(e) => {

                        SN11(e.target.value)

                      }} value={N11}></textarea>

                      <button className='btnP btnP2 ' onClick={() => setAU(false)} >Cancelar</button>
                      <button className='btnP' onClick={
                        () => {
                          let obj;
                          const strN1 = /(lunes|martes|miercoles|jueves|viernes)/i;
                          if (strN1.test(N9)) {
                            obj = { ...obj, dia: N9 };

                          } else {
                            alert('el dia no es correcto ')
                            return
                          }
                          const strN2 = /(\d\:\d|\d\:\d\s?(am|AM|pm|PM))/;
                          if (strN2.test(N10)) {
                            obj = { ...obj, hs: N10 };

                          } else {
                            alert('la hs no es correcta')
                            return
                          }
                          if (N11.length >= 5) {
                            obj = { ...obj, entrenamiento: N11 };
                          } else {
                            alert('el entrenamiento tiene que tener al menos 5 caracteres')
                            return
                          }
                          añadirEntrenamiento({
                            "DNI": usuario.DNI,
                            "contrasena": usuario.contrasena,
                            "usuarioDNI": usuarioAC.clienteDNI,
                            "dia": obj.dia,
                            "hs": obj.hs,
                            "entrenamiento": obj.entrenamiento
                          })
                          // console.log({
                          //   "DNI": usuario.DNI,
                          //   "contrasena": usuario.contrasena,
                          //   "usuarioDNI": usuarioAC.clienteDNI,
                          //   "dia": obj.dia,
                          //   "hs": obj.hs,
                          //   "entrenamiento": obj.entrenamiento
                          // })
                        }
                      }>Aceptar</button>
                    </>
                    :
                    entrenamientos == undefined ?
                      <h1 className='h1S'>No tiene entrenamiento</h1>
                      : entrenamientos.length == 0 ?
                        <h1 className='h1S'>No tiene entrenamiento</h1>

                        :
                        <table className='tabla'>
                          <thead>
                            <tr>

                              <th >dia</th>
                              <th >hs</th>
                              <th>entrenamiento</th>
                              <th></th>

                            </tr>
                          </thead>
                          <tbody>
                            {entrenamientos ?
                              entrenamientos.map((f, index) => {
                                return <ItemUser3 key={index} data={f} />
                              }) : <></>
                            }
                          </tbody>


                        </table>


                }


              </div>
            </>:  
            <div className='contCards2'>
              <button className='btC' onClick={() => {
                cargarHistorialEnt({ "DNI": usuario.DNI })
                setElij(true);
                setAU(false)
              }}> ver Entrenamientos</button>
              <button className='btC btC2' onClick={() => {
                setElij(true);
                setAU(true)
              }}> agregar entrenamientos </button>
            </div>

        

            :
            <>
              <h1 className='h2 h21'>Tus usuarios a cargo:</h1>
              <div className='contenedorU'>

                <table className='tabla'>
                  <thead>
                    <tr>

                      <th >nombre</th>
                      <th >DNI del usuario </th>
                    </tr>
                  </thead>
                  <tbody>
                    {res2 ?
                      res2.map((f, index) => {
                        return <ItemUser2 key={index} data={f} />
                      }) : <></>
                    }
                  </tbody>


                </table>
              </div>
            </>


              }


          </div>
          </div>


          : usuario.rango == 'cliente' && cerrar ?
    <div className='contenedorB2'>
      <div className='bloqueC2'>
        <BarraNav text={'cerrar secion'} />

        {elijio ? historial ?
          <>

            <div className='contenedorU3'>
              <button className='btSal' onClick={() => {
                setElij(false)
              }} ></button>

              <h1 className='h1 h21'>Historial:</h1>
              {
                historialInfo == undefined || historialInfo.length <= 0 ?
                  <h1 className='h1S'>No tiene entrenamiento</h1>
                  : <table className='tabla'>
                    <thead>
                      <tr>

                        <th>Fecha</th>
                        <th >dia</th>
                        <th >hs</th>
                        <th>entrenamiento</th>

                      </tr>
                    </thead>
                    <tbody>
                      {historialInfo ?
                        historialInfo.map((f, index) => {
                          return <ItemUser5 key={index} data={f} />
                        }) : <></>
                      }
                    </tbody>


                  </table>
              }
            </div>
          </>
          :
          <div className='contenedorU3'>
            <button className='btSal' onClick={() => {
              setElij(false)
            }} ></button>

            <h1 className='h1 h21'>tus entrenamientos:</h1>


            {
              entrenamientos == undefined || entrenamientos.length <= 0 ?
                <h1 className='h1S'>No tiene entrenamiento</h1>
                : <table className='tabla'>
                  <thead>
                    <tr>

                      <th >dia</th>
                      <th >hs</th>
                      <th>entrenamiento</th>

                    </tr>
                  </thead>
                  <tbody>
                    {entrenamientos ?
                      entrenamientos.map((f, index) => {
                        return <ItemUser4 key={index} data={f} />
                      }) : <></>
                    }
                  </tbody>


                </table>
            }
          </div> :
          <div className='contCards2'>
            <button className='btC' onClick={() => {
              cargarHistorialEnt({ "DNI": usuario.DNI })
              setElij(true);
              setHist(true);
            }}> Historial</button>
            <button className='btC btC2' onClick={() => {
              setElij(true);
              setHist(false);
            }}> Entrenamientos diarios </button>
          </div>
        }

      </div>
    </div>
    : <PagCent text={'iniciar sesion'} />

        :
  <PagCent text={'iniciar sesion'} />



}


    </contextoGood.Provider >

  )

}





export default App;
