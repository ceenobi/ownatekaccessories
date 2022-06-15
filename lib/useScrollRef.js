import React, { useRef } from 'react'

export default function useScrollRef() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    const {current} = scrollRef

    if (direction === 'left') {
      current.scrollLeft -= 500
    } else {
      current.scrollLeft += 500
    }
  }
  return [scroll, scrollRef]
}
