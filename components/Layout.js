import {useState,useCallback} from 'react'
import Link from 'next/link'
import Contaniner from './Container'
import {Button,Layout,Icon,Input, Avatar} from 'antd'

const {Header,Content,Footer} = Layout

const githubIconStyle = {
  color: "white",
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20
}

const footerStyle = {
  textAlign:"center"
}

export default ({children}) => {

  const [search,setSearch] = useState('')

  const handleSearchChange = useCallback((e) =>{
    setSearch(e.target.value)
  },[])

  const handleOnSearch = useCallback(()=> {
    console.log('onSearch')
  })

  return (
  <>
    <Layout>
      <Header>
        <div className="header-inner">
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={githubIconStyle} />
            </div>
            <div>
              <Input.Search
              onChange={handleSearchChange}
              placeholder="搜索仓库"
              value={search}
              onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
            <Avatar size={40} icon='user' />
            </div>
        </div>
        </div>
      </Header>
      <Content>
        <Contaniner comp="div" children={children}>
        </Contaniner>
      </Content>
      <Footer style={footerStyle}>
        Develop by Peko @
        <a href="839228534@qq.com"></a>
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
          height: 100%
        }
        `}
      </style>
    </Layout>
  </>
  )
}