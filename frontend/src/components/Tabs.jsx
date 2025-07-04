import React from 'react'

const Tabs = ({tabs, activeTab, setActiveTab}) => {
  return (
    <div className='lw-full my-2'>
        <div className='flex flex-wrap bg-violet-50 p-1 rounded-2xl border border-violet-100'>
            {tabs.map((tab) => (
                <button key={tab.label}
                    className={`relative flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all
                        ${activeTab === tab.label ? "bg-white text-violet-700 shadow-lg" 
                            : "text-slate-600 hover:bg-violet-50hover:text-violet-700"
                        }`}
                        onClick={() => setActiveTab(tab.label)}>
                            <span className='relative z-10'>
                                {tab.label}
                                {activeTab === tab.label && (
                                    <span className='absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full'></span>
                                )}
                                </span>

                                    
                        </button>
            ))}
        </div>
      
    </div>
  )
}

export default Tabs
