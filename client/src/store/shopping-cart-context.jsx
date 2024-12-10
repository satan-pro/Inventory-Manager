import { createContext, useState } from "react";

export const CartContext = createContext({
    items: [],
})

export const CartProvider = ({children}) => {
    
    const [shoppingCart, setShoppingCart] = useState([]);

    function handleAddItemsToCart(item){
        const prevItems = [...shoppingCart];
        setShoppingCart([...prevItems, item]);
    }

    function handleUpdateItems(item, value){
        const index = shoppingCart.findIndex((cartItem) => cartItem["product_id"] === item);
        const updatedItems = [...shoppingCart];
        updatedItems[index].quantity += value;
        
        if(updatedItems[index].quantity <= 0){
            updatedItems.splice(index, 1);
        }

        setShoppingCart(updatedItems);
    }

    function handleDeleteItem(item){
        const index = shoppingCart.findIndex((cartItem)=> cartItem["product_id"]===item);
        const updatedItems = [...shoppingCart];
        updatedItems.splice(index, 1);
        setShoppingCart(updatedItems);
    }

    const ctxValue = {
        items: shoppingCart,
        addItemsToCart: handleAddItemsToCart,
        updateItems: handleUpdateItems,
        deleteItem: handleDeleteItem,
    }

    return(
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}