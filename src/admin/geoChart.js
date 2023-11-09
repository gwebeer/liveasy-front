import { Box } from "@mui/material";
import { BsGeoAltFill } from "react-icons/bs";
import GeographyChart from "./geography";

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#FF5733', '#00C49F'];

export const Geography = () => {
  return (
    <Box m="20px">
        <div style={{ textAlign: 'center', color: '#219EBC' }}>
            <i style={{ fontSize: '2em' }}>
                <BsGeoAltFill />
            </i>
            <h1>Gráfico Geográfico</h1>
        </div>
      <Box
        height="75vh"
        border={`1px solid #8884d8`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;