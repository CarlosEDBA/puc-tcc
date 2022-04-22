import React, { useRef, useState, useEffect } from 'react'

import eu from '@/assets/img/eu.png'

export default function Searchbar(props) {
    return (
        <div className="searchbar">
            <div className="searchbar__input">
                <input type="text" placeholder="Procure por alunos..."/>
                <div className="searchbar__icon">
                    <i data-feather="search"></i>
                </div>
            </div>
            <div className="searchbar__results">

                <div className="searchbar-result searchbar-result--aluno">
                    <div className="searchbar-result__left">
                        <div className="searchbar-result__picture">
                            <img src={eu}/>
                        </div>
                        <p className="searchbar-result__name">Carlos Eduardo Barbosa de Almeida</p>
                    </div>
                    <div className="searchbar-result__right">
                        <span className="searchbar-result__processo">1231231123</span>
                    </div>
                </div>

                <div className="searchbar-result searchbar-result--aluno">
                    <div className="searchbar-result__left">
                        <div className="searchbar-result__picture">
                            <img src={eu}/>
                        </div>
                        <p className="searchbar-result__name">Carlos Eduardo Barbosa de Almeida</p>
                    </div>
                    <div className="searchbar-result__right">
                        <span className="searchbar-result__processo">1231231123</span>
                    </div>
                </div>

                <div className="searchbar-result searchbar-result--aluno">
                    <div className="searchbar-result__left">
                        <div className="searchbar-result__picture">
                            <img src={eu}/>
                        </div>
                        <p className="searchbar-result__name">Carlos Eduardo Barbosa de Almeida</p>
                    </div>
                    <div className="searchbar-result__right">
                        <span className="searchbar-result__processo">1231231123</span>
                    </div>
                </div>

            </div>
        </div>
    )
}