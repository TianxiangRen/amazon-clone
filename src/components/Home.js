import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
  return (
    <div className='home'>
        <div className="home__container">
            <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="Alex Ads"/>
            
            <div className="home__row">
                <Product 
                id={1}
                title="DOQAUS Wireless Headphones, [52 Hrs Playtime] Bluetooth Headphones with 3 EQ Modes, Hi-Fi Stereo Over Ear Headphones with Microphone and Comfortable Earpads for iPhone/TV/Travel/Office (Shadow Gray)" 
                price={299.99} 
                image="https://m.media-amazon.com/images/I/71udTVDbgmL._AC_UL320_.jpg" 
                rating={5}/>
                <Product 
                id={2}
                title="zihnic Bluetooth Headphones Over Ear, Foldable Wireless and Wired Stereo Headset Micro SD/TF, FM for iPhone/Samsung/iPad/PC/TV,Soft Earmuffs &Light Weight for Prolonged Wearing (Gold)" 
                price={369.99} 
                image="https://m.media-amazon.com/images/I/51eAhFCg5mL._AC_UL320_.jpg" 
                rating={3}/>

            </div>
                
            <div className="home__row">
                <Product 
                id={3}
                title="Xbox Wireless Controller – Carbon Black for Xbox Series X|S, Xbox One, and Windows 10 Devices"
                price={74.96} 
                image="https://m.media-amazon.com/images/I/61z3GQgEPZL._AC_UL320_.jpg"
                rating={5}/>
                <Product 
                id={4}
                title="Microsoft Xbox Wireless Controller, Pulse Red - Xbox" 
                price={73.99} 
                image="https://m.media-amazon.com/images/I/51z1NgSEjgL._AC_UL320_.jpg" 
                rating={5}/>
                <Product 
                id={5}
                title="Xbox Wireless Controller – Robot White for Xbox Series X|S, Xbox One, and Windows 10 Devices" 
                price={74.92} 
                image="https://m.media-amazon.com/images/I/51ZAuEzDCGL._AC_UL320_.jpg" 
                rating={5}/>
            </div>

            <div className="home__row">
                <Product 
                id={6}
                title="LG UltraWide 49WL95C-WE 49 Inch 32:9 Dual WQHD 5ms 60Hz IPS Curved Wide Monitor, Black" 
                price={1077.15} 
                image="https://m.media-amazon.com/images/I/717V3tRw7+L._AC_SX569_.jpg" 
                rating={4}/>
            </div>
        </div>        
    </div>
  )
}

export default Home