import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import { userService } from "../../../services/userService";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const nameParts = name.split(" ");
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : `${nameParts[0][0]}${nameParts[0][1]}`;

  return {
    sx: {
      bgcolor: stringToColor(name),
      cursor: "pointer",
      fontSize: "1.25rem", // Adjust font size
      color: "white", // Ensure text color is white
    },
    children: initials,
  };
}

const UserAvatar: React.FC = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userInfo = await userService.getUserInfo();
        setUserName(userInfo.info.name);
        console.log("User info:", userInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserName();
  }, []);

  if (!userName) {
    return null; // or a loading spinner
  }

  return (
    <StyledAvatar>
      <Tooltip title={userName} arrow>
        <Avatar {...stringAvatar(userName)} />
      </Tooltip>
    </StyledAvatar>
  );
};

const StyledAvatar = styled.div`
  .MuiAvatar-root {
    cursor: pointer;
  }
`;

export default UserAvatar;
