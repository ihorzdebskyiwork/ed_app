export function getTimeLeft(startedAt: string, duration: string): string {
  const durationInMinutes = parseInt(duration);
  const startedAtTime = new Date(startedAt).getTime();
  const endedAtTime = startedAtTime + durationInMinutes * 60000;
  const currentTime = new Date().getTime();
  const timeLeftInMs = endedAtTime - currentTime;

  if (timeLeftInMs <= 0) {
    // return "Time has already elapsed";
    return "00:00:00";
  }

  const timeLeft = new Date(timeLeftInMs).toISOString().substr(11, 8);
  return timeLeft;
}
