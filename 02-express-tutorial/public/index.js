

const button = document.getElementById("productInfo");
const divPoint = document.getElementById('productDiv')

//adding the event click to the button
button.addEventListener('click',function(){
    
    
   
    fetch('/api/v1/products')
    .then(response =>{
        return response.json();
        
    })
    .then(products => {
            const ul = document.createElement('ul');
            products.forEach(product => {
                const li = document.createElement('li');
                li.textContent = `${product.id} - ${product.name} - ${product.price} - ${product.desc}`;
                ul.appendChild(li);
                
                
            });
            divPoint.appendChild(ul);
        
    })
    .catch(error => {
        // Handle any errors during the fetch
        divPoint.textContent = `Error fetching products: ${error.message}`;
    });
});