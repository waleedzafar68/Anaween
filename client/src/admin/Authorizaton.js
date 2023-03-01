import React, { useEffect } from 'react';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const withAuthorizaton = (AdminLayout) => {
    return props => {
        const navigate = useNavigate();
        const token = sessionStorage.getItem('adminToken');

        useEffect(() => {
            if (token === "" || !token) {
                navigate('/admin/login');
                // toast.error("Not Authorized");                
            }
        }, [token, navigate]);

        return token && token !== "" ? <AdminLayout {...props} /> : null;
    };
}

export default withAuthorizaton;