        // DOM elements
        const mobilePage = document.getElementById('mobiles-page');
        const gadgetPage = document.getElementById('gadgets-page');
        const mobileBtn = document.getElementById('mobile-btn');
        const gadgetBtn = document.getElementById('gadget-btn');
        
        const mobilesContainer = document.getElementById('mobiles-container');
        const mobileSearchInput = document.getElementById('mobile-search-input');
        const mobilePriceFilter = document.getElementById('mobile-price-filter');
        const mobilePriceValue = document.getElementById('mobile-price-value');
        const mobileTopOffer = document.getElementById('mobile-top-offer');
        const mobileLoader = document.getElementById('mobile-loader');
        
        const gadgetsContainer = document.getElementById('gadgets-container');
        const gadgetSearchInput = document.getElementById('gadget-search-input');
        const gadgetPriceFilter = document.getElementById('gadget-price-filter');
        const gadgetPriceValue = document.getElementById('gadget-price-value');
        const gadgetTopOffer = document.getElementById('gadget-top-offer');
        const gadgetLoader = document.getElementById('gadget-loader');
        
        const modal = document.getElementById('product-modal');
        const closeModal = document.getElementById('close-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalSpecs = document.getElementById('modal-specs');
        const modalDescription = document.getElementById('modal-description');
        const whatsappBtn = document.getElementById('whatsapp-btn');

        // Google Sheets CSV URLs (Replace with your published CSV URLs)
        const mobileCSVURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vScZbq3GriEA40sbk7OdqERizzA3-_FGZ0Wmn1sGBY_tzx0cImOO7tegyRRLWJ1iNIGD_HEGBbGm5Yd/pub?gid=0&single=true&output=csv';
        const gadgetCSVURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTQKRvy9c3HK8IfQcJXinmAc-cY4hek2J1md-e3t8uidwN6OX3BNxv3-6-6LfMfoH4gsmt7eQRwxOL9/pub?gid=0&single=true&output=csv';

        // Sample data for demonstration (will be replaced with CSV data)
        let mobileProducts = [];
        let gadgetProducts = [];

        // Navigation
        mobileBtn.addEventListener('click', () => {
            mobilePage.classList.remove('hidden');
            gadgetPage.classList.add('hidden');
            mobileBtn.classList.add('active');
            gadgetBtn.classList.remove('active');
        });

        gadgetBtn.addEventListener('click', () => {
            gadgetPage.classList.remove('hidden');
            mobilePage.classList.add('hidden');
            gadgetBtn.classList.add('active');
            mobileBtn.classList.remove('active');
            
            // Load gadget data if not already loaded
            if (gadgetProducts.length === 0) {
                fetchGadgetData();
            }
        });

        // Fetch mobile data
        async function fetchMobileData() {
            try {
                // In a real implementation, you would fetch from your Google Sheets CSV
                const response = await fetch(mobileCSVURL);
                const csvData = await response.text();
                mobileProducts = parseMobileCSV(csvData);
                
                // For demo purposes, we'll use sample data with a delay to simulate loading
                // await new Promise(resolve => setTimeout(resolve, 1500));
                
                // mobileProducts = [
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
                updateTopOffer(mobileProducts, mobileTopOffer);
                
                // Display products
                displayProducts(mobileProducts, mobilesContainer, 'mobile');
                
                // Hide loader
                mobileLoader.style.display = 'none';
            } catch (error) {
                console.error('Error fetching mobile data:', error);
                mobilesContainer.innerHTML = '<p class="error-message">Failed to load mobiles. Please try again later.</p>';
                mobileLoader.style.display = 'none';
            }
        }

        // Fetch gadget data
        async function fetchGadgetData() {
            try {
                // In a real implementation, you would fetch from your Google Sheets CSV
                const response = await fetch(gadgetCSVURL);
                const csvData = await response.text();
                gadgetProducts = parseGadgetCSV(csvData);
                
                // For demo purposes, we'll use sample data with a delay to simulate loading
                // await new Promise(resolve => setTimeout(resolve, 1500));
                
                // gadgetProducts = [
                //     {
                //         id: 1,
                //         name: "Wireless Earbuds",
                //         price: 79,
                //         discount: 20,
                //         description: "High-quality wireless earbuds with noise cancellation.",
                //         image: "https://via.placeholder.com/300x300?text=Wireless+Earbuds"
                //     },
                //     {
                //         id: 2,
                //         name: "Smart Watch",
                //         price: 199,
                //         discount: 15,
                //         description: "Feature-rich smartwatch with health monitoring.",
                //         image: "https://via.placeholder.com/300x300?text=Smart+Watch"
                //     },
                //     {
                //         id: 3,
                //         name: "Power Bank",
                //         price: 49,
                //         discount: 10,
                //         description: "High-capacity power bank for all your devices.",
                //         image: "https://via.placeholder.com/300x300?text=Power+Bank"
                //     },
                //     {
                //         id: 4,
                //         name: "Bluetooth Speaker",
                //         price: 89,
                //         discount: 25,
                //         description: "Portable Bluetooth speaker with excellent sound quality.",
                //         image: "https://via.placeholder.com/300x300?text=Bluetooth+Speaker"
                //     },
                //     {
                //         id: 5,
                //         name: "Phone Case",
                //         price: 29,
                //         discount: 5,
                //         description: "Premium protective case for your smartphone.",
                //         image: "https://via.placeholder.com/300x300?text=Phone+Case"
                //     },
                //     {
                //         id: 6,
                //         name: "VR Headset",
                //         price: 299,
                //         discount: 30,
                //         description: "Immersive virtual reality experience.",
                //         image: "https://via.placeholder.com/300x300?text=VR+Headset"
                //     }
                // ];
                
                // Update the top offer banner
                updateTopOffer(gadgetProducts, gadgetTopOffer);
                
                // Display products
                displayProducts(gadgetProducts, gadgetsContainer, 'gadget');
                
                // Hide loader
                gadgetLoader.style.display = 'none';
            } catch (error) {
                console.error('Error fetching gadget data:', error);
                gadgetsContainer.innerHTML = '<p class="error-message">Failed to load gadgets. Please try again later.</p>';
                gadgetLoader.style.display = 'none';
            }
        }

        // Parse mobile CSV data
        function parseMobileCSV(csvData) {
            const lines = csvData.split('\n');
            const result = [];
            
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line) {
                    const values = line.split(',');
                    
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

        // Parse gadget CSV data
        function parseGadgetCSV(csvData) {
            const lines = csvData.split('\n');
            const result = [];
            
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line) {
                    const values = line.split(',');
                    
                    const product = {
                        id: i,
                        name: values[0] || '',
                        price: parseFloat(values[1]) || 0,
                        discount: parseFloat(values[2]) || 0,
                        description: values[3] || '',
                        image: values[4] || 'https://via.placeholder.com/300x300?text=Gadget'
                    };
                    
                    result.push(product);
                }
            }
            
            return result;
        }

        // Update top offer banner with the product having highest discount
        function updateTopOffer(products, bannerElement) {
            if (products.length === 0) return;
            
            // Find product with highest discount
            const topProduct = products.reduce((max, product) => 
                product.discount > max.discount ? product : max, products[0]);
            
            // Update banner
            const productName = topProduct.model || topProduct.name;
            bannerElement.innerHTML = 
                `<i class="fa-solid fa-gift"></i> Highest Offer: <span>${topProduct.discount}% OFF</span> on ${productName}! Limited Time Offer! <i class="fa-solid fa-gift"></i>`;
        }

        // Display products
        function displayProducts(productsToShow, container, type) {
            container.innerHTML = '';
            
            if (productsToShow.length === 0) {
                container.innerHTML = '<p class="no-results">No products found matching your criteria.</p>';
                return;
            }
            
            productsToShow.forEach(product => {
                const originalPrice = product.price / (1 - product.discount / 100);
                const productName = type === 'mobile' ? product.model : product.name;
                
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="discount-badge">${product.discount}% OFF</div>
                    <div class="product-image">
                        <img src="${product.image}" alt="${productName}">
                    </div>
                    <div class="product-info">
                        <h3>${productName}</h3>
                        <div class="product-price">
                            <span class="current-price">BDT ${product.price}</span>
                            <span class="original-price">BDT ${Math.round(originalPrice)}</span>
                        </div>
                        <button class="view-details" data-id="${product.id}" data-type="${type}">View Details</button>
                    </div>
                `;
                
                container.appendChild(productCard);
            });
            
            // Add event listeners to view details buttons
            container.querySelectorAll('.view-details').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.getAttribute('data-id'));
                    const productType = e.target.getAttribute('data-type');
                    showProductDetails(productId, productType);
                });
            });
        }

        // Show product details in modal
        function showProductDetails(productId, productType) {
            const products = productType === 'mobile' ? mobileProducts : gadgetProducts;
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            const productName = productType === 'mobile' ? product.model : product.name;
            modalTitle.textContent = productName;
            
            // Create specifications HTML based on product type
            let specsHTML = '';
            
            if (productType === 'mobile') {
                specsHTML = `
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
            } else {
                specsHTML = `
                    <div class="spec-item">
                        <span class="spec-label">Name</span>
                        <span class="spec-value">${product.name}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Price</span>
                        <span class="spec-value">BDT ${product.price}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Offer</span>
                        <span class="spec-value">${product.discount}% OFF</span>
                    </div>
                `;
            }
            
            modalSpecs.innerHTML = specsHTML;
            modalDescription.textContent = product.description;
            
            // Update WhatsApp link with product info
            const message = `Hello! I'm interested in the ${productName} (${product.discount}% off)`;
            whatsappBtn.href = `https://wa.me/8801640820472?text=${encodeURIComponent(message)}`;
            
            // Show modal
            modal.style.display = 'flex';
        }

        // Filter products based on search and price
        function filterProducts(products, searchInput, priceFilter, container, type) {
            const searchText = searchInput.value.toLowerCase();
            const maxPrice = parseInt(priceFilter.value);
            
            const filteredProducts = products.filter(product => {
                const productName = type === 'mobile' ? product.model : product.name;
                const matchesSearch = productName.toLowerCase().includes(searchText);
                const matchesPrice = product.price <= maxPrice;
                return matchesSearch && matchesPrice;
            });
            
            displayProducts(filteredProducts, container, type);
        }

        // Event listeners for mobile page
        mobileSearchInput.addEventListener('input', () => {
            filterProducts(mobileProducts, mobileSearchInput, mobilePriceFilter, mobilesContainer, 'mobile');
        });
        
        mobilePriceFilter.addEventListener('input', () => {
            mobilePriceValue.textContent = `BDT ${mobilePriceFilter.value}`;
            filterProducts(mobileProducts, mobileSearchInput, mobilePriceFilter, mobilesContainer, 'mobile');
        });

        // Event listeners for gadget page
        gadgetSearchInput.addEventListener('input', () => {
            filterProducts(gadgetProducts, gadgetSearchInput, gadgetPriceFilter, gadgetsContainer, 'gadget');
        });
        
        gadgetPriceFilter.addEventListener('input', () => {
            gadgetPriceValue.textContent = `BDT ${gadgetPriceFilter.value}`;
            filterProducts(gadgetProducts, gadgetSearchInput, gadgetPriceFilter, gadgetsContainer, 'gadget');
        });

        // Modal close event
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
        fetchMobileData();