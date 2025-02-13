import React from 'react'

const Carousel = () => {
  return (
    <div>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/Images/wallpaperflare.com_wallpaper(10).jpg" className="d-block w-75 mx-auto " alt="TaxiDriver"/>
    </div>
    <div className="carousel-item">
      <img src="/Images/wallpaperflare.com_wallpaper(8).jpg" className="d-block w-75 mx-auto " alt="Oppenhiemer"/>
    </div>
    <div className="carousel-item">
      <img src="/Images/wallpaperflare.com_wallpaper(7).jpg" className="d-block w-75 mx-auto " alt="Oppenhiemer"/>
    </div>
    <div className="carousel-item">
      <img src="/Images/wallpaperflare.com_wallpaper(9).jpg" className="d-block w-75 mx-auto" alt="Doctor Strange"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default Carousel