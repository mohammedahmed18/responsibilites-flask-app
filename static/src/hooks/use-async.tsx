import { useCallback, useEffect, useState, DependencyList } from "react"

export default function useAsync(callback: (...params: any[]) => Promise<any>, dependencies: DependencyList = [], autoFetch = true) {
  const [loading, setLoading] = useState(autoFetch ? true : false)
  const [error, setError] = useState()
  const [value, setValue] = useState()

  const callbackMemoized = useCallback((...params: any[]) => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    callback(...params)
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, dependencies || [])

  useEffect(() => {
    if (autoFetch) {
      callbackMemoized();
  }
  }, [callbackMemoized])

  return { loading, error, perform: callbackMemoized,value }
}
