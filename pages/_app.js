import App from 'next/app'
import React from 'react'
import {Provider} from 'react-redux'
import Router from 'next/router'
import axios from 'axios'
import 'antd/dist/antd.css'
import Head from 'next/head'
import Layout from '../components/Layout'
import testHoc from '../lib/with-redux'
import PageLoading from '../components/PageLoading'

class MyApp extends App {
  
  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps = {}
    if(Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }
  state = {
    loading: false
  }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }

  stopLoading = () => {
    this.setState({
      loading: false
    })
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)

    axios.get('/github/search/repositories?q=react').then(res=>{ 
    })
  }
  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <>
      <Head>
      </Head>
      <Provider store={reduxStore}>
          {
            this.state.loading ? <PageLoading /> : null
          }
        <Layout>
        <Component {...pageProps} ></Component>
        </Layout>
        </Provider>
      </>
    )
  }
}


export default testHoc(MyApp)