import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import { Dashboard, Schedule, List } from "@material-ui/icons";

import {
  GridItem,
  NavPills,
  //    Button,
} from "../../../../components/components";

const SelectMenuSection = (props) => {
  return (
    <GridItem xs={12} sm={12} md={8} lg={6}>
      <NavPills
        color="primary"
        tabs={[
          {
            tabButton: "Dashboard",
            tabIcon: Dashboard,
            tabContent: (
              <span>
                <p>
                  Collaboratively administrate empowered markets via
                  plug-and-play networks. Dynamically procrastinate B2C users
                  after installed base benefits.
                </p>
                <br />
                <p>
                  Dramatically visualize customer directed convergence without
                  revolutionary ROI. Collaboratively administrate empowered
                  markets via plug-and-play networks. Dynamically procrastinate
                  B2C users after installed base benefits.
                </p>
                <br />
                <p>
                  Dramatically visualize customer directed convergence without
                  revolutionary ROI. Collaboratively administrate empowered
                  markets via plug-and-play networks. Dynamically procrastinate
                  B2C users after installed base benefits.
                </p>
              </span>
            ),
          },
          {
            tabButton: "Schedule",
            tabIcon: Schedule,
            tabContent: (
              <span>
                <p>
                  Efficiently unleash cross-media information without
                  cross-media value. Quickly maximize timely deliverables for
                  real-time schemas.
                </p>
                <br />
                <p>
                  Dramatically maintain clicks-and-mortar solutions without
                  functional solutions. Dramatically visualize customer directed
                  convergence without revolutionary ROI. Collaboratively
                  administrate empowered markets via plug-and-play networks.
                  Dynamically procrastinate B2C users after installed base
                  benefits.
                </p>
              </span>
            ),
          },
          {
            tabButton: "Tasks",
            tabIcon: List,
            tabContent: (
              <span>
                <p>
                  Collaboratively administrate empowered markets via
                  plug-and-play networks. Dynamically procrastinate B2C users
                  after installed base benefits.
                </p>
                <br />
                <p>
                  Dramatically visualize customer directed convergence without
                  revolutionary ROI. Collaboratively administrate empowered
                  markets via plug-and-play networks. Dynamically procrastinate
                  B2C users after installed base benefits.
                </p>
                <br />
                <p>
                  Dramatically visualize customer directed convergence without
                  revolutionary ROI. Collaboratively administrate empowered
                  markets via plug-and-play networks. Dynamically procrastinate
                  B2C users after installed base benefits.
                </p>
              </span>
            ),
          },
        ]}
      />
    </GridItem>
  );
};

SelectMenuSection.propTypes = {
  children: PropTypes.node,
};

export default SelectMenuSection;
