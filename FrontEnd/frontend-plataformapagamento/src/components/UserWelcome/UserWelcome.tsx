import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUsers } from "../../hooks/useUsers";
import { WelcomeContainer, UserId } from "./UserWelcome.styles";

export function UserWelcome() {
  const { AuthenticatedUserInfo } = useAuth();
  const { users } = useUsers();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (users.length > 0 && AuthenticatedUserInfo.AuthenticatedUserId) {
      const currentUser = users.find(
        (user) => user.id === parseInt(AuthenticatedUserInfo.AuthenticatedUserId)
      );
      
      if (currentUser) {
        const formattedName = currentUser.firstName + " " + currentUser.lastName;
        setUserName(formattedName);
      }
    }
  }, [users, AuthenticatedUserInfo.AuthenticatedUserId]);



  return (
    <WelcomeContainer>
      {userName && (
        <h2>
          Bem Vindo {userName}, você é o usuário de id <UserId>{AuthenticatedUserInfo.AuthenticatedUserId}.</UserId>
        </h2>
      )}
    </WelcomeContainer>
  );
}
