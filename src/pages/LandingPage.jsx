import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import SpecialOffers from '../components/SpecialOffers'
import ExploreStays from '../components/ExploreStays'
import BrowseByType from '../components/BrowseByType'
import Inspiration from '../components/Inspiration'
import AppFooter from '../components/AppFooter'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />
      <HeroBanner />
      <div className="mt-20">
        <SpecialOffers />
      </div>
      <ExploreStays />
      <BrowseByType />
      <Inspiration />
      <AppFooter />
      <Footer />
    </div>
  )
}

export default LandingPage
