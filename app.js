        // DOM elements
        const productsContainer = document.getElementById('products-container');
        const searchInput = document.getElementById('search-input');
        const priceFilter = document.getElementById('price-filter');
        const priceValue = document.getElementById('price-value');
        const modal = document.getElementById('product-modal');
        const closeModal = document.getElementById('close-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalSpecs = document.getElementById('modal-specs');
        const modalDescription = document.getElementById('modal-description');
        const whatsappBtn = document.getElementById('whatsapp-btn');
        const topOfferBanner = document.getElementById('top-offer');
        const loader = document.getElementById('loader');

        // Google Sheets CSV URL (Replace with your published CSV URL)
        const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vScZbq3GriEA40sbk7OdqERizzA3-_FGZ0Wmn1sGBY_tzx0cImOO7tegyRRLWJ1iNIGD_HEGBbGm5Yd/pub?gid=0&single=true&output=csv';

        // Sample data for demonstration (will be replaced with CSV data)
        let products = [];

        // Fetch data from Google Sheets CSV
        async function fetchData() {
            try {
                // In a real implementation, you would fetch from your Google Sheets CSV
                const response = await fetch(csvURL);
                const csvData = await response.text();
                products = parseCSV(csvData);
                
                // // For demo purposes, we'll use sample data with a delay to simulate loading
                // await new Promise(resolve => setTimeout(resolve, 1500));
                
                // products = [
                //     {
                //         id: 1,
                //         model: "Samsung Galaxy S23 Ultra",
                //         price: 1199,
                //         discount: 15,
                //         ram: 12,
                //         rom: 256,
                //         health: 98,
                //         description: "Brand new Samsung Galaxy S23 Ultra with improved camera and battery life.",
                //         image: "https://via.placeholder.com/300x300?text=Samsung+S23+Ultra"
                //     },
                //     {
                //         id: 2,
                //         model: "iPhone 14 Pro Max",
                //         price: 1299,
                //         discount: 10,
                //         ram: 6,
                //         rom: 256,
                //         health: 100,
                //         description: "Latest iPhone with dynamic island and always-on display.",
                //         image: "https://via.placeholder.com/300x300?text=iPhone+14+Pro+Max"
                //     },
                //     {
                //         id: 3,
                //         model: "Google Pixel 7 Pro",
                //         price: 899,
                //         discount: 12,
                //         ram: 12,
                //         rom: 128,
                //         health: 95,
                //         description: "Google's flagship phone with outstanding camera capabilities.",
                //         image: "https://via.placeholder.com/300x300?text=Google+Pixel+7+Pro"
                //     },
                //     {
                //         id: 4,
                //         model: "OnePlus 11",
                //         price: 799,
                //         discount: 8,
                //         ram: 16,
                //         rom: 256,
                //         health: 97,
                //         description: "Speed and performance redefine with the OnePlus 11.",
                //         image: "https://via.placeholder.com/300x300?text=OnePlus+11"
                //     },
                //     {
                //         id: 5,
                //         model: "Xiaomi 13 Pro",
                //         price: 899,
                //         discount: 5,
                //         ram: 12,
                //         rom: 256,
                //         health: "", // Empty health - should not be displayed
                //         description: "Xiaomi's premium offering with Leica camera technology.",
                //         image: "https://via.placeholder.com/300x300?text=Xiaomi+13+Pro"
                //     },
                //     {
                //         id: 6,
                //         model: "Samsung Galaxy Z Fold 5",
                //         price: 1799,
                //         discount: 7,
                //         ram: 12,
                //         rom: 512,
                //         health: 99,
                //         description: "The latest foldable phone from Samsung with improved durability.",
                //         image: "https://via.placeholder.com/300x300?text=Galaxy+Z+Fold+5"
                //     }
                // ];
                
                // Update the top offer banner
                updateTopOffer();
                
                // Display products
                displayProducts(products);
                
                // Hide loader
                loader.style.display = 'none';
            } catch (error) {
                console.error('Error fetching data:', error);
                productsContainer.innerHTML = '<p class="error-message">Failed to load products. Please try again later.</p>';
                loader.style.display = 'none';
            }
        }

        // Parse CSV data (for when you implement actual Google Sheets integration)
        function parseCSV(csvData) {
            // This is a simplified CSV parser - you may need to adjust based on your CSV structure
            const lines = csvData.split('\n');
            const result = [];
            
            // Skip header row and start from index 1
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line) {
                    const values = line.split(',');
                    
                    // Create product object from CSV values
                    const product = {
                        id: i,
                        model: values[0] || '',
                        price: parseFloat(values[1]) || 0,
                        discount: parseFloat(values[2]) || 0,
                        ram: parseInt(values[3]) || 0,
                        rom: parseInt(values[4]) || 0,
                        health: values[5] ? parseInt(values[5]) : '',
                        description: values[6] || '',
                        image: values[7] || 'https://via.placeholder.com/300x300?text=Mobile+Phone'
                    };
                    
                    result.push(product);
                }
            }
            
            return result;
        }

        // Update top offer banner with the product having highest discount
        function updateTopOffer() {
            if (products.length === 0) return;
            
            // Find product with highest discount
            const topProduct = products.reduce((max, product) => 
                product.discount > max.discount ? product : max, products[0]);
            
            // Update banner
            topOfferBanner.innerHTML = 
                `<i class="fa-solid fa-gift"></i> Highest Offer: <span>${topProduct.discount}% OFF</span> on ${topProduct.model}! Limited Time Offer! <i class="fa-solid fa-gift"></i>`;
        }

        // Display products
        function displayProducts(productsToShow) {
            productsContainer.innerHTML = '';
            
            if (productsToShow.length === 0) {
                productsContainer.innerHTML = '<p class="no-results">No products found matching your criteria.</p>';
                return;
            }
            
            productsToShow.forEach(product => {
                const originalPrice = product.price / (1 - product.discount / 100);
                
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="discount-badge">${product.discount}% OFF</div>
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.model}">
                    </div>
                    <div class="product-info">
                        <h3>${product.model}</h3>
                        <div class="product-price">
                            <span class="current-price">BDT ${product.price}</span>
                            <span class="original-price">BDT ${Math.round(originalPrice)}</span>
                        </div>
                        <button class="view-details" data-id="${product.id}">View Details</button>
                    </div>
                `;
                
                productsContainer.appendChild(productCard);
            });
            
            // Add event listeners to view details buttons
            document.querySelectorAll('.view-details').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.getAttribute('data-id'));
                    showProductDetails(productId);
                });
            });
        }

        // Show product details in modal
        function showProductDetails(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            modalTitle.textContent = product.model;
            
            // Create specifications HTML
            let specsHTML = `
                <div class="spec-item">
                    <span class="spec-label">Model</span>
                    <span class="spec-value">${product.model}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Price</span>
                    <span class="spec-value">BDT ${product.price}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Offer</span>
                    <span class="spec-value">${product.discount}% OFF</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">RAM</span>
                    <span class="spec-value">${product.ram} GB</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">ROM</span>
                    <span class="spec-value">${product.rom} GB</span>
                </div>
            `;
            
            // Only add health if it's not empty
            if (product.health) {
                specsHTML += `
                    <div class="spec-item">
                        <span class="spec-label">Health</span>
                        <span class="spec-value">${product.health}%</span>
                    </div>
                `;
            }
            
            modalSpecs.innerHTML = specsHTML;
            modalDescription.textContent = product.description;
            
            // Update WhatsApp link with product info
            const message = `Hello! I'm interested in the ${product.model} (${product.discount}% off)`;
            whatsappBtn.href = `https://wa.me/01640820472?text=${encodeURIComponent(message)}`;
            
            // Show modal
            modal.style.display = 'flex';
        }

        // Filter products based on search and price
        function filterProducts() {
            const searchText = searchInput.value.toLowerCase();
            const maxPrice = parseInt(priceFilter.value);
            
            const filteredProducts = products.filter(product => {
                const matchesSearch = product.model.toLowerCase().includes(searchText);
                const matchesPrice = product.price <= maxPrice;
                return matchesSearch && matchesPrice;
            });
            
            displayProducts(filteredProducts);
        }

        // Event listeners
        searchInput.addEventListener('input', filterProducts);
        priceFilter.addEventListener('input', () => {
            priceValue.textContent = `BDT ${priceFilter.value}`;
            filterProducts();
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Initialize the page
        fetchData();