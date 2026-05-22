import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Shield, Truck, Phone, Mail, Plus, Minus } from 'lucide-react';
import { getImportedProducts, getPriceTiersForProduct } from '../../data/marketplace/importedData';
import { getImportedVendors } from '../../data/marketplace/importedData';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showRFQModal, setShowRFQModal] = useState(false);

  const products = getImportedProducts();
  const product = products.find(p => p.id === id);
  const vendors = getImportedVendors();
  const vendor = product ? vendors.find(v => v.id === product.vendor_id) : null;
  const priceTiers = product ? getPriceTiersForProduct(product.sku) : [];

  if (!product || !vendor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <Link to="/marketplace" className="text-orange-600 hover:text-orange-700">
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  // Use price tiers if available
  const getEffectivePrice = () => {
    if (priceTiers.length === 0) return product.mrp;
    
    // Find the best price tier for the quantity
    const applicableTiers = priceTiers.filter(tier => quantity >= tier.tier_min_qty);
    if (applicableTiers.length === 0) return product.mrp;
    
    // Get the tier with the highest minimum quantity (best discount)
    const bestTier = applicableTiers.reduce((best, current) => 
      current.tier_min_qty > best.tier_min_qty ? current : best
    );
    
    return bestTier.tier_price;
  };

  const effectivePrice = getEffectivePrice();
  const totalPrice = effectivePrice * quantity;
  const taxAmount = (totalPrice * product.tax_rate) / 100;
  const finalPrice = totalPrice + taxAmount;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/marketplace"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Marketplace</span>
          </Link>
          
          <nav className="text-sm text-slate-500">
            <Link to="/marketplace" className="hover:text-slate-700">Marketplace</Link>
            <span className="mx-2">›</span>
            <Link to={`/marketplace/category/${product.category_id}`} className="hover:text-slate-700">
              {product.category_id}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-slate-900">{product.name}</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-orange-500' : 'border-slate-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-navy-900 mb-2">{product.name}</h1>
                  <p className="text-lg text-slate-600 mb-2">by {product.brand}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-slate-600">4.5 (23 reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600">{product.country_of_origin}</span>
                    </div>
                  </div>
                </div>
                
                {product.approval_codes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.approval_codes.map(approval => (
                      <span key={approval} className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full font-medium">
                        {approval}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-slate-700 mb-6">{product.description}</p>

              {/* Pricing */}
              <div className="border-t border-slate-200 pt-6 mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-navy-900">
                    ₹{effectivePrice.toLocaleString()}
                  </span>
                  <span className="text-slate-500">per {product.uom}</span>
                  <span className="text-sm text-slate-500">+ {product.tax_rate}% GST</span>
                  {effectivePrice < product.mrp && (
                    <span className="text-sm text-emerald-600 font-medium">
                      (Save ₹{(product.mrp - effectivePrice).toLocaleString()})
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600">
                  Minimum Order Quantity: {product.min_order_qty} {product.uom}
                </p>
                
                {/* Price Tiers Display */}
                {priceTiers.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Volume Pricing</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {priceTiers.map(tier => (
                        <div key={tier.id} className="flex justify-between">
                          <span className="text-blue-700">{tier.tier_min_qty}+ units:</span>
                          <span className="font-medium text-blue-900">₹{tier.tier_price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center border border-slate-300 rounded-lg py-2"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <span className="text-slate-600">{product.uom}</span>
                </div>
                
                <div className="mt-3 text-sm text-slate-600">
                  <p>Subtotal: ₹{totalPrice.toLocaleString()}</p>
                  <p>GST ({product.tax_rate}%): ₹{taxAmount.toLocaleString()}</p>
                  <p className="font-semibold text-navy-900">Total: ₹{finalPrice.toLocaleString()}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowRFQModal(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Request Quote
                </button>
                <button className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 py-3 px-6 rounded-lg font-semibold transition-colors">
                  Add to RFQ List
                </button>
              </div>

              {/* Product Features */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-semibold text-navy-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    <span>Warranty: {product.warranty_months || 12} months</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Lead Time: 7-10 days</span>
                  </div>
                  {product.hs_code && (
                    <div className="col-span-2">
                      <span className="text-slate-600">HSN Code: {product.hs_code}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Information */}
        <div className="mt-12">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Vendor Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-4">{vendor.legal_name}</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>{vendor.address}</p>
                  <p>{vendor.city}, {vendor.state} {vendor.pin}</p>
                  <p>{vendor.country}</p>
                  {vendor.website && (
                    <p>
                      <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700">
                        {vendor.website}
                      </a>
                    </p>
                  )}
                </div>
                
                {vendor.approvals_supported.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-slate-900 mb-2">Supported Approvals</h4>
                    <div className="flex flex-wrap gap-2">
                      {vendor.approvals_supported.map(approval => (
                        <span key={approval} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {approval}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-900">{vendor.contact_name}</p>
                      <p className="text-slate-600">{vendor.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <p className="text-slate-600">{vendor.contact_email}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Contact Vendor
                  </button>
                  <Link
                    to={`/marketplace/vendor/${vendor.id}`}
                    className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 py-2 px-4 rounded-lg font-medium transition-colors text-center"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RFQ Modal */}
      {showRFQModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-navy-900 mb-4">Request Quote</h3>
            <p className="text-slate-600 mb-6">
              Get competitive quotes for {product.name} from multiple vendors
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Quantity Required
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Required By Date
                </label>
                <input
                  type="date"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Additional Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Installation, warranty, delivery terms..."
                  className="w-full border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowRFQModal(false)}
                className="flex-1 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Submit RFQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;