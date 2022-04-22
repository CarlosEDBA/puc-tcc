import React, { useRef, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'

export default function BtnAction(props) {
  const name = props.name
  const to = props.to || ''
  const Icon = props.icon

  return (
      <Link className="btn btn--action" to={to}>
        <div className="svg svg--height btn__icon">
          <Icon/>
        </div>
        {name}
      </Link>
  )
}