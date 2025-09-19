import { PropertyContext } from '@/context/PropertyContext';
import { formatDate, formatMoney } from '@/lib/utils';
import React, { useContext } from 'react';

export const InformationCard = () => {
  const { property } = useContext(PropertyContext);

  return (
    <div className="flex flex-col gap-4 p-6 justify-start items-start bg-stone-800 shadow-md w-full md:w-[604px] sm:w-[504px] xs:w-[360px] xxs:w-[350px] w-[300px] h-auto rounded-lg">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-white text-nowrap">
          Price: {formatMoney(property?.price || 0)}
        </h1>
        <hr className="my-3 border-gray-200" />
        <p className="text-md text-gray-100 mb-2">{property?.address}</p>
        <div className="flex flex-row gap-4">
          <span className="text-md font-semibold text-gray-200">Owner: {property?.owner.name}</span>
        </div>
      </div>

      {property?.traces && property.traces.length > 0 && (
        <div className="w-full">
          <hr className="my-4 border-gray-200" />
          <h2 className="text-xl font-bold text-white mb-4">Property History</h2>
          <div className="space-y-3">
            {property.traces.map((trace, index) => (
              <div
                key={trace.id}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 text-lg">{trace.name}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {formatDate(trace.dateScale)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-600 font-medium">Value:</span>
                    <span className="text-green-600 font-bold text-lg">
                      {formatMoney(trace.value)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 font-medium">Tax:</span>
                    <span className="text-red-600 font-bold text-lg">{formatMoney(trace.tax)}</span>
                  </div>
                </div>
                {index < property.traces.length - 1 && (
                  <div className="mt-3 pt-3 border-t border-blue-100"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
