document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Sample product data
    const aromaCandles = [
        { id: 1, name: "Anti-Stress",  image: "relax.PNG", description: "40g, Cire de Soja, Lavande(95%), Camomile(5%)." },
        { id: 2, name: "Anti-Moustique", image: "en.PNG", description: "40g, Cire de Soja, Citronelle, Citron, Geranium." },
        { id: 3, name: "Anti-Anxiété",  image: "so.PNG", description: "40g, Cire de Soja, Camomile(95%), Lavande(5%)." },
    ];

    const candleHolders = [
        { id: 4, name: "Bougeoir en verre",  image: "coq.PNG", description: "Verre (eco-friendly!)." },
    ];

    const allProducts = [...aromaCandles, ...candleHolders];
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    // Live search as you type
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        if (searchTerm.length > 0) {
            showResults(searchTerm);
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Search on button click
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm.length > 0) {
            showResults(searchTerm);
        }
    });

    // Close results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    function showResults(searchTerm) {
        const filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
        displayResults(filteredProducts);
    }

    function displayResults(products) {
        searchResults.innerHTML = '';
        
        if (products.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No products found</div>';
            searchResults.style.display = 'block';
            return;
        }
        
        products.forEach(product => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="search-result-info">
                    <h4>${product.name}</h4>
                </div>
            `;
            
            item.addEventListener('click', () => {
                const isCandle = aromaCandles.some(c => c.id === product.id);
                window.location.href = isCandle ? 
                    `product-detail.html?id=${product.id}` : 
                    `product-detail2.html?id=${product.id}`;
                searchResults.style.display = 'none';
            });
            
            searchResults.appendChild(item);
        });
        
        searchResults.style.display = 'block';
    }
});
