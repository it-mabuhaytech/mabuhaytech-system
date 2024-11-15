import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BackButton from '../components/ui/backButton'

interface Employee {
  userid: number,
  employeeid: number,
  first_name: string,
  last_name: string,
  age: number,
  email: string,
  role: string,
  department: string,
  hiredDate: string,
}

const ProfilePage = () => {
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // // Check if the user is authenticated by checking localStorage
    const userid = localStorage.getItem('userid');

    // if (!token) {
    //   // If no token exists, redirect to the login page
    //   router.push('/login')
    //   return
    // }

    // Fetch user profile data using the token
    const fetchUserProfile = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch('/api/users/' + userid, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }

        const data: Employee = await response.json()
        setEmployee(data)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (loading) {
    return <div className="text-center p-6">Loading...</div>
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">Error: {error}</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <img 
            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            alt="" 
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
        </div>

        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Employee Profile</h1>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Employee ID:</span>
            <span>{employee?.userid}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Full Name:</span>
            <span>{employee?.first_name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Age:</span>
            <span>{employee?.age}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span>{employee?.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Role:</span>
            <span>{employee?.role}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Department:</span>
            <span>{employee?.department}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Hired Date:</span>
            <span>{employee?.hiredDate}</span>
          </div>
        </div>
        {/* Back Button */}
        <div className="mt-6 mb-4">
          <BackButton />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
