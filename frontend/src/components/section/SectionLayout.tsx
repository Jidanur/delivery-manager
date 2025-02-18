import { Box, Container, Typography, Paper } from "@mui/material";
import { ReactNode } from "react";
import FabAddButton from "../common/button/FabAddButton";

interface SectionLayoutProps {
  heading: string;
  selectedSection: string;
  showCreateButton?: boolean;
  onCreateButtonClick?: () => void;
  children: ReactNode;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  heading,
  selectedSection,
  showCreateButton = false,
  onCreateButtonClick,
  children,
}) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: "#fafafa" }}>
      <Container maxWidth="lg">
        <Typography component="h1" variant="h4" gutterBottom>
          {heading}
        </Typography>
        <Typography component="h2" variant="h5" gutterBottom>
          {selectedSection}
        </Typography>
        <Paper sx={{ padding: 3, position: "relative" }}>
          {children}
          {showCreateButton && (
            <FabAddButton
              title={`Create ${selectedSection}`}
              onClick={onCreateButtonClick}
            />
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default SectionLayout;
