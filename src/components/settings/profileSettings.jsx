import "../../styles/profileSettings.css"
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiUser, FiBookOpen, FiAward, FiCompass } from 'react-icons/fi';

function ProfileSettings({
    profile,
    setProfile,
    closeModal,
    isFormOnly = false
}) {

    const [localFormData, setLocalFormData] = useState({
        name: profile?.name || '',
        major: profile?.major || '',
        university: profile?.university || '',
        graduationYear: profile?.graduationYear || '',
        scholarshipGoal: profile?.scholarshipGoal || '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalFormData({ ...localFormData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProfile(localFormData);
        if (closeModal) closeModal();
        toast.success("Profile updated!");
    };

    if (isFormOnly) {
        return (
            <form onSubmit={handleSubmit} className="profile-edit-form">
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" className="form-input"
                        value={localFormData.name}
                        onChange={handleInputChange}
                        placeholder='e.g. Alex Morgan'
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Major/Field of Study</label>
                    <input type="text" name="major" className="form-input"
                        value={localFormData.major}
                        onChange={handleInputChange}
                        placeholder='e.g. Computer Science'
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Univesity / School</label>
                    <input type="text" name="university" className="form-input"
                        value={localFormData.university}
                        onChange={handleInputChange}
                        placeholder='e.g. Stanford University'
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Graduation Year</label>
                    <input type="text" name="graduationYear" className="form-input"
                        value={localFormData.graduationYear}
                        onChange={handleInputChange}
                        placeholder='e.g. 2028'
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Financial Scholarship Funding Goal ($)</label>
                    <input type="text" name="scholarshipGoal" className="form-input"
                        value={localFormData.scholarshipGoal}
                        onChange={handleInputChange}
                        placeholder='e.g. 25000'
                        required
                    />
                </div>

                <button type="submit" className="submit-btn profile-submit-btn">
                    Save Changes
                </button>
            </form>
        );
    }

    return (
        <div className="dashboard-card profile-display-panel">
            <h2>Student Profile</h2>

            {(!profile?.name) ? (
                <p className="no-data-text">No student profile data created yet. Click the user icon in the top right to set up your profile.</p>
            ) : (
                <div className="profile-info-list">
                    <div className="profile-info-item">
                        <div>
                            <FiUser className='profile-icon icon-user' />
                            <div className="profile-info-text">
                                <small className="profile-field-label">Full Name</small>
                                <strong className="profile-field-value">{profile.name}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="profile-info-item">
                        <div>
                            <FiBookOpen className='profile-icon icon-education' />
                            <div className="profile-info-text">
                                <small className="profile-field-label">Major & University</small>
                                <span className='profile-field-value'>
                                    {profile.major} at {profile.university} ({profile.graduationYear})
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-info-item">
                        <div>
                            <FiAward className='profile-icon icon-goal' />
                            <div className="profile-info-text">
                                <small className="profile-field-label">Funding Goal Target</small>
                                <span className='profile-field-value highlighted-goal'>
                                    ${Number(profile.scholarshipGoal).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileSettings;