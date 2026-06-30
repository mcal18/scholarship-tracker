import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiLogIn, FiUserPlus  } from 'react-icons/fi';
import '../styles/auth.css';

function AuthPage() {
    const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect users back to where they were trying to go || fallback to root dashboard
    const redirectPath = location.state?.from?.pathname || "/";

    const handleAuthSuccess = () => {
        toast.success(isRegistering ? "Account created successfully! ✨" : "Welcome back! 🚀");
        navigate(redirectPath, { replace: true});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            toast.error("Please fill out all credential fields.");
            return;
        }
        
        setLoading(true);
        try {
            if (isRegistering) {
                await registerWithEmail(email, password);
            } else {
                await loginWithEmail(email, password);
            }
            handleAuthSuccess();
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') toast.error("This email is already registered.");
            else if (error.code === 'auth/invalid-credential') toast.error("Incorrect email or password.");
            else if (error.code === 'auth/weak-password') toast.error("Password must be at least 6 characters.");
            else toast.error("Authentication failed. Please check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle();
            handleAuthSuccess();
        } catch (error) {
            console.error(error);
            if (error.code !== 'auth/popup-closed-by-user') toast.error("Google authentication encoutered an issue.");
        }
    };

    return (
        <div className="auth-page-container">
            <div className="scholarship-card auth-card">
                <div className="auth-header">
                    <h1>{isRegistering ? "Create Account" : "Scholarship Tracker"}</h1>
                    <p>{isRegistering ? "Sign up to start tracking your academic funding goals" : "Sign in to manage your tracked scholarship applications"}</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div className="auth-input-wrapper">
                            <FiMail className='auth-input-icon' />
                            <input 
                            type="email" 
                            className='form-input auth-input'
                            placeholder='you@domain.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                             />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="auth-input-wrapper">
                            <FiLock className='auth-input-icon' />
                            <input 
                            type="password" 
                            className='form-input auth-input'
                            placeholder='••••••••'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                             />
                        </div>
                    </div>

                    <button type='submit' className="submit-btn auth-submit-btn" disabled={loading}>
                        {loading ? "Processing..." : isRegistering ? (
                            <> <FiUserPlus /> Register Account </>
                        ) : (
                            <> <FiLogIn /> Sign In </>
                        )}
                    </button>
                </form>

                <div className="auth-divider-line">
                    <span>or continue with</span>
                </div>

                <button type='button' className="google-sign-in-btn" onClick={handleGoogleSignIn} >
                        <FcGoogle size={20} />
                        <span>Sign in with Google</span>
                </button>

                <div className="auth-toggle-footer">
                    <button  type='button' className="auth-toggle-link" onClick={() => setIsRegistering(!isRegistering)} >
                        {isRegistering ? "Already have an account? Sign In" : "Don't have an account yet? Register"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;