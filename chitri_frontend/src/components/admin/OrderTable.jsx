// chitri_frontend/src/components/admin/OrderTable.jsx
import React, { useState } from 'react';
import Button from '../ui/Button';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import axios from '../../utils/api';
import Modal from '../ui/Modal'; // For displaying full details

const OrderTable = ({ orders, onOrderUpdate, onOrderDelete }) => {
  const [filterEmail, setFilterEmail] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterPainting, setFilterPainting] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesEmail = filterEmail ? order.user?.email?.toLowerCase().includes(filterEmail.toLowerCase()) : true;
    const matchesDate = filterDate ? format(new Date(order.orderedAt), 'yyyy-MM-dd') === filterDate : true;
    const matchesPainting = filterPainting ?
      order.items.some(item => item.painting?.name?.toLowerCase().includes(filterPainting.toLowerCase())) : true;
    return matchesEmail && matchesDate && matchesPainting;
  });

  const handleStatusChange = async (orderId, newStatus) => {
    setLoadingUpdate(true);
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/orders/${orderId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Order status updated!');
      onOrderUpdate(); // Refresh orders
    }
    catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.response?.data?.message || "Failed to update order status.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      setLoadingDelete(true);
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Order deleted successfully!');
        onOrderDelete(); // Refresh orders
      } catch (error) {
        console.error("Error deleting order:", error);
        toast.error(error.response?.data?.message || "Failed to delete order.");
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const showOrderDetails = (order) => {
    setSelectedOrderDetails(order);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="bg-deep-taupe p-6 rounded-lg shadow-xl overflow-x-auto">
      <h3 className="text-2xl font-bold text-taupe mb-4">All Orders</h3>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="email"
          placeholder="Filter by user email"
          className="px-4 py-2 bg-gray-700 border border-taupe rounded-md focus:outline-none focus:ring-2 focus:ring-taupe text-white"
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
        />
        <input
          type="date"
          placeholder="Filter by date"
          className="px-4 py-2 bg-gray-700 border border-taupe rounded-md focus:outline-none focus:ring-2 focus:ring-taupe text-white"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by painting name"
          className="flex-grow px-4 py-2 bg-gray-700 border border-taupe rounded-md focus:outline-none focus:ring-2 focus:ring-taupe text-white"
          value={filterPainting}
          onChange={(e) => setFilterPainting(e.target.value)}
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-400">No orders found matching criteria.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-taupe text-black">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-lg">Order ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">User Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Items</th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Total</th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Ordered On</th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tr-lg">Details/Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-gray-light">
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-700 transition-colors duration-150">
                <td className="py-3 px-4 text-sm">{order._id.slice(-6)}</td>
                <td className="py-3 px-4 text-sm">{order.user?.email || 'N/A'}</td>
                <td className="py-3 px-4 text-sm">
                  <ul className="list-disc list-inside">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.painting?.name || 'Unknown Painting'} (x{item.quantity})
                        {item.selectedSize && ` - Size: ${item.selectedSize}`} {/* This line should display size */}
                        {item.selectedColor && ` - Color: ${item.selectedColor}`}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-4 text-sm">₹{order.totalAmount?.toFixed(2) || 'N/A'}</td>
                <td className="py-3 px-4 text-sm">{format(new Date(order.orderedAt), 'dd MMM yyyy')}</td>
                <td className="py-3 px-4 text-sm">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-gray-800 border border-gray-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-taupe"
                    disabled={loadingUpdate}
                  >
                    {['Ordered', 'Packed', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4 text-sm flex flex-col space-y-2">
                  <Button onClick={() => showOrderDetails(order)} variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleDeleteOrder(order._id)}
                    variant="danger"
                    size="sm"
                    disabled={loadingDelete}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Order Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Order Details"
      >
        {selectedOrderDetails && (
          <div className="space-y-4 text-gray-light max-h-96 overflow-y-auto pr-2">
            <p><strong>Order ID:</strong> {selectedOrderDetails._id}</p>
            <p><strong>Status:</strong> {selectedOrderDetails.orderStatus}</p>
            <p><strong>Total Amount:</strong> ₹{selectedOrderDetails.totalAmount?.toFixed(2)}</p>
            <p><strong>Ordered On:</strong> {format(new Date(selectedOrderDetails.orderedAt), 'dd MMMM yyyy, hh:mm a')}</p>

            <h4 className="text-taupe font-semibold mt-4">User Information:</h4>
            <p><strong>Name:</strong> {selectedOrderDetails.user?.name || 'N/A'}</p>
            <p><strong>Email:</strong> {selectedOrderDetails.user?.email || 'N/A'}</p>
            <p><strong>Phone:</strong> {selectedOrderDetails.user?.phone || 'N/A'}</p>

            <h4 className="text-taupe font-semibold mt-4">Shipping Address:</h4>
            <p>{selectedOrderDetails.shippingAddress?.street}</p>
            <p>{selectedOrderDetails.shippingAddress?.city}, {selectedOrderDetails.shippingAddress?.state} - {selectedOrderDetails.shippingAddress?.zip}</p>
            <p>{selectedOrderDetails.shippingAddress?.country}</p>

            <h4 className="text-taupe font-semibold mt-4">Payment Details:</h4>
            <p><strong>Payment ID:</strong> {selectedOrderDetails.paymentId || 'N/A'}</p>
            <p><strong>Payment Status:</strong> {selectedOrderDetails.paymentStatus || 'N/A'}</p>

            <h4 className="text-taupe font-semibold mt-4">Items Ordered:</h4>
            <ul className="list-disc list-inside space-y-2">
              {selectedOrderDetails.items.map((item, idx) => (
                <li key={idx}>
                  {item.painting?.name || 'Unknown Painting'} (x{item.quantity}) - ₹{item.priceAtPurchase?.toFixed(2) || 'N/A'}
                  {item.selectedSize && ` - Size: ${item.selectedSize}`} {/* This line should display size */}
                  {item.selectedColor && ` - Color: ${item.selectedColor}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderTable;
