var store = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(pID, quantity) {
    pID = pID.trim();
    if (!store) {
        let t = localStorage.getItem('cart');
        if (t) {
            store = JSON.parse(t);
        } else {
            store = [];
        }
    }
    let target = store.find(x => x.pID == pID);
    if (!target) {
        store.push({
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

    localStorage.setItem('cart', JSON.stringify(store));
}

function removeFromCart(pID) {
    pID = pID.trim();
    if (!store) {
        let t = localStorage.getItem('cart');
        if (t) {
            store = JSON.parse(t);
        } else {
            store = [];
        }
    }
    let targetIndex = store.findIndex(x => x.pID == pID);
    if (targetIndex != -1) {
        store.splice(targetIndex, 1);
    } else {
        console.log("no such product");
        return;
    }
    localStorage.setItem('cart', JSON.stringify(store));
}

// export default { store, addToCart, removeFromCart };
export default {
    store,
    methods: {
        addToCart,
        removeFromCart
    }
};