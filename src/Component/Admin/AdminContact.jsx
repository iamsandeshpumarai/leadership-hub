import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast'; 
import api from "../../../utils/api";

// --- Static Data for Dropdowns ---
const NEPAL_PROVINCES = [
  "Koshi Province", "Madhesh Province", "Bagmati Province", "Gandaki Province",
  "Lumbini Province", "Karnali Province", "Sudurpaschim Province",
];
const NEPAL_CITIES = [
  "Kathmandu, Nepal", "Lalitpur, Nepal", "Bhaktapur, Nepal", "Pokhara, Nepal",
  "Biratnagar, Nepal", "Bharatpur, Nepal", "Birgunj, Nepal", "Dharan, Nepal",
  "Nepalgunj, Nepal", "Butwal, Nepal", "Hetauda, Nepal", "Janakpur, Nepal",
  "Dhangadhi, Nepal",
];

// --- INITIAL DEFAULT STATE ---
// This is the clean, new structure the form expects
const initialFormData = {
  officeAddress: "",
  province: "Bagmati Province",
  cityState: "Kathmandu, Nepal",
  phoneNumbers: [{ number: "", type: "Office" }],
  emails: [{ address: "" }],
  
  // These are the new fields with good default data
  hoursSummary: "Sunday - Friday: 09:00 AM - 05:00 PM",
  closedDaysSummary: "Closed on Saturdays and Public Holidays",

  Parking: "Available",
  Accessible: "By Public Transport",
  location: "Central",
  visitHeading: "Our office is located in the heart of Kathmandu. We welcome scheduled visits.",
  visitDescription: "Interactive Map\nKathmandu, Bagmati Province, Nepal",
};
// ------------------------------

const AdminContactPanel = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  // --- Helper to process fetched data and merge with defaults ---
  const processFetchedData = (fetchedData) => {
    // 1. Start with the current initial defaults to ensure all keys are present.
    const mergedData = { ...initialFormData };

    if (fetchedData) {
        // 2. Merge all simple fields directly from fetchedData.
        Object.keys(mergedData).forEach(key => {
            // Only overwrite if fetchedData has a defined value (prevents overwriting
            // default summaries with an empty string "hoursSummary": "")
            if (fetchedData[key] !== undefined && fetchedData[key] !== null && fetchedData[key] !== "") {
                mergedData[key] = fetchedData[key];
            }
        });

        // 3. Handle complex array fields (phoneNumbers, emails) - use fetched data directly.
        if (Array.isArray(fetchedData.phoneNumbers) && fetchedData.phoneNumbers.length > 0) {
            mergedData.phoneNumbers = fetchedData.phoneNumbers;
        }
        if (Array.isArray(fetchedData.emails) && fetchedData.emails.length > 0) {
            mergedData.emails = fetchedData.emails;
        }
        
        // 4. Clean up any legacy fields (like officeHours) which are in the database but not in the form state.
        delete mergedData.officeHours; 
    }
    
    return mergedData;
  };
  // -------------------------------------------------------------

  // --- Fetch Data on Load ---
  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contact/"); 
      
      // Check if data is nested under res.data.data (standard API pattern)
      if (res.data && res.data.data) {
        const updatedData = processFetchedData(res.data.data);
        setFormData(updatedData);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      // Keep using the initialFormData state on error
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers (Unchanged) ---
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePhoneChange = (index, field, value) => {
    const updated = [...formData.phoneNumbers];
    updated[index][field] = value;
    setFormData({ ...formData, phoneNumbers: updated });
  };
  const addPhone = () => {
    setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, { number: "", type: "Office" }] });
  };
  const removePhone = (index) => {
    const updated = formData.phoneNumbers.filter((_, i) => i !== index);
    setFormData({ ...formData, phoneNumbers: updated });
  };

  const handleEmailChange = (index, value) => {
    const updated = [...formData.emails];
    updated[index].address = value;
    setFormData({ ...formData, emails: updated });
  };
  const addEmail = () => {
    setFormData({ ...formData, emails: [...formData.emails, { address: "" }] });
  };
  const removeEmail = (index) => {
    const updated = formData.emails.filter((_, i) => i !== index);
    setFormData({ ...formData, emails: updated });
  };

  const handleSave = async () => {
    try {
      // Note: The structure of formData passed here matches your required fields.
      const savePromise = api.put("/contact/create", formData);
      
      await toast.promise(savePromise, {
        loading: 'Saving contact information...',
        success: 'Contact Info Saved Successfully!',
        error: (err) => {
          console.error(err);
          // Better error message extraction for API response structure
          return `Error saving data. Details: ${err.response?.data?.message || err.message}`;
        },
      });
      // Re-fetch data to update the form with the latest saved values and IDs
      fetchContactData();
    } catch (error) {
      // Handled by toast.promise
      toast.error(error.message)
    }
  };
  // ------------------------------------

  if (loading) return <div className="text-center p-10 text-blue-600 font-medium">Loading Admin Panel...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen space-y-8 mt-10 rounded-xl shadow-xl border border-gray-200">
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-3xl font-bold text-blue-800">🏢 Admin Contact Management</h2>
        <button onClick={handleSave} className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition">
          Save All Changes
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* --- LEFT COLUMN: Address & Highlights --- */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">📍 Location Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address / Building</label>
                <input
                  type="text"
                  value={formData.officeAddress}
                  onChange={(e) => handleChange("officeAddress", e.target.value)}
                  className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. House No. 123, Lazimpat"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <select
                    value={formData.province}
                    onChange={(e) => handleChange("province", e.target.value)}
                    className="w-full border p-2 rounded bg-white"
                  >
                    {NEPAL_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City/State (For Map)</label>
                  <select
                    value={formData.cityState}
                    onChange={(e) => handleChange("cityState", e.target.value)}
                    className="w-full border p-2 rounded bg-white"
                  >
                    {NEPAL_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">✨ Office Highlights</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Title (e.g., Central)</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="e.g. Central Location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility Text</label>
                <input
                  type="text"
                  value={formData.Accessible}
                  onChange={(e) => handleChange("Accessible", e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="e.g. Accessible by Public Transport"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parking Status</label>
                <select
                  value={formData.Parking}
                  onChange={(e) => handleChange("Parking", e.target.value)}
                  className="w-full border p-2 rounded bg-white"
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">💬 Visitor Message</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Heading</label>
                <input
                  type="text"
                  value={formData.visitHeading}
                  onChange={(e) => handleChange("visitHeading", e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="e.g. Visit our Main Office"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  rows="3"
                  value={formData.visitDescription}
                  onChange={(e) => handleChange("visitDescription", e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="e.g. Located in the heart of the city..."
                />
              </div>
            </div>
          </section>
        </div>

        {/* --- RIGHT COLUMN: Contacts & Hours --- */}
        <div className="space-y-6">
          
          {/* Phone Numbers */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-700">📞 Phone Numbers</h3>
              <button onClick={addPhone} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200">
                + Add Phone
              </button>
            </div>
            <div className="space-y-3">
              {formData.phoneNumbers.map((phone, idx) => (
                <div key={idx} className="flex gap-2">
                  <select
                    value={phone.type}
                    onChange={(e) => handlePhoneChange(idx, "type", e.target.value)}
                    className="border p-2 rounded w-1/3 bg-gray-50"
                  >
                    <option value="Office">Office</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Fax">Fax</option>
                  </select>
                  <input
                    type="text"
                    value={phone.number}
                    onChange={(e) => handlePhoneChange(idx, "number", e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="+977-..."
                  />
                  {formData.phoneNumbers.length > 1 && (
                    <button onClick={() => removePhone(idx)} className="text-red-500 hover:text-red-700 px-2">✕</button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Emails */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-700">✉️ Email Addresses</h3>
              <button onClick={addEmail} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200">
                + Add Email
              </button>
            </div>
            <div className="space-y-3">
              {formData.emails.map((email, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="email"
                    value={email.address}
                    onChange={(e) => handleEmailChange(idx, e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="example@org.np"
                  />
                  {formData.emails.length > 1 && (
                    <button onClick={() => removeEmail(idx)} className="text-red-500 hover:text-red-700 px-2">✕</button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Office Hours - NEW SIMPLIFIED TEXT INPUTS */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">🕒 Office Hours Summary</h3>
            
            <div className="space-y-4">
                {/* Hours Summary Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Standard Open/Closed Time</label>
                    <input
                        type="text"
                        // This value is now loaded from the fetched data's "hoursSummary" or the default if it was empty.
                        value={formData.hoursSummary} 
                        onChange={(e) => handleChange("hoursSummary", e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. Monday to Friday: 9:00 AM - 5:00 PM"
                    />
                </div>

                {/* Closed Days Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Closed Days/Holidays</label>
                    <input
                        type="text"
                        // This value is now loaded from the fetched data's "closedDaysSummary" or the default.
                        value={formData.closedDaysSummary} 
                        onChange={(e) => handleChange("closedDaysSummary", e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. Closed on Saturdays and all Public Holidays"
                    />
                </div>
            </div>
          </section>

        </div>
      </div>
      <div className="text-center pt-6">
          <button onClick={handleSave} className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold shadow-xl transition-all">
          💾 Save All Changes
        </button>
      </div>
    </div>
  );
};

export default AdminContactPanel;