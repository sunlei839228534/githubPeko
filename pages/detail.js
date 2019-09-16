function Detail() {
  return <span>Detail</span>
}

Detail.getInitialProps = async() => {
  const promise = new Promise(resolve=> {
    setTimeout(()=> {
      resolve({})
    },1000)
  })
  return await promise
}

export default Detail