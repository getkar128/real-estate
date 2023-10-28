import { useDispatch, useSelector } from "react-redux"
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, selectUser, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../../firebase"


const Profile = () => {

    const { currentUser, loading, error } = useSelector(selectUser)
    const fileRef = useRef(null)
    const [ file, setFile ] = useState(undefined)
    const [ fileProgress, setFileProgress ] = useState(0)
    const [ fileError, setFileError ] = useState(false)
    const [ formData, setFormData ] = useState({})
    const [ updateSuccess, setUpdateSuccess ] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (file){
            handleFileUpload(file)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[file])

    const handleFileUpload = (file) => {

        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
            setFileProgress(Math.round(progress))
        },
        // eslint-disable-next-line no-unused-vars
        (error) => {
            setFileError(true);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL)
                setFormData({ ...formData, avatar: downloadURL })
            })
        })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            dispatch(updateUserStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success === false) {
                dispatch(updateUserFailure(data.message))
                return
            }
            dispatch(updateUserSuccess())
            setUpdateSuccess(true)
        } catch (error) {
            dispatch(updateUserFailure(error.message))
        }
    }

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message))
                return
            }
            dispatch(deleteUserSuccess())
        }catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }

    const handleSignOut = async () => {
        dispatch(signOutUserStart())
        try {
            const res = await fetch('/api/auth/signout')
            const data = await res.json()
            if (data.success === false){
                return
            }
            dispatch(signOutUserSuccess())
        } catch (error) {
            dispatch(signOutUserFailure(error))
        }
    }

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} name="" id="" ref={fileRef} hidden accept="image/*"/>
                <img onClick={() => fileRef.current.click()} src={formData?.avatar ? formData?.avatar : currentUser?.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
                <p className="text-center text-sm">
                    {fileError ? <span className="text-red-700">Error Image Upload</span> : (fileProgress > 0 && fileProgress < 100) ? <span className="text-green-700">Uploading ${fileProgress}%</span> : fileProgress === 100 ? <span className="text-green-700">Image Successfully uploaded</span> : null}
                </p>
                <input 
                    type="text" 
                    placeholder="Username"
                    defaultValue={currentUser.username}
                    className="border p-3 rounded-lg"
                    id="username"
                    onChange={handleChange}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                <input 
                    type="email" 
                    placeholder="Email"
                    defaultValue={currentUser.email}
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />
                <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95">{loading ? "Loading..." : "Update" }</button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>Delete Account</span>
                <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>Sign Out</span>
            </div>
            <p className="text-red-700">{error ? error : null}</p>
            <p className="text-green-700 mt-5">{updateSuccess ? "User is updated successfully" : null}</p>
        </div>
    )
}

export default Profile