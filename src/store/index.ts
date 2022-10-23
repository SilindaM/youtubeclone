import { getHomePageVideos } from './reducers/getHomePageVideos';
import { CurrentPlaying, RecommendedVideos } from './../types';
import { InitialState } from "../types";
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { type } from 'os';

const initialState: InitialState={
    videos:[],
    currentPlaying:null,
    searchTerm:"",
    searchResults:[],
    nextPageToken:null,
    recommendedVideos:[],
};

const YoutubeSlice=createSlice({
    name:"youtubeApp",
    initialState,
    reducers:{},
    extraReducers:(buider=>{
    buider.addCase(getHomePageVideos.fulfilled,(state,action)=>{
        //state.videos=action.payload.parseData;
        //state.nextPageToken=action.payload.nextPageToken;

    })
    }),
});

export const store=configureStore({
    reducer:{
        youtubeApp:YoutubeSlice.reducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;