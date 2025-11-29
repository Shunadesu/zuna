import { useState, useEffect } from 'react'
import { FiUser, FiMail, FiUpload, FiSave } from 'react-icons/fi'
import useAuthStore from '../../store/authStore'
import api from '../../utils/api'
import ProtectedRoute from '../../components/auth/ProtectedRoute'

const Profile = () => {
  const { user, updateUser, checkAuth } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    website: '',
    location: ''
  })
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.profile?.bio || '',
        website: user.profile?.website || '',
        location: user.profile?.location || ''
      })
      setAvatarPreview(user.profile?.avatar)
    }
  }, [user])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = new FormData()
      
      Object.keys(formData).forEach(key => {
        if (key === 'bio' || key === 'website' || key === 'location') {
          submitData.append(`profile.${key}`, formData[key])
        } else {
          submitData.append(key, formData[key])
        }
      })

      if (avatar) {
        submitData.append('avatar', avatar)
      }

      const response = await api.put('/users/profile/me', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      updateUser(response.data.data)
      await checkAuth()
      
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert(error.response?.data?.error?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
            {/* Avatar */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-tech flex items-center justify-center text-white text-4xl font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <label className="btn-secondary cursor-pointer inline-flex items-center">
                  <FiUpload className="w-5 h-5 mr-2" />
                  Change Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-600 mt-2">
                  JPG, PNG or GIF. Max size 5MB
                </p>
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="input-field"
                placeholder="Tell us about yourself..."
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="input-field"
                placeholder="https://yourwebsite.com"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-field"
                placeholder="City, Country"
              />
            </div>

            {/* VIP Info (Read-only) */}
            {user?.vipLevel && user.vipLevel !== 'none' && (
              <div className="p-4 bg-gradient-tech text-white rounded-lg">
                <p className="font-semibold mb-1">VIP Status</p>
                <p className="text-sm opacity-90">
                  {user.vipLevel.charAt(0).toUpperCase() + user.vipLevel.slice(1)} VIP
                  {user.vipExpiresAt && (
                    <span className="ml-2">
                      (Expires: {new Date(user.vipExpiresAt).toLocaleDateString()})
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Submit */}
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Profile

