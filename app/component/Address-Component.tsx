"use client";

import { Check, MapPin, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

import { Address } from "@/utils/DataSlice";

interface AddressComponentProps {
  address: Address;
  isSelected?: boolean;
  onSelect?: () => void;
}

function AddressComponent({
  address,
  isSelected,
  onSelect,
}: AddressComponentProps) {
  return (
    <Card
      className={`relative cursor-pointer transition-all hover:shadow-md ${
        isSelected
          ? "border-blue-600 bg-blue-50 shadow-sm"
          : "hover:border-blue-300 border-gray-200"
      }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1">
          <Check className="h-4 w-4" />
        </div>
      )}
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <MapPin
              className={`h-4 w-4 mt-0.5 ${
                isSelected ? "text-blue-600" : "text-gray-500"
              }`}
            />
            <div className="space-y-1 flex-1">
              <p className="font-medium text-gray-900">{address.address1}</p>
              {address.address2 && (
                <div className="flex items-center space-x-2">
                  <Building
                    className={`h-3 w-3 ${
                      isSelected ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  <p className="text-sm text-gray-600">{address.address2}</p>
                </div>
              )}
              <p className="text-sm text-gray-600">
                {address.city}, {address.state} {address.pincode}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AddressComponent;
