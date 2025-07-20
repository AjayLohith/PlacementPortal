// Location: client/src/components/ExperienceForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// It now accepts an onNewExperience prop
export default function ExperienceForm({ onNewCompany, companies, onNewExperience }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        postTitle: "My Interview Experience at TechCorp Inc.",
        companyName: companies[0]?.name || 'Other',
        interviewDate: new Date().toISOString().split('T')[0],
        interviewRounds: [
            { roundName: "Initial Screening", duration: "30 minutes", method: "Phone", focus: "Resume and background check.", keyQuestions: "", obstacles: "" }
        ],
        suggestions: "",
        additionalInfo: "",
        closingNote: ""
    });

    const [otherCompany, setOtherCompany] = useState('');
    
    const handleRoundChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRounds = [...formData.interviewRounds];
        updatedRounds[index] = { ...updatedRounds[index], [name]: value };
        setFormData(prev => ({ ...prev, interviewRounds: updatedRounds }));
    };

    const addRound = () => {
        setFormData(prev => ({
            ...prev,
            interviewRounds: [
                ...prev.interviewRounds,
                {
                    roundName: "Managerial Round",
                    duration: "",
                    method: "Video Call",
                    focus: "",
                    keyQuestions: "",
                    obstacles: ""
                }
            ]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const finalCompanyName = formData.companyName === 'Other' ? otherCompany : formData.companyName;

        if (formData.companyName === 'Other' && otherCompany) {
            onNewCompany(otherCompany);
        }

        const dataToSubmit = {
            ...formData,
            companyName: finalCompanyName,
            timestamp: new Date().toISOString()
        };
        
        // Call the new handler function to pass data up to App.jsx
        onNewExperience(dataToSubmit);
        
        // Navigate to the company's page after submission
        const companySlug = finalCompanyName.toLowerCase().replace(/\s+/g, '-');
        navigate(`/${companySlug}`);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-8 animate-fade-in">
                <div className="space-y-4">
                     <EditableField label="Post Title" name="postTitle" value={formData.postTitle} onChange={(e) => setFormData({...formData, postTitle: e.target.value})} />
                     
                     <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-slate-600 mb-1">Company Name</label>
                        <select
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                            className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
                        >
                            {companies.map(company => (
                                <option key={company.slug} value={company.name}>{company.name}</option>
                            ))}
                             <option value="Other">Other</option>
                        </select>
                     </div>

                     {formData.companyName === 'Other' && (
                        <EditableField
                            label="Please specify company name"
                            name="otherCompany"
                            value={otherCompany}
                            onChange={(e) => setOtherCompany(e.target.value)}
                        />
                     )}

                     <EditableField label="Interview Date" name="interviewDate" type="date" value={formData.interviewDate} onChange={(e) => setFormData({...formData, interviewDate: e.target.value})} />
                </div>

                <FormSection title="Interview Process">
                    {formData.interviewRounds.map((round, index) => (
                        <div key={index} className="space-y-4 border border-slate-200 rounded-lg p-4 mt-4">
                            <h4 className="text-lg font-semibold text-slate-700 border-b pb-2">Round {index + 1}</h4>
                            <EditableField label="Round Name (e.g., Technical, HR)" name="roundName" value={round.roundName} onChange={(e) => handleRoundChange(index, e)} />
                            <EditableField label="Duration" name="duration" value={round.duration} onChange={(e) => handleRoundChange(index, e)} />
                            <EditableField label="Method (Phone/Video/In-person)" name="method" value={round.method} onChange={(e) => handleRoundChange(index, e)} />
                            <EditableField label="Focus" name="focus" value={round.focus} onChange={(e) => handleRoundChange(index, e)} isTextarea={true} />
                            <EditableField label="Key Questions" name="keyQuestions" value={round.keyQuestions} onChange={(e) => handleRoundChange(index, e)} isTextarea={true} />
                            <EditableField label="Obstacles / Challenges" name="obstacles" value={round.obstacles} onChange={(e) => handleRoundChange(index, e)} isTextarea={true} />
                        </div>
                    ))}
                    <button type="button" onClick={addRound} className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition-colors">
                        + Add Another Round
                    </button>
                </FormSection>
                
                 <FormSection title="Suggestions & Final Thoughts">
                    <EditableField label="Suggestions for Improvement" name="suggestions" value={formData.suggestions} onChange={(e) => setFormData({...formData, suggestions: e.target.value})} isTextarea={true} />
                    <EditableField label="Additional Information" name="additionalInfo" value={formData.additionalInfo} onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})} isTextarea={true} />
                    <EditableField label="Closing Note" name="closingNote" value={formData.closingNote} onChange={(e) => setFormData({...formData, closingNote: e.target.value})} isTextarea={true} />
                 </FormSection>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">
                        Post Experience
                    </button>
                </div>
            </form>
            <div id="feedback-message" className="hidden fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg"></div>
        </>
    );
}

const FormSection = ({ title, children }) => (
    <div className="border-t border-slate-200 pt-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const EditableField = ({ label, name, value, onChange, type = "text", isTextarea = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        {isTextarea ? (
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                rows="4"
                className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
        ) : (
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
        )}
    </div>
);

const style = document.createElement('style');
style.innerHTML = `
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.5s ease-out forwards;
    }
`;
document.head.appendChild(style);
    