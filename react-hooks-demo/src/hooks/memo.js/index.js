import React, { useState, useEffect, useMemo } from "react";

export default function Memo() {
  const [users, setUsers] = useState(null)
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    const doFetch = async () => {
      const res = await fetch('https://reqres.in/api/users')
      // return await res.json()
      // console.log(await res.json())
      setUsers(await res.json())
    }
    // const res = await doFetch()
    doFetch()
  }, [])

  let usersToShow = null
  // if (users) {
  //   usersToShow = users.data.filter(user => user.first_name.includes(searchKey))
  // }

  // useMemo 缓存计算结果，避免重复计算
  usersToShow = useMemo(() => {
    if (!users) return null
    return users.data.filter(user => user.first_name.includes(searchKey))
  }, [users, searchKey])

  return <div>
    <input
      value={searchKey}
      onChange={evt => setSearchKey(evt.target.value)}
    />
    <ul>
      {
        usersToShow && usersToShow.length > 0 && usersToShow.map(user => {
          return <li key={user.id}>{user.first_name}</li>
        })
      }
    </ul>
  </div>
}