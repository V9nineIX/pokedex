import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const getBaseURL = () => {
  return process.env.NEXT_PUBLIC_API_URL || "https://pokeapi.co/api/v2";
};

// const getToken = () => "1234567890";

export const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: getBaseURL(),
    // headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : undefined,
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
      const isUnauthorized = error.response?.status === 401;
      //TODO: clear token

      return Promise.reject(error);
    }
  );

  return instance;
};

const apiClient = createApiClient();

export interface ApiResponse<T> {
  data: T;
}

export const fetchData = async <T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> => {
  try {
    const res = await apiClient.get<T>(url, options);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching data:", {
        message: error.message,
        url: error.config?.url,
        status: error.response?.status,
      });
    }
    throw error;
  }
};

export const postData = async <Req, Res>(
  url: string,
  data?: Req,
  options?: AxiosRequestConfig
): Promise<Res> => {
  try {
    const res = await apiClient.post<Res>(url, data, options);
    return res.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export const patchData = async <Req, Res>(
  url: string,
  data?: Req,
  options?: AxiosRequestConfig
): Promise<Res> => {
  try {
    const res = await apiClient.patch<Res>(url, data, options);
    return res.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export const putData = async <Req, Res>(
  url: string,
  data?: Req,
  options?: AxiosRequestConfig
): Promise<Res> => {
  try {
    const res = await apiClient.put<Res>(url, data, options);
    return res.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export const deleteData = async <Req, Res>(
  url: string,
  options?: AxiosRequestConfig
): Promise<Res> => {
  try {
    const res = await apiClient.delete<Res>(url, options);
    return res.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};
