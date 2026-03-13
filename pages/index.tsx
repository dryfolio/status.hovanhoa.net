import type { NextPage } from 'next'
import Image from 'next/image'
import IncidentsSection from "../src/incidents"
import ServicesSection from "../src/services"

const Home: NextPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'hovanhoa | status',
            url: 'https://status.hovanhoa.net',
            description: 'Hồ Văn Hòa - Status page for hovanhoa services. Monitor uptime and service availability.',
            author: {
              '@type': 'Person',
              name: 'Hồ Văn Hòa',
              alternateName: 'hovanhoa',
              jobTitle: 'Software Engineer',
            },
          }),
        }}
      />
    <div className='h-full w-full '>
      <div className="mt-20 absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="w-full h-40 absolute bg-light-purple dark:purple dark:bg-black">
        <div className="sm:ml-0 ml-5 mr-0 mt-10 md:pl-80 md:pr-80 sm:w-full h-full bg-purple-500 dark:bg-black flex">
          <a href="https://hovanhoa.net" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
            <h1 className="text-white text-2xl font-bold">hovanhoa</h1>
          </a>
        </div>
      </div>
      <div className='mt-20 w-full absolute overflow-scroll	'>
        <ServicesSection />
      </div >
    </div>
    </>
  )
}

export default Home;
