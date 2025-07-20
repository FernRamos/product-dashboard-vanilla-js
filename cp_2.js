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