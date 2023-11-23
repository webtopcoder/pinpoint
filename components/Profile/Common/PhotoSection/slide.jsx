import React, { useState } from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from "reactstrap";
import { apiBaseUrl } from "@/utils/baseUrl";

const imgurl = `${apiBaseUrl}/avatar/`;
const SlideDark = ({ myallPhotos }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const onExiting = () => {
        setAnimating(true);
    };

    const onExited = () => {
        setAnimating(false);
    };

    const next = () => {
        if (animating) return;
        const nextIndex =
            activeIndex === myallPhotos.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? myallPhotos.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = myallPhotos.map((image) => (
        <CarouselItem onExiting={onExiting} onExited={onExited} key={image.filepath}>
            <img src={imgurl + image?.filepath} alt={image.content} className="d-block img-fluid" />
            {/* <CarouselCaption
                captionText={<p className="photo-caption">{image?.content}</p>}
                // captionHeader={image.content}
                className="carousel-caption d-none d-md-block"
            /> */}
        </CarouselItem>
    ));

    return (
        <React.Fragment>
            <Carousel activeIndex={activeIndex} next={next} previous={previous} dark={true}>
                <CarouselIndicators items={myallPhotos} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}

                {slides?.length > 0 ?
                    <>
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={next} /></> :
                    <p className="p-4 text-center"><i className="bx bx-photo-album font-size-20"></i>{" "}No Photo</p>}

            </Carousel>
        </React.Fragment>
    );
};

export default SlideDark;
