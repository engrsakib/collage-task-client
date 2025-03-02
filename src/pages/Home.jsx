import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider'
import CollageGallery from '../components/HomeComponents/CollageGalery';



const Home = () => {
  const{user, loadding, dark} = useContext(AuthContext);
  

    return (
      <>
        <div className='container mt-20 lg:mt-36'>
          

          {/* image galery */}
          <div>
            <CollageGallery />
          </div>
        </div>

        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
      </>
    );
};

export default Home;