export function parseLRC(lrc: string): { time: number; text: string }[] {
    const lyrics = lrc.split('\n').map((line) => {
      const match = line.match(/\[(\d+):(\d+)\.(\d+)\](.*)/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const milliseconds = parseInt(match[3]);
        const time = minutes * 60 + seconds + milliseconds / 1000;
        const text = match[4];
        return { time, text };
      }
      return null;
    });
  
    return lyrics.filter((lyric) => lyric !== null) as { time: number; text: string }[];
  }