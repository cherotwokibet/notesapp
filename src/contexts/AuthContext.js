
import React,{createContext,useContext,useEffect,useState} from 'react'
import app from '../firebase'
import { 
    getAuth,
    signOut, 
    createUserWithEmailAndPassword 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const AuthContext = createContext()

const auth = getAuth(app);
const db = getFirestore(app);

export function useAuth () {
    return useContext(AuthContext)
}


export default function AuthProvider({children}) {

    const [currentUser,setCurrentUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState()

    //sign up

    async function signup (email,password) {
        console.log(email)
        return  await createUserWithEmailAndPassword(auth,email, password)
    }

    //log out

    function logout () {
        signOut(auth).then(()=>{
            setCurrentUser(null)
        }).catch((err) => {
            setError('Unable to SignOut')
        })
    }
    


    //authentication state observer and get user data


    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])


    const value = {
        currentUser,
        signup,
        auth,
        logout,
        error,
        db
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
