import Repo from './Repo'
import Link from 'next/link'
import { withRouter } from 'next/router'

import api from '../lib/api'


export default function (Comp) {
  function WithDetail({ repoBasic,router,...rest }) {
    console.log(repoBasic)

    function makeQuery(queryObject) {
      const query = Object.entries(queryObject).reduce((result,entry) => {
        result.push(entry.join('='))
        return result
      },[]).join("&")
      return `?${query}`
    }
    
    const query = makeQuery(router.query)
    return (
      <div className="root">
        <div className="repo-basic">
          <Repo repo={repoBasic} />
          <div className="tabs">
            <Link href={`/detail${query}`}>
              <a className="tab index">Readme</a>
            </Link>
            <Link href={`/detail/issues${query}`}>
              <a className="tab issues">Issues</a>
            </Link>
          </div>
        </div>
        <div><Comp {...rest} /></div>
        <style jsx>{`
        .root {
          padding-top: 20px
        }
        .repo-basic {
          padding: 20px;
          border: 1px solid #eee;
          margin-bottom: 20px;
          border-radius: 5px
        }
        .tab + .tab {
          margin-left: 20px
        }
        `}</style>
      </div>
    )
  }

  WithDetail.getInitialProps = async (context) => {
    const {router ,ctx} = context
    const { owner, name} = ctx.query
    const repoBasic = await api.request({
      url: `/repos/${owner}/${name}`
    },ctx.req,ctx.res)

    let pageData = {}
    if(Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(context)  
    }
    return {
      repoBasic: repoBasic.data,
      ...pageData
    }
  }
  return withRouter(WithDetail)
}