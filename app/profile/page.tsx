'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  email: string;
  image: string;
  bio: string;
  location: string;
  website: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    
    if (session?.user?.email) {
      fetchProfile();
    }
  }, [session, status, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="relative min-h-screen flex flex-col items-center justify-center py-2">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen flex flex-col items-center justify-center py-12">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black" />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          <div className="bg-black/50 backdrop-blur-lg p-8 rounded-2xl border border-gray-800">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-800">
                  {profile?.image ? (
                    <Image
                      src={profile.image}
                      alt={`${profile.name}'s profile`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-900/50 flex items-center justify-center">
                      <span className="text-2xl text-gray-400">{profile?.name?.[0]}</span>
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
                    {profile?.name}
                  </h1>
                  <p className="text-gray-400">{profile?.email}</p>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="group relative flex justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="relative block w-full rounded-lg border-0 bg-gray-900/50 py-3 px-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all duration-200"
                    rows={4}
                    maxLength={500}
                    placeholder="Tell us about yourself"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="relative block w-full rounded-lg border-0 bg-gray-900/50 py-3 px-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all duration-200"
                    placeholder="Where are you based?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.website || ''}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="relative block w-full rounded-lg border-0 bg-gray-900/50 py-3 px-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all duration-200"
                    placeholder="Your website URL"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="group relative flex justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(profile || {});
                    }}
                    className="group relative flex justify-center rounded-lg bg-gray-900/50 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-all duration-200 border border-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {profile?.bio && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-300 mb-2">Bio</h2>
                    <p className="text-gray-400 bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                      {profile.bio}
                    </p>
                  </div>
                )}
                {profile?.location && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-300 mb-2">Location</h2>
                    <p className="text-gray-400 bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                      {profile.location}
                    </p>
                  </div>
                )}
                {profile?.website && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-300 mb-2">Website</h2>
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 bg-gray-900/50 rounded-lg p-4 border border-gray-800 block transition-colors"
                    >
                      {profile.website}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
