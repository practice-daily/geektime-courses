import React, { useMemo, useState } from "react";
import useFetch from './useFetch'
import useAsync from "./useAsync";

export default function UserList() {
  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // async function fetchUsers() {
  //   setLoading(true)
  //   try {
  //     const res = await fetch('https://reqres.in/api/users/')
  //     console.log(res)
  //     const json = await res.json()
  //     setUsers(json.data)
  //   } catch (error) {
  //     setError(error)
  //   }
  //   setLoading(false)
  // }

  // const { loading, error, data, doFetch: fetchUsers } = useFetch({
  //   url: 'https://reqres.in/api/users/'
  // })
  // const users = useMemo(() => data ? data.data : null, [data])

  // const { data, error, loading, execute: fetchUsers } = useAsync(() => fetch('https://reqres.in/api/users/'))
  // const users = useMemo(async () => {
  //   if (data && data.ok) {
  //     // const json = await data.json() // Uncaught (in promise) TypeError: Failed to execute 'json' on 'Response': body stream already read
  //     const json = await data.clone().json()
  //     console.log(json.data)
  //     return json.data
  //   }
  //   return null
  // }, [data])

  const {
    data: users,
    error,
    loading,
    execute: fetchUsers,
  } = useAsync(async function () {
    const res = await fetch('https://reqres.in/api/users/')
    const json = await res.json()
    console.log(json)
    return json.data
  })

  console.log('users:', users)

  return (
    <div>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? 'Loading...' : 'Show Users'}
      </button>
      {error &&
      <div style={{color: 'red'}}>Failed: {String(error)}</div>}
      <br />
      <ul>
        {users && users.length > 0 &&
        users.map(user => <li key={user.id}>{user.first_name}</li>)}
      </ul>
    </div>
  )
}
