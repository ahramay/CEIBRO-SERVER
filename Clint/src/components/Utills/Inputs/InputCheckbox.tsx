import { FC, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

import "./inputText.css";
import colors from "../../../assets/colors";
import { FormControlLabel, makeStyles } from "@material-ui/core";
import HorizontalBreak from "components/Utills/Others/HorizontalBreak";

const CustomCheckbox = withStyles({
  root: {
    color: colors.darkYellow,
    "&$checked": {
      color: colors.darkYellow,
    },
    width: 2,
    height: 16,
    marginRight:6
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface InputCheckboxInterface {
  checked: boolean;
  label?: string;
  onChange?: (e: boolean) => void;
}

const InputCheckbox: FC<InputCheckboxInterface> = (props) => {
  const { checked, label } = props;
  const classes = useStyles();
  const [check, setChecked] = useState<boolean>(checked);

  const toggle = () => {
    setChecked(!check);
  };

  const handleChange = (e: any) => {
    props.onChange?.(e.target?.checked);
  };

  return (
    <div style={{ width: "100%" }}>
      <FormControlLabel
        control={<CustomCheckbox checked={check} /> }
        label={label}
        onClick={toggle}
        classes={{ label: classes.label }}
        onChange={handleChange}
      />
      <HorizontalBreak  />
    </div>
  );
};

export default InputCheckbox;

const useStyles = makeStyles({
  label: {
    fontSize: 12,
    fontWeight: 500,
  },
});
