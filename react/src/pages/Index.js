import React, {useRef, useState, useEffect} from 'react'

export default function Index(props) {
    const [contador, setContador] = useState(10)
    const [nome, setNome] = useState("")

    function mudarNome(event) {
        const texto = event.target.value
        setNome(texto)

    }

    function aumentarContador() {
        setContador(contador + 1 )
    }

    return (
        <div className="page">
            <h2>Index</h2>
            <div>Contador: {contador}</div>
            <button onClick={aumentarContador}>Aumentar</button>
            <input value={nome} onChange={mudarNome} type="text"/>
        </div>
    )
}

