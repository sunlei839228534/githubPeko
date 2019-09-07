const B = () => <span>{name}</span>

const info = {
  name: "lili"
}

const { name } = info

B.getInitialProps = async (ctx) => {
  // const promise = new Promise(resolve => {
  //   setTimeout(()=>{
  //     resolve({
  //       name
  //     })
  //   },1000)
  // })
  // return await promise
  return {name}
}

export default B

