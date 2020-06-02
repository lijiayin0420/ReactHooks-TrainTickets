import { useState, useEffect } from 'react'

export default function useWinSize() {
  const [width, setWidth] = useState(document.documentElement.clientWidth)
  const [height, setHight] = useState(document.documentElement.clientHeight)

  const onResize = () => {
    setWidth(document.documentElement.clientWidth)
    setHight(document.documentElement.clientHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', onResize, false)

    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  return {
    width,
    height,
  }
}
