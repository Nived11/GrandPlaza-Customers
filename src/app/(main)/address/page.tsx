"use client";

import AddressMain from "@/features/address/AdrressMain";
import useAuthGuard from "@/hooks/useAuthGuard";

const AddressPage = () => {
   const { isAuthorized } = useAuthGuard({
    requireAuth: true,
  });
  
  if (!isAuthorized) {
    return null;
  }

  return <AddressMain />;
};

export default AddressPage;