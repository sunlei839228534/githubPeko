import {useState,useCallback} from 'react'
import getConfig from 'next/config'
import {withRouter} from 'next/router'
import {connect} from 'react-redux'
import Link from 'next/link'
import {Layout,Icon,Input, Avatar,Tooltip, Dropdown, Menu} from 'antd'
import Container from './Container'
import axios from 'axios'

import { logOut } from "../store/store"

const { publicRuntimeConfig } = getConfig()

const { Search } = Input

const { Header, Content, Footer} = Layout

const githubIconStyle = {
  color: "white",
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20
}

const footerStyle = {
  textAlign: "center"
}

const MyLayout = ({children,user,logout,router}) => {

  const handleLogOut = useCallback((e) => {
    logout()
    e.preventDefault()
  },[logout])

  const handleGoToOAuth = useCallback((e) => {
    e.preventDefault()
    axios.get(`prepare-auth?url=${router.asPath}`).then(resp => {
      if(resp.status === 200) {
        location.href = publicRuntimeConfig.OAUTH_URL
      } else {
        console.log('prepare auth failed' ,resp)
      }
    }).catch(err=>{
      console.log(err)
    })
  },[])

  const userDropDown = (<Menu><Menu.Item><a onClick={handleLogOut} href="" >登出</a></Menu.Item></Menu>)

  const urlQuery = router.query && router.query.query

  const [search,setSearch] = useState(urlQuery || '')

  const handleSearchChange = useCallback((e) =>{
    setSearch(e.target.value)
  },[])

  const handleOnSearch = useCallback(()=> {
    router.push(`/search?query=${search}`)
  },[search])
  return (
  <>
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner"></div>}>
          <div className="header-left">
          <Link href="/">
            <div className="logo">
              <Icon type="github" style={githubIconStyle} />                
            </div>
            </Link>          
            <div>
              <Search
              onChange={handleSearchChange}
              placeholder="搜索仓库"
              value={search}
              onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {
                user && user.id ? (
                  <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url}></Avatar>
                  </a>
                  </Dropdown>
                ) : (
                  <Tooltip title="点击进行登录">
                  <a href={publicRuntimeConfig.OAUTH_URL} onClick={handleGoToOAuth}>
                  <Avatar size={40} icon="user"></Avatar>
                  </a>
                  </Tooltip>
                )
              }
            </div>
        </div>
        </Container>
      </Header>
      <Content>
        <Container renderer={<div />}>
          {children}
        </Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by Peko @
        <a href="839228534@qq.com">839228534@qq.com</a>
      </Footer>
      <style jsx>{`
       .header-inner {
         display: flex;
         justify-content: space-between;
       }
       .header-left {
         display: flex;
         justify-content: flex-start
       }
      `}</style>
      <style jsx global>
        {`
        #__next {
          height: 100%
        }
        .ant-layout {
          min-height: 100%
        }
        .ant-layout-header {
          paddingLeft: 0;
          paddingRight: 0
        }
        `}
      </style>
    </Layout>
  </>
  )
}

function mapState(state) {
  return {
    user: state.user
  }
}
function mapDispatch(dispatch) {
  return {
    logout: ()=>dispatch(logOut())
  }
}

export default withRouter(connect(mapState,mapDispatch)(MyLayout))