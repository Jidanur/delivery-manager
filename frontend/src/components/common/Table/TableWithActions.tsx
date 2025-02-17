import { CircularProgress, Typography, IconButton } from "@mui/material";
import GeneralTable from "./GeneralTable";
import DeleteIcon from "@mui/icons-material/Delete";

interface TableWithActionsProps {
  columns: any[];
  data: any[];
  loading: boolean;
  onDelete: (id: number) => void;
}

const TableWithActions: React.FC<TableWithActionsProps> = ({
  columns,
  data,
  loading,
  onDelete,
}) => {
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : data.length > 0 ? (
        <GeneralTable
          columns={columns}
          data={data}
          actions={(row) => (
            <IconButton
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(row.package_id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        />
      ) : (
        <Typography variant="body1" align="center">
          No data available.
        </Typography>
      )}
    </>
  );
};

export default TableWithActions;
