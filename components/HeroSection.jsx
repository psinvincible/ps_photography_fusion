import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <section className='relative h-[80vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden'>

      <h1 className='absolute text-[21vw]  sm:text-[25] md:text-[20] font-extrabold text-white/5 select-none pointer-events-none leading-none'>NATURE</h1>

      <div className='relative z-10'>
        {/* if want gradient in name do add "bg-linear-to-r from-indigo-400 to via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient" */}
      <h1 className='text-1xl sm:text-4xl md:text-6xl font-bold mb-4 '>PS_PHOTOGRAPHY_FUSION</h1>
      <p className='text-gray-400 md:max-w-xl max-w-md text-sm sm:text-base'>Capturing nature, one step closer to her and stories through lens.</p>
      </div>


      <Link href="/explore"
        className='mt-6 inline-block border border-white px-5 py-2 sm:px-6 sm:py-2 rounded-full hover:bg-white hover:text-black transition'
      >Explore My Work</Link>
    </section>
  )
}

export default HeroSection
