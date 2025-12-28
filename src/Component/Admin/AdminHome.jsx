import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchHomeData } from '../../../utils/fetchData';
import api from '../../../utils/api';

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

const TextAreaGroup = ({ label, value, onChange, placeholder, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <label className="text-sm font-semibold text-gray-600 mb-1 ml-1">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
    />
  </div>
);

// --- NEW SUB-COMPONENTS FOR CLEANER LAYOUT ---

/**
 * Manages the form and list for Experience Cards.
 */
const CardManager = ({ experience, setExperience }) => {
    const [editingCard, setEditingCard] = useState(null);
    const [newCard, setNewCard] = useState({
        title: '', organization: '', period: '', icon: 'users', description: '', keyAchievements: '', badge: '',
    });

    // Reset newCard state when editingCard changes to null
    useEffect(() => {
        if (!editingCard) {
            setNewCard({ title: '', organization: '', period: '', icon: 'users', description: '', keyAchievements: '', badge: '' });
        }
    }, [editingCard]);

    const handleAddOrUpdateCard = () => {
        if (!newCard.title) return toast.error("Card title is required");

        if (editingCard) {
            setExperience(prev => ({
                ...prev,
                cards: prev.cards.map(card => (card.id === editingCard.id ? { ...newCard, id: card.id } : card)),
            }));
            toast.success("Card updated");
        } else {
            setExperience(prev => ({
                ...prev,
                cards: [...prev.cards, { ...newCard, id: Date.now() }],
            }));
            toast.success("Card added");
        }
        setEditingCard(null);
    };

    const handleEditCard = (card) => {
        setNewCard(card);
        setEditingCard(card);
        // Scroll to form for better UX
        const formElement = document.getElementById('card-form');
        if (formElement) window.scrollTo({ top: formElement.offsetTop - 100, behavior: 'smooth' });
    };

    const handleDeleteCard = (id) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            setExperience(prev => ({ ...prev, cards: prev.cards.filter(card => card.id !== id) }));
            toast.success("Card deleted");
        }
    };

    return (
        <div className="border-t border-gray-200 pt-8" id="card-form">
            <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Manage Experience Cards</h3>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Form to Add/Edit Card */}
                <div className="lg:col-span-4 bg-gray-50 p-6 rounded-xl h-fit border border-gray-200 shadow-inner">
                    <h4 className="font-bold text-blue-800 mb-4">{editingCard ? 'Edit Card' : 'Add New Card'}</h4>
                    <div className="space-y-4">
                        <InputGroup label="Title" value={newCard.title} onChange={e => setNewCard(prev => ({ ...prev, title: e.target.value }))} placeholder="e.g. Chairman" />
                        <InputGroup label="Organization" value={newCard.organization} onChange={e => setNewCard(prev => ({ ...prev, organization: e.target.value }))} />
                        <InputGroup label="Period" value={newCard.period} onChange={e => setNewCard(prev => ({ ...prev, period: e.target.value }))} />

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600 mb-1 ml-1">Icon</label>
                            <select value={newCard.icon} onChange={e => setNewCard(prev => ({ ...prev, icon: e.target.value }))} className="w-full p-3 bg-white border border-gray-300 rounded-lg">
                                <option value="building">Building</option>
                                <option value="heart">Heart</option>
                                <option value="users">Users</option>
                                <option value="award">Award</option>
                            </select>
                        </div>

                        <TextAreaGroup label="Description" value={newCard.description} onChange={e => setNewCard(prev => ({ ...prev, description: e.target.value }))} placeholder="Description" className="h-24" />
                        <TextAreaGroup label="Achievements (one per line)" value={newCard.keyAchievements} onChange={e => setNewCard(prev => ({ ...prev, keyAchievements: e.target.value }))} placeholder="Achievements (one per line)" className="h-24" />
                        <InputGroup label="Badge (Optional)" value={newCard.badge} onChange={e => setNewCard(prev => ({ ...prev, badge: e.target.value }))} />

                        <div className="flex gap-2 pt-2">
                            <button onClick={handleAddOrUpdateCard} className="flex-1 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition font-bold shadow-lg shadow-blue-200">
                                {editingCard ? 'Update Card' : 'Add Card'}
                            </button>
                            {editingCard && (
                                <button onClick={() => setEditingCard(null)} className="px-4 py-3 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* List of Cards */}
                <div className="lg:col-span-8 space-y-4">
                    {experience.cards.length === 0 && <div className="text-gray-400 text-center py-10 border rounded-lg bg-white">No cards added yet.</div>}
                    {experience.cards.map((card) => (
                        <div key={card.id} className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between gap-4 group">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-lg text-gray-800">{card.title}</h4>
                                    {card.badge && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{card.badge}</span>}
                                </div>
                                <p className="text-sm text-gray-500 font-medium mb-2">{card.organization} • {card.period}</p>
                                <p className="text-sm text-gray-600 line-clamp-2">{card.description}</p>
                            </div>
                            <div className="flex md:flex-col gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity justify-center">
                                <button onClick={() => handleEditCard(card)} className="px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded hover:bg-yellow-100 text-sm">Edit</button>
                                <button onClick={() => handleDeleteCard(card.id)} className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 text-sm">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/**
 * Manages the form and list for Political Journey Timeline.
 */
const TimelineManager = ({ political, setPolitical }) => {
    const [editingTimeline, setEditingTimeline] = useState(null);
    const [newTimeline, setNewTimeline] = useState({ year: '', label: '' });

    useEffect(() => {
        if (editingTimeline) {
            setNewTimeline(editingTimeline);
        } else {
            setNewTimeline({ year: '', label: '' });
        }
    }, [editingTimeline]);

    const handleAddOrUpdateTimeline = () => {
        if (!newTimeline.year || !newTimeline.label) return toast.error("Year and Event Label are required");

        if (editingTimeline) {
            setPolitical(prev => ({
                ...prev,
                timeline: prev.timeline.map(item => (item.id === editingTimeline.id ? { ...newTimeline, id: item.id } : item)),
            }));
            toast.success("Timeline updated");
        } else {
            setPolitical(prev => ({
                ...prev,
                timeline: [...prev.timeline, { ...newTimeline, id: Date.now() }],
            }));
            toast.success("Timeline added");
        }
        setEditingTimeline(null);
    };

    const handleEditTimeline = (item) => {
        setEditingTimeline(item);
    };

    const handleDeleteTimeline = (id) => {
        if(window.confirm("Are you sure you want to delete this timeline event?")) {
            setPolitical(prev => ({ ...prev, timeline: prev.timeline.filter(item => item.id !== id) }));
            toast.success("Timeline item deleted");
        }
    };

    return (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Timeline Milestones</h3>
            <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
                <InputGroup label="Year" value={newTimeline.year} onChange={e => setNewTimeline(prev => ({ ...prev, year: e.target.value }))} placeholder="e.g. 2024" className="md:w-1/4" />
                <InputGroup label="Event Label" value={newTimeline.label} onChange={e => setNewTimeline(prev => ({ ...prev, label: e.target.value }))} placeholder="e.g. Elected as..." className="md:w-2/4" />
                <button onClick={handleAddOrUpdateTimeline} className="w-full md:w-1/4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 font-bold">
                    {editingTimeline ? 'Update Event' : 'Add Event'}
                </button>
                {editingTimeline && <button onClick={() => setEditingTimeline(null)} className="p-3 bg-gray-200 rounded text-gray-600">✕</button>}
            </div>

            <div className="space-y-2">
                {political.timeline.length === 0 && <div className="text-gray-400 text-center py-5 border rounded-lg bg-white">No timeline events added yet.</div>}
                {political.timeline.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded border flex justify-between items-center hover:shadow-sm transition">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded">{item.year}</span>
                            <span className="text-gray-700 font-medium">{item.label}</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEditTimeline(item)} className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded">Edit</button>
                            <button onClick={() => handleDeleteTimeline(item.id)} className="text-red-600 hover:bg-red-50 px-3 py-1 rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---
const AdminHomePanel = () => {
    // Hero State
    const [hero, setHero] = useState({
        tag: '', firstName: '', nameHighlight: '', position: '', description: '',
        stats: { years: '', terms: '', roles: '' }, buttonData: [], imageUrl: '', imageFile: null,
        captionName: '', imageDesc: '',
    });

    // Experience State
    const [experience, setExperience] = useState({
        headerTag: '', headerHalfTitle: '', headerHighlight: '', headerDescription: '', cards: [],
    });

    // Political Journey State
    const [political, setPolitical] = useState({
        politicalFirstTitle: '', politicalHighlightTitle: '', politicalJourney: '', timeline: [],
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['homedata'],
        queryFn: fetchHomeData,

    });

    // Populate states
    useEffect(() => {
        if (data) {
            const fetchedHero = data.data[0].hero || {};
            setHero({
                tag: fetchedHero.tag || '', firstName: fetchedHero.firstName || '', nameHighlight: fetchedHero.nameHighlight || '',
                position: fetchedHero.position || '', description: fetchedHero.description || '',
                stats: fetchedHero.stats?.[0] || { years: '', terms: '', roles: '' },
                buttonData: fetchedHero.buttonData || [], imageUrl: fetchedHero?.imageUrl || '', imageFile: null,
                captionName: fetchedHero.captionName || '', imageDesc: fetchedHero.imageDesc || '',
            });

            const fetchedExp = data.data[0].experience || {};
            setExperience({
                headerTag: fetchedExp.headerTag || '', headerHalfTitle: fetchedExp.headerHalfTitle || '', headerHighlight: fetchedExp.headerHighlight || '',
                headerDescription: fetchedExp.headerDescription || '',
                cards: (fetchedExp.cards || []).map((card, i) => ({
                    id: Date.now() + i, title: card.title || '', organization: card.organization || '', period: card.period || '',
                    icon: card.icon || 'users', description: card.description || '',
                    keyAchievements: card.keyAchievements?.map(a => a.text).join('\n') || '',
                    badge: card.badge || null, order: card.order || i,
                })),
            });

            // Note: The Political fields were previously mixed into 'experience' object in the original code's payload structure.
            // Assuming `political` state is meant to hold its own data from the fetched data, I'll extract it here.
            // Since the original code extracted political fields from `fetchedExp`, I will maintain that connection.
            setPolitical({
                politicalFirstTitle: fetchedExp.politicalFirstTitle || '',
                politicalHighlightTitle: fetchedExp.politicalHighlightTitle || '',
                politicalJourney: fetchedExp.politicalJourney || '',
                timeline: (fetchedExp.timeline || []).map((item, i) => ({
                    id: Date.now() + i, year: item.year || '', label: item.label || '',
                })),
            });
        }
    }, [data]);

    // --- Handlers ---
    const handleHeroChange = (field, value) => setHero(prev => ({ ...prev, [field]: value }));
    const handleStatsChange = (field, value) => setHero(prev => ({ ...prev, stats: { ...prev.stats, [field]: value } }));
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHero(prev => ({
                ...prev,
                imageUrl: URL.createObjectURL(file),
                imageFile: file,
            }));
        }
    };
    const handleExperienceChange = (field, value) => setExperience(prev => ({ ...prev, [field]: value }));
    const handlePoliticalChange = (field, value) => setPolitical(prev => ({ ...prev, [field]: value }));


    // --- API Submission (Unchanged) ---
    const saveAllToDatabase = async () => {
        const orderedCards = experience.cards.map((card, i) => ({ ...card, order: i }));

        // Re-align payload structure to match the original API expectation
        const payload = {
            hero: {
                tag: hero.tag, firstName: hero.firstName, nameHighlight: hero.nameHighlight, position: hero.position,
                description: hero.description, stats: [hero.stats], buttonData: [],
                captionName: hero.captionName, imageDesc: hero.imageDesc,
                imageUrl: hero.imageUrl,
            },
            experience: { // Note: experience also contains political journey fields as per original payload
                headerTag: experience.headerTag, headerHalfTitle: experience.headerHalfTitle,
                headerHighlight: experience.headerHighlight, headerDescription: experience.headerDescription,
                cards: orderedCards.map(card => ({
                    title: card.title, organization: card.organization, period: card.period, icon: card.icon,
                    description: card.description, order: card.order, badge: card.badge || null,
                    keyAchievements: card.keyAchievements.split('\n').map(text => ({ text: text.trim() })).filter(a => a.text),
                })),
                politicalFirstTitle: political.politicalFirstTitle,
                politicalHighlightTitle: political.politicalHighlightTitle,
                politicalJourney: political.politicalJourney,
                timeline: political.timeline.map(item => ({ year: item.year, label: item.label })),
            },
        };

        const formData = new FormData();
        if (hero.imageFile) formData.append('herosecimage', hero.imageFile);
        formData.append('data', JSON.stringify(payload));


        const savePromise = api.put('/home/updatehomedata', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        toast.promise(savePromise, {
            loading: 'Saving data to server...',
            success: 'All data saved successfully!',
            error: (err) => `Save failed: ${err.response?.data?.message || err.message}`
        });

        try {
            await savePromise;
        } catch (e) {
            console.error(e);
        }
    };

    const [activeTab, setActiveTab] = useState('hero');

    if (isLoading) return <div className="p-10 text-center text-xl text-blue-600 font-semibold bg-white shadow-lg rounded-xl mt-10">Loading home data... ⚙️</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">Error loading data. Please refresh.</div>;

    // --- RENDER (New Layout) ---
    const tabList = [
        { id: 'hero', label: '🦸 Hero Section' },
        { id: 'experience', label: '💼 Experience' },
        { id: 'political', label: '🗳️ Political Journey' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'hero':
                return (
                    <div className="space-y-6">
                        {/* Hero Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup label="Tagline" value={hero.tag} onChange={e => handleHeroChange('tag', e.target.value)} placeholder="e.g. Visionary Leader" />
                            <InputGroup label="First Name" value={hero.firstName} onChange={e => handleHeroChange('firstName', e.target.value)} />
                            <InputGroup label="Name Highlight (Red Text)" value={hero.nameHighlight} onChange={e => handleHeroChange('nameHighlight', e.target.value)} />
                            <InputGroup label="Position / Title" value={hero.position} onChange={e => handleHeroChange('position', e.target.value)} />
                        </div>

                        <TextAreaGroup
                            label="Main Description"
                            value={hero.description}
                            onChange={e => handleHeroChange('description', e.target.value)}
                            className="h-24"
                        />

                        {/* Stats */}
                        <div className="pt-4 border-t">
                            <h3 className="text-xl font-medium mb-3 text-blue-700">Display Stats</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <InputGroup label="Years" value={hero.stats.years} onChange={e => handleStatsChange('years', e.target.value)} />
                                <InputGroup label="Terms" value={hero.stats.terms} onChange={e => handleStatsChange('terms', e.target.value)} />
                                <InputGroup label="Roles" value={hero.stats.roles} onChange={e => handleStatsChange('roles', e.target.value)} />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="pt-8 border-t border-gray-200 text-center bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-xl font-medium mb-4 text-blue-700">Hero Image</h3>
                            <div className="mx-auto w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-blue-400 shadow-xl">
                                {hero.imageUrl ? (
                                    <img src={hero.imageUrl} alt="Hero Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg font-semibold">No Image</div>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="p-3 border rounded-lg bg-white inline-block max-w-full cursor-pointer"
                            />
                            <p className="text-sm text-gray-600 mt-2">Upload a new image (JPG/PNG). The image should be square for best results.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup label="Image Caption Name" value={hero.captionName} onChange={e => handleHeroChange('captionName', e.target.value)} />
                            <TextAreaGroup label="Image Description" value={hero.imageDesc} onChange={e => handleHeroChange('imageDesc', e.target.value)} className="h-24" />
                        </div>
                    </div>
                );

            case 'experience':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup label="Section Tag" value={experience.headerTag} onChange={e => handleExperienceChange('headerTag', e.target.value)} />
                            <InputGroup label="Half Title" value={experience.headerHalfTitle} onChange={e => handleExperienceChange('headerHalfTitle', e.target.value)} />
                        </div>
                        <InputGroup label="Highlight Title" value={experience.headerHighlight} onChange={e => handleExperienceChange('headerHighlight', e.target.value)} />
                        <TextAreaGroup label="Section Description" value={experience.headerDescription} onChange={e => handleExperienceChange('headerDescription', e.target.value)} className="h-24" />

                        {/* Card Manager Sub-component */}
                        <CardManager experience={experience} setExperience={setExperience} />
                    </div>
                );

            case 'political':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup label="First Title" value={political.politicalFirstTitle} onChange={e => handlePoliticalChange('politicalFirstTitle', e.target.value)} />
                            <InputGroup label="Highlight Title" value={political.politicalHighlightTitle} onChange={e => handlePoliticalChange('politicalHighlightTitle', e.target.value)} />
                        </div>
                        <TextAreaGroup label="Journey Description" value={political.politicalJourney} onChange={e => handlePoliticalChange('politicalJourney', e.target.value)} className="h-24" />
                        
                        {/* Timeline Manager Sub-component */}
                        <TimelineManager political={political} setPolitical={setPolitical} />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-100 min-h-screen">
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 text-center border-b-4 border-blue-300 pb-4 mb-8 shadow-md bg-white p-4 rounded-xl">
                ✍️ Admin Panel - Edit Home Page
            </h1>

            <form onSubmit={e => { e.preventDefault(); saveAllToDatabase(); }} className="space-y-8">
                {/* Tab Navigation */}
                <div className="bg-white p-4 rounded-xl shadow-lg sticky top-[-24px] z-10">
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
                <div className="pt-6 border-t border-blue-200 sticky bottom-[-32px] z-10 bg-gray-100 p-4 shadow-top rounded-t-xl">
                    <button
                        type="submit"
                        className="p-4 bg-blue-700 text-white rounded-xl w-full font-extrabold text-lg hover:bg-blue-800 transition transform hover:scale-[1.005] shadow-2xl disabled:bg-gray-500 disabled:scale-100"
                    >
                        💾 Save All Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminHomePanel;