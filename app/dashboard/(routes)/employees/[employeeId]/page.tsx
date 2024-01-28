import prismadb from "@/lib/prismadb";
import React from "react";

const ProductsPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        Employee details
      </div>
    </div>
  );
};

export default ProductsPage;
