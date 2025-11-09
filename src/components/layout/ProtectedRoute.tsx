import React from "react";
import { Navigate } from "react-router";

interface Props {
  children: React.ReactNode;
  requiredPermissions?: string[];
  userPermissions: string[];
}

const ProtectedRoute: React.FC<Props> = ({ children, requiredPermissions = [], userPermissions }) => {
  const hasAccess = requiredPermissions.every((perm) =>
    userPermissions.includes(perm)
  );

  if (!hasAccess) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
