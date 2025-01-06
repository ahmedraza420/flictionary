/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card1 from "./Card1";

var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToScroll: 5,
    slidesToShow: 5,
    responsive: [
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
    ]

  };


export default function Slider1(props) {
  const currentSlidesToShow = props.slidesCount || settings.slidesToShow;
  
  if (props.slidesCount) {
    settings.slidesToShow = props.slidesCount;
  }
  if (props.slidesToScroll) {
    settings.slidesToScroll = props.slidesToScroll;
  }

    return (
        <div className="py-4">
            <Slider {...settings}>
                {props.data && props.data.length > 0 ?
                (props.data?.map((item) => (
                   <Card1 key={item.id} {...item} type={props.type}/>
                )))
                :
                (
                    // Render skeleton cards for the number of slides visible
                    Array.from({ length: currentSlidesToShow }).map((_, index) => (
                      <div key={index} className="p-2">
                        <div className="h-32 sm:h-60 md:h-72 w-full rounded-lg overflow-hidden bg-gray-800">
                          <div className="h-32 sm:h-60 md:h-72 w-full rounded-lg overflow-hidden bg-gray-400 animate-pulse"></div>
                        </div>
                      </div>
                    )))
              }
            </Slider>
        </div>
    )
}