import { useState, useCallback } from "react";

export default function useAsync(asyncFunction) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const execute = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(true)
    asyncFunction()
      .then(response => {
        setData(response)
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => setLoading(false))
  }, [asyncFunction])

  return { data, error, loading, execute }
}