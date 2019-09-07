import Link from 'next/link'
import {Button} from 'antd'

export default ({children}) => {
  return (
  <>
    <header>
      <div className="nav">
        <div className="nav-item">
          <Link href="/a?id=1" as="/a/1">
            <Button>to A</Button>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/test/b">
            <Button>to B</Button>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="/">
            <Button>to Home</Button>
          </Link>
        </div>
      </div>
    </header>
    {children}
    <style jsx>{`
    .nav {
      width: 100%;
      display: flex;
    }
    .nav-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    `}</style>
  </>
  )
}