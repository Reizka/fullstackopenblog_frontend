import { useState } from 'react'

export const useField = (type) => {  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue(null);
  }

  return {
    type,
    value,
    onChange,reset
  }
}

export const useMessage = (type) => {  const [msg, setMessage] = useState('')

  const set =(value) => {
    setMessage(value);
  }

  return {
    type,
    msg,
    set
  }
}