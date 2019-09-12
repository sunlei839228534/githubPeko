import {useState, useCallback} from 'react'
import store from '../store/store'

export default () => {
  return (
    <div>hi!</div>
  )
}

// React.createElement('div',{className:"peko",id:"name"},React.createElement('p',{className:'childrenEle'},'children')) React表达式

// {
//   type: "div",
//   props: {
//     className: 'cn',
//     children: [
//       {
//         type: function header,
//         props: {
            //  className: "ddd"
//           children: "hellow"
//         }
//       },
//       {
//         type: "div",
//         props: {
//           children: "start to learn right now"
//         }
//       },
//       'right'
//     ]
//   }
// }