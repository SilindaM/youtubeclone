import { getHomePageVideos } from './reducers/getHomePageVideos';
import { CurrentPlaying, RecommendedVideos } from './../types';
import { InitialState } from "../types";
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type } from 'os';
import { getSearchPageVideos } from './reducers/getSearchPageVideos';

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
    reducers:{
        clearVideos:(state)=>{
            state.videos=[];
            state.nextPageToken=null;
        },
        changeSearchTerm:(state,action:PayloadAction<string>)=>{
            state.searchTerm=action.payload;
        },
        clearSearchTerm:(state)=>{
            state.searchTerm="";
        }
     
    },
    extraReducers:(buider=>{
        buider.addCase(getHomePageVideos.fulfilled,(state,action)=>{
            state.videos=action.payload.parseData;
            state.nextPageToken=action.payload.nextPageToken;
        });
        buider.addCase(getSearchPageVideos.fulfilled,(state,action)=>{
            state.videos=action.payload.parseData;
            state.nextPageToken=action.payload.nextPageToken;
        });
    
    }),
});

export const store=configureStore({
    reducer:{
        youtubeApp:YoutubeSlice.reducer,
    },
})
export const{clearVideos,changeSearchTerm,clearSearchTerm} = YoutubeSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;