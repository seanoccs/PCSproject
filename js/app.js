const { useState, useEffect } = React;

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    useEffect(() => {
        fetch('data/products_with_prices.json')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading products:', err);
                setLoading(false);
            });
    }, []);
    
    const categories = [...new Set(products.map(p => p.category))];
    
    const filteredProducts = products.filter(p => {
        if (selectedCategory && p.category !== selectedCategory) return false;
        if (selectedSize && p.size !== selectedSize) return false;
        return true;
    });
    
    const sizes = selectedCategory 
        ? [...new Set(products.filter(p => p.category === selectedCategory).map(p => p.size))]
        : [];
    
    if (selectedProduct) {
        return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
    }
    
    if (loading) {
        return (
            <div className="loading">
                <h2>Loading products...</h2>
            </div>
        );
    }
    
    return (
        <>
            <header>
                <div className="container">
                    <h1>🔥 Commercial Catering Equipment Price Comparison</h1>
                    <p>Australia's Best Prices on Quality Equipment - Compare & Save</p>
                </div>
            </header>
            
            <nav>
                <div className="nav-container">
                    <button 
                        className={`category-btn ${!selectedCategory ? 'active' : ''}`}
                        onClick={() => { setSelectedCategory(null); setSelectedSize(null); }}
                    >
                        All Categories
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => { setSelectedCategory(cat); setSelectedSize(null); }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </nav>
            
            {selectedCategory && sizes.length > 0 && (
                <div className="size-filter">
                    <div className="container">
                        <h3>Filter by Size:</h3>
                        <div className="size-buttons">
                            <button 
                                className={`size-btn ${!selectedSize ? 'active' : ''}`}
                                onClick={() => setSelectedSize(null)}
                            >
                                All Sizes
                            </button>
                            {sizes.map(size => (
                                <button 
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            <div className="container">
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <div 
                            key={product.product_id} 
                            className="product-card"
                            onClick={() => setSelectedProduct(product)}
                        >
                            <img 
                                src={product.image_url} 
                                alt={product.model}
                                className="product-image"
                            />
                            <div className="product-info">
                                <div className="product-brand">{product.brand}</div>
                                <div className="product-model">{product.model}</div>
                                <div>{product.size} • {product.sub_category}</div>
                                <div className="best-price">
                                    Our Price: ${product.your_price.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

function ProductDetail({ product, onBack }) {
    const embedCode = `<iframe src="${window.location.origin}/product/${product.product_id}" width="100%" height="600" frameborder="0"></iframe>`;
    
    return (
        <div className="container">
            <button className="back-btn" onClick={onBack}>
                ← Back to Products
            </button>
            
            <div className="product-detail">
                <div className="detail-header">
                    <img src={product.image_url} alt={product.model} className="detail-image" />
                    <div className="detail-info">
                        <h2>{product.brand} {product.model}</h2>
                        <p><strong>Category:</strong> {product.category} - {product.sub_category}</p>
                        <p><strong>Size:</strong> {product.size}</p>
                        <p><strong>RRP:</strong> ${product.rrp.toLocaleString()}</p>
                    </div>
                </div>
                
                <h3>Price Comparison</h3>
                <table className="price-table">
                    <thead>
                        <tr>
                            <th>Retailer</th>
                            <th>Brand & Model</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{background: '#e8f5e9'}}>
                            <td><strong>Eat Tucker (You)</strong></td>
                            <td>{product.brand} {product.model}</td>
                            <td className="price-cell">${product.your_price.toLocaleString()}</td>
                            <td><strong>BEST PRICE ✓</strong></td>
                            <td><a href={product.your_url} className="link-btn" target="_blank">View</a></td>
                        </tr>
                        {product.competitors.map((comp, idx) => (
                            <tr key={idx}>
                                <td>{comp.name}</td>
                                <td>{product.brand} {product.model}</td>
                                <td className="price-cell">
                                    {comp.price ? `$${comp.price.toLocaleString()}` : 'N/A'}
                                </td>
                                <td>
                                    {comp.status === 'warning' && (
                                        <div className="status-warning">⚠️ Price may be outdated</div>
                                    )}
                                    {comp.status === 'alert' && (
                                        <div className="status-alert">🚨 Suspicious price - likely error</div>
                                    )}
                                    {comp.status === 'normal' && '✓ Current'}
                                </td>
                                <td><a href={comp.url} className="link-btn" target="_blank">View</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="embed-code">
                    <h3>Embed This Comparison on Your Website</h3>
                    <p>Copy and paste this code into your product page on eattucker.com:</p>
                    <code>{embedCode}</code>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
