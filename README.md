# Meditation Challenge

This is a React application that asks users to slow down and sit with a single piece of artwork for a duration of 10 minutes. It shows the user a random piece of artwork and then persists the duration spent to a db.

It is a clone of the [NYT Meditation Challenge](https://www.nytimes.com/interactive/2025/02/02/upshot/ten-minute-challenge-hunters.html), but with some improvements
- Having a different image every time I sat to meditate 
- Tracking and persisting my own meditation times
- Having different timer settings

## Install
```bash
  npm i
```

## Run the application
```bash
  npm run dev
```
You should be able to navigate to http://localhost:5173/

## API
I created an endpoint to the [MET Art Collection](https://metmuseum.github.io/) database to pull a random image + then cache it in localstorage.

## Meditation Timer
Created a timer set to 10 minutes. And I use the timer to indicate in the UI when I'm at the half way mark.
```javascript
  // Timer.tsx
  useEffect(() => {
    if (timeLeft <= 0) {
      finishMeditation();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, finishMeditation]);
```
## Persisting Data
There is a [supabase](https://supabase.com/) db which records to how long I spend meditating each time (via start + quit button) - so i can answer how often I make it to 10mins (would be interesting to see how long others make it as well). I used supabase for the first time

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
```

## Improvements

I'm pretty happy with the app since it allows me to do exactly what I want - to meditate for 10 minutes and really focus on a piece of artwork.

But I can see some things for improvement:
- use an LLM Model to let me know important information about the piece, artwork, history, etc.
- set different times for meditation
- a personal dashboard - listing times meditated and which pieces
- a way to share progress with others
- a filter to set to what type of artwork to meditate to

## Conclusion

The code is [here](https://github.com/houseofaragon/art-meditation), feel free to improve it or to use it :)
