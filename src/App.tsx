import React, { useEffect, useState } from "react";
import "./App.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function App() {
  const [gridElement, setGridElement] = useState<Number[]>([]);
  const [excludeCircleList, setExcludeCircleList] = useState<Number[]>([]);
  const [visibleCircleList, setVisibleCircleList] = useState<
    { size: string; index: number }[]
  >([]);
  const [isGridOn, setIsGridOn] = useState<Boolean>(false);
  const [rightMostIndex, setRightMostIndex] = useState<Number[]>([]);
  const gridSize = 432;
  const leftMostIndex = [
    0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336, 360,
    384, 408, 432, 456, 480, 504, 528,
  ];

  useEffect(() => {
    let tempGrid = [];
    let tempExclude = [];
    for (var count = 0; count < gridSize; count++) {
      tempGrid.push(1);
      if (count % 24 === 0) {
        var excludeCircle = count + 23;
        tempExclude.push(excludeCircle);
      }
      if (count >= 408) {
        tempExclude.push(count);
      }
    }

    setRightMostIndex(leftMostIndex.map((value) => value + 22));
    setExcludeCircleList(tempExclude);
    setGridElement(tempGrid);

    // eslint-disable-next-line
  }, []);

  const onHover = (index: number) => {
    const isLeftMost = leftMostIndex.includes(index);
    const isRightMost = rightMostIndex.includes(index);

    // Far Top Line
    const farTopCenterIndex = index - 48;
    let farTopLine: any = [
      farTopCenterIndex - 1,
      farTopCenterIndex,
      farTopCenterIndex + 1,
    ];

    // 48 => 22,46,70
    farTopLine = farTopLine.map((value: number) => ({
      size: "small",
      index: value,
    }));

    // Near Top Line
    const nearTopCenterIndex = index - 24;
    const nearTopLine = [
      !isLeftMost && { index: nearTopCenterIndex - 2, size: "small" },
      { index: nearTopCenterIndex - 1, size: "medium" },
      { index: nearTopCenterIndex, size: "medium" },
      { index: nearTopCenterIndex + 1, size: "medium" },
      !isRightMost && { index: nearTopCenterIndex + 2, size: "small" },
    ];
    // Current Line
    const currentCenterIndex = index;
    const currentCenterLine = [
      !isLeftMost && { index: currentCenterIndex - 2, size: "small" },
      { index: currentCenterIndex - 1, size: "medium" },
      { index: currentCenterIndex, size: "large" },
      { index: currentCenterIndex + 1, size: "medium" },
      !isRightMost && { index: currentCenterIndex + 2, size: "small" },
    ];
    // Near Bottom Line
    const nearBottomIndex = index + 24;
    const nearBottomLine = [
      !isLeftMost && { index: nearBottomIndex - 2, size: "small" },
      { index: nearBottomIndex - 1, size: "medium" },
      { index: nearBottomIndex, size: "medium" },
      { index: nearBottomIndex + 1, size: "medium" },
      !isRightMost && { index: nearBottomIndex + 2, size: "small" },
    ];
    // Far Bottom Line
    const farBottomIndex = index + 48;
    let farBottomLine: any = [
      farBottomIndex - 1,
      farBottomIndex,
      farBottomIndex + 1,
    ];
    farBottomLine = farBottomLine.map((value: number) => ({
      size: "small",
      index: value,
    }));

    const tempCircleIndexList = [
      ...farTopLine,
      ...nearTopLine,
      ...currentCenterLine,
      ...nearBottomLine,
      ...farBottomLine,
    ];

    const circleIndexList = tempCircleIndexList.filter(
      (value) => value.index >= 0
    );

    setVisibleCircleList(circleIndexList);
  };

  const getCircleClassName = (index: number) => {
    const currentCircle = visibleCircleList.filter(
      (ele) => index === ele.index
    );
    const isInclude = currentCircle.length > 0;

    if (isInclude) {
      switch (currentCircle[0].size) {
        case "small": {
          return "circle small-circle";
        }
        case "medium": {
          return "circle medium-circle";
        }
        case "large": {
          return "circle big-circle";
        }

        default:
          break;
      }
    }
    return "circle";
  };

  return (
    <div className="app">
      <div className="phone-container">
        <div className="phone">
          <div className="phone-header">
            <div className="camera"></div>
          </div>
          <div className="phone-content">
            <div className="simulation-grid">
              {gridElement.map((_, index) => (
                <div
                  className={`${!isGridOn ? "no-grid" : ""} grid-element ${
                    index > 23 ? "grid-element-bottom" : ""
                  } ${index % 24 !== 0 ? "grid-element-right" : ""}`}
                >
                  {excludeCircleList.includes(index) ? (
                    <></>
                  ) : (
                    <div
                      id={`circle${index}`}
                      className={getCircleClassName(index)}
                      onPointerEnter={() => onHover(index)}
                      onPointerLeave={() => setVisibleCircleList([])}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="phone-bottom">
            <div className="home-button"></div>
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="content">
          <div className="heading-1">Apple Touch Screen simulation</div>
          <hr className="line" />
          <div className="heading-2">Toolbar</div>
          <div className="tool-bar">
            <FormControlLabel
              control={
                <Switch
                  value={isGridOn}
                  onChange={(event) => setIsGridOn(event.target.checked)}
                />
              }
              label="Show Simulation Grid"
            />
          </div>
          <hr className="line" />
          <div className="heading-2">Touchscreen simulation</div>
          <div className="body-1">
            You can see the cursor mouse as human finger which acts as a touch
            detection in changes of electronic charge particles. And the surface
            of them as the capacitive touchscreen grid which is the screen's
            electrostatic field. So, we are simulating how Apple's touchscreen
            works.
          </div>
          <hr className="line" />
          <div className="heading-2">What is Capacitive Touch Screen?</div>
          <div className="body-1">
            A capacitive touch screen is a control display that uses the
            conductive touch of a human finger or a specialized device for
            input. It consists of an insulator, such as glass, coated with a
            transparent conductor. When a capacitive panel is touched, a small
            amount of charge is drawn to the point of contact, which becomes a
            functional capacitor. The change in the electrostatic field is
            measured to find the location. In some designs, circuits located at
            each corner of the panel measure the charge and send the information
            to the controller for processing. In multi-touch screens, sensors
            are arranged in a grid to enable more complex input.
          </div>
          <hr className="line" />
          <div className="heading-2">How Apple Touch Screen work?</div>
          <div className="body-1">
            The iPhone uses a more elaborate form of capacitive touch screen. A
            grid of electrodes divides its display into an array of hundreds of
            small, separate touch elements. Each of these can be triggered
            independently, enabling the iPhone to sense more than one finger at
            once, and making possible “multi-touch” features, such as pinching
            an image to shrink it. And the glass used for the iPhone screen acts
            as an insulator and is coated with a transparent conductor. Touching
            the surface of the coated glass results in a distortion of the
            body's electrostatic field, measurable as a change in capacitance.
            Using glass and capacitive technology makes the iPhone's touchscreen
            very precise compared with resistive screens but also with other
            types of capacitive screens. The glass panel is also very easy to
            clean and the functionality is not affected by dirt, grease or
            moisture.
          </div>
          <hr className="line" />
          <div className="heading-2">
            Apple Touch Screen vs Normal Touch Screen
          </div>
          <div className="body-1">
            Many systems detect changes along an axis or in a specific direction
            instead of at each point on the screen. Some systems take
            measurements by first establishing a baseline. Unlike Apple
            touchscreen many of the elements of its multi-touch user interface
            require you to touch multiple points on the screen simultaneously.
            For example, you can zoom in to Web pages or pictures by placing
            your thumb and finger on the screen and spreading them apart.
          </div>
          <hr className="line" />
          <div className="heading-2">Benefits?</div>
          <div className="body-1">
            <ol style={{ margin: 0 }}>
              <li>
                It requires less pressure rather than resistive touchscreen.
              </li>
              <li>It supports multi-touch.</li>
              <li>It offers high clarity and resolution.</li>
            </ol>
          </div>
          <hr className="line" />
          <div className="heading-2">Team members</div>
          <div className="body-1">
            <ol style={{ margin: 0 }}>
              <li>Warakorn Chantranupong 61130500226</li>
              <li>Anawat Paothong 61130500231</li>
              <li>Noppanut Boonrueng 61130500241</li>
            </ol>
          </div>
          <hr className="line" />
          <div className="heading-3">
            Ref:
            <ol style={{ margin: 0 }}>
              <li>
                <a href="https://www.rfwireless-world.com/Terminology/Advantages-and-Disadvantages-of-Capacitive-Touch-Screen.html">
                  https://www.rfwireless-world.com/Terminology/Advantages-and-Disadvantages-of-Capacitive-Touch-Screen.html
                </a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Touchscreen">
                  https://en.wikipedia.org/wiki/Touchscreen
                </a>
              </li>
              <li>
                <a href="https://electronics.howstuffworks.com/iphone1.htm">
                  https://electronics.howstuffworks.com/iphone1.htm
                </a>
              </li>
              <li>
                <a href="http://www.en-touch.com/top-4-benefits-of-capacitive-touchscreen-technology/">
                  http://www.en-touch.com/top-4-benefits-of-capacitive-touchscreen-technology/
                </a>
              </li>
              <li>
                <a href="https://www.economist.com/technology-quarterly/2008/09/06/touching-the-future">
                  https://www.economist.com/technology-quarterly/2008/09/06/touching-the-future
                </a>
              </li>
              <li>
                <a href="https://scienceline.org/2012/01/okay-but-how-do-touch-screens-actually-work/">
                  https://scienceline.org/2012/01/okay-but-how-do-touch-screens-actually-work/
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
