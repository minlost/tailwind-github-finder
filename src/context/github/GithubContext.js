import { createContext, useReducer } from 'react'
import { createRenderer } from 'react-dom/test-utils'
import { useResolvedPath } from 'react-router-dom'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_API_URL 
const GITHUB_TOKEN = process.env.REACT_APP_GITHUBTOKEN


export const GithubProvider = ({ children }) => {

   const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
}

    const [state, dispatch] = useReducer(githubReducer, initialState)



const searchUsers = async (text) => {
    setLoading()
    const params = new URLSearchParams({
        q: text
    })
    const response = await fetch (`${GITHUB_URL}/search/users?${params}`,{
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
                 }
            })
    const { items } = await response.json()
    dispatch({
        type: 'GET_USERS',
        payload: items,
    })

}




const getUser = async (login) => {
    setLoading()
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`
             }
        })
if(response.status === 404) {
    window.location = '/notfound'
} else {
    const data = await response.json()

    dispatch({
        type: 'GET_USER',
        payload: data,
        })
    }
}

const getUserRepos = async (login) => {
    setLoading()

    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const response = await fetch (`${GITHUB_URL}/users/${login}/repos?${params}`,{
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
                 }
            })
    const data = await response.json()
    dispatch({
        type: 'GET_REPOS',
        payload: data,
    })

}



const setLoading = () => dispatch({type: 'SET_LOADING'})

const setClear = () => dispatch({type: 'SET_CLEAR'})



return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    user: state.user,
    repos: state.repos,
    searchUsers,
    setClear,
    getUser,
    getUserRepos
    

}}>
    {children}
    </GithubContext.Provider>

}

export default GithubContext