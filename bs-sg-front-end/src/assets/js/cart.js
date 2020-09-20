var cart = {
    store: null,
    addToCart: function(pID, quantity) {
        pID = pID.trim();
        if (!this.store) {
            let t = localStorage.getItem('cart');
            if (t) {
                this.store = JSON.parse(t);
            } else {
                this.store = [];
            }
        }
        let target = this.store.find(x => x.pID == pID);
        if (!target) {
            this.store.push({
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

        localStorage.setItem('cart', JSON.stringify(this.store));
    },
    removeFromCart: function(pID) {
        pID = pID.trim();
        if (!this.store) {
            let t = localStorage.getItem('cart');
            if (t) {
                this.store = JSON.parse(t);
            } else {
                this.store = [];
            }
        }
        let targetIndex = this.store.findIndex(x => x.pID == pID);
        if (targetIndex != -1) {
            this.store.splice(targetIndex, 1);
        } else {
            console.log("no such product");
            return;
        }
        localStorage.setItem('cart', JSON.stringify(this.store));
    }
}

// export default { this.store, addToCart, removeFromCart };
export default cart;