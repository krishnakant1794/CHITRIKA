// chitri_frontend/src/components/admin/AddEditPaintingForm.jsx
import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { toast } from 'react-hot-toast';
import axios from '../../utils/api'; // Using the axios instance
import { CATEGORIES } from '../../utils/constants'; // Import categories

const AddEditPaintingForm = ({ paintingToEdit, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [''], // Start with one empty image URL field
    rating: 0,
    size: '',
    shape: '',
    frame: '',
    material: '',
    price: '',
    offerPrice: '',
    category: 'All',
    stock: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paintingToEdit) {
      setFormData({
        name: paintingToEdit.name || '',
        description: paintingToEdit.description || '',
        images: paintingToEdit.images && paintingToEdit.images.length > 0 ? paintingToEdit.images : [''],
        rating: paintingToEdit.rating || 0,
        size: paintingToEdit.size || '',
        shape: paintingToEdit.shape || '',
        frame: paintingToEdit.frame || '',
        material: paintingToEdit.material || '',
        price: paintingToEdit.price || '',
        offerPrice: paintingToEdit.offerPrice || '',
        category: paintingToEdit.category || 'All',
        stock: paintingToEdit.stock || 1,
      });
    } else {
      // Reset form for new painting
      setFormData({
        name: '', description: '', images: [''], rating: 0, size: '', shape: '',
        frame: '', material: '', price: '', offerPrice: '', category: 'All', stock: 1,
      });
    }
  }, [paintingToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: newImages.length > 0 ? newImages : [''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    const paintingData = {
      ...formData,
      price: parseFloat(formData.price),
      offerPrice: formData.offerPrice ? parseFloat(formData.offerPrice) : undefined,
      rating: parseFloat(formData.rating),
      stock: parseInt(formData.stock, 10),
      // Filter out empty image URLs
      images: formData.images.filter(url => url.trim() !== ''),
    };

    try {
      if (paintingToEdit) {
        await axios.put(`/paintings/${paintingToEdit._id}`, paintingData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Painting updated successfully!');
      } else {
        await axios.post('/paintings', paintingData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Painting added successfully!');
        // Clear form for new entry after successful add
        setFormData({
          name: '', description: '', images: [''], rating: 0, size: '', shape: '',
          frame: '', material: '', price: '', offerPrice: '', category: 'All', stock: 1,
        });
      }
      onSaveSuccess(); // Callback to refresh parent list
    } catch (error) {
      console.error("Error saving painting:", error);
      toast.error(error.response?.data?.message || "Failed to save painting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Wrap the form content in a div with max-height and overflow-y-auto
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-deep-taupe rounded-lg shadow-xl">
      <h3 className="text-2xl font-bold text-taupe mb-4">{paintingToEdit ? 'Edit Painting' : 'Add New Painting'}</h3>
      <div className="max-h-[70vh] overflow-y-auto pr-4"> {/* Added for scrolling */}
        <Input label="Painting Name" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Description" name="description" value={formData.description} onChange={handleChange} type="textarea" required />

        <div>
          <label className="block text-taupe text-sm font-medium mb-2">Image URLs (at least 1)</label>
          {formData.images.map((imgUrl, index) => (
            <div key={index} className="flex items-center mb-2">
              <Input
                name={`image-${index}`}
                value={imgUrl}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="Image URL"
                className="flex-grow mr-2"
                required={index === 0}
              />
              {formData.images.length > 1 && (
                <Button type="button" onClick={() => removeImageField(index)} variant="danger" className="px-3 py-2">
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addImageField} variant="secondary" className="mt-2">
            Add Another Image URL
          </Button>
        </div>

        <Input label="Rating (0-5)" name="rating" value={formData.rating} onChange={handleChange} type="number" min="0" max="5" step="0.1" />
        <Input label="Size" name="size" value={formData.size} onChange={handleChange} placeholder="e.g., 24x36 inches" />
        <Input label="Shape" name="shape" value={formData.shape} onChange={handleChange} placeholder="e.g., Rectangle, Abstract" />
        <Input label="Frame" name="frame" value={formData.frame} onChange={handleChange} placeholder="e.g., Wooden, Frameless" />
        <Input label="Material" name="material" value={formData.material} onChange={handleChange} placeholder="e.g., Acrylic, Oil" />
        <Input label="Price (INR)" name="price" value={formData.price} onChange={handleChange} type="number" required />
        <Input label="Offer Price (INR)" name="offerPrice" value={formData.offerPrice} onChange={handleChange} type="number" />
        <div className="mb-4">
          <label htmlFor="category" className="block text-taupe text-sm font-medium mb-2">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-taupe rounded-md focus:outline-none focus:ring-2 focus:ring-taupe text-white"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <Input label="Stock Quantity" name="stock" value={formData.stock} onChange={handleChange} type="number" min="0" required />
      </div> {/* End of scrollable div */}
      <Button type="submit" disabled={loading} className="w-full mt-4"> {/* Adjusted margin-top */}
        {loading ? (paintingToEdit ? 'Updating...' : 'Adding...') : (paintingToEdit ? 'Update Painting' : 'Add Painting')}
      </Button>
    </form>
  );
};

export default AddEditPaintingForm;
