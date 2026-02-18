import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

const BannerTable = ({ data }) => {
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
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BannerTable;
