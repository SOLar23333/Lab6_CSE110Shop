// Script.js

myStorage = window.localStorage;

var productList = document.getElementById('product-list');

var productCnt = document.getElementById('cart-count');

window.addEventListener('DOMContentLoaded', () => 
{
	if (!myStorage.getItem('products')) 
	{
		fetch('https://fakestoreapi.com/products')
			.then(response => response.json())
			.then(data => 
			{
				myStorage.setItem('products', JSON.stringify(data))
				createProduct();
					
			})
	}
	else
	{
		createProduct();
	}
	
	if (!myStorage.getItem('cartProducts'))
	{
		myStorage.setItem('cartProducts', JSON.stringify([]))
	}
	var cartProducts = JSON.parse(myStorage.getItem('cartProducts'));
	productCnt.textContent = cartProducts.length;
});

function createProduct() 
{
	var productJson = JSON.parse(myStorage.getItem('products'));
	for (var i = 0; i < productJson.length; i++)
	{
		var current = new ProductItem(productJson[i]['id'], productJson[i]['image'], productJson[i]['description'], productJson[i]['title'], productJson[i]['price']);
		productList.appendChild(current);
		
	}
}