const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
      <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
      <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
    </div>
  )
}

export default ScrollIndicator

