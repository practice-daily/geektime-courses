import React, { useState } from 'react'
import axios from 'axios'

export default function RequestDemo() {
  function request() {
    axios({
      method: 'post',
      url: 'http://localhost:8080/user',
      data: {
        name: 'hello',
        phone: '12816475112',
        unionid: 'oTmHYjg-tElZ68xxxxxxxxhy1Rgk',
        openid: 'GACo74wkDIkDzEhkwRwgjGt1pqlk'
      }
    }).then(res => {
      console.log('success', res)
    }).catch(err => {
      console.error('error', err)
    })
  }
  return <div>
    <button onClick={request}>add user</button>
  </div>
}
