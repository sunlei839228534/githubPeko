import {useState, useCallback, Children} from 'react'
import store from '../store/store'

export default () => {
  function handleClick() {
    console.log(1)
  }
  return (
    <div onClick={handleClick}>
      hi!
    </div>
  )
}

{/* <div className="peko" id="name">
 <p className="childrenEle">children</p> 
</div> */}
// React.createElement('div',{className:"peko",id:"name"},React.createElement('p',{className:'childrenEle'},'children')) React表达式

// {
//   type: "div",
//   props: {
//     className: "peko",
//     id: "name",
//     children: [
//       {
//         type: 'p',
//         props: {
//           className: "childrenEle"
//           children: 'children'
//         }
//       }
//     ]
//   }
// }