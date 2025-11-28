import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StatusBar 
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import head from '../../assets/images/head.jpeg';
import watch from '../../assets/images/watch.jpeg';

const Order = () => {
  const [activeTab, setActiveTab] = useState('ongoing');

  const orders = {
    ongoing: [
      {
        id: 'ORD-7890',
        date: '2024-01-15',
        status: 'Processing',
        items: [
          { image: head, name: 'Premium Wireless Headphones', price: 239.99, quantity: 1 },
          { image: watch, name: 'Smart Watch Pro Series 8', price: 339.99, quantity: 1 }
        ],
        total: 579.98,
        estimatedDelivery: '2024-01-20',
        trackingNumber: 'TRK789012345'
      }
    ],
    completed: [
      {
        id: 'ORD-4567',
        date: '2024-01-10',
        status: 'Delivered',
        items: [
          { image: head, name: 'Premium Wireless Headphones', price: 239.99, quantity: 2 }
        ],
        total: 479.98,
        deliveredDate: '2024-01-12'
      },
      {
        id: 'ORD-1234',
        date: '2024-01-05',
        status: 'Delivered',
        items: [
          { image: watch, name: 'Smart Watch Pro Series 8', price: 339.99, quantity: 1 }
        ],
        total: 339.99,
        deliveredDate: '2024-01-08'
      }
    ],
    cancelled: [
      {
        id: 'ORD-3456',
        date: '2024-01-08',
        status: 'Cancelled',
        items: [
          { image: head, name: 'Premium Wireless Headphones', price: 239.99, quantity: 1 }
        ],
        total: 239.99,
        cancelReason: 'Changed my mind'
      }
    ]
  };

  const OrderCard = ({ order }) => (
    <View style={styles.orderCard}>
      {/* Order Header */}
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.orderDate}>Ordered on {order.date}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          order.status === 'Delivered' && styles.statusDelivered,
          order.status === 'Processing' && styles.statusProcessing,
          order.status === 'Cancelled' && styles.statusCancelled
        ]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      {/* Order Items */}
      <View style={styles.orderItems}>
        {order.items.map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price} x {item.quantity}</Text>
            </View>
            <Text style={styles.itemTotal}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Order Footer */}
      <View style={styles.orderFooter}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>${order.total}</Text>
        </View>
        
        {order.status === 'Processing' && (
          <View style={styles.trackingInfo}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.trackingText}>
              Est. delivery: {order.estimatedDelivery}
            </Text>
          </View>
        )}

        {order.status === 'Delivered' && (
          <View style={styles.deliveredInfo}>
            <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
            <Text style={styles.deliveredText}>
              Delivered on {order.deliveredDate}
            </Text>
          </View>
        )}

        {order.status === 'Cancelled' && (
          <View style={styles.cancelledInfo}>
            <Ionicons name="close-circle" size={16} color="#ef4444" />
            <Text style={styles.cancelledText}>
              {order.cancelReason}
            </Text>
          </View>
        )}

        <View style={styles.actionButtons}>
          {order.status === 'Processing' && (
            <>
              <TouchableOpacity style={styles.trackButton}>
                <Ionicons name="location-outline" size={16} color="#000" />
                <Text style={styles.trackButtonText}>Track Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
          
          {order.status === 'Delivered' && (
            <>
              <TouchableOpacity style={styles.reorderButton}>
                <Ionicons name="repeat-outline" size={16} color="#000" />
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reviewButton}>
                <Text style={styles.reviewButtonText}>Write Review</Text>
              </TouchableOpacity>
            </>
          )}

          {order.status === 'Cancelled' && (
            <TouchableOpacity style={styles.reorderButton}>
              <Ionicons name="repeat-outline" size={16} color="#000" />
              <Text style={styles.reorderButtonText}>Reorder</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const currentOrders = orders[activeTab];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Text style={styles.headerSubtitle}>Manage your purchases</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]}
          onPress={() => setActiveTab('ongoing')}
        >
          <Text style={[styles.tabText, activeTab === 'ongoing' && styles.activeTabText]}>
            Ongoing
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="document-text-outline" size={80} color="#d1d5db" />
            </View>
            <Text style={styles.emptyTitle}>No {activeTab} orders</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'ongoing' && "You don't have any ongoing orders"}
              {activeTab === 'completed' && "You haven't completed any orders yet"}
              {activeTab === 'cancelled' && "No cancelled orders found"}
            </Text>
            <TouchableOpacity style={styles.shopButton}>
              <Ionicons name="bag-handle-outline" size={20} color="#FFFFFF" />
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  activeTabText: {
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f59e0b',
  },
  statusProcessing: {
    backgroundColor: '#f59e0b',
  },
  statusDelivered: {
    backgroundColor: '#22c55e',
  },
  statusCancelled: {
    backgroundColor: '#ef4444',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#666666',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
  },
  trackingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  trackingText: {
    fontSize: 14,
    color: '#666666',
  },
  deliveredInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  deliveredText: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '600',
  },
  cancelledInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cancelledText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    gap: 8,
    flex: 1,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
    flex: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    gap: 8,
    flex: 1,
  },
  reorderButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  reviewButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});