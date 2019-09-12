import App from 'next/app'
import React from 'react'
import {Provider} from 'react-redux'
import 'antd/dist/antd.css'
import Head from 'next/head'
import Layout from '../components/Layout'
import testHoc from '../lib/with-redux'

class MyApp extends App {

  static async getInitialProps({ctx}) {
    const {Component} = ctx
    let pageProps = {}
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <>
      <Head>
      </Head>
      <Provider store={reduxStore}>
        <Layout>
        <Component {...pageProps} ></Component>
        </Layout>
        </Provider>
      </>
    )
  }
}


export default testHoc(MyApp)