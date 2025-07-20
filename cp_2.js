// Refactored to pull live prodcuts from the API
document.addEventListener("DOMContentLoaded", () => {
    fetchProductsAsync();
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
// Step 5; displayProducts
function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    // Loop through the first 5 products
    products.slice(0, 5).forEach(product => {
        const { name, price, image } = product.fields;

        // Create product card
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Product name
        const nameEl = document.createElement('h2');
        nameEl.textContent = name;

        // Product image
        const imgEl = document.createElement('img');
        imgEl.src = image[0].url;
        imgEl.alt = name;
        imgEl.style.width = '100%'; // Optional: resize image to fit card

        // Product price
        const priceEl = document.createElement('p');
        priceEl.textContent = `Price: $${price}`;

        // Append elements to the card
        card.appendChild(nameEl);
        card.appendChild(imgEl);
        card.appendChild(priceEl);

        // Append the card to the container
        container.appendChild(card);
    });
}
function handleError(error) {
    console.error(`An error occurred: ${error.message}`);
    const container = document.getElementById('product-container');
    container.innerHTML = `<p style="color: red;">An error occurred: ${error.message}</p>`;
}