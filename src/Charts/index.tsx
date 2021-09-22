import React, { useMemo, useState } from "react";
import {
  Brush,
  CartesianGrid,
  Label,
  Legend,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { Checkbox, Menu } from "semantic-ui-react";
import { Data } from "../useData";
import { parseDate } from "../utils";

type yearsOfExperienceBuckets =
  | "lessThan2"
  | "twoToFour"
  | "fourToSix"
  | "greaterThan6";

const getDateString = (timeStamp: number) => {
  const date = new Date(timeStamp);
  if (date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
  return "";
};

const Charts: React.VoidFunctionComponent<{ data: Data }> = ({ data }) => {
  const [
    yearsOfExperienceVisibleCategories,
    setYearsOfExperienceVisibleCategories,
  ] = useState<Record<yearsOfExperienceBuckets, boolean>>({
    lessThan2: true,
    twoToFour: true,
    fourToSix: true,
    greaterThan6: true,
  });

  const parsedData = useMemo(() => {
    return data.map((item) => {
      return {
        ...item,
        date_of_birth: parseDate(item.date_of_birth).getTime(),
      };
    });
  }, [data]);

  return (
    <>
      <Menu>
        <Menu.Item>Years of experience filter</Menu.Item>
        <Menu.Item>
          <Checkbox
            label="<2"
            value="<2"
            checked={yearsOfExperienceVisibleCategories.lessThan2}
            onChange={() =>
              setYearsOfExperienceVisibleCategories({
                ...yearsOfExperienceVisibleCategories,
                lessThan2: !yearsOfExperienceVisibleCategories.lessThan2,
              })
            }
          />
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            label="2<4"
            value="2<4"
            checked={yearsOfExperienceVisibleCategories.twoToFour}
            onChange={() =>
              setYearsOfExperienceVisibleCategories({
                ...yearsOfExperienceVisibleCategories,
                twoToFour: !yearsOfExperienceVisibleCategories.twoToFour,
              })
            }
          />
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            label="4<6"
            value="4<6"
            checked={yearsOfExperienceVisibleCategories.fourToSix}
            onChange={() =>
              setYearsOfExperienceVisibleCategories({
                ...yearsOfExperienceVisibleCategories,
                fourToSix: !yearsOfExperienceVisibleCategories.fourToSix,
              })
            }
          />
        </Menu.Item>
        <Menu.Item>
          <Checkbox
            label="6<"
            value="6<"
            checked={yearsOfExperienceVisibleCategories.greaterThan6}
            onChange={() =>
              setYearsOfExperienceVisibleCategories({
                ...yearsOfExperienceVisibleCategories,
                greaterThan6: !yearsOfExperienceVisibleCategories.greaterThan6,
              })
            }
          />
        </Menu.Item>
      </Menu>

      <ScatterChart
        width={1000}
        height={700}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date_of_birth"
          name="date of birth"
          type="number"
          tickFormatter={getDateString}
        ></XAxis>
        <YAxis dataKey="salary" name="salary" />
        <ZAxis
          dataKey="years_of_experience"
          range={[64, 144]}
          name="years of experience"
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value: string | number, name: string) => {
            if (name === "date of birth" && typeof value === "number") {
              return getDateString(value);
            }
            return value;
          }}
        />
        <Legend />
        {yearsOfExperienceVisibleCategories.lessThan2 && (
          <Scatter
            name="<=2"
            data={parsedData.filter(
              (dataEntry) => dataEntry.years_of_experience < 2
            )}
            fill="#ffa600"
          />
        )}
        {yearsOfExperienceVisibleCategories.twoToFour && (
          <Scatter
            name="2 <= 4"
            data={parsedData.filter(
              (dataEntry) =>
                dataEntry.years_of_experience > 2 &&
                dataEntry.years_of_experience < 4
            )}
            fill="#ef5675"
          />
        )}
        {yearsOfExperienceVisibleCategories.fourToSix && (
          <Scatter
            name="4 <= 6"
            data={parsedData.filter(
              (dataEntry) =>
                dataEntry.years_of_experience > 4 &&
                dataEntry.years_of_experience < 6
            )}
            fill="#7a5195"
          />
        )}
        {yearsOfExperienceVisibleCategories.greaterThan6 && (
          <Scatter
            name="6<"
            data={parsedData.filter(
              (dataEntry) =>
                dataEntry.years_of_experience > 6 &&
                dataEntry.years_of_experience < 8
            )}
            fill="#003f5c"
          />
        )}
        <Brush
          dataKey="date_of_birth"
          height={50}
          stroke="#8884d8"
          data={parsedData}
        />
      </ScatterChart>
    </>
  );
};

export default Charts;
