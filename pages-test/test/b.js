const B = ({name}) => <span>{name}</span>

B.getInitialProps = async (ctx) => {
  const promise = new Promise(resolve=>{
    setTimeout(()=>{
      resolve({
        name:"sunlei"
      })
    },1000)
  })
  return await promise
}

export default B

