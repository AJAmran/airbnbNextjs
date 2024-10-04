/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://airbnb-server-kappa.vercel.app/api/properties";

// Fetch function to get the listings
export async function getHomesData(
  searchParams: Record<string, any> = {}
): Promise<any[]> {
  const searchQuery = new URLSearchParams(searchParams).toString();
  const url = `${API_URL}?${searchQuery}`;

  console.log("Fetching data from: ", url);

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} - ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      "Error fetching data: ",
      error instanceof Error ? error.message : error
    );
    return [];
  }
}
