// chitri_frontend/src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';
import axios from '../utils/api';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    homeAddress: { street: '', city: '', state: '', zip: '', country: '' }, // Initialize country
    officeAddress: { street: '', city: '', state: '', zip: '', country: '' },
    upiInfo: { id: '' },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;
        setProfileData({
          name: data.name || '',
          email: data.email || currentUser.email,
          phone: data.phone || '',
          homeAddress: data.homeAddress || { street: '', city: '', state: '', zip: '', country: '' },
          officeAddress: data.officeAddress || { street: '', city: '', state: '', zip: '', country: '' },
          upiInfo: data.upiInfo || { id: '' },
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [currentUser]);

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section) {
      setProfileData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [name]: value },
      }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put('/users/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading your profile..." />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-light font-serif flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 flex-grow mt-20">
        <h1 className="text-4xl font-bold text-taupe mb-8 text-center">My Profile</h1>

        <form onSubmit={handleSubmit} className="bg-deep-taupe p-8 rounded-lg shadow-xl max-w-3xl mx-auto space-y-6">
          {/* Basic Info */}
          <h2 className="text-2xl font-bold text-taupe border-b border-gray-700 pb-3 mb-4">Basic Information</h2>
          <Input label="Name" name="name" value={profileData.name} onChange={handleChange} required />
          <Input label="Email" name="email" value={profileData.email} type="email" disabled />
          <Input label="Contact Number" name="phone" value={profileData.phone} onChange={handleChange} type="tel" placeholder="e.g., +919876543210" />

          {/* Home Address */}
          <h2 className="text-2xl font-bold text-taupe border-b border-gray-700 pb-3 mb-4 mt-8">Home Address</h2>
          <Input label="Street" name="street" value={profileData.homeAddress.street} onChange={(e) => handleChange(e, 'homeAddress')} required /> {/* Made required */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="City" name="city" value={profileData.homeAddress.city} onChange={(e) => handleChange(e, 'homeAddress')} required /> {/* Made required */}
            <Input label="State" name="state" value={profileData.homeAddress.state} onChange={(e) => handleChange(e, 'homeAddress')} required /> {/* Made required */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Zip Code" name="zip" value={profileData.homeAddress.zip} onChange={(e) => handleChange(e, 'homeAddress')} required /> {/* Made required */}
            <Input label="Country" name="country" value={profileData.homeAddress.country} onChange={(e) => handleChange(e, 'homeAddress')} required /> {/* UPDATED: Made required */}
          </div>

          {/* Office Address */}
          <h2 className="text-2xl font-bold text-taupe border-b border-gray-700 pb-3 mb-4 mt-8">Office Address (Optional)</h2>
          <Input label="Street" name="street" value={profileData.officeAddress.street} onChange={(e) => handleChange(e, 'officeAddress')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="City" name="city" value={profileData.officeAddress.city} onChange={(e) => handleChange(e, 'officeAddress')} />
            <Input label="State" name="state" value={profileData.officeAddress.state} onChange={(e) => handleChange(e, 'officeAddress')} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Zip Code" name="zip" value={profileData.officeAddress.zip} onChange={(e) => handleChange(e, 'officeAddress')} />
            <Input label="Country" name="country" value={profileData.officeAddress.country} onChange={(e) => handleChange(e, 'officeAddress')} />
          </div>

          {/* UPI/Payment Info */}
          <h2 className="text-2xl font-bold text-taupe border-b border-gray-700 pb-3 mb-4 mt-8">Payment Information</h2>
          <Input label="UPI ID" name="id" value={profileData.upiInfo.id} onChange={(e) => handleChange(e, 'upiInfo')} placeholder="your.upi.id@bank" />

          <Button type="submit" className="w-full py-3 text-lg" disabled={saving} loading={saving}>
            Save Profile
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
