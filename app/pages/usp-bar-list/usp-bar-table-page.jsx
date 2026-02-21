import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import NoUspBarFound from "../no-usp-bar-found";
import Snackbar from "@mui/material/Snackbar";
import ConfirmDialog from "../../ui/confirmation-dialog";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SafeLink from "../../helper/safe-link";

const UspBarTablePage = (props) => {
  const { data, deleteMutation, onEdit } = props;
  const [uspBarMessage, setUspBarMessage] = React.useState({
    open: false,
    apiMessage: "",
    severity: "error",
  });

  // Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  // Check if delete is in progress
  const isDeleting = deleteMutation?.isPending;

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      deleteMutation.mutate(selectedId, {
        onSettled: () => {
          setDeleteDialogOpen(false);
          setSelectedId(null);
        },
      });
    }
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

    if (data?.data.length === 0) {
      setUspBarMessage({
        open: true,
        apiMessage: data.message || "No usp bar data found.",
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
          maxHeight: 650,
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
                  fontSize: 18,
                  backgroundColor: "white",
                }}
              >
                Title
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#6b7280",
                  fontWeight: 600,
                  fontSize: 18,
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
                  fontSize: 18,
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
                  {/* Title Table Cell */}
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "14px" }}
                  >
                    <Tooltip
                      placement="top"
                      title={row?.title}
                      arrow
                      slotProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            padding: "8px 12px",
                            maxWidth: "300px",
                          },
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",
                          maxWidth: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          // These 3 lines ensure centering within the cell

                          marginRight: "auto",
                          display: "block",
                          width: "fit-content",
                        }}
                      >
                        {row?.title}
                      </Typography>
                    </Tooltip>
                  </TableCell>

                  {/* Description Table Cell */}
                  <TableCell align="center">
                    <Tooltip
                      placement="top"
                      title={row?.description}
                      arrow
                      slotProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1rem",
                            padding: "8px 12px",
                            maxWidth: "300px",
                          },
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",
                          maxWidth: 500,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          // These 3 lines ensure centering within the cell
                          marginLeft: "auto",
                          marginRight: "auto",
                          display: "block",
                          width: "fit-content",
                          // textAlign: "left",
                        }}
                      >
                        {row?.description}
                      </Typography>
                    </Tooltip>
                  </TableCell>

                  {/* Actions Table Cell */}
                  <TableCell align="right">
                    <Tooltip
                      title="Edit"
                      placement="top"
                      slotProps={{
                        tooltip: {
                          sx: {
                            fontSize: "0.87rem",
                            padding: "5px 8px",
                            maxWidth: "50px",
                          },
                        },
                      }}
                    >
                      <IconButton
                        component={SafeLink}
                        to={`/app/usp-bar/${row?._id}`}
                        // onClick={() => onEdit(row)}
                        color="primary"
                      >
                        <EditIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Delete"
                      placement="top"
                      slotProps={{
                        tooltip: {
                          sx: {
                            fontSize: "0.87rem",
                            padding: "5px 8px",
                            maxWidth: "50px",
                          },
                        },
                      }}
                    >
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
        title="Confirm Delete USP Bar?"
        message="This action cannot be undone. This will permanently delete the USP Bar entry."
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />
    </>
  );
};

export default UspBarTablePage;
