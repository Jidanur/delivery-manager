import { useState } from "react";
import { CircularProgress, Typography, IconButton } from "@mui/material";
import GeneralTable from "./GeneralTable";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../popup/ConfirmationPopup";

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
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClickOpen = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      onDelete(selectedId);
    }
    handleClose();
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : data.length > 0 ? (
        <>
          <GeneralTable
            columns={columns}
            data={data}
            actions={(row) => (
              <IconButton
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickOpen(row.package_id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          />
          <ConfirmationDialog
            open={open}
            title="Confirm Deletion"
            description="Are you sure you want to delete this item?"
            onClose={handleClose}
            onConfirm={handleConfirmDelete}
          />
        </>
      ) : (
        <Typography variant="body1" align="center">
          No data available.
        </Typography>
      )}
    </>
  );
};

export default TableWithActions;
