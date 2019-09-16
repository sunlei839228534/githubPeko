import {useState, useCallback,useEffect} from 'react'
import axios from 'axios'

const api = require('../lib/api')

function Index({data}) {
  console.log(data)
  useEffect(()=>{
  }) 
  return (
    <div>
      hi!
    </div>
  )
}

Index.getInitialProps = async ({ctx})=> {
  const result = await api.request({
    url: '/search/repositories?q=react'
  },ctx.req,ctx.res)

  return {
    data: result.data
  }
}

export default Index