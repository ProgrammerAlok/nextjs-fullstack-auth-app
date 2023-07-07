export default function UserProfile({params}: any) {
    return (
        <div 
            className="flex flex-col items-center justify-center min-h-screen py-2" 
        >
            <h1>User Profile</h1>
            <hr />

            <p
                className="text-4xl"
            > User Profile <strong className="text-white bg-orange-600 rounded-lg p-3" > {params.id} </strong> </p>

            
        </div>
    )
};
