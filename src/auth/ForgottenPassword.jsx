import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider';

const ForgottenPassword = () => {
     const { dark, logInMail, setUser, user } = useContext(AuthContext);
    return (
        <>
            

            <Helmet>
                <title>Reset Password</title>
            </Helmet>
        </>
    );
};

export default ForgottenPassword;