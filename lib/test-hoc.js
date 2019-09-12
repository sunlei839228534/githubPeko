export default (Comp)=> {
  return function TestHocComp(Comp) {
    return (
      <Comp></Comp>
    )
  }
}