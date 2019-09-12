import App from 'next/app'
import React from 'react'
import {Provider} from 'react-redux'
import store from '../store/store'
import 'antd/dist/antd.css'
import Head from 'next/head'
import Layout from '../components/Layout'


class MyApp extends App {

  static async getInitialProps({Component,ctx}) {
    let pageProps = {}
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
      <Head>
      </Head>
      <Provider store={store}>
        <Layout>
        <Component {...pageProps} ></Component>
        </Layout>
        </Provider>
      </>
    )
  }
}


export default MyApp