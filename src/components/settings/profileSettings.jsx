import toast from "react-hot-toast";

function ProfileSettings({
    profile,
    setProfile
}) {
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleSave = () => {
        toast.success("Profile updated!");
    };

    return (
        <div className="dashboard-card">
            <h2>Profile</h2>
            <p className="settings-description">
                Personalize your scholarship dashboard.
            </p>

            <div className="profile-settings">
                <div className="form-group">
                    <label>Name</label>
                    <input 
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Target Major</label>
                    <input 
                    type="text"
                    name="major"
                    value={profile.major}
                    onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Dream University</label>
                    <input 
                    type="text"
                    name="university"
                    value={profile.university}
                    onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Graduation Year</label>
                    <input 
                    type="text"
                    name="graduationYear"
                    value={profile.graduationYear}
                    onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Scholarship Goal ($)</label>
                    <input 
                    type="number"
                    name="scholarshipGoal"
                    value={profile.scholarshipGoal}
                    onChange={handleChange}
                    />
                </div>

                <button className="settings-btn" onClick={handleSave}>
                    Save Profile
                </button>
            </div>
        </div>
    );
}

export default ProfileSettings;