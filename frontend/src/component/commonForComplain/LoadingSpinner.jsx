import PropTypes from "prop-types";

const LoadingSpinner = ({ size = "md" }) => {
  const sizeClass = `loading-${size}`;

  return <span className={`loading loading-spinner ${sizeClass}`} />;
};

// Prop validation
LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]), // Valid sizes: sm, md, lg
};

export default LoadingSpinner;
