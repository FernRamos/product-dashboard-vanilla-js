document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");

    // Example product data
    const products = [
        { name: "Laptop", price: "$999", category: "Electronics" },
        { name: "Sneakers", price: "$120", category: "Footwear" },
        { name: "Watch", price: "$250", category: "Accessories" }
    ];

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <h2>${product.name}</h2>
            <p>Category: ${product.category}</p>
            <p>Price: ${product.price}</p>
        `;
        productContainer.appendChild(card);
    });
});
// Step 3: fetchProductsThen (then/catch version)
function fetchProductsThen() {
    fetch('https://www.course-api.com/javascript-store-products')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(products => {
            products.forEach(product => {
                console.log(product.fields.name);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}
// Call the function after its definition
// fetchProductsThen();

// Step 4: async/await version
async function fetchProductsAsync() {
    try {
        const response = await fetch('https://www.course-api.com/javascript-store-products');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        handleError(error);
    }
}

function displayProducts(products) {
    products.forEach(product => {
        console.log('Product:', product.fields.name);
    });
}

function handleError(error) {
    console.error('Fetch failed:', error);
}

// Optional: call to test
// fetchProductsAsync();