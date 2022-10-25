
import { HomePageVideos } from './../../types';
import { YOUTUBE_API_URL } from './../../utils/constants';
import { RootState } from './../index';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { parseData } from '../../utils';

const API_KEY="AIzaSyDz09YmOeU30nGdYReXQHq-ymTKWnqBZWI";

export const getSearchPageVideos=createAsyncThunk("youtubeApp/searchPageVideos",async(isNext:boolean,{getState})=>{
    const{
        youtubeApp:{nextPageToken:nextPageTokenFromState,videos,searchTerm},
    }=getState() as RootState;

    const {data:{items,nextPageToken}}=await axios.get(`${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`);
        //console.log(items);
        const parsedData:HomePageVideos[]=await parseData(items);
        return {parseData:[...videos,...parsedData],nextPageToken};
}); 