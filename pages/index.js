import { useState,useEffect } from 'react'
import { Button } from 'antd'
import Link from 'next/link'
import { Router } from 'next/router';

const events = [
  'routeChangeStart', // 1.路由开始跳转
  'routeChangeComplete', //3.路由跳转完成
  'routeChangeError',
  'beforeHistoryChange',//2.在history api 改变之前
  'hashChangeStart',
  'hashCHangeComplete'
]

function makeEvent(type) {
  return (...args)=> {
    console.log(type,...args)
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})


const context = () => {
  const [count,useCount] = useState(0)
  function handleClick() {
    useCount(count+1)
  }
  useEffect(()=>{
    console.log("start")
  },[])

  return (
    <>
      <Button onClick={handleClick}>点我!</Button>
      {count}
      <Link as="/a/1" href='/a?id=1'> 
        <Button>点我A</Button>
      </Link>
    </>
  )
}

export default context