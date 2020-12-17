import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import randomColor from "randomcolor";

import {
  GridContainer,
  GridItem,
  //CircularLoading,
} from "../../../../../components/components";

import {
  //test code
  SampleTagList,
} from "../../../../../app/data/yada/InhyukSampleVideoList";

import compositionImg from "../../../../../assets/images/TagImages/composition.jpg";
import guitarImg from "../../../../../assets/images/TagImages/guitar.jpg";
import bandImg from "../../../../../assets/images/TagImages/jeoninhyukband.jpg";
import yadaImg from "../../../../../assets/images/TagImages/yada.jpg";
import vocalImg from "../../../../../assets/images/TagImages/vocal.jpg";
import drumImg from "../../../../../assets/images/TagImages/drum.jpg";

//https://gist.github.com/muZk/cdc402c973c2c1e3918f81c392be5c66

const tagImgHashmap = {
  vocal: vocalImg,
  drum: drumImg,
  guitar: guitarImg,
  jeoninhyukband: bandImg,
  yada: yadaImg,
  composition: compositionImg,
};

const isExistThumbnailImage = (tagName) => {
  switch (tagName) {
    case "vocal":
    case "drum":
    case "guitar":
    case "composition":
    case "yada":
    case "jeoninhyukband":
      return true;
    default:
      return false;
  }
};

const PrintTag = (props) => {
  const {
    tagInfo,
    thumbnailListImageClasses,
    //index,
  } = props;

  const { tagName } = tagInfo;

  if (isExistThumbnailImage(tagName)) {
    return (
      <img
        alt={tagName}
        src={tagImgHashmap[tagName]}
        className={thumbnailListImageClasses}
      />
    );
  } else {
    const tagColors = randomColor({ luminosity: "dark", count: 1 });
    console.log(tagColors);
    return (
      <div
        className={thumbnailListImageClasses}
        style={{
          background: tagColors[0],
          minWidth: "100%",
          minHeight: "30%",
          overflow: "hidden",
        }}
      ></div>
    );
  }
};

export const UserTags = (props) => {
  const {
    classes,
    //    userId,
  } = props;

  SampleTagList.forEach((e) => console.log(e));

  const thumbnailListImageClasses = classNames(
    classes.imgRounded,
    classes.imgGallery
  );

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={4}>
        {SampleTagList.slice(0, Math.ceil(SampleTagList.length / 2)).map(
          (tagInfo, idx) => (
            <PrintTag
              key={idx}
              thumbnailListImageClasses={thumbnailListImageClasses}
              tagInfo={tagInfo}
              index={idx}
            />
          )
        )}
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        {SampleTagList.slice(
          Math.ceil(SampleTagList.length / 2),
          SampleTagList.length
        ).map((tagInfo, idx) => (
          <PrintTag
            key={idx}
            thumbnailListImageClasses={thumbnailListImageClasses}
            tagInfo={tagInfo}
            index={idx}
          />
        ))}
      </GridItem>
    </GridContainer>
  );
};

UserTags.propTypes = {
  props: PropTypes.object,
  userId: PropTypes.string,
  classes: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserTags);

//https://www.npmjs.com/package/randomcolor
//https://randomcolor.lllllllllllllllll.com/
