import { useSelector } from "react-redux"
import { selectUser } from "../redux/user/userSlice"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../../firebase"


const Profile = () => {

    const { currentUser } = useSelector(selectUser)
    const fileRef = useRef(null)
    const [ file, setFile ] = useState(undefined)
    const [ fileProgress, setFileProgress ] = useState(0)
    const [ fileError, setFileError ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ formData, setFormData ] = useState({})

    useEffect(() => {
        if (file){
            handleFileUpload(file)
        }
    },[file])

    console.log(fileProgress)

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
        (error) => {
            setErrorMessage(error.message)
            setFileError(true);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL)
                setFormData({ ...formData, avatar: downloadURL })
            })
        })
    }

    console.log(errorMessage)

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4">
                <input type="file" onChange={(e) => setFile(e.target.files[0])} name="" id="" ref={fileRef} hidden accept="image/*"/>
                <img onClick={() => fileRef.current.click()} src={formData?.avatar ? formData?.avatar : currentUser?.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
                <p className="text-center text-sm">
                    {fileError ? <span className="text-red-700">Error Image Upload</span> : (fileProgress > 0 && fileProgress < 100) ? <span className="text-green-700">Uploading ${fileProgress}%</span> : fileProgress === 100 ? <span className="text-green-700">Image Successfully uploaded</span> : null}
                </p>
                <input 
                    type="text" 
                    placeholder="Username"
                    className="border p-3 rounded-lg"
                    id="username"
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    className="border p-3 rounded-lg"
                    id="password"
                />
                <input 
                    type="email" 
                    placeholder="Email"
                    className="border p-3 rounded-lg"
                    id="email"
                />
                <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95">Update</button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">Delete Account</span>
                <span className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
        </div>
    )
}

export default Profile