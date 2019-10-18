import {memo,isValidElement,useEffect} from 'react'
import {withRouter} from 'next/router'
import {Row,Col,List,Pagination} from 'antd'
import Link from 'next/link'
import Repo from '../components/Repo'
import LRU from 'lru-cache'

const REPO_CACHE = new LRU({
  maxAge: 1000 * 60 * 60
})

const api = require('../lib/api')

const per_page = 20

const isServer = typeof window === 'undefined'
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

 const FilterLink = memo(({ name, query, lang, sort, order,page}) => {
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
  if(page) queryString+= `&page=${page}`

  queryString += `&per_page=${per_page}`

   return <Link href={`/search${queryString}`}>
     {isValidElement(name) ? name: <a>{name}</a>}
      </Link>
 })

 const selectedItemStyle = {
   borderLeft: '2px solid #e36209',
   fontWeight: 100
 }


function Search({router,repos}) {
  const { ...querys} = router.query
  const {lang,sort,order,page} = router.query

  useEffect(()=>{
    if(repos) {
      REPO_CACHE.set('search-repos',repos)
      REPO_CACHE.set('current-router',router.query)
    }
  },[])
  const noop = () =>{}
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
        <Col span={18}>
          <h3 className="repos-title">{repos.total_count}个仓库</h3>
          {
            repos.items.map(repo => <Repo repo={repo} key={repo.id} />)
          }
          <div className="pagination">
              <Pagination
                pageSize={per_page}
                current={Number(page) || 1}
                total={1000}
                onChange={noop}
                itemRender={(page, type, ol) => {
                  const p = type === 'page' ? page : type === 'prev' ? page - 1 : page + 1
                  const name = type === 'page' ? page : ol
                  return <FilterLink {...querys} page={p} name={name}  />
                }}
              />
          </div>
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
        .repos-title {
          border-bottom: 1px solid #eee;
          font-size: 24px;
          line-height: 50px;
        }
        .pagination {
          padding: 20px;
          text-align: center
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
  queryString += `&per_page=${per_page}`
  if(!isServer) {
    const currentQuery = REPO_CACHE.get('current-router') || ''
    console.log(currentQuery.query)
    console.log(query)
    const repos = REPO_CACHE.get('search-repos')
    if(query === currentQuery.query && repos) {
      REPO_CACHE.set('current-router',query)
      REPO_CACHE.set('search-repos',repos)
      console.log(repos)
      return {
        repos
      }
    }else {
      const result = await api.request({
        url: `/search/repositories${queryString}`
      },ctx.req,ctx.res)
      return {
        repos: result.data
      }
    }
  }
  const result = await api.request({
    url: `/search/repositories${queryString}`
  },ctx.req,ctx.res)

  return {
    repos: result.data
  }
}
export default withRouter(Search)
