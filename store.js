    if (document.readyState == 'loading') {                  // posto smo u store.html povezali js file, i dodali async, znaci da ce se js fajl pokrenuti asihrono, tj neistovremeno, osim ako if
        document.addEventListener('DOMContentLoaded', ready)  // DOMContentLoaded znaci da ce se stranica pokrenuti tek kada bude cela ocitana
    } else {                                                  // ali ako se stranica nije ocitala, pokrenucemo funkciju ready, bez obzira
        ready()
    }

    function ready() {                                       // kreiranje funkcije ready
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')  // varijabla removeCartItems sadrzi sva dugmad btn-danger
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]                    // obrisi jedan element nizi i dodaj mu varijablu button
            button.addEventListener('click', removeCartItem)         // kada kliknemo na button obrisi item brisemo ga sa funkcijom removeCartItem ispod
        }

        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]                    // koliko god da se puta ponavlja                               
            input.addEventListener('change', quantityChanged)    // zelimo svaki put kada se promeni unos, promeni i vrednost dodavanjem funkcije quantityChanged
            }

            var addToCartButtons = document.getElementsByClassName('shop-item-button')  // varijabla za karticu proizvode
            for (var i = 0; i < addToCartButtons.length; i++) {
                var button = addToCartButtons[i]
                button.addEventListener('click', addToCartClicked)
            }
            document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
        }


        function purchaseClicked() {
            alert('Thank you for your purchase')
            var cartItems = document.getElementsByClassName('cart-items')[0]  // nakon klika na narucivanje, vraca se sve na 0 
            while (cartItems.hasChildNodes()) {                 // sve dok korpa ima nesto, obrasati 
                cartItems.removeChild(cartItems.firstChild)
            }
            updateCartTotal()
        }

        function removeCartItem(event) {
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotal()
        }

        function quantityChanged(event) {                      // ono sto zelimo da uradimo kada se kolicina promeni
            var input = event.target                            // target je onaj dogadjaj koji nam je potreban da promenimo
            if (isNaN(input.value) || input.value <= 0) {       // zatim zelimo da proverimo da li je vrednost ispravna, prvo da li je broj ili nije brNaN, odnosno 0 ili manje od 0
                input.value = 1                                // 1 ja najmanji moguci broj za vrednost
            }
            updateCartTotal()
        }


        function addToCartClicked(event) {                 
            var button = event.target
            var shopItem = button.parentElement.parentElement     // shop-item je parent element
            var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText  // naslov
            var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText  // cena
            var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src     // slika               
            addItemToCart(title, price, imageSrc)
            updateCartTotal()
        }


        function addItemToCart(title, price, imageSrc) {        // dodavanje proizvoda u korpu
            var cartRow = document.createElement('div')          // kreiranje reda i novog div
            cartRow.classList.add('cart-row')                    // dodavanje klase cart-row
            var cartItems = document.getElementsByClassName('cart-items')[0]
            var cartItemNames = cartItems.getElementsByClassName('cart-item-title')  // provera da li vec ima isti proizvod
            for (var i = 0; i < cartItemNames.length; i++) {
                if (cartItemNames[i].innerText == title) {
                    alert('This item is already added to the cart')  // provera da li vec ima isti 
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
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem) // za brisanje poslednjeg unetog proizvoda/artikla
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)  // dodavanje u ukupnu sumu
    }


    function updateCartTotal() {    // update Ukupno
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]   //  ime klase cart-items obuhvata sve redove u cart-row, ali hocemo samo prvi element tog niza [0]           
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')   // hocemo sve elemente cart-row, da postavimo u varijablu CartItemContainer, kojoj smo dodelili ime var carRows
        var total = 0 // ukupno da uvek pocinje sa 0
        for (var i = 0; i < cartRows.length; i++) {             // prolazak kroz niz carRow-a
            var cartRow = cartRows[i]                         // u kojem god da smo redu carRow-a cena ili kolicina
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]    //  ime klase cart-price obuhvata sve redove u cart-row, ali hocemo samo prvi element tog niza gde je cena[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]  //  ime klase cart-quantity-input obuhvata sve redove u cart-row, ali hocemo samo prvi element tog niza gde je cena[0]
            var price = parseFloat(priceElement.innerText.replace('€', ''))      // parseFloat pretvara sve stringove u decimalne brojeve, takodje, hocemo da € zamenimo sa praznim stringom ''
            var quantity = quantityElement.value        // hocemo vrednost value od quantity elementa, a ne innerText da korepondira sa quantity brojem 
            total = total + (price * quantity)     // svaki put kada prodje kroz petlju da prethodnom totalu doda cena * kolicina
        }
        total = Math.round(total * 100) / 100      // znaci da uz pomoc Math funkcije budu samo broj sa 2 decimale
        document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total   // 
        }

        











