import React, { useState, useEffect } from 'react'

export default function Dev() {
  return (
    <div className="dev">
      <div className="dev-buttons">
        <button className="btn btn-one">Botão 1</button>
        <button className="btn btn-two">Botão 2</button>
        <button className="btn btn-three">Botão 3</button>
        <button className="btn btn-four">Botão 4</button>
        <button className="btn btn-five btn-orange">Botão 5</button>
        <button className="btn btn-five btn-bright-blue">Botão 5</button>
        <button className="btn btn-six btn-orange">Botão 6</button>
        <button className="btn btn-six btn-bright-blue">Botão 6</button>
        <button className="btn btn-seven btn-bright-blue">Botão 7</button>
      </div>

      <div className="inputs-test">
        <div className="inputs">
          <div className="input w1">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w1-q1">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w1-q2">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w1-q3">
            <label>Nome:</label>
            <input type="text"/>
          </div>
        </div>
        <div className="inputs">
          <div className="input w2">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w2-q1">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w2-q2">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w2-q3">
            <label>Nome:</label>
            <input type="text"/>
          </div>
        </div>
        <div className="inputs">
          <div className="input w3">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w3-q1">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w3-q2">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w3-q3">
            <label>Nome:</label>
            <input type="text"/>
          </div>
        </div>
        <div className="inputs">
          <div className="input w4">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w4-q1">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w4-q2">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w4-q3">
            <label>Nome:</label>
            <input type="text"/>
          </div>
        </div>
        <div className="inputs">
          <div className="input w5">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w5-q1">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w5-q2">
            <label>Nome:</label>
            <input type="text"/>
          </div>
          <div className="input w5-q3">
            <label>Nome:</label>
            <input type="text"/>
          </div>
        </div>
      </div>
    </div>
  )
}

