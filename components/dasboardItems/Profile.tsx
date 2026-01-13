'use client'

import { useEffect, useState } from 'react'
import LoadingSpinner from '../wayhouse/Loading'
import { useRouter } from 'next/navigation'

type UserProfile = {
  firstName: string
  lastName: string
  userName: string
  email: string
  phone: string
  country: string
  refer?: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')

        if (!token || !userId) {
          setLoading(false)
          router.push('/signup')
          return
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!res.ok) {
          setProfile(null)
          router.push('/signup')
          return
        }

        const data = await res.json()
        setProfile(data)
      } catch (err) {
        console.error('Error fetching profile:', err)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const getInitials = (firstName: string, lastName: string) => {
    if (!firstName && !lastName) return 'U'
    return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()
  }

  if (loading) return <LoadingSpinner />
  if (!profile) return <p className="p-4 text-red-500">Could not load profile</p>

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-80">
      <h1 className="text-sm md:text-lg font-bold text-white">
        profile Details
      </h1>

      {/* Avatar Circle */}
      <div className="flex justify-center md:w-[600px]">
        <div className="w-24 h-24 rounded-full bg-(--color2) border text-white flex items-center justify-center text-3xl font-bold shadow-md">
          {getInitials(profile.firstName, profile.lastName)}
        </div>
      </div>

      {/* User Details */}
      <div className="bg-(--color4) space-y-7 p-6 rounded-xl text-sm shadow-sm border-b-(--color3) text-white md:w-[650px]">
        <div className="flex items-center justify-between border-b p-2 border-b-(--color3) rounded w-[250px] md:w-[600px]">
          <span className="block font-semibold text-xs text-gray-300">
            First Name
          </span>
          <p className="font-semibold  text-(--color3) md:text-lg text-xs">
            {profile.firstName} 
          </p>
        </div>

        <div className="flex items-center justify-between border-b border-b-(--color3) p-2 rounded w-[250px] md:w-[600px]">
          <span className="block text-xs text-gray-300">Last name</span>
          <p className="font-semibold text-(--color3) md:text-lg text-xs ">{profile.lastName}</p>
        </div>

        <div className="flex items-center justify-between border-b border-b-(--color3) p-2 rounded w-[250px] md:w-[600px]">
          <span className="block text-xs text-gray-300">Email</span>
          <p className="font-semibold md:text-lg text-xs text-(--color3) ">{profile.email}</p>
        </div>

        <div className="flex items-center justify-between border-b p-2 rounded w-[250px] border-b-(--color3) md:w-[600px]">
          <span className="block text-xs text-gray-300">Country</span>
          <p className="font-semibold md:text-lg text-xs text-(--color3)">{profile.country}</p>
        </div>

        {profile.refer && (
          <div className="flex items-center justify-between border-b p-2 border-b-(--color3) rounded w-[250px] md:w-[600px]">
            <span className="block text-xs text-gray-300">Referral Code</span>
            <p className="font-semibold md:text-lg text-xs text-(--color3)">{profile.refer}</p>
          </div>
        )}
      </div>
    </div>
  )
}
