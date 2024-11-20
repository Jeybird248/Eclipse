import React from 'react';
import { Food } from "../services/services";

interface FoodListProps {
  foodData: Food[];
}

const FoodList: React.FC<FoodListProps> = ({ foodData }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Select
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Food Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Measure
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grams
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Calories
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Protein (g)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {foodData.map((food, index) => (
            <tr key={index} className="text-sm">
              <td className="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">
                <input type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
              </td>
              <td className="px-6 py-6 whitespace-nowrap text-sm font-medium text-gray-900">{food.foodName}</td>
              <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{food.measure}</td>
              <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{food.grams}</td>
              <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{food.calories}</td>
              <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{food.protein}g</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodList;

