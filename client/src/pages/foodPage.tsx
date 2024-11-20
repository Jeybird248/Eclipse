import React, {useState, useEffect} from "react";
import SearchBar from "../component/searchBar";
import FoodList from "../component/foodList";

import { Food, searchFoodData } from "../services/services";

const FoodPage: React.FC = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [foodData, setFoodData] = useState<Food[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

    // useEffect to fetch data based on search query
    useEffect(() => {
      const fetchData = async () => {
        // setFoodData([]);
        const data = await searchFoodData(searchQuery);
        console.log(data)
        setFoodData(data);
      };
  
      fetchData();
    }, [searchQuery]); // Trigger effect whenever the search query changes

  return (
    <>
      <div className="overflow-hidden bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-7">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <h1 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Food
              </h1>
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-12 lg:px-8">
        <SearchBar onSearch={handleSearch}/>
        <div className="mt-6 py-10 sm:py-15">
          <FoodList foodData={foodData}/>
        </div>
      </div>
    </>
  );
};

export default FoodPage;