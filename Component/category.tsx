import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import head from '../assets/images/head.jpeg'
import watch from '../assets/images/watch.jpeg'
import sony from '../assets/images/sony.jpeg'

const ProductCard = ({ product, isLiked, onToggleLike }) => {
  return (
    <View style={styles.card}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        
        {/* Image */}
        <Image 
          source={typeof product.image === 'string' ? { uri: product.image } : product.image}
          style={styles.image}
        />

        {/* Discount Badge */}
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {product.discount}% OFF
            </Text>
          </View>
        )}

        {/* Like Button */}
        <TouchableOpacity 
          style={styles.likeButton}
          onPress={onToggleLike}
        >
          <Ionicons 
            name={isLiked ? "heart" : "heart-outline"} 
            size={22} 
            color={isLiked ? "#ff4b4b" : "#444"}
          />
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.row}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FBBF24" />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>

          <Text style={styles.price}>{product.price}</Text>
        </View>
      </View>
    </View>
  )
}

const GadgetProducts = () => {
  const [likedProducts, setLikedProducts] = useState({})

  const products = [
    {
      id: 1,
      image: head,
      name: 'Premium Wireless Headphones',
      price: '$299.99',
      rating: 4.5,
      discount: 20
    },
    {
      id: 2,
      image: watch,   
       name: 'Smart Watch Pro',
      price: '$399.99',
      rating: 4.8,
      discount: 15
    },
    {
      id: 3,
      image: sony,
      name: 'PlayStation 5 Slim ',
      price: '$499.99',
      rating: 4.3,
      discount: 10
    },
  
  ]

  const toggleLike = (id) => {
    setLikedProducts(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.grid}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isLiked={likedProducts[product.id]}
            onToggleLike={() => toggleLike(product.id)}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default GadgetProducts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    paddingTop: 10,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },

  imageContainer: {
    width: '100%',
    height: 170,
    position: 'relative',
    backgroundColor: '#ECEEF1',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#EF4444',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },

  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },

  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 8,
    borderRadius: 20,
    elevation: 4,
  },

  infoContainer: {
    padding: 12,
  },

  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  ratingText: {
    fontSize: 13,
    color: '#777',
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
  },
})
