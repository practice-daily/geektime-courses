import { useState } from 'react'

export default function useFetch({ url }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function doFetch() {
    setLoading(true)
    try {
      const res = await fetch(url)
      const json = await res.json()
      setData(json)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  return { data, loading, error, doFetch }
}
