import React, {useRef, useState, useEffect} from 'react'
import update from 'immutability-helper'


import TextInput from '@/components/TextInput'

export default function CadastrarAluno(props) {
    const [form, setForm] = useState({})

    //funcao que roda quando uma variavel é atualizada
    useEffect(() => {
        console.log('form', form)
    }, [form])

    function mudarNome(event) {
        const texto = event.target.value
        setNome(texto)
    }

    function handleTextInputChange(attribute, value) {
        setForm(update(form, {
            $merge: { [attribute]: value }
        }))
    }

    function aumentarContador() {
        setContador(contador + 1 )
    }

    return (
        <div className="cadastro-aluno">
            <h2>Cadastro do Aluno</h2>
            <div className="inputs">
                <TextInput attribute="nome" onChange={handleTextInputChange}/>
                <TextInput attribute="nomeMae" onChange={handleTextInputChange}/>
                <TextInput attribute="nomePai" onChange={handleTextInputChange}/>
            </div>
        </div>
    )
}

