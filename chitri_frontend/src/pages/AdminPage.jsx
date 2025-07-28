// chitri_frontend/src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AddEditPaintingForm from '../components/admin/AddEditPaintingForm';
import OrderTable from '../components/admin/OrderTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { toast } from 'react-hot-toast';
import axios from '../utils/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminPage = () => {
  const [paintings, setPaintings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaintingModalOpen, setIsPaintingModalOpen] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null); // For editing

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const paintingsRes = await axios.get('/paintings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPaintings(paintingsRes.data);

      const ordersRes = await axios.get('/orders/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(ordersRes.data);

    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("Failed to load admin data. You might not have access or a network issue occurred.");
      toast.error(err.response?.data?.message || "Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditPainting = (painting) => {
    setSelectedPainting(painting);
    setIsPaintingModalOpen(true);
  };

  const handleDeletePainting = async (paintingId) => {
    if (window.confirm("Are you sure you want to delete this painting? This action cannot be undone.")) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`/paintings/${paintingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Painting deleted successfully!');
        fetchAdminData();
      } catch (error) {
        console.error("Error deleting painting:", error);
        toast.error(error.response?.data?.message || "Failed to delete painting.");
      }
    }
  };

  const handlePaintingSaveSuccess = () => {
    setIsPaintingModalOpen(false);
    setSelectedPainting(null);
    fetchAdminData();
  };

  if (loading) {
    return <LoadingSpinner message="Loading admin dashboard..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex flex-col items-center justify-center p-4">
        <p className="text-lg mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-light font-serif flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 flex-grow mt-20">
        <h1 className="text-4xl font-bold text-taupe mb-8 text-center">Admin Dashboard</h1>

        {/* Paintings Management Section */}
        <section className="bg-deep-taupe p-6 rounded-lg shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <h2 className="text-2xl font-bold text-taupe mb-4 sm:mb-0">Manage Paintings</h2>
            <Button onClick={() => { setSelectedPainting(null); setIsPaintingModalOpen(true); }} className="flex items-center w-full sm:w-auto">
              <Plus className="h-5 w-5 mr-2" /> Add New Painting
            </Button>
          </div>

          {paintings.length === 0 ? (
            <p className="text-center text-gray-400">No paintings found. Add one!</p>
          ) : (
            <div className="overflow-x-auto"> {/* Enable horizontal scroll for table on small screens */}
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-taupe text-black">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-lg">Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Category</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Price</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Stock</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 text-gray-light">
                  {paintings.map((painting) => (
                    <tr key={painting._id} className="hover:bg-gray-700 transition-colors duration-150">
                      <td className="py-3 px-4 text-sm">{painting.name}</td>
                      <td className="py-3 px-4 text-sm">{painting.category}</td>
                      <td className="py-3 px-4 text-sm">₹{painting.offerPrice || painting.price}</td>
                      <td className="py-3 px-4 text-sm">{painting.stock}</td>
                      <td className="py-3 px-4 text-sm flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button onClick={() => handleEditPainting(painting)} variant="secondary" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleDeletePainting(painting._id)} variant="danger" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Orders Management Section */}
        <section>
          <OrderTable
            orders={orders}
            onOrderUpdate={fetchAdminData}
            onOrderDelete={fetchAdminData}
          />
        </section>

        {/* Modal for Add/Edit Painting */}
        <Modal
          isOpen={isPaintingModalOpen}
          onClose={() => setIsPaintingModalOpen(false)}
          title={selectedPainting ? 'Edit Painting' : 'Add New Painting'}
        >
          <AddEditPaintingForm
            paintingToEdit={selectedPainting}
            onSaveSuccess={handlePaintingSaveSuccess}
          />
        </Modal>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
