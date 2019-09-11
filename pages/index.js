import { useState,useEffect } from 'react'
import { Button } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import getConfig from 'next/config'


const { publicRuntimeConfig } = getConfig()

// const events = [
//   'routeChangeStart', // 1.路由开始跳转
//   'routeChangeComplete', //3.路由跳转完成
//   'routeChangeError',
//   'beforeHistoryChange',//2.在history api 改变之前
//   'hashChangeStart',
//   'hashCHangeComplete'
// ]

// function makeEvent(type) {
//   return (...args)=> {
//     console.log(type,...args)
//   }
// }

// events.forEach(event => {
//   Router.events.on(event, makeEvent(event))
// })


const context = () => {
  const [count,setCount] = useState(0)
  const [resp,setResp] = useState({})
  function handleClick() {
    setCount(count+1)
  }
  useEffect(()=>{
    axios.get('/api/user/info').then(resp=>setResp(resp))
  },[])

  return (
    <>
      <Button onClick={handleClick}>点我!</Button>
      {count}
      <Link as="/a/1" href='/a?id=1'> 
        <Button>点击去A</Button>
      </Link>
      <a href={publicRuntimeConfig.OAUTH_URL}>去登录</a>
    </>
  )
}

export default context