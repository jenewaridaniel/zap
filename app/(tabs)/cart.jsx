import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import head from "../../assets/images/head.jpeg";
import watch from "../../assets/images/watch.jpeg";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image
          source={
            typeof item.image === "string" ? { uri: item.image } : item.image
          }
          style={styles.itemImage}
          resizeMode="cover"
        />
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
      </View>

      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.features}>
          <Text style={styles.featureText}>Wireless</Text>
          <Text style={styles.featureText}>Noise Cancelling</Text>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#000000" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviews})</Text>
          </View>
          <View style={styles.stockIndicator}>
            <View style={styles.stockDot} />
            <Text style={styles.stockText}>In Stock</Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.itemPrice}>${item.price}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>${item.originalPrice}</Text>
            )}
          </View>
          <Text style={styles.quantityLabel}>Qty: {item.quantity}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={onRemove}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color="#666666" />
        </TouchableOpacity>

        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onUpdateQuantity(item.id, -1)}
            activeOpacity={0.7}
            disabled={item.quantity <= 1}
          >
            <Ionicons
              name="remove"
              size={16}
              color={item.quantity <= 1 ? "#999999" : "#000000"}
            />
          </TouchableOpacity>

          <View style={styles.quantityDisplay}>
            <Text style={styles.quantity}>{item.quantity}</Text>
          </View>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onUpdateQuantity(item.id, 1)}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={16} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={styles.itemTotal}>
          <Text style={styles.totalLabel}>Item Total</Text>
          <Text style={styles.totalPrice}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: head,
      name: "Premium Wireless Headphones with Active Noise Cancellation",
      price: 239.99,
      originalPrice: 299.99,
      rating: 4.8,
      reviews: "2.4k",
      quantity: 1,
      discount: "20% OFF",
    },
    {
      id: 2,
      image: watch,
      name: "Smart Watch Pro Series 8 - Fitness & Health Tracker",
      price: 339.99,
      originalPrice: 399.99,
      rating: 4.9,
      reviews: "3.1k",
      quantity: 2,
      discount: "15% OFF",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      name: "Wireless Earbuds - Crystal Clear Sound Quality",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.5,
      reviews: "1.8k",
      quantity: 1,
      discount: "25% OFF",
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 15.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const savedAmount = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Shopping Cart</Text>
            <Text style={styles.headerSubtitle}>
              {cartItems.length} items • ${total.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Saved Amount Banner */}
        {savedAmount > 0 && (
          <View style={styles.savedBanner}>
            <Ionicons name="sparkles" size={18} color="#000000" />
            <Text style={styles.savedText}>
              You saved ${savedAmount.toFixed(2)}
            </Text>
            <Ionicons name="sparkles" size={18} color="#000000" />
          </View>
        )}

        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <>
            <View style={styles.itemsContainer}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </View>

            {/* Promo Code Section */}
            <View style={styles.promoContainer}>
              <View style={styles.promoInput}>
                <Ionicons name="pricetag" size={18} color="#000000" />
                <Text style={styles.promoPlaceholder}>Enter promo code</Text>
              </View>
              <TouchableOpacity style={styles.applyButton} activeOpacity={0.8}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>

            {/* Order Summary */}
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.summaryContent}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>
                    Subtotal ({cartItems.length} items)
                  </Text>
                  <Text style={styles.summaryValue}>
                    ${subtotal.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <View style={styles.shippingRow}>
                    <Text style={styles.summaryLabel}>Shipping</Text>
                    <Ionicons
                      name="information-circle"
                      size={16}
                      color="#666666"
                    />
                  </View>
                  <Text
                    style={[
                      styles.summaryValue,
                      shipping === 0 && styles.freeShipping,
                    ]}
                  >
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Tax (8%)</Text>
                  <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
                </View>

                {savedAmount > 0 && (
                  <View style={styles.summaryRow}>
                    <Text style={styles.savedLabel}>You saved</Text>
                    <Text style={styles.savedAmount}>
                      -${savedAmount.toFixed(2)}
                    </Text>
                  </View>
                )}

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                  <View>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalNote}>Including all taxes</Text>
                  </View>
                  <View style={styles.totalPriceContainer}>
                    <Text style={styles.totalCurrency}>USD</Text>
                    <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Security Badge */}
            <View style={styles.securityContainer}>
              <View style={styles.securityRow}>
                <Ionicons name="shield-checkmark" size={20} color="#000000" />
                <Text style={styles.securityText}>
                  Secure checkout • 256-bit SSL encrypted
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.emptyCart}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="cart-outline" size={80} color="#000000" />
            </View>
            <Text style={styles.emptyText}>Your cart feels lonely</Text>
            <Text style={styles.emptySubtext}>
              Add some amazing products to get started
            </Text>
            <TouchableOpacity style={styles.shopButton} activeOpacity={0.8}>
              <Ionicons name="bag-handle-outline" size={20} color="#FFFFFF" />
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.checkoutTop}>
            <Text style={styles.checkoutLabel}>Total Amount</Text>
            <Text style={styles.checkoutTotal}>${total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
            <View style={styles.checkoutButtonContent}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              <View style={styles.checkoutArrow}>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000000",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
    fontWeight: "500",
  },
  menuButton: {
    padding: 8,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  savedBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    gap: 8,
  },
  savedText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "700",
  },
  itemsContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  imageContainer: {
    position: "relative",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: "#F8F8F8",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#000000",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000000",
    lineHeight: 20,
    marginBottom: 6,
  },
  features: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 11,
    color: "#000000",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontWeight: "600",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000000",
  },
  reviewCount: {
    fontSize: 11,
    color: "#666666",
  },
  stockIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000000",
  },
  stockText: {
    fontSize: 11,
    color: "#000000",
    fontWeight: "600",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000000",
  },
  originalPrice: {
    fontSize: 13,
    color: "#999999",
    textDecorationLine: "line-through",
    fontWeight: "500",
  },
  quantityLabel: {
    fontSize: 12,
    color: "#666666",
    fontWeight: "500",
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginLeft: 12,
  },
  removeButton: {
    padding: 6,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#000000",
  },
  quantityButton: {
    padding: 10,
    backgroundColor: "#ffffff",
  },
  quantityDisplay: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  quantity: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
    minWidth: 20,
    textAlign: "center",
  },
  itemTotal: {
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 11,
    color: "#666666",
    marginBottom: 2,
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: "#000000",
  },
  promoContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    gap: 12,
  },
  promoInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  promoPlaceholder: {
    fontSize: 14,
    color: "#999999",
    fontWeight: "500",
  },
  applyButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 14,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000000",
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  summaryContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 20,
  },
  summaryContent: {
    gap: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 15,
    color: "#666666",
    fontWeight: "500",
  },
  shippingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000000",
  },
  freeShipping: {
    color: "#000000",
    fontWeight: "700",
  },
  savedLabel: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "500",
  },
  savedAmount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000000",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  totalNote: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  totalPriceContainer: {
    alignItems: "flex-end",
  },
  totalCurrency: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666666",
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 26,
    fontWeight: "800",
    color: "#000000",
  },
  securityContainer: {
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  securityText: {
    fontSize: 13,
    color: "#000000",
    fontWeight: "600",
  },
  emptyCart: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  shopButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  shopButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  checkoutContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderTopWidth: 1,
    borderColor: "#F0F0F0",
  },
  checkoutTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  checkoutLabel: {
    fontSize: 15,
    color: "#666666",
    fontWeight: "500",
  },
  checkoutTotal: {
    fontSize: 26,
    fontWeight: "800",
    color: "#000000",
  },
  checkoutButton: {
    backgroundColor: "#fffff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: "#000000",
  },
  checkoutButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  checkoutText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  checkoutArrow: {
    backgroundColor: "#000000",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
