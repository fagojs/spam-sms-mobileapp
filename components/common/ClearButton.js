import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { orange } from "../../utils/color";

const ClearButton = () => {
  return <MaterialIcons name="delete" size={65} color={orange} />;
};

export default ClearButton;
