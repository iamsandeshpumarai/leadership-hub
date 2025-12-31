import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast'; 
import api from "../../../utils/api";
import Loading from "../../Shared/Loading";


const NEPAL_PROVINCES = ["Koshi Province", "Madhesh Province", "Bagmati Province", "Gandaki Province", "Lumbini Province", "Karnali Province", "Sudurpaschim Province"];
const NEPAL_CITIES = ["Kathmandu, Nepal", "Lalitpur, Nepal", "Bhaktapur, Nepal", "Pokhara, Nepal", "Biratnagar, Nepal", "Bharatpur, Nepal", "Birgunj, Nepal", "Dharan, Nepal", "Nepalgunj, Nepal", "Butwal, Nepal", "Hetauda, Nepal", "Janakpur, Nepal", "Dhangadhi, Nepal"];


const initialFormData = {
  officeAddress: "",
  province: "Bagmati Province",
  cityState: "Kathmandu, Nepal",
  phoneNumbers: [{ number: "", type: "Office" }],
  emails: [{ address: "" }],
  hoursSummary: "Sunday - Thursday: 10:00 AM - 5:00 PM",
  closedDaysSummary: "Friday 10:00 AM - 3:00 PM",
  Parking: "Available",
  Accessible: "By Public Transport",
  location: "Central",
  visitHeading: "Our office is located in the heart of Kathmandu. We welcome scheduled visits.",
  visitDescription: "Interactive Map\nKathmandu, Bagmati Province, Nepal",
  // New Footer Data
  footerGmail: "contact@girirajpokhrel.com",
  footerPhone: "+977-1-4602290 (Koteshwor Party HQ)",
  footerLocation: "Singha Durbar Complex, Central Kathmandu, Nepal"
};


const AdminContactPanel = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  console.log(formData)
  useEffect(() => { fetchContactData(); }, []);

  const fetchContactData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contact/"); 
      if (res.data && res.data.data) {
        // Merge fetched data with initial structure to ensure no missing fields
        setFormData({ ...initialFormData, ...res.data.data });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePhoneChange = (index, field, value) => {
    const updated = [...formData.phoneNumbers];
    updated[index][field] = value;
    setFormData({ ...formData, phoneNumbers: updated });
  };

  const handleEmailChange = (index, value) => {
    const updated = [...formData.emails];
    updated[index].address = value;
    setFormData({ ...formData, emails: updated });
  };

  const handleSave = async () => {
    try {
      const savePromise = api.put("/contact/create", formData);
      await toast.promise(savePromise, {
        loading: 'Saving all changes...',
        success: 'All Contact Information Updated!',
        error: (err) => `Error: ${err.response?.data?.message || err.message}`,
      });
      fetchContactData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return<Loading/>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen space-y-8 mt-10 rounded-xl shadow-xl border border-gray-200">
      
      
      <div className="border-b pb-4">
        <h2 className="text-3xl font-bold text-blue-800">🏢 Admin Contact Management</h2>
        <p className="text-gray-500 text-sm mt-1">Update office location, contact details, and footer information.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">📍 Location Details</h3>
            <div className="space-y-4">
              <input type="text" value={formData.officeAddress} onChange={(e) => handleChange("officeAddress", e.target.value)} className="w-full border p-2 rounded" placeholder="Street Address" />
              <div className="grid grid-cols-2 gap-4">
                <select value={formData.province} onChange={(e) => handleChange("province", e.target.value)} className="w-full border p-2 rounded">
                  {NEPAL_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={formData.cityState} onChange={(e) => handleChange("cityState", e.target.value)} className="w-full border p-2 rounded">
                  {NEPAL_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">✨ Office Highlights</h3>
            <div className="space-y-4">
              <input type="text" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} className="w-full border p-2 rounded" placeholder="Location Title (e.g. Central)" />
              <input type="text" value={formData.Accessible} onChange={(e) => handleChange("Accessible", e.target.value)} className="w-full border p-2 rounded" placeholder="Accessibility" />
              <select value={formData.Parking} onChange={(e) => handleChange("Parking", e.target.value)} className="w-full border p-2 rounded">
                <option value="Available">Parking Available</option>
                <option value="Not Available">No Parking</option>
              </select>
            </div>
          </section>

          {/* NEW FOOTER SECTION */}
          <section className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">⬇️ Footer Contact (Quick Links)</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-blue-600 uppercase">Footer Email</label>
                <input type="email" value={formData.footerGmail} onChange={(e) => handleChange("footerGmail", e.target.value)} className="w-full border p-2 rounded mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold text-blue-600 uppercase">Footer Phone</label>
                <input type="text" value={formData.footerPhone} onChange={(e) => handleChange("footerPhone", e.target.value)} className="w-full border p-2 rounded mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold text-blue-600 uppercase">Footer Location Label</label>
                <input type="text" value={formData.footerLocation} onChange={(e) => handleChange("footerLocation", e.target.value)} className="w-full border p-2 rounded mt-1" />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">📞 Phone Numbers</h3>
            {formData.phoneNumbers.map((phone, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input type="text" value={phone.number} onChange={(e) => handlePhoneChange(idx, "number", e.target.value)} className="border p-2 rounded w-full" placeholder="Number" />
                <button onClick={() => setFormData({...formData, phoneNumbers: formData.phoneNumbers.filter((_, i) => i !== idx)})} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => setFormData({...formData, phoneNumbers: [...formData.phoneNumbers, {number: "", type: "Office"}]})} className="text-blue-600 text-sm font-bold">+ Add Phone</button>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">✉️ Email Addresses</h3>
            {formData.emails.map((email, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input type="email" value={email.address} onChange={(e) => handleEmailChange(idx, e.target.value)} className="border p-2 rounded w-full" placeholder="Email" />
                <button onClick={() => setFormData({...formData, emails: formData.emails.filter((_, i) => i !== idx)})} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => setFormData({...formData, emails: [...formData.emails, {address: ""}]})} className="text-blue-600 text-sm font-bold">+ Add Email</button>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">🕒 Office Hours</h3>
            <input type="text" value={formData.hoursSummary} onChange={(e) => handleChange("hoursSummary", e.target.value)} className="w-full border p-2 rounded mb-3" placeholder="Standard Hours" />
            <input type="text" value={formData.closedDaysSummary} onChange={(e) => handleChange("closedDaysSummary", e.target.value)} className="w-full border p-2 rounded" placeholder="Closed Days" />
          </section>
        </div>
      </div>

      <div className="text-center pt-10 border-t">
        <button onClick={handleSave} className="bg-blue-700 hover:bg-blue-800 text-white px-12 py-4 rounded-xl font-bold shadow-2xl transition-all transform hover:scale-105">
          💾 Save All Changes
        </button>
      </div>
    </div>
  );
};

export default AdminContactPanel;