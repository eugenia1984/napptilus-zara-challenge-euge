
const useCartPageLogic = () => {
  // TODO: mock till integration
  const cartItems = [
    {
      productId: "SMG-A05S",
      color: "#000000",
      storage: "64 GB",
      imageUrl: "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A05S-black.webp",
      name: "Black",
      quantity: 2,
      price: "119"
    }
  ];
  const handleRemoveFromCart = () => { };
  const cartTotalPrice = 100;

  return {
    cartItems,
    handleRemoveFromCart,
    cartTotalPrice
  }
}

export default useCartPageLogic;