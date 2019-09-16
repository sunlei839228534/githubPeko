import {useState, useCallback, Children} from 'react'
import store from '../store/store'

export default () => {
  function handleClick() {
    console.log(1)
  }
  return (
    <div onClick={handleClick}>
      hi!
    </div>
  )
}