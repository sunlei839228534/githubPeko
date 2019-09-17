import {withRouter} from 'next/router'

/**
 * 
 * sort: 排序方式
 * order: 排序的顺序
 * lang: 仓库的项目开发主语言
 * page: 分页页面 
 * 
 */

function Search({router}) {
  return <span>{router.query.query}</span>
}

export default withRouter(Search)