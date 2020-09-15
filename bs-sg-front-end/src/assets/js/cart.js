var cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(pID, quantity) {
    if (!cart) {
        let t = localStorage.getItem('cart');
        if (t) {
            cart = JSON.parse(t);
        } else {
            cart = [];
        }
    }
    let target = cart.find(x => x.pID == pID);
    if (!target) {
        cart.push({
            pID: pID,
            quantity: quantity
        });
    } else {
        if (quantity > 0) {
            target.quantity = quantity;
        } else {
            console.log("數量 < 0!!!!");
            return;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(pID) {
    if (!cart) {
        let t = localStorage.getItem('cart');
        if (t) {
            cart = JSON.parse(t);
        } else {
            cart = [];
        }
    }
    let targetIndex = cart.findIndex(x => x.pID == pID);
    if (targetIndex != -1) {
        cart.splice(targetIndex, 1);
    } else {
        console.log("no such product");
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

export { cart, addToCart, removeFromCart };