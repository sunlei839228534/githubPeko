import {memo} from 'react'
import Router,{withRouter} from 'next/router'
import {Row,Col,List} from 'antd'
import Link from 'next/link'

const api = require('../lib/api')

const LANGUAGES = ['JavaScript','HTML','CSS','TypeScript','Java','Rust']
const SORT_TYPES = [
  {
    name: "Best Match"
  },{
    name: 'Most Stars',
    value: 'stars',
    order: 'desc'
  },{
    name: 'Fewest Stars',
    value: 'stars',
    order: 'asc'
  },{
    name: 'Most Forks',
    value: 'Forks',
    order: 'desc'
  },{
    name: 'Fewest Forks',
    value: 'Forks',
    order: 'asc'
  }
]

/**
 * 
 * sort: 排序方式
 * order: 排序的顺序
 * lang: 仓库的项目开发主语言
 * page: 分页页面 
 * 
 */

 const FilterLink = memo(({ name, query, lang, sort, order}) => {
  // const doSearch = (config) => {
  //   Router.push({
  //     pathname: '/search',
  //     query: {
  //       query,
  //       lang,
  //       sort,
  //       order
  //     }
  //   })
  // }
  let queryString = `?query=${query}`
  if(lang) queryString+= `&lang=${lang}`
  if(sort) queryString+= `&sort=${sort}&order=${order || 'desc'}`

   return <Link href={`/search${queryString}`}><a>{name}</a></Link>
 })

 const selectedItemStyle = {
   borderLeft: '2px solid #e36209',
   fontWeight: 100
 }


function Search({router,repos}) {
  console.log(repos)
  const { ...querys} = router.query
  const {lang,sort,order} = router.query

  // const doSearch = (config) => {
  //   router.push({
  //     pathname: '/search',
  //     query: config
  //   })
  // }

  return (
    <div className="root">
      <div>
      <Row gutter={20}>
        <Col span={6}>
          <List
            bordered
            header={(<span className="list-header">语言</span>)}
            style={{ marginBottom: 20,minWidth:150}}
            dataSource={LANGUAGES}
            renderItem={item => {
              const selected = lang === item

              return (
                <List.Item style={selected ? selectedItemStyle :null}>
                  {selected ? <span>{item}</span> : <FilterLink {...querys} lang={item} name={item}/> } 
                </List.Item>
              )
            }}
          />
          <List
            bordered
            header={(<span className="list-header">排序</span>)}
            dataSource={SORT_TYPES}
            style={{ marginBottom: 20,minWidth:150}}
            renderItem={item=>{
              let selected = false
              if(item.name === "Best Match" && !sort) {
                selected = true
              } else if (item.value === sort && item.order === order) {
                selected = true
              }
              return (
                <List.Item style={selected ? selectedItemStyle : null}>
                 {
                   selected ? <span>{item.name}</span> : <FilterLink {...querys} sort={item.value} order={item.order} name={item.name}/>
                 }
                </List.Item>
              )
            }}
          />
        </Col>
      </Row>
      </div>
      <style jsx>{`
        .root {
          padding: 20px 0;
        }
        .list-header {
          font-weight: 800;
          font-size: 16px;
        }
      `}</style>
    </div>
  )
}

Search.getInitialProps = async ({ctx}) =>{
  const {query,sort,lang,order,page} = ctx.query

  if(!query) {
    return {
      repos: {
        total_count: 0
      }
    }
  }

  // ?q=react+language:javascrtipt&sort=stars&order=desc&page=2
  let queryString = `?q=${query}`
  if(lang) queryString+= `+language:${lang}`
  if(sort) queryString+= `&sort=${sort}&order=${order || 'desc'}`
  if(page) queryString+= `page=${page}`

  const result = await api.request({
    url: `/search/repositories${queryString}`
  },ctx.req,ctx.res)

  return {
    repos: result.data
  }
}
export default withRouter(Search)
