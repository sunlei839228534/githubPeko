import withRepoBasic from '../../components/with-repo-basic'

function Issues ({text}) {
  return <span>issues index {text}</span>
}

Issues.getInitialProps = async() => {
  console.log('issues')
  return {
    text:123
  }
}

export default withRepoBasic(Issues,'issues')