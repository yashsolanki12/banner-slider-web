import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import MuiAlert from "@mui/material/Alert";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import NoUspBarFound from "../no-usp-bar-found";
import Snackbar from "@mui/material/Snackbar";
import ConfirmDialog from "../../ui/confirmation-dialog";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const UspBarTablePage = (props) => {
  const { data, onDelete, onEdit } = props;
  const [uspBarMessage, setUspBarMessage] = React.useState({
    open: false,
    apiMessage: "",
    severity: "error",
  });

  // Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedId);
    setDeleteDialogOpen(false);
    setSelectedId(null);
  };

  const handleCloseSnackbar = () => {
    setUspBarMessage({ ...uspBarMessage, open: false });
  };

  React.useEffect(() => {
    if (data && data?.success === true) {
      setUspBarMessage({
        open: true,
        apiMessage: data.message || "Operation successful",
        severity: "success",
      });
    }
  }, [data]);

  return (
    <>
      <TableContainer
        component={Box}
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: 1,
          maxHeight: 440,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "8px",
          },
        }}
      >
        {/* stickyHeader keeps the header fixed at the top while scrolling */}
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label="announcements table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "#6b7280",
                  fontWeight: 600,
                  fontSize: 16,
                  backgroundColor: "white",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  color: "#6b7280",
                  fontWeight: 600,
                  fontSize: 16,
                  backgroundColor: "white",
                }}
              >
                Description
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color: "#6b7280",
                  fontWeight: 600,
                  fontSize: 16,
                  backgroundColor: "white",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.length > 0 ? (
              data?.data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f9fafb",
                    },
                    "&:hover": {
                      backgroundColor: "#f3f4f6",
                    },
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "14px" }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px" }}>
                    {row.description}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton onClick={() => onEdit(row)} color="primary">
                        <EditIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDeleteClick(row._id)}
                        color="error"
                      >
                        <DeleteIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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
      </TableContainer>

      {/* Snackbar for API messages */}
      <Snackbar
        open={uspBarMessage.open}
        autoHideDuration={uspBarMessage.severity === "error" ? 3000 : 2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={uspBarMessage.severity}
          variant="standard"
          sx={{ width: "100%" }}
        >
          {uspBarMessage.apiMessage}
        </MuiAlert>
      </Snackbar>

      {/* Reusable confirm dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Confirm delete USP bar?"
        message="This action cannot be undone. This will permanently delete the USP bar entry."
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default UspBarTablePage;
