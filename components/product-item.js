// product-item.js

class ProductItem extends HTMLElement 
{
	constructor(itemId, imgSrc, imgAlt, title, price)
	{
		super();
		
		var shadow = this.attachShadow({mode: 'open'});
		myStorage = window.localStorage;
		var productCnt = document.getElementById('cart-count');
		var cartProducts = JSON.parse(myStorage.getItem('cartProducts'));
		
		var li = document.createElement('li');
		li.setAttribute('class', 'product');
		
		var img = document.createElement('img');
		img.src = imgSrc;
		img.alt = imgAlt;
		img.width = 200;
		
		var titleP = document.createElement('p');
		titleP.setAttribute('class', 'title');
		titleP.textContent = title;
		
		var priceP = document.createElement('p');
		priceP.setAttribute('class', 'price');
		priceP.textContent = '$' + price;
		
		var button = document.createElement('button');
		button.textContent = cartProducts.includes(itemId) ? "Remove from Cart" :"Add to Cart";
		button.onclick = function () 
		{
			if (button.textContent == "Add to Cart")
			{
				cartProducts = JSON.parse(myStorage.getItem('cartProducts'));
				button.textContent = "Remove from Cart";
				productCnt.textContent = parseInt(productCnt.textContent) + 1;
				cartProducts.push(itemId);
				myStorage.setItem("cartProducts", JSON.stringify(cartProducts));
			}
			else
			{
				cartProducts = JSON.parse(myStorage.getItem('cartProducts'));
				button.textContent = "Add to Cart";
				productCnt.textContent = parseInt(productCnt.textContent) - 1;
				cartProducts.splice(cartProducts.indexOf(itemId), 1);
				myStorage.setItem("cartProducts", JSON.stringify(cartProducts));
			}
//			console.log(cartProducts);
		}
		
		
		var style = document.createElement('style');
		style.textContent = `
.price {
	color: green;
	font-size: 1.8em;
	font-weight: bold;
	margin: 0;
}

.product {
	align-items: center;
	background-color: white;
	border-radius: 5px;
	display: grid;
	grid-template-areas: 
	'image'
	'title'
	'price'
	'add';
	grid-template-rows: 67% 11% 11% 11%;
	height: 450px;
	filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
	margin: 0 30px 30px 0;
	padding: 10px 20px;
	width: 200px;
}

.product > button {
	background-color: rgb(255, 208, 0);
	border: none;
	border-radius: 5px;
	color: black;
	justify-self: center;
	max-height: 35px;
	padding: 8px 20px;
	transition: 0.1s ease all;
}

.product > button:hover {
	background-color: rgb(255, 166, 0);
	cursor: pointer;
	transition: 0.1s ease all;
}

.product > img {
	align-self: center;
	justify-self: center;
	width: 100%;
}

.title {
	font-size: 1.1em;
	margin: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.title:hover {
	font-size: 1.1em;
	margin: 0;
	white-space: wrap;
	overflow: auto;
	text-overflow: unset;
}`;
		
		shadow.appendChild(style);
		shadow.appendChild(li);
		li.appendChild(img);
		li.appendChild(titleP);
		li.appendChild(priceP);
		li.appendChild(button);
		
	}
}

customElements.define('product-item', ProductItem);