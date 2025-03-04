import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../provider/AuthProvider'
import CollageGallery from '../components/HomeComponents/CollageGalery';
import HomeUniversity from '../components/HomeComponents/HomeUniversity';
import Feedback from './Feedback';
import useGetAllUsers from '../components/Dashboard/user/AllUsers/useGetAllUsers';
import ReacerchWorks from '../components/HomeComponents/ReacerchWorks';



const Home = () => {
  const{user, loadding, dark} = useContext(AuthContext);
  const { users, refetch, isPending } = useGetAllUsers(user);
  
    return (
      <>
        <div className='container mt-20 lg:mt-36'>
          
          {/* University Card for home pages */}
          <div className=''>
            <HomeUniversity />
          </div>
          {/* image galery */}
          <div>
            <CollageGallery />
          </div>


          {/* feedback works */}
          <div className={`${!users.email && "hidden"}`}>
            <h1 className={`text-3xl font-bold text-center mb-6`}>Candidate FeedBack</h1>
            <Feedback></Feedback>
          </div>

          {/* feedback works */}
          <div className={`${!users.email && "hidden"}`}>
            <h1 className={`text-3xl font-bold text-center mb-6`}>Reacerchs Works</h1>
            <ReacerchWorks></ReacerchWorks>
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