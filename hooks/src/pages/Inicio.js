import React, { useRef, useState, useEffect } from 'react'

import Topbar from '@/components/Topbar'
import Searchbar from '@/components/Searchbar'
import BtnAction from '@/components/Btn/BtnAction'

import IcMatricula from '@/assets/svg/ic_matricula.svg'

export default function Inicio(props) {
  return (
    <div className="page">
      <Searchbar/>
      <div className="page__actions">
        <BtnAction name="Nova matrícula" to="/matriculas/nova" icon={IcMatricula}/>
      </div>
    </div>
  )
}

