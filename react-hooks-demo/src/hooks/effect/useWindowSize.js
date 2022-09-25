import { useState, useEffect } from 'react'

function getSize() {
  return window.innerWidth < 500 ? 'small' : 'large'
}

export default function useWindowSize() {
  const [size, setSize] = useState(getSize())
  useEffect(() => {
    function handler() {
      const size = getSize()
      console.log('onresize handler:', size)
      setSize(size)
    }
    console.log('onresize')
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])
  return size
}
