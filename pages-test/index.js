import { useState,useEffect, Children } from 'react'
import { Button } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import getConfig from 'next/config'
import {connect} from 'react-redux'

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
  console.log(resp)
  useEffect(()=>{
    axios.get('/api/user/info').then(res=>{
      setResp(res)
    })
  },[])
  return (
    <>
    {/* {React.createElement('div',{className:'peko'},'hellowolrd')} 首先通过babel把render里面的内容转化为React的表达式。然后执行render 的时候 返回element */}

    {/* {
      type: 'div',
      props: {
        className: 'peko',
        children: 'helloworld'
      }
    } 调用render后得到一个element 再去初始化element 如果element是一个对象，就看它的type是否是一个原生的标签，如果是原生,就为他生成一个实例对象,并调用mountComponent方法 将它转化成真正的dom元素*/}
      {React.createElement('div',{className:null},'hello')}
      <Button onClick={handleClick}>点我!</Button>
      {count}
      <Link as="/a/1" href='/a?id=1'> 
        <Button>点击去A</Button>
      </Link>
      <a href={publicRuntimeConfig.OAUTH_URL}>去登录</a>
    </>

  )
}

function mapStateToProps(state) {
  return {
    counter: state.counter.count,
    username: state.user.username
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (num) => dispatch({type: 'ADD',num}),
    rename: (name) => dispatch({type:"UPDATE_USERNAME",name})
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(context)

