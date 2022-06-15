import { useState, createContext, useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const CartContext = createContext([[], () => {}])

let initialState = []

export function useCartState() {
  const [bagItems, setBagItems] = useState(initialState)
  const [showBag, setShowBag] = useState(false)
  const [qty] = useState(1)

  //add items to cart
  const addBag = (productId) => {
    if (bagItems.find((p) => p._id === productId._id)) {
      setBagItems((cart) =>
        cart.map((cartItem) =>
          cartItem._id === productId._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      )
      return
    }
    setBagItems((cart) => [...cart, { ...productId, quantity: 1 }])
    toast.success(`${qty} ${productId.name} added to bag`)
  }

  //update cart
  const updateBag = (id, d) => {
    setBagItems((cart) =>
      cart.flatMap((cartItem) =>
        cartItem._id === id
          ? cartItem.quantity + d < 1
            ? []
            : [
                {
                  ...cartItem,
                  quantity: cartItem.quantity + d,
                },
              ]
          : [cartItem]
      )
     
    )
  }

  //delete items in cart
  const handleRemove = (id) => {
    setBagItems((cart) => cart.filter((item) => item._id !== id))
  }

  //sum cart items
  const priceSum = bagItems
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2)

  //save to localStorage cartitems
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('updatedBag'))
    if (cartData) {
      setBagItems(cartData)
    }
  }, [])

  useEffect(() => {
    if (bagItems !== initialState) {
      localStorage.setItem('updatedBag', JSON.stringify(bagItems))
    }
  }, [bagItems])

  return {
    setBagItems,
    setShowBag,
    showBag,
    bagItems,
    addBag,
    updateBag,
    handleRemove,
    priceSum,
  }
}

export function useCart() {
  const cart = useContext(CartContext)
  return cart
}
