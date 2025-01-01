export const CurrentPlan = () => {
  return (
    <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-rose-400/20 via-purple-400/20 to-blue-400/20 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-gray-400 mb-2">CURRENT PLAN</div>
          <h2 className="text-3xl font-bold mb-4">Standard</h2>
          <div className="text-gray-300">
            API Limit: <span className="text-white">1,000 Requests</span>
          </div>
        </div>
        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-200">
          Manage Plan
        </button>
      </div>
    </div>
  )
} 