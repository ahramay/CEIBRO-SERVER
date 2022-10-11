import { makeStyles } from "@material-ui/core";
import colors from "../../../assets/colors";

interface NameAvatarProps {
  firstName: string;
  surName?: string;
  background?: string;
  url?: string;
  variant?: "small" | "large" | "custom";
}

const NameAvatar: React.FC<NameAvatarProps> = (props) => {
  const classes = useStyles();
  const { firstName, surName, url, variant = "small" } = props;
  const letters =
    firstName?.[0]?.toUpperCase?.() + (surName?.[0]?.toUpperCase?.() || "");

  const getImageClass = () => {
    return variant === "small"
      ? classes.outerWrapper
      : variant === "large"
      ? classes.imgWrapper
      : "";
  };

  return (
    <>
      {!url && (
        <div
          className={getImageClass()}
          style={{ background: props?.background || colors.secondaryGrey }}
        >
          {letters}
        </div>
      )}

      {url && (
        <div className={getImageClass()}>
          <img src={url} className={classes.img} />
        </div>
      )}
    </>
  );
};

export default NameAvatar;

const useStyles = makeStyles({
  outerWrapper: {
    border: `1px solid ${colors.secondaryGrey}`,
    background: colors.secondaryGrey,
    width: "80%",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
    height: 30,
    maxWidth: 45,
    borderRadius: 4,
  },
  imgWrapper: {
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    borderRadius: 4,
  },
  img: {
    width: "100%",
    height: "auto",
  },
});
