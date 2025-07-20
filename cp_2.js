function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}
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
async function fetchProductsAsync(count = 5) {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show spinner
    try {
        const response = await fetch('https://www.course-api.com/javascript-store-products');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const products = await response.json();
        displayProducts(products, count);
    } catch (error) {
        handleError(error);
    } finally {
        loader.style.display = 'none'; // Always hide spinner
    }
}
// Step 5; displayProducts
function displayProducts(products, count = 5) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    // Loop through the first 5 products
    products.slice(0, count).forEach(product => {
        const { name, price, image } = product.fields;

        // Create product card
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Product name
        const nameEl = document.createElement('h2');
        nameEl.textContent = capitalizeWords(name);

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
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}

// ✅ Step 7: Call both functions
fetchProductsThen();

// Dynamic count based on page
if (window.location.pathname.includes('products.html')) {
    fetchProductsAsync(15);  // Show 15 products on products.html
} else {
    fetchProductsAsync(5);   // Show 5 products on index.html
}
document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');

    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.nav-link a').forEach(link => {
        link.classList.toggle('dark-mode');
    });
});