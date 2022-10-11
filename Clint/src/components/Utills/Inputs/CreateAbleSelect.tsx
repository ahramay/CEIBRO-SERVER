import React, { FC } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import InputHOC from "./InputHOC";
import Select from "react-select";
import chroma from "chroma-js";
import colors from "../../../assets/colors";
import { handleInputChange } from "react-select/src/utils";
import CreatableSelect from "react-select";
import assets from "assets/assets";
import { dataInterface } from "./SelectDropdown";

const options = [
  { value: "All", label: "All", color: "green" },
  { value: "Project1", label: "Project 1", color: "yellow" },
  { value: "Project2", label: "Project 2", color: "brown" },
];

interface My {
  title: string;
  data?: dataInterface[];
  value?: any;
  isMulti?: boolean;
  placeholder?: string;
  handleChange?: null | ((e: any) => void);
  zIndex?: number;
  isClearAble?: boolean;
  noOptionMessage?: string;
}

const SelectDropdown: FC<My> = (props) => {
  const classes = useStyles();
  let myOptions: any = props.data || [];

  const { value, isMulti, isClearAble, placeholder, zIndex, noOptionMessage } =
    props;

  console.log("createAbles", props);
  const colourStyles = {
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        fontSize: 14,
        color: colors.inputGrey,
        fontWeight: 500,
        fontFamily: "Inter",
        paddingLeft: 4,
      };
    },
    control: (styles: any) => ({
      ...styles,
      backgroundColor: "white",
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      flex: 2,
      height: 37,
    }),
    indicatorSeparator: (state: any) => ({
      display: "none",
    }),
    indicatorsContainer: () => ({
      display: "none",
    }),
    option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
      const color = chroma(data.color || colors.darkYellow);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? colors.darkYellow
          : isFocused
          ? color.alpha(0.1).css()
          : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : colors.black,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor:
            !isDisabled &&
            (isSelected ? colors.darkYellow : color.alpha(0.3).css()),
        },
      };
    },
    multiValue: (styles: any, { data }: any) => {
      const color = chroma(colors.darkYellow);
      return {
        ...styles,
        backgroundColor: colors.darkYellow,
      };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
      ...styles,
      color: colors.black,
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
      ...styles,
      color: colors.white,
      cusor: "pointer",
      ":hover": {
        backgroundColor: colors.darkYellow,
        color: colors.white,
        cusor: "pointer",
      },
    }),
    menuList: (styles: any) => ({
      ...styles,
      height: 200,
    }),
    singleValue: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "Inter",
        paddingLeft: 4,
      };
    },
  };

  const handleChange = (e: dataInterface) => {
    console.log("e: ", e);
    props.handleChange?.(e);
  };

  const formatCreateLabel = (inputValue: string) => `Invite ${inputValue}`;

  return (
    <div className={classes.outerWrapper}>
      <div className={classes.titleWrapper}>
        <img src={assets.searchIcon} className="w-16" />|
      </div>
      <div
        className={`${classes.select} black-input`}
        style={{ ...(zIndex ? { zIndex } : {}) }}
      >
        <CreatableSelect
          placeholder={placeholder || "Select"}
          isMulti={isMulti || false}
          onChange={handleChange}
          options={myOptions}
          styles={colourStyles}
          value={value}
          isClearable={isClearAble}
          noOptionsMessage={() => noOptionMessage || ""}
          // formatCreateLabel={formatCreateLabel}
        />
      </div>
    </div>
  );
};

export default SelectDropdown;

const useStyles = makeStyles({
  outerWrapper: {
    background: colors.white,
    display: "flex",
    alignItems: "center",
    border: `1.5px solid ${colors.borderGrey}`,
    paddingRight: 8,
    borderRadius: 4,
  },
  titleWrapper: {
    paddingLeft: 11,
    minWidth: 35,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 15,
    color: colors.borderGrey,
    fontSize: 24,
    fontWeight: "bolder",
    // flex: 1,
  },
  title: {
    fontSize: 10,
    fontWeight: 500,
    color: colors.textGrey,
  },
  dropdown: {
    border: "none",
    background: "transparent",
    flex: 3,
    "&:focus": {
      border: "transparent",
    },
    "&:active": {
      border: "transparent",
    },
    "&:focus-visible": {
      outline: "transparent",
    },
  },
  select: {
    flex: 3,
    zIndex: 2,
  },
});
