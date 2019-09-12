import { withRouter } from 'next/router'
import dynamic from 'next/dynamic' 
import Head from "next/head"
// const Head = import('next/head')
import Link from 'next/link'
import styled from 'styled-components'



const Title = styled.h1`
  color: yellow;
  font-size: 80px;
`

//懒加载组件
const Nav = dynamic(import('../components/nav'))


const A = ({ router,name,time }) => {
    return (
      <>
      <Head>
      </Head>
      <Title>{time}</Title>
      <Nav />
      <Link href="#aaa">
        <a>
          A {router.query.id} {name}
        </a>
      </Link>
    </>
    )
}

A.getInitialProps = async (ctx) => {
  //懒加载模块
  const moment = await import('moment')

  const promise = new Promise(resolve => {
    setTimeout(()=>{
      resolve({
        name:"peko",
        time: moment.default(Date.now()-60*1000).fromNow()
      })
    },1000)
  })
  return await promise

}

export default withRouter(A)