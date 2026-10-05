import { Order, OrderStatus } from '../types/order';
import { mockOrders } from '../data/mockOrders';
import { storageService } from './storageService';

const ORDERS_STORAGE_KEY = 'lhc_customer_orders_v1';

export const orderService = {
  getAllOrders(): Order[] {
    const stored = storageService.get<Order[]>(ORDERS_STORAGE_KEY, []);
    if (!stored || stored.length === 0) {
      storageService.set(ORDERS_STORAGE_KEY, mockOrders);
      return mockOrders;
    }
    return stored;
  },

  getOrderById(orderId: string): Order | undefined {
    const cleanId = orderId.trim().toUpperCase();
    const orders = this.getAllOrders();
    return orders.find((o) => o.id.toUpperCase() === cleanId);
  },

  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'statusHistory'>): Order {
    const newId = `LHC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderData,
      id: newId,
      createdAt: now,
      statusHistory: [
        {
          status: 'Pending',
          timestamp: now,
          note: 'Order successfully received. Verification in progress.',
        },
      ],
    };

    const currentOrders = this.getAllOrders();
    const updated = [newOrder, ...currentOrders];
    storageService.set(ORDERS_STORAGE_KEY, updated);

    return newOrder;
  },

  updateOrderStatus(orderId: string, newStatus: OrderStatus, note?: string): Order | null {
    const orders = this.getAllOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    const order = orders[index];
    const updatedOrder: Order = {
      ...order,
      status: newStatus,
      statusHistory: [
        ...order.statusHistory,
        {
          status: newStatus,
          timestamp: new Date().toISOString(),
          note: note || `Order status updated to ${newStatus}`,
        },
      ],
    };

    orders[index] = updatedOrder;
    storageService.set(ORDERS_STORAGE_KEY, orders);
    return updatedOrder;
  },
};
