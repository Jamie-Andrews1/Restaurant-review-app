const Api: string = import.meta.env.VITE_API;

export type Leaderboard = Awaited<ReturnType<typeof GetLeaderboard>>;

export async function GetLeaderboard() {
  try {
    const res = await fetch(`${Api}/leaderboard`);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
