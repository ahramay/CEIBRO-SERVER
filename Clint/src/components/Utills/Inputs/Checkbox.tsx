import { Checkbox, withStyles, CheckboxProps } from "@material-ui/core";
import colors from "../../../assets/colors";

const CustomCheckbox = withStyles({
  root: {
    "&$checked": {
      color: colors.darkYellow,
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export default CustomCheckbox;
