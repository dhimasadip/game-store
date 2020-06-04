
tax = (price) => {
    return price * 0.1
}

totalPrice = (price, quantity) => {
    return price * quantity
}

module.exports = { tax, totalPrice }