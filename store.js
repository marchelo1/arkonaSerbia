    if (document.readyState == 'loading') {                  // since we linked the js file in the store.html, and added async, it means that the js file will run asynchronously,
        document.addEventListener('DOMContentLoaded', ready)  // DOMContentLoaded means that the page will start only when it is read in its entirety 
    } else {                                                  
        ready()
    }

    function ready() {                                       
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')  // var removeCartItems contains all btn-danger buttons 
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]                    // delete one element below and add the variable button to it 
            button.addEventListener('click', removeCartItem)         // when we click on the button item we delete it with the removeCartItem function below
        }

        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]                    // as many times as it is repeated                              
            input.addEventListener('change', quantityChanged)    // we want every time the entry is changed, and the value is changed by adding the quantityChanged function 
            }

            var addToCartButtons = document.getElementsByClassName('shop-item-button')  // variable for card products 
            for (var i = 0; i < addToCartButtons.length; i++) {
                var button = addToCartButtons[i]
                button.addEventListener('click', addToCartClicked)
            }
            document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
        }


        function purchaseClicked() {
            alert('Thank you for your purchase')
            var cartItems = document.getElementsByClassName('cart-items')[0]  // after clicking on order, everything returns to 0 
            while (cartItems.hasChildNodes()) {                 // as long as the basket has something, delete
                cartItems.removeChild(cartItems.firstChild)
            }
            updateCartTotal()
        }

        function removeCartItem(event) {
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotal()
        }

        function quantityChanged(event) {                      // what we want to do when the quantity changes 
            var input = event.target                            // the target is the event we need to change 
            if (isNaN(input.value) || input.value <= 0) {       // then we want to check if the value is correct, first whether the number or not is brNaN, or 0 or less than 0 
                input.value = 1                                // 1 is the smallest possible number for the value 
            }
            updateCartTotal()
        }


        function addToCartClicked(event) {                 
            var button = event.target
            var shopItem = button.parentElement.parentElement     // shop-item is parent element
            var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText  // title
            var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText  // price
            var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src     // image           
            addItemToCart(title, price, imageSrc)
            updateCartTotal()
        }


        function addItemToCart(title, price, imageSrc) {        // adding products to the cart 
            var cartRow = document.createElement('div')          // creating order and a new div 
            cartRow.classList.add('cart-row')                    // adding the class cart-row
            var cartItems = document.getElementsByClassName('cart-items')[0]
            var cartItemNames = cartItems.getElementsByClassName('cart-item-title')  // check if it already has the same product 
            for (var i = 0; i < cartItemNames.length; i++) {
                if (cartItemNames[i].innerText == title) {
                    alert('This item is already added to the cart')  
                    return
                }
            }

            var cartRowContents = `
            <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">UKLONI</button>
        </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem) // to delete the last entered product / item 
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)  // adding to the total 
    }


    function updateCartTotal() {    // update total
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]   //  the name of the class cart-items includes all rows in the cart-row, but we only want the first element of that array [0]        
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')   // we want to set all cart-row elements in the CartItemContainer variable, which we named var carRows 
        var total = 0 // total always begins with 0
        for (var i = 0; i < cartRows.length; i++) {             // arrays of carRow-a
            var cartRow = cartRows[i]                         // in whatever order of carRow we are price or quantity 
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]    //  the name of the cart-price class includes all rows in the cart-row, but we only want the first element of that array where the price is [0] 
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]  //  the class name quantity-quantity-input includes all rows in the cart-row, but we only want the first element of that array where price is [0] 
            var price = parseFloat(priceElement.innerText.replace('€', ''))      // parseFloat converts all strings to decimal numbers, also, we want to replace € with an empty string  ''
            var quantity = quantityElement.value        // we want the value value of the quantity element, not innerText to correspond to the quantity number 
            total = total + (price * quantity)     // each time it passes through the loop to add the price * quantity to the previous total 
        }
        total = Math.round(total * 100) / 100      // means that with the help of the Math function they are only a number with 2 decimals 
        document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total   // 
        }

        











