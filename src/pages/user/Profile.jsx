import { useState, useEffect } from 'react'
import { FiUser, FiMail, FiUpload, FiSave, FiMapPin, FiGlobe, FiEdit3 } from 'react-icons/fi'
import { motion } from 'framer-motion'
import useAuthStore from '../../store/authStore'
import api from '../../utils/api'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import GlassCard from '../../components/ui/GlassCard'
import SEO from '../../components/seo/SEO'

const Profile = () => {
  const { user, updateUser, checkAuth } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
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
    // Simulate data loading
    const timer = setTimeout(() => setDataLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

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

      const response = await api.put('/client/users/profile/me', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      updateUser(response.data.data)
      await checkAuth()
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <SEO
        title="Hồ Sơ Của Tôi - Quản Lý Tài Khoản"
        description="Quản lý hồ sơ cá nhân, cập nhật thông tin và cài đặt tài khoản của bạn."
        url="https://zuna.media/profile"
      />
      
      <div className="min-h-screen bg-black text-white relative">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10 pt-20 pb-12">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Hồ Sơ Của Tôi</h1>
            <p className="text-white/50 text-sm">Quản lý thông tin cá nhân của bạn</p>
          </div>

          {dataLoading ? (
            <div className="space-y-6">
              {/* Avatar Skeleton */}
              <GlassCard className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-white/10 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-white/10 rounded animate-pulse w-32" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-48" />
                  </div>
                </div>
              </GlassCard>

              {/* Form Skeleton */}
              <GlassCard className="p-6 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 bg-white/10 rounded animate-pulse w-24" />
                    <div className="h-11 bg-white/5 rounded-xl animate-pulse" />
                  </div>
                ))}
                <div className="h-12 bg-white/10 rounded-full animate-pulse mt-6" />
              </GlassCard>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              {/* Avatar Card */}
              <GlassCard className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="relative">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar"
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-2 ring-white/20"
                      />
                    ) : (
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-500 to-pink-500 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                        {user?.username?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 p-1.5 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full cursor-pointer hover:scale-110 transition-transform">
                      <FiUpload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-lg font-semibold">{user?.username}</h2>
                    <p className="text-white/50 text-sm">{user?.email}</p>
                    {user?.vipLevel && user.vipLevel !== 'none' && (
                      <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500 to-pink-500 text-white">
                        VIP {user.vipLevel.charAt(0).toUpperCase() + user.vipLevel.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>

              {/* Form */}
              <GlassCard className="p-4 md:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  {/* Username */}
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wide">
                      Tên Người Dùng
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                      <input
                        type="text"
                        required
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wide">
                      Email
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wide">
                      Giới Thiệu
                    </label>
                    <textarea
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/5 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all resize-none font-sans"
                      placeholder="Chia sẻ về bạn..."
                      maxLength={500}
                    />
                    <p className="text-xs text-white/30 mt-1 text-right">
                      {formData.bio.length}/500
                    </p>
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wide">
                      Website
                    </label>
                    <div className="relative">
                      <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-sans"
                        placeholder="https://website.com"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2 uppercase tracking-wide">
                      Địa Điểm
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all font-sans"
                        placeholder="Thành Phố, Quốc Gia"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-full font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
                        boxShadow: '0 0 30px -5px rgba(139, 92, 246, 0.4)'
                      }}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                          <span>Đang lưu...</span>
                        </>
                      ) : (
                        <>
                          <FiSave className="w-4 h-4" />
                          <span>Lưu Thay Đổi</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Profile
