
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {

    const {socket} = useContext(SocketContext);

    const [bands, setBands] = useState([]);

    useEffect(() => {
        socket.on("current-bands", (bands) => {
                setBands(bands);
        });

        return () => socket.off('current-bands');

    }, [socket])

    const handlecambioNombre = (event, id ) => {
        const newname = event.target.value

        setBands( bands => bands.map( band =>{
            if( band.id === id ){
                band.name = newname
            }
            return band;
        } ) )
    }

    const onPerdioFoco = ( id, nombre)=>{
        //TODO: Disparar el evento del socket
        socket.emit("cambiar-nombre-banda", { id, nombre });
    }

    const votar = (id) => {
    socket.emit("votar-banda", id);
    };

    const borrar = (id) => {
        socket.emit("borrar-banda", id);
    };


    const crearRows = ()=> {

        return(

            bands.map( band =>(

                <tr key={ band.id } >
                    <td>
                        <button 
                            className="btn btn-primary" 
                            onClick = { ()=> votar( band.id )}
                        > +1</button>
                    </td>
                    <td>
                        <input type="text" className="form-control" 
                            value={band.name}
                            onBlur = { ()=> onPerdioFoco (band.id, band.name ) }
                            onChange = { (event) => handlecambioNombre(event, band.id ) }
                        />
                    </td>
                    <td> <h3>{ band.votos } </h3> </td>
                    <td>
                        <button 
                            className="btn btn-danger"
                            onClick = { ()=>borrar( band.id ) }
                        >Borrar</button>
                    </td>
                </tr>
             ) )

        );

    }


    return (
        <>

            <table className="table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {crearRows()}
                </tbody>
            </table>

        </>
    )
}
