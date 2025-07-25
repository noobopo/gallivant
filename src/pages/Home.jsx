import PriceMap from '../components/Bestplace'
import Feature from '../components/Feature'
import FollowInstagram from '../components/FollowInstagram '
import Hero from '../components/Hero'
import LatestBlog from '../components/LatestBlog'
import Video from '../components/Video'

const Home = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <Video />
      <LatestBlog />
      <PriceMap />
      <FollowInstagram />
    </div>
  )
}

export default Home