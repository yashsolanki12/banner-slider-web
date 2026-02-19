import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import NoUspBarFound from "../pages/no-usp-bar-found";

const UspBarTablePage = (props) => {
  const { data } = props;
  const [phoneListMessage, setPhoneListMessage] = React.useState({
    open: false,
    apiMessage: "",
    severity: "error",
  });

  const handleCloseSnackbar = () => {
    setPhoneListMessage({ ...phoneListMessage, open: false });
  };

  React.useEffect(() => {
    if (data && data?.success == true) {
      setPhoneListMessage({
        open: true,
        apiMessage: data.message,
        severity: "error",
      });
    }
  }, [data]);

  return (
    <TableContainer
      component={Box}
      sx={{ backgroundColor: "white", borderRadius: "8px" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="announcements table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#6b7280", fontWeight: 600 }}>
              Title
            </TableCell>
            <TableCell sx={{ color: "#6b7280", fontWeight: 600 }}>
              Description
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.length > 0 ? (
            data?.data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <NoUspBarFound />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Snackbar for API messages */}
      <Snackbar
        open={phoneListMessage.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert severity={phoneListMessage.severity}>
          {phoneListMessage.apiMessage}
        </MuiAlert>
      </Snackbar>
    </TableContainer>
  );
};

export default UspBarTablePage;
