import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

interface GeneralTableProps {
  columns: Column[];
  data: any[];
  actions?: (row: any) => JSX.Element;
}

const GeneralTable: React.FC<GeneralTableProps> = ({
  columns,
  data,
  actions,
}) => {
  const navigate = useNavigate();

  const handleRowClick = (row: any) => {
    if (row.client_id) {
      navigate(`/client/${row.client_id}`);
    } else if (row.driver_id) {
      navigate(`/driver/${row.driver_id}`);
    } else if (row.package_id) {
      navigate(`/package/${row.package_id}`);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
            {actions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => handleRowClick(row)}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  transition:
                    "background-color 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: 3,
                  cursor: "pointer",
                },
              }}
            >
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {row[column.id]}
                </TableCell>
              ))}
              {actions && <TableCell>{actions(row)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GeneralTable;
