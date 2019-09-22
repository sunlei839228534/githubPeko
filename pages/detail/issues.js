import withRepoBasic from '../../components/with-repo-basic'
import api from '../../lib/api'
import moment from 'moment'

function getLastUpdated(time){
  return moment(time).fromNow()
}

function Issues ({issues}) {
  console.log(issues)
  return (
    <>
    {
      issues.map(item=> {
        return (
          <div key={item.id}>
            <div className="issues">
              <div className="title"><a href={item.html_url}>{item.title}</a></div>
              <span>#{item.number} opened {getLastUpdated(item.created_at)} by {item.user.login}</span>
            </div>
            <style jsx>{`
              .issues {
                width: 100%;
                border: 1px solid #DCDCDC;
                padding: 20px 0 20px 20px;
              }
              .title {
                font-size: 16px;
                color: #F8F8FF
                font-weight: 600;
              }
            `}</style>
          </div>
        )
      })
    }
    </>
  )
}

Issues.getInitialProps = async({ ctx }) => {
  const { owner, name} = ctx.query

  const issuesResp = await api.request({
    url: `/repos/${owner}/${name}/issues`
  },ctx.req,ctx.res )
  return {
    issues: issuesResp.data
  }
}

export default withRepoBasic(Issues,'issues')