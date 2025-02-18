import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Skeleton,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  sortable?: boolean;
}

interface GeneralTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  actions?: (row: any) => JSX.Element;
}

const GeneralTable: React.FC<GeneralTableProps> = ({
  columns,
  data,
  loading = false,
  actions,
}) => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  // Sorting function
  const sortedData = useMemo(() => {
    if (!orderBy) return data;
    return [...data].sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }, [data, orderBy, order]);

  // Handle sorting
  const handleSort = useCallback((columnId: string) => {
    setOrderBy(columnId);
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  // Handle row click
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
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || "left"}
                style={{ minWidth: column.minWidth }}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
            {actions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell>
                      <Skeleton variant="circular" width={24} height={24} />
                    </TableCell>
                  )}
                </TableRow>
              ))
            : sortedData.map((row) => (
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
                  {columns.map((column) => {
                    let cellValue = row[column.id];

                    // Status Chip Rendering
                    if (column.id === "status") {
                      cellValue = (
                        <Chip
                          label={row.status}
                          color={
                            row.status === "pending"
                              ? "warning"
                              : row.status === "completed"
                              ? "success"
                              : "default"
                          }
                          size="small"
                        />
                      );
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {cellValue}
                      </TableCell>
                    );
                  })}
                  {actions && <TableCell>{actions(row)}</TableCell>}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GeneralTable;
