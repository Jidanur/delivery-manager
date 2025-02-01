import { Box, Typography } from "@mui/material";

interface DynamicSectionProps {
  title: string;
  content: string;
}

const TableSection = ({ title, content }: DynamicSectionProps) => {
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1" color="text.secondary">
        {content}
      </Typography>
    </Box>
  );
};

export default TableSection;
