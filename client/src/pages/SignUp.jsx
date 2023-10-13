import { Link } from 'react-router-dom'

const SignUp = () => {
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h2 className="text-3xl text-center font-semibold my-7">Sign Up</h2>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Username" className="border p-3 rounded-lg" id="username"/>
                <input type="email" placeholder="Email" className="border p-3 rounded-lg" id="email"/>
                <input type="password" placeholder="Password" className="border p-3 rounded-lg" id="password"/>
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign Up</button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to='/sign-in'><span className='text-blue-700 hover:underline'>Sign in</span></Link>
            </div>
        </div>
    )
}

export default SignUp