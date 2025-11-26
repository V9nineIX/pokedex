import { fetchData, postData, patchData, putData, deleteData } from "./service";
import { LIMIT_PER_PAGE } from "../app/constant";

const getPokemonList = async (): Promise<any> => {
  const response = await fetchData<any>(
    "/pokemon?limit=" + LIMIT_PER_PAGE + "&offset=0"
  );
  return response;
};

export { getPokemonList };
