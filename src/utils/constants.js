export const API_OPTIONS = {

    method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  }


}

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500"

export const BG_URL =
     'https://assets.nflxext.com/ffe/siteui/vlv3/0b0dad79-ad4d-42b7-b779-8518da389976/web/IN-en-20250908-TRIFECTA-perspective_0647b106-80e1-4d25-9649-63099752b49a_large.jpg'

export const SUPPORTED_LANGUAGES =[
  {identifier :"en" , name : "English"},
  {identifier :"hindi" , name : "Hindi"},
  {identifier :"arabic" , name : "Arabic"}
]     

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY

