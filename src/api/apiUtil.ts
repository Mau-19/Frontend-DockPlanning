import axios from "axios";

export enum ClientFetchHttpMethod {
  GET = "GET",
  POST = "POST",
}

interface ClientFetchOptions {
  authenticatedRoute?: boolean;
  body?: any;
}

const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;

const api = axios.create({
  baseURL: apiHostAddress,
});

export const clientFetch = async (
  method: string,
  url: string,
  options?: ClientFetchOptions
) => {
  let headers = {};

  if (options?.authenticatedRoute) {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : "";
    headers = {
      "x-access-token": user?.accessToken,
    };
  }

  switch (method) {
    case ClientFetchHttpMethod.GET: {
      try {
        const response = await api.get(`${apiHostAddress}${url}`, { headers });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    case ClientFetchHttpMethod.POST: {
      try {
        const response = await api.post(
          `${apiHostAddress}${url}`,
          {
            ...options?.body,
          },
          {
            headers,
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
};
