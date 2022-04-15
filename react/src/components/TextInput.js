import React, { useRef, useState, useEffect } from 'react'
import {Link} from "react-router-dom";


export default function TextInput(props) {
    const attribute = props.attribute
    const onChange = props.onChange

    const [value, setValue] = useState("")

    function handleChange(event) {
        const inputValue = event.target.value
        setValue(inputValue)
        onChange(attribute, inputValue)
    }

  return (
      <>
          <input type="text" value={value} onChange={handleChange}/>
      </>
  )
}

