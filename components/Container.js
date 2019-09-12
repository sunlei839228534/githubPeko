const style = {
  width: '100%',
  maxWidth: 800,
  marginLeft: 'auto',
  marginRight: 'auto',
}

export default ({children, comp: Comp}) => {
  return (
    <Comp style={style}>
      {children}
    </Comp>
  )
}