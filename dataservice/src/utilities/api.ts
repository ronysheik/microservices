import axios, { AxiosResponse } from 'axios';

export async function fetchData(bearerToken: string) {
    try {
      const response = await axios.get(
        `${'BASEURL'}/v1/metadata`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(
          `Failed to fetch data from metadata source. Status code: ${response.status}`
        );
      }
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
}

export default fetchData;