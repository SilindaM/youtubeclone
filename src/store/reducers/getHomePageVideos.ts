
import { HomePageVideos } from './../../types';
import { YOUTUBE_API_URL } from './../../utils/constants';
import { RootState } from './../index';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { parseData } from '../../utils';

const API_KEY="AIzaSyDz09YmOeU30nGdYReXQHq-ymTKWnqBZWI";

export const getHomePageVideos=createAsyncThunk("youtubeApp/homePageVideos",async(isNext:boolean,{getState})=>{
    const{
        youtubeApp:{nextPageToken:nextPageTokenFromState,videos},
    }=getState() as RootState;

    const {data:{items,nextPageToken}}=await axios.get(`${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`);
        //console.log(items);
        const parsedData:HomePageVideos[]=await parseData(items);
        return {parseData:[...videos,...parsedData],nextPageToken};
}); 