import { withRouter } from 'next/router'
import Nav from '../components/nav'


const a = ({ router }) => <span>A<Nav children={123}>{router.query.id}</Nav></span>

export default withRouter(a)