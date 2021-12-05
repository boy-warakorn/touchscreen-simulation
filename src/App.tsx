import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gridElement, setGridElement] = useState<Number[]>([]);
  const [excludeCircleList, setExcludeCircleList] = useState<Number[]>([]);
  const [visibleCircleList, setVisibleCircleList] = useState<
    { size: string; index: number }[]
  >([]);
  const [rightMostIndex, setRightMostIndex] = useState<Number[]>([]);
  const gridSize = 576;
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
      if (count >= 552) {
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
                  className={`grid-element ${
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
        <div className="content"></div>
      </div>
    </div>
  );
}

export default App;
