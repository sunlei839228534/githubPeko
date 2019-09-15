export default () => {
  const handleClick = ()=>{
    console.log("Page is a")
  }
  return (
    <>
     <div onClick={handleClick}>hello</div>
    </>
  )
}