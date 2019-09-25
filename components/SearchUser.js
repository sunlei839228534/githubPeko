import { useState, useCallback, useRef } from 'react'
import { Select, Spin} from 'antd'
import debounce from 'lodash/debounce'

import api from '../lib/api'

const Option = Select.Option

function SearchUser ({ onChange,value }) {
  // { current : 0 }
  const lastFetchIdRef = useRef(0)
  const [fetching,setfetching] = useState(false)
  const [Options,setOptions] = useState([])

  const handleChange = (value)=> {
    setOptions([])
    setfetching(false)
    onChange(value)
  }
  

  const fecthUser = useCallback(debounce(value => {
    console.log('fetching user',value)
    lastFetchIdRef.current+= 1
    const fetchId = lastFetchIdRef.current
    setfetching(true)
    setOptions([])
    
    api.request({
      url: `/search/users?q=${value}`
    }).then(resp => {
      console.log('user:',resp)
      if(fetchId !== lastFetchIdRef.current) {
        return
      }
      const data = resp.data.items.map(user=>{
        return {
          text:user.login,
          value: user.login
        }
      })
      setfetching(false)
      setOptions(data)
    })
  }, 500),[])
  return <Select
  style={{width:200}}
  showSearch={true}
  nowFountContent={fetching ?<Spin size="small"></Spin> : <span>noting</span>}
  filterOption={false}
  placeholder='创建者'
  value={value}
  allowClear={true}
  onChange={handleChange}
  onSearch={fecthUser}
  >
  {
    Options.map(op =>(
      <Option value={op.value} key={op.value}>{op.text}</Option>
    ))
  }
  </Select>
}

export default SearchUser