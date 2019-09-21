import MarkdownIt from 'markdown-it'
import withRepoBasic from '../../components/with-repo-basic'
import api from '../../lib/api'

const md = new MarkdownIt()

function Detail ({readme}) {
  const content = atob(readme.content)
  const html = md.render(content)

  return <div dangerouslySetInnerHTML={{__html: html}} />
}

Detail.getInitialProps = async({
  ctx: {
    query: { owner , name},
    req,
    res
  }
}) => {
  const readmeResp = await api.request({
    url: `/repos/${owner}/${name}/readme`
  },req,res)

  return {
    readme: readmeResp.data
  }
}

export default withRepoBasic(Detail, 'index')