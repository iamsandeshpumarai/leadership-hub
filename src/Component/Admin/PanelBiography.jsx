import React, { useState, useEffect, useCallback } from 'react';
import api from '../../../utils/api';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';

// --- I. Fallbacks & Initial State (Same) ---
// ... (Your existing fallbacks go here)
// Note: Since the prompt is for layout, I'll keep the fallbacks minimal for conciseness, but they remain the same.

const fallbackBasicInfo = {
    nameFirst: 'Giriraj Mani',
    nameLast: 'Pokharel',
    born: '6 March 1958',
    birthplace: 'Khotang, Nepal',
    residence: 'Kathmandu, Nepal',
    bioParagraph: 'A distinguished Nepalese politician who has served as Minister of Education, Science and Technology, and Minister of Health and Population. Currently serving as Member of Parliament and founding chairman of Adharshila.',
    imageUrl: 'https://softech-project.vercel.app/assets/bioheader-CyNRhahl.jpg',
    stats: {
        ministerial: '2',
        years: '15+',
        mpStatus: 'Current'
    }
};

const fallbackPoliticalPositionDesc = 'A comprehensive overview of key political positions and roles held throughout his distinguished career.';

const fallbackPoliticalPositions = [
    {
        id: uuidv4(),
        title: "Minister of Education, Science and Technology",
        period: "16 March 2018 – 20 December 2020",
        icon: "building",
        badge: null,
        details: [
            { label: "President", value: "Bidhya Devi Bhandari" },
            { label: "PM", value: "Khadga Prasad Sharma Oli" },
        ],
    },
];

const fallbackPoliticalAffiliations = [
    { name: "CPN (Maoist Centre)", period: "since 2009" },
];

const fallbackKeyAchievements = [
    "Former Minister of Education, Science and Technology",
];

const fallbackPoliticalLife = [
    "On April 12, 2007, Janamorcha Nepal, of which he was then a vice-chairman, nominated him as the new Minister of Health...",
];


// --- HELPER COMPONENTS (Preserved) ---
const InputGroup = ({ label, value, onChange, placeholder, type = "text", className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <label className="text-sm font-semibold text-gray-600 mb-1 ml-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
    />
  </div>
);

const TextAreaGroup = ({ label, value, onChange, placeholder, className = "", rows = 4 }) => (
  <div className={`flex flex-col ${className}`}>
    <label className="text-sm font-semibold text-gray-600 mb-1 ml-1">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
    />
  </div>
);

const SelectGroup = ({ label, value, onChange, options, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <label className="text-sm font-semibold text-gray-600 mb-1 ml-1">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// --- III. Main Component ---

const AdminBiographyPanel = () => {
    const [basicInfo, setBasicInfo] = useState(fallbackBasicInfo);
    const [politicalPositionDesc, setPoliticalPositionDesc] = useState(fallbackPoliticalPositionDesc);
    const [positions, setPositions] = useState(fallbackPoliticalPositions);
    const [affiliations, setAffiliations] = useState(fallbackPoliticalAffiliations);
    const [achievements, setAchievements] = useState(fallbackKeyAchievements);
    const [politicalLife, setPoliticalLife] = useState(fallbackPoliticalLife);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('basic'); // State for Tab Navigation

    // --- Data Fetching (Use useCallback for stability) ---
    const fetchData = useCallback(async () => {
        try {
            const response = await api.get('/bio/getbio');
            const bioData = response?.data.data[0];
            console.log("this is biodata ",bioData)

            if (bioData) {
                // ... (Data mapping logic remains the same)
                const profile = bioData.profile;

                console.log(typeof profile?.birthDate)
                const stats = bioData.stats;

                setBasicInfo({
                    nameFirst: profile?.firstName || fallbackBasicInfo.nameFirst,
                    nameLast: profile?.lastName || fallbackBasicInfo.nameLast,
                    born: profile?.birthDate.split(" ").slice(0,3).join(" "),
                    birthplace: profile?.birthPlace || fallbackBasicInfo.birthplace,
                    residence: profile?.residence || fallbackBasicInfo.residence,
                    bioParagraph: bioData.biographyDesc || fallbackBasicInfo.bioParagraph,
                    imageUrl: profile?.photoUrl || fallbackBasicInfo.imageUrl,
                    stats: {
                        ministerial: stats?.ministerialPositions || fallbackBasicInfo.stats.ministerial,
                        years: stats?.yearsInPolitics || fallbackBasicInfo.stats.years,
                        mpStatus: stats?.mpStatus || fallbackBasicInfo.stats.mpStatus
                    }
                });

                setPoliticalPositionDesc(bioData.politicalPositionDesc || fallbackPoliticalPositionDesc);

                setPositions(bioData.politicalPositions?.map((pos) => ({
                    id: uuidv4(), // Assign a unique ID for React keys and manipulation
                    title: pos.position,
                    period: pos.period,
                    icon: pos.position.toLowerCase().includes('minister') ? 'building' : 'users',
                    badge: pos.period.includes('Present') ? 'Incumbent' : null,
                    details: pos.details?.map(det => ({ label: det.key, value: det.Value })) || []
                })) || fallbackPoliticalPositions);

                setAffiliations(bioData.politicalAffiliations?.map(aff => ({
                    name: aff.name,
                    period: aff.period
                })) || fallbackPoliticalAffiliations);

                setAchievements(bioData.keyAchievements || fallbackKeyAchievements);
                setPoliticalLife(bioData.politicalLife || fallbackPoliticalLife);

                if (profile?.photoUrl) {
                    setPreview(profile.photoUrl);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch initial data. Using defaults.');
        } finally {
            setFetchLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- Handlers (Updated for field-based changes) ---

    const handleBasicChange = (field, value) => {
        setBasicInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleStatsChange = (field, value) => {
        setBasicInfo((prev) => ({
            ...prev,
            stats: { ...prev.stats, [field]: value }
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        setImageFile(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            // Revert to fetched image URL if file cleared
            setPreview(basicInfo.imageUrl);
        }
    };

    // Position Handlers (Same logic, added confirm for delete)
    const addPosition = () => {
        setPositions((prev) => [
            ...prev,
            { id: uuidv4(), title: '', period: '', icon: 'building', badge: null, details: [] }
        ]);
    };
    const updatePosition = (id, field, value) => {
        setPositions((prev) =>
            prev.map((pos) => (pos.id === id ? { ...pos, [field]: value } : pos))
        );
    };
    const removePosition = (id) => {
        if (window.confirm("Are you sure you want to delete this position?")) {
            setPositions((prev) => prev.filter((pos) => pos.id !== id));
            toast.success("Position deleted");
        }
    };
    const addDetailToPosition = (posId) => {
        setPositions((prev) =>
            prev.map((pos) =>
                pos.id === posId
                    ? { ...pos, details: [...pos.details, { label: '', value: '' }] }
                    : pos
            )
        );
    };
    const updateDetail = (posId, detailIdx, field, value) => {
        setPositions((prev) =>
            prev.map((pos) =>
                pos.id === posId
                    ? {
                        ...pos,
                        details: pos.details.map((det, idx) =>
                            idx === detailIdx ? { ...det, [field]: value } : det
                        )
                    }
                    : pos
            )
        );
    };
    const removeDetail = (posId, detailIdx) => {
        if (window.confirm("Are you sure you want to delete this detail?")) {
            setPositions((prev) =>
                prev.map((pos) =>
                    pos.id === posId
                        ? { ...pos, details: pos.details.filter((_, idx) => idx !== detailIdx) }
                        : pos
                )
            );
            toast.success("Detail deleted");
        }
    };

    // Affiliations Handlers
    const addAffiliation = () => { setAffiliations((prev) => [...prev, { name: '', period: '' }]); };
    const updateAffiliation = (idx, field, value) => { setAffiliations((prev) => prev.map((aff, i) => (i === idx ? { ...aff, [field]: value } : aff))); };
    const removeAffiliation = (idx) => { 
        if (window.confirm("Are you sure you want to delete this affiliation?")) {
            setAffiliations((prev) => prev.filter((_, i) => i !== idx));
            toast.success("Affiliation deleted");
        }
    };

    // Achievements Handlers
    const addAchievement = () => { setAchievements((prev) => [...prev, '']); };
    const updateAchievement = (idx, value) => { setAchievements((prev) => prev.map((ach, i) => (i === idx ? value : ach))); };
    const removeAchievement = (idx) => { 
        if (window.confirm("Are you sure you want to delete this achievement?")) {
            setAchievements((prev) => prev.filter((_, i) => i !== idx));
            toast.success("Achievement deleted");
        }
    };

    // Political Life Handlers
    const addParagraph = () => { setPoliticalLife((prev) => [...prev, '']); };
    const updateParagraph = (idx, value) => { setPoliticalLife((prev) => prev.map((par, i) => (i === idx ? value : par))); };
    const removeParagraph = (idx) => { 
        if (window.confirm("Are you sure you want to delete this paragraph?")) {
            setPoliticalLife((prev) => prev.filter((_, i) => i !== idx));
            toast.success("Paragraph deleted");
        }
    };


    // --- Submission (Updated with toast.promise) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const bioData = {
            profile: {
                firstName: basicInfo.nameFirst,
                lastName: basicInfo.nameLast,
                photoUrl: basicInfo.imageUrl,
                birthDate: basicInfo.born,
                birthPlace: basicInfo.birthplace,
                residence: basicInfo.residence,
                
            },
            biographyDesc: basicInfo.bioParagraph,
            stats: {
                ministerialPositions: basicInfo.stats.ministerial,
                yearsInPolitics: basicInfo.stats.years,
                mpStatus: basicInfo.stats.mpStatus
            },
            politicalPositionDesc,
            politicalPositions: positions.map(pos => ({
                position: pos.title,
                period: pos.period,
                details: pos.details.map(det => ({
                    key: det.label,
                    Value: det.value
                }))
            })),
            politicalAffiliations: affiliations.map(aff => ({
                name: aff.name,
                period: aff.period
            })),
            keyAchievements: achievements.filter(a => a.trim() !== ''), // Filter empty
            politicalLife: politicalLife.filter(p => p.trim() !== '') // Filter empty
        };

        const formData = new FormData();
        formData.append('data', JSON.stringify(bioData));
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const savePromise = api.put('/bio/updatebio', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.promise(savePromise, {
            loading: 'Saving data to server...',
            success: 'All data saved successfully!',
            error: (err) => `Save failed: ${err.response?.data?.message || err.message}`
        });

        try {
            await savePromise;
            fetchData(); // Refresh data after save
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    if (fetchLoading) {
        return <div className="p-10 text-center text-xl text-blue-600 font-semibold bg-white shadow-lg rounded-xl mt-10">Loading biography data... ⚙️</div>;
    }

    // --- IV. Render Sections (Updated with InputGroup/TextAreaGroup) ---

    const tabList = [
        { id: 'basic', label: '👤 Basic Info & Bio' },
        { id: 'positions', label: '🏛️ Political Positions' },
        { id: 'affiliations', label: '🤝 Affiliations' },
        { id: 'achievements', label: '🏆 Achievements' },
        { id: 'life', label: '📜 Political Life' },
    ];

    // Reusable list section renderer (Updated with InputGroup/TextAreaGroup)
    const renderListSection = (title, items, handleAdd, handleUpdate, handleRemove, isKeyValue = false, isTextArea = false) => (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-700 mb-6 border-b pb-2">{title}</h3>
            {items.map((item, idx) => (
                <div key={isKeyValue ? idx : item.id || idx} className={`flex flex-col md:flex-row gap-4 items-start md:items-end p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition`}>
                    {isKeyValue ? (
                        <>
                            <InputGroup 
                                label="Name/Party" 
                                value={item.name} 
                                onChange={(e) => handleUpdate(idx, 'name', e.target.value)} 
                                placeholder="Name/Party"
                                className="flex-1"
                            />
                            <InputGroup 
                                label="Period" 
                                value={item.period} 
                                onChange={(e) => handleUpdate(idx, 'period', e.target.value)} 
                                placeholder="Period (e.g., since 2009)"
                                className="flex-1"
                            />
                        </>
                    ) : isTextArea ? (
                        <TextAreaGroup 
                            label={`Paragraph ${idx + 1}`} 
                            value={item} 
                            onChange={(e) => handleUpdate(idx, e.target.value)} 
                            placeholder="Narrative Paragraph"
                            className="flex-1"
                            rows={4}
                        />
                    ) : (
                        <InputGroup 
                            label={`Achievement ${idx + 1}`} 
                            value={item} 
                            onChange={(e) => handleUpdate(idx, e.target.value)} 
                            placeholder="Achievement Description"
                            className="flex-1"
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => handleRemove(idx)}
                        className="px-4 py-3 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 text-sm font-medium mt-4 md:mt-0"
                    >
                        Delete
                    </button>
                </div>
            ))}
            {items.length === 0 && <div className="text-gray-400 text-center py-10 border rounded-lg bg-white">No items added yet.</div>}
            <button
                type="button"
                onClick={handleAdd}
                className="px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-bold shadow-lg shadow-blue-200"
            >
                + Add New {title.includes('Affiliation') ? 'Affiliation' : title.includes('Achievement') ? 'Achievement' : 'Paragraph'}
            </button>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'basic':
                return (
                    <div className="space-y-6">
                        {/* Profile Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup label="First Name" value={basicInfo.nameFirst} onChange={(e) => handleBasicChange('nameFirst', e.target.value)} placeholder="First Name" />
                            <InputGroup label="Last Name" value={basicInfo.nameLast} onChange={(e) => handleBasicChange('nameLast', e.target.value)} placeholder="Last Name" />
                            <InputGroup label="Born" value={basicInfo.born} onChange={(e) => handleBasicChange('born', e.target.value)} placeholder="Born (e.g., 6 March 1958)" />
                            <InputGroup label="Birthplace" value={basicInfo.birthplace} onChange={(e) => handleBasicChange('birthplace', e.target.value)} placeholder="Birthplace" />
                            <InputGroup label="Residence" value={basicInfo.residence} onChange={(e) => handleBasicChange('residence', e.target.value)} placeholder="Residence" />
                        </div>

                        <TextAreaGroup
                            label="Main Biography Paragraph"
                            value={basicInfo.bioParagraph}
                            onChange={(e) => handleBasicChange('bioParagraph', e.target.value)}
                            placeholder="Main Biography Paragraph"
                            className="h-32"
                        />

                        {/* Stats */}
                        <div className="pt-4 border-t">
                            <h3 className="text-xl font-medium mb-3 text-blue-700">Display Stats</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <InputGroup label="Ministerial Positions Count" value={basicInfo.stats.ministerial} onChange={(e) => handleStatsChange('ministerial', e.target.value)} placeholder="Ministerial Positions Count" />
                                <InputGroup label="Years in Politics" value={basicInfo.stats.years} onChange={(e) => handleStatsChange('years', e.target.value)} placeholder="Years in Politics (e.g., 15+)" />
                                <InputGroup label="MP Status" value={basicInfo.stats.mpStatus} onChange={(e) => handleStatsChange('mpStatus', e.target.value)} placeholder="MP Status (e.g., Current)" />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="pt-8 border-t border-gray-200 text-center bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-xl font-medium mb-4 text-blue-700">Profile Image</h3>
                            <div className="mx-auto w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-blue-400 shadow-xl">
                                {preview ? (
                                    <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg font-semibold">No Image</div>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="p-3 border rounded-lg bg-white inline-block max-w-full cursor-pointer"
                            />
                            <p className="text-sm text-gray-600 mt-2">Upload a new image (JPG/PNG). The image should be square for best results.</p>
                        </div>
                    </div>
                );

            case 'positions':
                return (
                    <div className="space-y-6">
                        <TextAreaGroup
                            label="Introductory Description for Political Positions"
                            value={politicalPositionDesc}
                            onChange={(e) => setPoliticalPositionDesc(e.target.value)}
                            placeholder="Introductory Description for Political Positions"
                            className="h-24"
                        />

                        <div className="space-y-8">
                            {positions.map((pos) => (
                                <div key={pos.id} className="p-6 border border-blue-300 rounded-xl bg-blue-50 shadow-lg space-y-4">
                                    <div className="flex justify-between items-start border-b border-blue-300 pb-3 mb-4">
                                        <h3 className="text-xl font-semibold text-blue-800">Position: {pos.title || 'Untitled'}</h3>
                                        <button
                                            type="button"
                                            onClick={() => removePosition(pos.id)}
                                            className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 text-sm"
                                        >
                                            Delete Position
                                        </button>
                                    </div>

                                    {/* Primary Position Inputs */}
                                    <InputGroup label="Title" value={pos.title} onChange={(e) => updatePosition(pos.id, 'title', e.target.value)} placeholder="Title (e.g., Minister of Education)" />
                                    <div className="grid md:grid-cols-3 gap-3">
                                        <InputGroup label="Period" value={pos.period} onChange={(e) => updatePosition(pos.id, 'period', e.target.value)} placeholder="Period (e.g., 2018 – 2020)" />
                                        <SelectGroup 
                                            label="Icon" 
                                            value={pos.icon} 
                                            onChange={(e) => updatePosition(pos.id, 'icon', e.target.value)} 
                                            options={[
                                                { value: "building", label: "Building (Minister)" },
                                                { value: "users", label: "Users (MP/Member)" }
                                            ]}
                                        />
                                        <InputGroup label="Badge (Optional)" value={pos.badge || ''} onChange={(e) => updatePosition(pos.id, 'badge', e.target.value || null)} placeholder="Badge (Optional)" />
                                    </div>

                                    {/* Key/Value Details */}
                                    <div className="pt-4 border-t border-blue-300">
                                        <h4 className="text-lg font-bold text-blue-700 mb-3">Associated Details</h4>
                                        <div className="space-y-4">
                                            {pos.details.map((det, idx) => (
                                                <div key={idx} className="flex flex-col md:flex-row gap-4 items-start md:items-end p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition">
                                                    <InputGroup 
                                                        label={`Label ${idx + 1}`} 
                                                        value={det.label} 
                                                        onChange={(e) => updateDetail(pos.id, idx, 'label', e.target.value)} 
                                                        placeholder="Label (e.g., PM)"
                                                        className="flex-1"
                                                    />
                                                    <InputGroup 
                                                        label={`Value ${idx + 1}`} 
                                                        value={det.value} 
                                                        onChange={(e) => updateDetail(pos.id, idx, 'value', e.target.value)} 
                                                        placeholder="Value (e.g., K.P. Oli)"
                                                        className="flex-1"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDetail(pos.id, idx)}
                                                        className="px-4 py-3 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 text-sm font-medium mt-4 md:mt-0"
                                                    >
                                                        Delete Detail
                                                    </button>
                                                </div>
                                            ))}
                                            {pos.details.length === 0 && <div className="text-gray-400 text-center py-5 border rounded-lg bg-white">No details added yet.</div>}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => addDetailToPosition(pos.id)}
                                            className="px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-bold shadow-lg shadow-blue-200 mt-4"
                                        >
                                            + Add Detail
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {positions.length === 0 && <div className="text-gray-400 text-center py-10 border rounded-lg bg-white">No positions added yet.</div>}
                        <button
                            type="button"
                            onClick={addPosition}
                            className="px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-bold shadow-lg shadow-blue-200"
                        >
                            + Add New Political Position
                        </button>
                    </div>
                );

            case 'affiliations':
                return renderListSection(
                    "Political Affiliations (Party & Period)",
                    affiliations,
                    addAffiliation,
                    updateAffiliation,
                    removeAffiliation,
                    true // isKeyValue
                );

            case 'achievements':
                return renderListSection(
                    "Key Achievements (Bullet Points)",
                    achievements,
                    addAchievement,
                    updateAchievement,
                    removeAchievement,
                    false, // not KeyValue
                    false // not TextArea
                );

            case 'life':
                return renderListSection(
                    "Political Life (Narrative Flow - Paragraphs)",
                    politicalLife,
                    addParagraph,
                    updateParagraph,
                    removeParagraph,
                    false, // not KeyValue
                    true // isTextArea
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-100 min-h-screen">
            <Toaster position="top-right" reverseOrder={false} />
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 text-center border-b-4 border-blue-300 pb-4 mb-8 shadow-md bg-white p-4 rounded-xl">
                ✍️ Admin Panel - Edit Biography
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Tab Navigation */}
                <div className="bg-white p-4 rounded-xl shadow-lg sticky top-0 z-10">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 border-b border-gray-200 pb-2">
                        {tabList.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 text-sm md:text-base font-semibold rounded-lg transition-all duration-200 ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <section className="p-6 md:p-8 bg-white rounded-xl shadow-2xl">
                    <h2 className="text-3xl font-bold mb-6 text-blue-800 border-b pb-3">{tabList.find(t => t.id === activeTab).label}</h2>
                    {renderTabContent()}
                </section>

                {/* Final Save Button & Message - Always visible */}
                <div className="pt-6 border-t border-blue-200 sticky bottom-0 z-10 bg-gray-100 p-4 shadow-top rounded-t-xl">
                    <button
                        type="submit"
                        disabled={loading}
                        className="p-4 bg-blue-700 text-white rounded-xl w-full font-extrabold text-lg hover:bg-blue-800 transition transform hover:scale-[1.005] shadow-2xl disabled:bg-gray-500 disabled:scale-100"
                    >
                        💾 Save All Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminBiographyPanel;