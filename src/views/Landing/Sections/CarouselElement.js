import React from 'react';
import { Tooltip } from "@material-ui/core"

const CarouselElement = props => {
    const {
        data,
    } = props;
    const {
        title,
        thumbnail,
        videoId
    } = data;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return (        
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
            <Tooltip arrow title={title}>
                <img src={thumbnail} alt={title} className="slick-image" />
            </Tooltip>      
        </a>
    )
}

export default React.memo(CarouselElement)
