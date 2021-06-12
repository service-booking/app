import React from 'react';
import {Link} from 'react-router-dom'
import '../Register/RegisterComponent.css'

function Register_landing() {

    return (
        <>

            <div className="landing-container">
                <h1>Are you registering as a </h1>
                    <div>
                        <Link className="landing-link" to="/register-customer">Normal Customer</Link>
                    </div>
                    <h1>, </h1>
                    <div>
                        <Link className="landing-link" to="/register-service-provider">Service Provider</Link>
                    </div>
                    <h1>?</h1>
                
            </div>
            
        </>
        
    )
}

export default Register_landing
