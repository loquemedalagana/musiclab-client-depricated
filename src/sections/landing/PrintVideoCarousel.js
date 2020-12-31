import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@material-ui/core";
import Slider from "react-slick";

import { GridItem, Card } from "../../components/components";

import { settings } from "./carouselSetting";

const CarouselElement = (props) => {
  const { data } = props;
  const { title, thumbnail, videoId } = data;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  return (
    <a href={videoUrl} target="_blank" rel="noopener noreferrer">
      <Tooltip arrow title={title}>
        <img src={thumbnail} alt={title} className="slick-image" />
      </Tooltip>
    </a>
  );
};

CarouselElement.propTypes = {
  data: PropTypes.object,
};

const PrintVideoCarousel = (props) => {
  const { resultData } = props;
  return (
    <GridItem xs={12} sm={12} md={11}>
      <Card carousel>
        <Slider {...settings}>
          {resultData.map((item, key) => (
            <CarouselElement key={key} data={item} />
          ))}
        </Slider>
      </Card>
    </GridItem>
  );
};

PrintVideoCarousel.propTypes = {
  resultData: PropTypes.array,
};

export default React.memo(PrintVideoCarousel);
