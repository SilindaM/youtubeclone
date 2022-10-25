import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';
import Spinner   from "../components/Spinner";
import { HomePageVideos } from '../types';
import Card from '../components/Card';

function Home() {
  const dispatch=useAppDispatch();
  const videos=useAppSelector((state)=>state.youtubeApp.videos);
 
  useEffect(()=>{
    dispatch(getHomePageVideos(false));
  },[dispatch]);
  console.log(videos);

  return (
    <div className='max-h-screen overflow-hidden'>
      <div style={{height:"7.5vh"}}>
         <Navbar/>
      </div>
      <div className="flex" style={{height:"92.5vh"}}>
        <Sidebar/>
        {videos.length>0?(
              <InfiniteScroll
              dataLength={videos.length}
              next={()=>dispatch(getHomePageVideos(true))}
                hasMore={videos.length<500}
                loader={<Spinner/>}
               height={650}>

                <div className="grid gap-y-14 grid-cols-4 gap-x-8">
                  {videos.map((item:HomePageVideos)=>{
                    return <Card data={item} key={item.videoId}/>;
                  })}
                </div> 
                
                </InfiniteScroll>
        ):(
          <Spinner />
        )};
      </div>
    </div>
  )
}

export default Home