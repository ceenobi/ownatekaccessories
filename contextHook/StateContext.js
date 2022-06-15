import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showBag, setShowBag] = useState(false)
  const [bagItems, setBagItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQty, setTotalQty] = useState(0)
  const [qty, setQty] = useState(1)

  let foundProduct
  let index

  const onAdd = (productID, quantity) => {
    const existItem = bagItems.find((x) => x._id === productID._id)
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + productID.price * quantity
    )
    setTotalQty((prevTotalQty) => prevTotalQty + quantity)
    if (existItem) {
      const updatedBag = bagItems.map((bagProduct) => {
        if (bagProduct._id === productID._id)
          return {
            ...bagProduct,
            quantity: bagProduct.quantity + quantity,
          }
      })
    
      setBagItems(updatedBag)
    } else {
      productID.quantity = quantity
      setBagItems([...bagItems, { ...productID }]) 
    }
    toast.success(`${qty} ${productID.name} added to bag`)
  }

  const onRemove = (product) => {
    foundProduct = bagItems.find((item) => item._id === product._id)
    const newBagItems = bagItems.filter((item) => item._id !== product._id)

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    )
    setTotalQty(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    )
    setBagItems(newBagItems)
  }

  const bagItemsQty = (id, value) => {
    foundProduct = bagItems.find((item) => item._id === id)
    index = bagItems.findIndex((product) => product._id === id)
    const newBagItems = bagItems.filter((item) => item._id !== id)

    if (value === 'inc') {
      setBagItems([
        ...newBagItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQty((prevTotalQty) => prevTotalQty + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setBagItems([
          ...newBagItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQty((prevTotalQty) => prevTotalQty - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1
      return prevQty - 1
    })
  }
 

  return (
    <Context.Provider
      value={{
        setShowBag,
        showBag,
        bagItems,
        totalPrice,
        totalQty,
        qty,
        incQty,
        decQty,
        onAdd,
        bagItemsQty,
        onRemove,
        setBagItems,
        setTotalPrice,
        setTotalQty,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
