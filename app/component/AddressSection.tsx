"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AddressComponent from "./Address-Component";
import AddressForm from "./Address-Form";
import { Plus, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Address, setSelectedAddressId } from "@/utils/DataSlice";

interface AddressSectionProps {
  isAddressDrawerOpen: boolean;
  setIsAddressDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddressSection({
  isAddressDrawerOpen,
  setIsAddressDrawerOpen,
}: AddressSectionProps) {
  const dispatch = useDispatch();
  const userAddress = useSelector((state: any) => state.dataSlice.address);
  const selectedAddressId = useSelector(
    (state: any) => state.dataSlice.selectedAddressId
  );

  const [showAddressForm, setShowAddressForm] = useState(false);

  return (
    <Sheet open={isAddressDrawerOpen} onOpenChange={setIsAddressDrawerOpen}>
      <SheetContent
        side="bottom"
        className="h-[80vh] overflow-y-auto p-5 md:p-8"
      >
        <SheetHeader>
          <SheetTitle className="text-xl">Select Delivery Address</SheetTitle>
        </SheetHeader>

        {!showAddressForm ? (
          <div className="mt-6  space-y-4">
            {userAddress.length === 0 ? (
              <h2 className="flex gap-2 items-center justify-center text-xl font-medium">
                <span>
                  <Building />
                </span>{" "}
                No Address Yet
              </h2>
            ) : (
              userAddress?.map((address: Address) => (
                <AddressComponent
                  key={address?.id}
                  address={address as Address}
                  isSelected={selectedAddressId === address.id}
                  onSelect={() => {
                    dispatch(setSelectedAddressId(address?.id));
                    // close the drawer
                    setIsAddressDrawerOpen(false);
                  }}
                />
              ))
            )}

            <Button
              onClick={() => setShowAddressForm(true)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
              variant="default"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </div>
        ) : (
          <div className="mt-6">
            <AddressForm onCancel={() => setShowAddressForm(false)} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default AddressSection;
