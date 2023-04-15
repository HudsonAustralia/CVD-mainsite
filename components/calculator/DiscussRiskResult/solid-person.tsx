import { useState, useEffect } from "react";
import variable from "../../../styles/theme/variables";
import { Text } from "@mantine/core";
interface redCount {
  redCount: number;
  newRedCount: number;
}

const SoliePersonSvg = (props: redCount) => {
  const [redCount, setRedCount] = useState(props.redCount);
  const [newRedCount, setNewRedCount] = useState(props.newRedCount);

  useEffect(() => {
    setNewRedCount((state) => {
      return props.newRedCount;
    });
  }, [props.newRedCount]);

  const SolidPersonGroup = [];
  for (let i = 10; i >= 1; i--) {
    SolidPersonGroup.push(
      <div key={i} className={`row=${i}`} style={{ whiteSpace: "nowrap" }}>
        {Array(10)
          .fill(2)
          .map((d, index) => {
            return (
              // <span key={parseInt(`${i - 1}` + `${index}`) + 1}>
              <svg
                key={parseInt(`${i - 1}` + `${index}`) + 1}
                fill={variable.red300}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  style={{
                    fill:
                      parseInt(`${i - 1}` + `${index}`) + 1 > newRedCount &&
                      parseInt(`${i - 1}` + `${index}`) + 1 <= redCount
                        ? variable.red200
                        : 0 <= parseInt(`${i - 1}` + `${index}`) + 1 &&
                          parseInt(`${i - 1}` + `${index}`) + 1 <= newRedCount
                        ? variable.red300 
                        : "#B0BEC5",
                  }}
                  fill={
                    parseInt(`${i - 1}` + `${index}`) + 1 > newRedCount &&
                    parseInt(`${i - 1}` + `${index}`) + 1 <= redCount
                      ? variable.red200
                      : 0 <= parseInt(`${i - 1}` + `${index}`) + 1 &&
                        parseInt(`${i - 1}` + `${index}`) + 1 <= newRedCount
                      ? variable.red300
                      : "#B0BEC5"
                  }
                  d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"
                />
              </svg>
              // </span>
            );
          })}
        <Text
          sx={{
            display: "inline",
            fontFamily: "Roboto Flex !important",
            fontWeight: variable.fontWeightRegular,
            marginLeft: variable.spacer3,
            color: variable.grey600,
            fontSize: variable.fontSizeXl,
            letterSpacing: "1.25px",
            lineHeight: "20px",
            verticalAlign: "middle",
            "@media (min-width: 769px) and (max-width: 820px)": {
              marginLeft: variable.spacer1,
            },
          }}
        >{`${i}0`}</Text>
      </div>
    );
  }

  return (
    <div
      className="strap1Right"
      style={{ width: "calc(100%-45px)", maxWidth: "50%" }}
    >
      {SolidPersonGroup}
    </div>
  );
};

export default SoliePersonSvg;
