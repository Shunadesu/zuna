import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Video, CheckCircle, ChevronLeft, ChevronRight, User, Mail, Phone } from 'lucide-react'
import api from '../../utils/api'
import Logo from '../../components/layout/Logo'

const TIME_SLOTS = ['09:00', '13:00', '20:00']
const AVAILABLE_DAYS = [1, 2, 3, 4, 5]

const BookCall = () => {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [callType, setCallType] = useState('video')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: ''
  })

  useEffect(() => {
    if (selectedDate && selectedTime && step === 1) {
      setTimeout(() => setStep(2), 300)
    }
  }, [selectedDate, selectedTime, step])

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startingDay = firstDay.getDay()
    const days = []
    for (let i = 0; i < startingDay; i++) days.push(null)
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const isDateAvailable = (date) => {
    if (!date) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date > today && AVAILABLE_DAYS.includes(date.getDay())
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    const today = new Date()
    const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1)
    if (currentMonth > nextMonthDate) {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    
    setIsSubmitting(true)
    setError('')
    try {
      await api.post('/bookings', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        callType,
        preferredDate: selectedDate.toISOString(),
        timeSlot: selectedTime,
        duration: 30,
        topic: formData.topic
      })
      setIsSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Đặt Lịch Thành Công!</h2>
          <p className="text-white/60 text-sm">
            Cảm ơn {formData.name}, chúng tôi sẽ liên hệ xác nhận qua email <span className="text-cyan-400">{formData.email}</span>.
          </p>
          <p className="text-white/40 text-xs mt-3">
            {callType === 'video' ? 'Video Call' : 'Gặp trực tiếp'} • {selectedDate?.toLocaleDateString('vi-VN')} lúc {selectedTime}
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Book a Call</h1>
          <p className="text-white/50 text-sm">Đặt lịch tư vấn 30 phút với Zuna</p>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          {/* Step Indicator */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setStep(1)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                step === 1 ? 'text-white border-b-2 border-cyan-500' : 'text-white/50 hover:text-white/70'
              }`}
            >
              1. Chọn ngày & giờ
            </button>
            <button
              onClick={() => selectedDate && selectedTime && setStep(2)}
              disabled={!selectedDate || !selectedTime}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                step === 2 ? 'text-white border-b-2 border-cyan-500' : 'text-white/50'
              } ${!selectedDate || !selectedTime ? 'opacity-40 cursor-not-allowed' : 'hover:text-white/70 cursor-pointer'}`}
            >
              2. Thông tin
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-4"
              >
                {/* Column 1: Info Zuna */}
                <div className="p-6 border-r border-white/10 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Logo size="w-8 h-8" />
                  </div>
                  <span className="text-white/50 text-sm">Book a Call</span>
                  <h3 className="text-sm font-semibold text-white mb-1">Introduction</h3>

                  <div className="mt-auto space-y-2">
                    <button
                      onClick={() => setCallType('video')}
                      className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                        callType === 'video'
                          ? 'bg-cyan-500 text-white'
                          : 'bg-white/5 hover:bg-white/10 text-white/60'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span>Video Call</span>
                    </button>
                    <button
                      onClick={() => setCallType('inperson')}
                      className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                        callType === 'inperson'
                          ? 'bg-cyan-500 text-white'
                          : 'bg-white/5 hover:bg-white/10 text-white/60'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Tại TPHCM</span>
                    </button>
                  </div>
                </div>

                {/* Column 2-3: Calendar */}
                <div className="col-span-2 p-6 border-r border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <ChevronLeft className="w-4 h-4 text-white/70" />
                    </button>
                    <span className="text-sm font-semibold text-white capitalize">
                      {currentMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                    </span>
                    <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4 text-white/70" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center mb-1">
                    {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
                      <div key={d} className="text-[10px] text-white/40 py-2 font-medium uppercase">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonth).map((date, i) => (
                      <button
                        key={i}
                        onClick={() => date && isDateAvailable(date) && setSelectedDate(date)}
                        className={`aspect-square rounded-lg flex items-center justify-center text-xs transition-all relative ${
                          !date ? '' :
                          selectedDate?.toDateString() === date.toDateString()
                            ? 'bg-cyan-500 text-white'
                            : isDateAvailable(date)
                              ? 'hover:bg-white/10 text-white cursor-pointer'
                              : 'text-white/20 cursor-not-allowed'
                        }`}
                      >
                        {date?.getDate()}
                        {date && date.toDateString() === new Date().toDateString() && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column 4: Time Slots */}
                <div className="p-6 bg-white/5 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-white">Khung giờ</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {TIME_SLOTS.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all text-center ${
                          selectedTime === time
                            ? 'bg-cyan-500 text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white/80'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  {selectedDate && (
                    <div className="mt-4 text-xs text-cyan-400 text-center">
                      {selectedDate.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <div className="mt-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <div className="text-xs text-cyan-400 mb-1">Đã chọn</div>
                      <div className="text-white text-sm">
                        {selectedDate.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'short' })} lúc {selectedTime}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-2"
              >
                {/* Column 1: Info Zuna */}
                <div className="p-6 border-r border-white/10 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Logo size="w-8 h-8" />
                  </div>
                  <span className="text-white/50 text-sm">Book a Call</span>
                  <h3 className="text-lg font-semibold text-white mb-1">Introduction</h3>

                  <div className={`px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-2 w-fit ${
                    callType === 'video' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {callType === 'video' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                    {callType === 'video' ? 'Video Call' : 'Tại TPHCM'}
                  </div>

                  <div className="mt-auto space-y-3">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-white/40 mb-2">Lịch đã chọn</div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span className="text-white">{selectedDate?.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-white">{selectedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Form */}
                <div className="p-6 bg-white/5">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-sm text-white/60 mb-2">Thông tin của bạn</div>
                    
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="Họ và tên *"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                    </div>
                    
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="Email *"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                    </div>
                    
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="Số điện thoại *"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        value={formData.topic}
                        onChange={e => setFormData({...formData, topic: e.target.value})}
                        placeholder="Chủ đề muốn tư vấn"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                    </div>

                    {error && <div className="text-red-400 text-xs text-center">{error}</div>}

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 rounded-xl border border-white/20 text-white/70 text-sm font-medium hover:bg-white/5 transition-colors"
                      >
                        Quay lại
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isSubmitting ? 'Đang gửi...' : 'Xác nhận đặt lịch'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default BookCall
