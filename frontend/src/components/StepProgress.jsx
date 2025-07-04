import React from 'react'
import { shimmerStyle } from '../assets/dummystyle'
import { Check } from 'react-feather'



const StepProgress = ({Progress}) => {
  return (
    <>
        <style>{shimmerStyle}</style>
        <div className='relative w-full h-4 bg-white/5 backdrop-blur-2xl overflow-hidden rounded-full border border-white/10'>
            <div className='absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500 animate-pulse'>
                <div className='relative h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-600 animate-flow bg-{length:200%_100%} transition-all duration-700 ease-out rounded-full overflow-hidden animate-pulse-grow'
                style={{width: `${Progress}%`}}>
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer'>
                        <div className='absolute inset-0 opacity-80'>
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className='absolute top-1/2 w-2 h-2 bg-white rounded-full animate-bubble shadow-lg'
                                style={{left: `${(i+1)*12}%`, animationDelay: `${i*0.25}s`}}
                                transform='translateY(-50%)'    
                                ></div>
                            ))}
                        </div>

                        {/* Particle Effects */}
                        <div className='absolute inset-0'>
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className='absolute top-1/2 w-2 h-2 bg-white rounded-full animate-bubble shadow-lg'
                                style={{left: `${(Math.random() * 100)}%`, top: `${(Math.random() * 100)}%`, animationDelay: `${i*0.25}s`}}
                                  
                                ></div>
                            ))}
                        </div>
                    </div>
                    {Progress>0 &&(
                        <div className='absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/60 to-white/30 blur-sm'
                            style={{left: `${Math.max(0, Progress - 4)}%`}}
                        ></div>
                    )}
                </div>

                <div className='flex justify-between items-center mt-3'>
                    <div className='text-xs font-bold text-white/60'>
                        {Progress<25? "Getting Started": Progress<50? "Making Progress": Progress<75? "Almost There": "Nearly Completed"}
                    </div>
                    <div className='flex items-center gap-2'>
                        {Progress===100 && (
                            <div className='w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center'>
                                <Check size={12} className='text-white' />
                                </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default StepProgress
