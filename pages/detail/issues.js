import withRepoBasic from '../../components/with-repo-basic'
import api from '../../lib/api'

function Issues ({issues}) {
  console.log(issues)
  return <span>issues index</span>
}

Issues.getInitialProps = async({ ctx }) => {
  const { owner, name} = ctx.query

  const issuesResp = await api.request({
    url: `/repos/${owner}/${name}/issues`
  },ctx.req,ctx.res)
  return {
    issues: issuesResp.data
  }
}

export default withRepoBasic(Issues,'issues')